import { IOrder, OrderModel } from './order.interface';

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
              from: 'bycicles',
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
              productName: '$productDetails.name',
              brand: '$productDetails.brand',
              quantity: '$productDetails.quantity',
              price: '$productDetails.price',
              productID: '$productDetails._id',
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

// Define postOrderData  service
const postOrderData = async (orderInfo: IOrder) => {
  const savedOrderData = await OrderModel.create(orderInfo);
  return savedOrderData;
};

export const orderServices = {
  getTotalRevenew,
  postOrderData,
};
