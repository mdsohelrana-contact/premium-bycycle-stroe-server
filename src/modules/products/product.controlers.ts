import { productServices } from './product.services';
import { IBicycle } from './product.interface';
import catchAsync from '../../utils/catchAsync';
import responseHandelar from '../../utils/responseHandelar';
import { StatusCodes } from 'http-status-codes';

// allProducts use productServices.postProductData
const allProducts = catchAsync(async (req, res) => {
  const result = await productServices.getAllProducts(req.query);

  responseHandelar(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Bicycles retrieved successfully.',
    data: result,
  });
});

// getSingleProduct data
const singleData = catchAsync(async (req, res) => {
  // searching ID
  const productId = req.params.productId;

  const result = await productServices.getSingleProduct(productId);

  if (!result) {
    responseHandelar(res, {
      statusCode: StatusCodes.NOT_FOUND,
      success: false,
      message: 'Bicycle not found!!.',
      data: null,
    });
  }

  responseHandelar(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Bicycle retrieved successfully.',
    data: result,
  });
});

// postProduct Data use productServices.postProductData
const postProduct = catchAsync(async (req, res) => {
  const productData: IBicycle = req.body;
  const result = await productServices.postProductData(productData);

  responseHandelar(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Bicycle created successfully.',
    data: result,
  });
});

// updateProduct
const updateProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const {
    name,
    brand,
    price,
    type,
    imageUrl,
    description,
    quantity,
    rating,
    inStock,
  }: IBicycle = req.body;

  const result = await productServices.updateProductData(productId, {
    name,
    brand,
    price,
    type,
    imageUrl,
    description,
    quantity,
    rating,
    inStock,
  });

  if (!result) {
    responseHandelar(res, {
      statusCode: StatusCodes.NOT_FOUND,
      success: false,
      message: 'Bicycle not found!!.',
      data: null,
    });
  }

  responseHandelar(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Bicycle updated successfully.',
    data: result,
  });
});

// deleteSingleProduct By ID
const deleteSingleProduct = catchAsync(async (req, res) => {
  const { productId } = req.params;

  const result = await productServices.deleteProduct(productId);

  if (!result) {
    responseHandelar(res, {
      statusCode: StatusCodes.NOT_FOUND,
      success: false,
      message: 'Bicycle not found!!.',
      data: null,
    });
  }

  responseHandelar(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Bicycle deleted successfully.',
    data: {},
  });
});

export const productControlers = {
  allProducts,
  singleData,
  postProduct,
  updateProduct,
  deleteSingleProduct,
};
