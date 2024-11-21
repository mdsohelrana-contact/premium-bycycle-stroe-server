import { BicycleModel, IBicycle } from './product.interface';

const postProductData = async (productData: IBicycle) => {
  const createProduct = await BicycleModel.create(productData);
  return createProduct;
};

export const productServices = {
  postProductData,
};
