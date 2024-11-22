import { Router } from 'express';
import { orderControlers } from './order.controlers';

const orderRouter = Router();

orderRouter.post('/orders', orderControlers.postOrderData);

export default orderRouter;
