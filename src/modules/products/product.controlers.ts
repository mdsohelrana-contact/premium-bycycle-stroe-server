import { Request, Response } from 'express';
import { productServices } from './product.services';
import { IBicycle } from './product.interface';

// allProducts use productServices.postProductData
const allProducts = async (req: Request, res: Response) => {
  try {
    const result = await productServices.getAllProducts();
    res.status(200).json({
      message: 'Bicycles retrieved successfully',
      status: true,
      data: result,
    });
  } catch (error) {
    res.json({
      message: error || 'Something went wrong',
      status: false,
    });
  }
};

// getSingleProduct data
const singleData = async (req: Request, res: Response) => {
  // searching ID
  const productId = req.params.productId;

  if (!productId) {
    res.status(404).json({
      message: 'Products not found',
      success: false,
    });
  }
  try {
    const result = await productServices.getSingleProduct(productId);

    res.status(200).json({
      message: 'Bicycle retrieved successfully',
      status: true,
      data: result,
    });
  } catch (error: any) {
    res.json({
      message: error.message || 'Product Not Found',
      status: false,
    });
  }
};

// postProduct Data use productServices.postProductData
const postProduct = async (req: Request, res: Response) => {
  try {
    const productData: IBicycle = req.body;
    const result = await productServices.postProductData(productData);

    res.status(200).json({
      message: 'Bicycle created successfully',
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.json({
      message: 'Validation failed',
      success: false,
      error,
      stack: error.stack || 'Something went wrong',
    });
  }
};

// updateProduct
const updateProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;
  console.log('productId:', productId);
  const { name, brand, price, type, description, quantity, inStock }: IBicycle =
    req.body;
  try {
    const result = await productServices.updateProductData(productId, {
      name,
      brand,
      price,
      type,
      description,
      quantity,
      inStock,
    });

    if (!result) {
      res.status(404).json({
        message: 'Bicycle not found',
        success: false,
      });
    }

    res.status(200).json({
      message: 'Bicycle updated successfully',
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.json({
      message: error.message || 'Product Not Found',
      status: false,
    });
  }
};

// deleteSingleProduct By ID
const deleteSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const result = await productServices.deleteProduct(productId);

    if (!result) {
      res.status(404).json({
        message: 'Product not found or could not be deleted.',
        status: false,
      });
    }

    res.status(200).json({
      message: 'Bicycle deleted successfully',
      status: true,
      data: {},
    });
  } catch (error: any) {
    res.json({
      message: error.message || 'Something went wrong',
      status: false,
    });
  }
};

export const productControlers = {
  allProducts,
  singleData,
  postProduct,
  updateProduct,
  deleteSingleProduct,
};
