import { NextFunction, Request, Response } from 'express';
import { productServices } from './product.services';
import { IBicycle } from './product.interface';

// allProducts use productServices.postProductData
const allProducts = async (req: Request, res: Response, next: NextFunction) => {
  // i understant this tnan typescript hahahaha
  const searchTerm = req.query.searchTerm as string;

  try {
    const result = await productServices.getAllProducts(searchTerm);

    if (result.length === 0) {
      res.status(404).json({
        message: 'No bicycles found',
        status: false,
        data: [],
      });
    }

    res.status(200).json({
      message: 'Bicycles retrieved successfully',
      status: true,
      data: result,
    });
  } catch (error) {
    // next is global error handaling method
    next(error);
  }
};

// getSingleProduct data
const singleData = async (req: Request, res: Response, next: NextFunction) => {
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
  } catch (error) {
    // next is global error handaling method
    next(error);
  }
};

// postProduct Data use productServices.postProductData
const postProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productData: IBicycle = req.body;
    const result = await productServices.postProductData(productData);

    res.status(200).json({
      message: 'Bicycle created successfully',
      success: true,
      data: result,
    });
  } catch (error) {
    // next is global error handaling method
    next(error);
  }
};

// updateProduct
const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { productId } = req.params;
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
  } catch (error) {
    // next is global error handaling method
    next(error);
  }
};

// deleteSingleProduct By ID
const deleteSingleProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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
  } catch (error) {
    // next is global error handaling method
    next(error);
  }
};

export const productControlers = {
  allProducts,
  singleData,
  postProduct,
  updateProduct,
  deleteSingleProduct,
};
