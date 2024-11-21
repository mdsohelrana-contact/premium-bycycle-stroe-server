import { Request, Response } from 'express';
import { productServices } from './product.services';

const postProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
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

export const productControlers = {
  postProduct,
};
