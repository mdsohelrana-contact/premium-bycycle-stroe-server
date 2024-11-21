import { Request, Response, Router } from 'express';
import { productControlers } from './product.controlers';

const productRouter = Router();

productRouter.post('/products', productControlers.postProduct);

export default productRouter;
