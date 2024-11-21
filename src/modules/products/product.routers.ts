import { Request, Response, Router } from 'express';
import { productControlers } from './product.controlers';

const productRouter = Router();

// getallProduct Route
productRouter.get('/products', productControlers.allProducts);

// get a single product Route
productRouter.get('/products/:productId', productControlers.singleData);

// post product  route
productRouter.post('/products', productControlers.postProduct);

// update product  route BY ID
productRouter.put('/products/:productId', productControlers.updateProduct);

// delete  product  route BY ID
productRouter.delete(
  '/products/:productId',
  productControlers.deleteSingleProduct,
);

export default productRouter;
