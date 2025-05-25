import { Router } from 'express';
import { productControlers } from './product.controlers';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validatedRequest';
import { productValidation } from './product.validation.schema';

const productRouter = Router();

// getallProduct Route
productRouter.get('/products', productControlers.allProducts);

// post product  route
productRouter.post(
  '/products',
  auth('admin'),
  validateRequest(productValidation.productValidationSchema),
  productControlers.postProduct,
);

// update product  route BY ID
productRouter.patch(
  '/products/:productId',
  auth('admin'),
  // validateRequest(productValidation.updateProductValidationSchema),
  productControlers.updateProduct,
);

// delete  product  route BY ID
productRouter.delete(
  '/products/:productId',
  auth('admin'),
  productControlers.deleteSingleProduct,
);

// soft delete  product  route BY ID
productRouter.patch(
  '/products/soft-delete/:productId',
  auth('admin'),
  productControlers.softDeleteSingleProduct,
);

// get a single product Route
productRouter.get('/products/:productId', productControlers.singleData);

export default productRouter;
