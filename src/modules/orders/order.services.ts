import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { IOrder, OrderModel } from './order.interface';
import { User } from '../users/user.model';
import { orderUtils } from './order.utils';
import QueryBuilder from '../../queryBuilder/QueryBuilder';

// Define getTotalRevenew service
const getTotalRevenew = async () => {
  const result = await OrderModel.aggregate([
    {
      $unwind: '$products',
    },
    {
      $facet: {
        totalRevenue: [
          {
            $group: {
              _id: null,
              totalRevenue: {
                $sum: '$totalPrice',
              },
            },
          },

          {
            $project: { _id: 0, totalRevenue: 1 },
          },
        ],

        topSellingProducts: [
          {
            $group: {
              _id: '$products.product',
              totalSold: {
                $sum: '$products.quantity',
              },
            },
          },

          {
            $sort: { totalSold: -1 },
          },

          {
            $limit: 5,
          },

          {
            $lookup: {
              from: 'bicycles',
              localField: '_id',
              foreignField: '_id',
              as: 'productDetails',
            },
          },

          {
            $unwind: '$productDetails',
          },

          {
            $project: {
              _id: 0,
              totalSold: 1,
              totalSaleAmount: {
                $multiply: ['$totalSold', '$productDetails.price'],
              },
              product: '$productDetails',
            },
          },
        ],
      },
    },

    {
      $project: {
        totalRevenue: { $arrayElemAt: ['$totalRevenue.totalRevenue', 0] },
        topSellingProducts: 1,
      },
    },
  ]);

  // Check if data is available
  if (result.length > 0) {
    return {
      totalRevenue: result[0].totalRevenue || 0,
      topSellingProducts: result[0].topSellingProducts,
    };
  }

  return {
    totalRevenue: 0,
    topSellingProducts: [],
  };
};

// all orders
const getAllOrders = async (query: Record<string, unknown>) => {
  const orderQuery = new QueryBuilder(OrderModel.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await orderQuery.countTotal();
  const result = await orderQuery.modelQuery.populate('products.product');

  if (result?.length === 0) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Order unavailable');
  }

  return {
    meta,
    result,
  };
};

// Define postOrderData  service
const postOrderData = async (orderInfo: IOrder, client_ip: string) => {
  const user = await User.findById(orderInfo.userId);

  // check user is exist
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found!!.');
  }

  // check user is deactivated
  if (!user?.isActive) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'User is deactivated !');
  }

  let savedOrderData = await OrderModel.create(orderInfo);

  // payment integration
  const shurjopayPayload = {
    amount: savedOrderData.totalPrice,
    order_id: savedOrderData._id,
    currency: 'BDT',
    customer_name: user.name,
    customer_address: `${orderInfo.address.city},${orderInfo.address.country}`,
    customer_email: user.email,
    customer_phone: orderInfo.phoneNumber,
    customer_city: orderInfo.address.city,
    client_ip,
  };

  const payment = await orderUtils.makePaymentAsync(shurjopayPayload);

  if (payment?.transactionStatus) {
    savedOrderData = await savedOrderData.updateOne(
      {
        transactionInfo: {
          transactionId: payment.sp_order_id,
          paymentStatus: payment.transactionStatus,
        },
      },
      { new: true },
    );
  }

  return payment;
};

// get orders
const getOrderByUserId = async (
  userId: string,
  query: Record<string, unknown>,
) => {
  const orderQuery = new QueryBuilder(OrderModel.find(), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await orderQuery.countTotal();
  const result = await orderQuery.modelQuery.populate('products.product');

  if (result?.length === 0) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Order unavailable');
  }

  const totalCost = result
    .map((item) => item.totalPrice)
    .reduce((acc, curr) => acc + curr, 0);

  return {
    meta,
    result,
    // product,
    totalCost,
  };
};

// update order status
const updateOrderConfirm = async (orderId: string) => {
  const result = await OrderModel.findByIdAndUpdate(
    {
      _id: orderId,
    },
    {
      orderIntent: 'Confirmed',
    },
    { new: true },
  );

  return result;
};

// update order status
const updateOrderReject = async (orderId: string) => {
  const result = await OrderModel.findByIdAndUpdate(
    {
      _id: orderId,
    },
    {
      orderIntent: 'Rejected',
    },
    { new: true },
  );

  return result;
};

const verifyPayment = async (order_id: string) => {
  const verifyPayment = await orderUtils.verifyPaymentAsync(order_id);

  if (verifyPayment.length) {
    await OrderModel.findOneAndUpdate(
      {
        'transactionInfo.transactionId': order_id,
      },
      {
        'transactionInfo.paymentMethod': verifyPayment[0].method,

        'transactionInfo.paymentStatus':
          verifyPayment[0].bank_status == 'Success'
            ? 'Paid'
            : verifyPayment[0].bank_status == 'Failed'
              ? 'Pending'
              : verifyPayment[0].bank_status == 'Cancel'
                ? 'Cancelled'
                : '',
        'transactionInfo.paymentDate': verifyPayment[0].date_time,
      },
    );
  }

  return verifyPayment;
};

export const orderServices = {
  getTotalRevenew,
  getAllOrders,
  postOrderData,
  getOrderByUserId,
  verifyPayment,
  updateOrderConfirm,
  updateOrderReject,
};
