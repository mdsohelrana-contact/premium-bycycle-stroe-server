import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import QueryBuilder from '../../queryBuilder/QueryBuilder';
import { checkUserRole } from '../../utils/checkUserRole';
import { BicycleModel, IBicycle } from './product.interface';

const flattenObject = (obj: any, prefix = ''): any => {
  return Object.keys(obj).reduce(
    (acc: Record<string, any>, key) => {
      const newPrefix = prefix ? `${prefix}.${key}` : key;

      if (
        typeof obj[key] === 'object' &&
        obj[key] !== null &&
        !Array.isArray(obj[key])
      ) {
        Object.assign(acc, flattenObject(obj[key], newPrefix));
      } else {
        acc[newPrefix] = obj[key];
      }

      return acc;
    },
    {} as Record<string, any>,
  );
};

// getAllProducts service
const getAllProducts = async (query: Record<string, unknown>) => {
  const productSearchFields = ['basicInfo.name', 'basicInfo.brand'];

  const productQuery = new QueryBuilder(
    BicycleModel.find({
      isDeleted: false,
      // status: 'active',
    }),
    query,
  )
    .search(productSearchFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await productQuery.countTotal();
  const result = await productQuery.modelQuery;

  return {
    meta,
    result,
  };
};

// get a single product By ID service
const getSingleProduct = async (productId: string) => {
  const product = await BicycleModel.findOne({ _id: productId });

  return product;
};

// postProductData service
const postProductData = async (productData: IBicycle, user: any) => {
  await checkUserRole(user.userEmail, ['admin']);

  const createProduct = await BicycleModel.create({
    ...productData,
    createdBy: user.userEmail,
  });

  return createProduct;
};

// updateProductData service
const updateProductData = async (
  productId: string,
  updateData: Partial<IBicycle>,
  user: any,
) => {
  await checkUserRole(user.userEmail, ['admin']);

  // check if the product exists
  const existingProduct = await BicycleModel.findOne({ _id: productId });
  if (!existingProduct) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Product not found');
  }
  const flattenedData = flattenObject(updateData);

  const updatedProduct = await BicycleModel.findByIdAndUpdate(
    productId,
    { $set: flattenedData, updatedBy: user.userEmail, updatedAt: new Date() },
    { new: true, runValidators: true },
  );

  return updatedProduct;
};

// deleteProduct By ID service
const deleteProduct = async (productId: string, user: any) => {
  await checkUserRole(user.userEmail, ['admin']);

  // check if the product exists
  const existingProduct = await BicycleModel.findOne({ _id: productId });
  if (!existingProduct) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Product not found');
  }

  const deletedProduct = await BicycleModel.findOneAndDelete({
    _id: productId,
  });

  return deletedProduct;
};

// SOFT DELETE
const softDeleteProduct = async (productId: string, user: any) => {
  await checkUserRole(user.userEmail, ['admin']);

  // check if the product exists
  const existingProduct = await BicycleModel.findOne({ _id: productId });
  if (!existingProduct) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Product not found');
  }

  const deletedProduct = await BicycleModel.findOneAndUpdate(
    { _id: productId },
    {
      $set: {
        isDeleted: true,
        updatedBy: user.userEmail,
        updatedAt: new Date(),
      },
    },
    { new: true, runValidators: true },
  );

  return deletedProduct;
};

export const productServices = {
  getAllProducts,
  getSingleProduct,
  postProductData,
  updateProductData,
  deleteProduct,
  softDeleteProduct,
};
