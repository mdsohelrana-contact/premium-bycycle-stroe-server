import QueryBuilder from '../../queryBuilder/QueryBuilder';
import { BicycleModel, IBicycle } from './product.interface';

// getAllProducts service
const getAllProducts = async (query: Record<string, unknown>) => {
  const productSearchFields = ['name', 'brand'];

  const productQuery = new QueryBuilder(BicycleModel.find(), query)
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
const postProductData = async (productData: IBicycle) => {
  // const imageName = `${new Date()}${productData?.name}`;
  // const path = file?.path;

  // console.log(imageName, path);

  // //send image to cloudinary
  // const { secure_url } =
  //   (await imageToCloudinary(imageName, path)) ||
  //   'https://example.com/images/freestyle-red.jpg';
  // productData.imageUrl = secure_url as string;

  // console.log(secure_url);

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
