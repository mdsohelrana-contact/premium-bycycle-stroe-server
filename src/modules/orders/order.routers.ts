import { Router } from 'express';
import { orderControlers } from './order.controlers';
import validateRequest from '../../middlewares/validatedRequest';
import { orderValidation } from './order.validation';
import auth from '../../middlewares/auth';

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

orderRouter.get('/all-orders', orderControlers.allOrders);

orderRouter.get('/orders/:userId', orderControlers.getOrder);

orderRouter.put(
  '/order/:id/confirm',
  auth('admin'),
  orderControlers.updateOrderConfirm,
);
orderRouter.put(
  '/order/:id/reject',
  auth('admin'),
  orderControlers.updateOrderReject,
);

export default orderRouter;
