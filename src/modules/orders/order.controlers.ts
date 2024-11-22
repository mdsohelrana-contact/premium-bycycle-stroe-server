import { NextFunction, Request, Response } from 'express';
import { IOrder } from './order.interface';
import { orderServices } from './order.services';

// postOrder Data
const postOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orderData: IOrder = req.body;

    // Create order (inventory updates handled by pre-save hook)
    const result = await orderServices.postOrderData(orderData);

    res.status(201).json({
      message: 'Order created successfully',
      status: true,
      data: result,
    });
  } catch (error) {
    // next is global error handaling method
    next(error);
  }
};

// calculate Revenew
const totalRevenue = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await orderServices.getTotalRevenew();

    res.status(200).json({
      message: 'Revenue calculated successfully',
      status: true,
      data: result,
    });
  } catch (error) {
    // next is global error handaling method
    next(error);
  }
};

export const orderControlers = {
  totalRevenue,
  postOrder,
};
