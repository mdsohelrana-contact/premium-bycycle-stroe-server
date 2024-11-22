import { Router } from 'express';
import { orderControlers } from './order.controlers';

const orderRouter = Router();

// create new order Router
orderRouter.post('/orders', orderControlers.postOrder);

// create total revenew  Router
orderRouter.get('/orders/revenue', orderControlers.totalRevenue);

export default orderRouter;
