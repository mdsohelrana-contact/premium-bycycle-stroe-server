import { productServices } from './product.services';
import catchAsync from '../../utils/catchAsync';
import responseHandelar from '../../utils/responseHandelar';
import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';

interface CustomRequest extends Request {
  user?: JwtPayload;
}

// allProducts use productServices.postProductData
const allProducts = catchAsync(async (req, res) => {
  const result = await productServices.getAllProducts(req.query);

  responseHandelar(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Bicycles retrieved successfully.',
    meta: result.meta,
    data: result.result,
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
const postProduct = catchAsync(async (req: CustomRequest, res) => {
  const productData = req.body;
  const user = req.user as any;

  const result = await productServices.postProductData(productData, user!);

  responseHandelar(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Bicycle created successfully.',
    data: result,
  });
});

// updateProduct
const updateProduct = catchAsync(async (req: CustomRequest, res) => {
  const { productId } = req.params;
  const user = req.user;

  const result = await productServices.updateProductData(
    productId,
    req.body,
    user!,
  );

  responseHandelar(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Bicycle updated successfully.',
    data: result,
  });
});

// deleteSingleProduct By ID
const deleteSingleProduct = catchAsync(async (req: CustomRequest, res) => {
  const { productId } = req.params;
  const user = req.user;

  await productServices.deleteProduct(productId, user!);

  responseHandelar(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Bicycle deleted successfully.',
    data: {},
  });
});

// soft deleteSingleProduct By ID
const softDeleteSingleProduct = catchAsync(async (req: CustomRequest, res) => {
  const { productId } = req.params;
  const user = req.user;

  await productServices.softDeleteProduct(productId, user!);

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
  softDeleteSingleProduct,
};
