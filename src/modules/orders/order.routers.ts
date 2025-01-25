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

orderRouter.get('/verify', orderControlers.verifyPayment);

// create total revenew  Router
orderRouter.get('/orders/revenue', orderControlers.totalRevenue);

orderRouter.get('/orders/:userId', orderControlers.getOrder);

export default orderRouter;
