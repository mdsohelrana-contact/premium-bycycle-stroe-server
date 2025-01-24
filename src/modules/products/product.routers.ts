import { Router } from 'express';
import { productControlers } from './product.controlers';
import auth from '../../middlewares/auth';

const productRouter = Router();

// getallProduct Route
productRouter.get('/products', productControlers.allProducts);

// get a single product Route
productRouter.get('/products/:productId', productControlers.singleData);

// post product  route
productRouter.post(
  '/products',
  auth('customer'),
  productControlers.postProduct,
);

// update product  route BY ID
productRouter.put(
  '/products/:productId',
  auth('customer'),
  productControlers.updateProduct,
);

// delete  product  route BY ID
productRouter.delete(
  '/products/:productId',
  auth('customer'),
  productControlers.deleteSingleProduct,
);

export default productRouter;
