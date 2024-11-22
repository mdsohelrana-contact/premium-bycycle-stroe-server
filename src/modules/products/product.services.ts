import { BicycleModel, IBicycle } from './product.interface';

// getAllProducts service
const getAllProducts = async (searchTerm: string | undefined) => {
  let filter = {};

  if (searchTerm && searchTerm.trim() !== '') {
    filter = {
      $or: [
        {
          name: new RegExp(searchTerm, 'i'),
        },
        {
          brand: new RegExp(searchTerm, 'i'),
        },
        {
          type: new RegExp(searchTerm, 'i'),
        },
      ],
    };
  }

  const allProducts = await BicycleModel.find(filter);

  return allProducts;
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
