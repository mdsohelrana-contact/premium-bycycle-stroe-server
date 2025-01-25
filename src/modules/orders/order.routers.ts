import { Router } from 'express';
import { orderControlers } from './order.controlers';
import validateRequest from '../../middlewares/validatedRequest';
import { orderValidation } from './order.validation';

const orderRouter = Router();

// create new order Router
orderRouter.post(
  '/orders',
  validateRequest(orderValidation.orderValidationSchema),
  orderControlers.postOrder,
);

// create total revenew  Router
orderRouter.get('/orders/revenue', orderControlers.totalRevenue);

export default orderRouter;
