import { Request, Response } from 'express';
import { IOrder, OrderModel } from './order.interface';

const postOrderData = async (req: Request, res: Response) => {
  try {
    const { email, product, quantity, totalPrice }: IOrder = req.body;
    console.log('product:', product, email, totalPrice, quantity);

    // Create order (inventory updates handled by pre-save hook)
    const newOrder = await OrderModel.create({
      email,
      product,
      quantity,
      totalPrice,
    });
    console.log('newOrder:', newOrder);

    res.status(201).json({
      message: 'Order created successfully',
      status: true,
      data: newOrder,
    });
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : 'An error occurred',
      status: false,
    });
  }
};

export const orderControlers = {
  postOrderData,
};
