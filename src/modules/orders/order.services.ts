import { IOrder, OrderModel } from './order.interface';

// Define getTotalRevenew service
const getTotalRevenew = async () => {
  const totalPrice = await OrderModel.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: {
          $sum: '$totalPrice',
        },
      },
    },
    {
      $project: {
        _id: 0,
        totalRevenue: 1,
      },
    },
  ]);

  return totalPrice[0];
};

// Define postOrderData  service
const postOrderData = async (orderInfo: IOrder) => {
  const savedOrderData = await OrderModel.create(orderInfo);
  return savedOrderData;
};

export const orderServices = {
  getTotalRevenew,
  postOrderData,
};
