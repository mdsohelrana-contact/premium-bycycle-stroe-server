import QueryBuilder from '../../queryBuilder/QueryBuilder';
import { BicycleModel, IBicycle } from './product.interface';

// getAllProducts service
const getAllProducts = async (query: Record<string, unknown>) => {
  const productSearchFields = ['name', 'brand'];

  const studentQuery = new QueryBuilder(BicycleModel.find(), query)
    .search(productSearchFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await studentQuery.countTotal();
  const result = await studentQuery.modelQuery;

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
const postProductData = async (productData: IBicycle) => {
  const createProduct = await BicycleModel.create(productData);

  return createProduct;
};

// updateProductData service
const updateProductData = async (productId: string, updateData: IBicycle) => {
  const updateProduct = await BicycleModel.findOneAndUpdate(
    { _id: productId },
    updateData,
    { new: true, runValidators: true },
  );

  return updateProduct;
};

// deleteProduct By ID service
const deleteProduct = async (productId: string) => {
  const deletedProduct = await BicycleModel.findOneAndDelete({
    _id: productId,
  });

  return deletedProduct;
};

export const productServices = {
  getAllProducts,
  getSingleProduct,
  postProductData,
  updateProductData,
  deleteProduct,
};
