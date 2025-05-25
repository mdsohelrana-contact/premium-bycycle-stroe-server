import { startOfMonth, endOfMonth, subMonths, format } from 'date-fns';
import { OrderModel } from '../orders/order.interface';
import { BicycleModel } from '../products/product.interface';
import { User } from '../users/user.model';
import { checkUserRole } from '../../utils/checkUserRole';

const getDashboardData = async (user: any) => {
  await checkUserRole(user.userEmail, ['admin']);

  const totalProducts = await BicycleModel.countDocuments();
  const totalUsers = await User.countDocuments();
  const totalOrders = await OrderModel.countDocuments();

  // Dates
  const now = new Date();
  const startOfCurrentMonth = startOfMonth(now);
  const endOfCurrentMonth = endOfMonth(now);
  const startOfLastMonth = startOfMonth(subMonths(now, 1));
  const endOfLastMonth = endOfMonth(subMonths(now, 1));

  // Revenue aggregation
  const revenueAgg = await OrderModel.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalPrice' },
      },
    },
  ]);
  const totalRevenue = revenueAgg[0]?.totalRevenue || 0;

  //   Current month revenue aggregation
  const currentMonthRevenue = await OrderModel.aggregate([
    {
      $match: {
        createdAt: { $gte: startOfCurrentMonth, $lte: endOfCurrentMonth },
      },
    },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalPrice' },
      },
    },
  ]);

  const currentMonthTotalRevenue = currentMonthRevenue[0]?.totalRevenue || 0;

  //   Last month revenue aggregation
  const lastMonthRevenue = await OrderModel.aggregate([
    {
      $match: {
        createdAt: {
          $gte: startOfLastMonth,
          $lt: endOfLastMonth,
        },
      },
    },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalPrice' },
      },
    },
  ]);

  const lastMonthTotalRevenue = lastMonthRevenue[0]?.totalRevenue || 0;

  const revenueGrowth =
    lastMonthTotalRevenue > 0
      ? (
          ((currentMonthTotalRevenue - lastMonthTotalRevenue) /
            lastMonthTotalRevenue) *
          100
        ).toFixed(1)
      : currentMonthTotalRevenue > 0
        ? '100.0'
        : '0.0';

  // Top 5 selling products
  const topSellingProducts = await OrderModel.aggregate([
    { $unwind: '$products' },
    {
      $group: {
        _id: '$products.product',
        totalSold: { $sum: '$products.quantity' },
      },
    },
    { $sort: { totalSold: -1 } },
    { $limit: 5 },
    {
      $lookup: {
        from: 'bicycles',
        localField: '_id',
        foreignField: '_id',
        as: 'productDetails',
      },
    },
    { $unwind: '$productDetails' },
    {
      $project: {
        _id: 0,
        productId: '$_id',
        totalSold: 1,
        totalSaleAmount: {
          $multiply: ['$totalSold', '$productDetails.price'],
        },
        name: '$productDetails.name',
        image: '$productDetails.image',
        price: '$productDetails.price',
      },
    },
  ]);

  // Total stock count
  const totalStockAgg = await BicycleModel.aggregate([
    {
      $group: {
        _id: null,
        totalStock: { $sum: '$basicInfo.quantity' },
      },
    },
  ]);
  const totalStock = totalStockAgg[0]?.totalStock || 0;

  return {
    totalProducts,
    totalUsers,
    totalOrders,
    totalRevenue,
    revenueGrowthText: `${Number(revenueGrowth) >= 0 ? '+' : '-'}${revenueGrowth}% from last month`,
    totalStock,
    topSellingProducts,
  };
};

const salesDataForChart = async (user: any) => {
  await checkUserRole(user.userEmail, ['admin']);

  const now = new Date();
  const startOfCurrentMonth = startOfMonth(now);
  const endOfCurrentMonth = endOfMonth(now);

  // orders by day
  const dailySalesData = await OrderModel.aggregate([
    {
      $match: {
        createdAt: {
          $gte: startOfCurrentMonth,
          $lte: endOfCurrentMonth,
        },
      },
    },
    {
      $group: {
        _id: {
          $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
        },
        revenue: { $sum: '$totalPrice' },
        orders: { $sum: 1 },
        customers: { $addToSet: '$userId' },
      },
    },
    {
      $project: {
        date: '$_id',
        revenue: 1,
        orders: 1,
        customers: { $size: '$customers' },
        _id: 0,
      },
    },
    { $sort: { date: 1 } },
  ]);

  const daysInMonth = [];
  for (
    let d = startOfCurrentMonth;
    d <= endOfCurrentMonth;
    d.setDate(d.getDate() + 1)
  ) {
    daysInMonth.push(format(new Date(d), 'yyyy-MM-dd'));
  }

  // Fill missing days with zeros
  const dailyRevenueData = daysInMonth.map((date) => {
    const found = dailySalesData.find((item) => item.date === date);
    return found || { date, revenue: 0, orders: 0, customers: 0 };
  });

  // Aggregate total sales quantity by category
  const salesByCategory = await OrderModel.aggregate([
    { $unwind: '$products' },
    {
      $lookup: {
        from: 'bicycles',
        localField: 'products.product',
        foreignField: '_id',
        as: 'productDetails',
      },
    },
    { $unwind: '$productDetails' },
    { $match: { 'productDetails.basicInfo.category': { $ne: null } } },
    {
      $group: {
      _id: '$productDetails.basicInfo.category',  // Use nested path here
      value: { $sum: '$products.quantity' },
    },
    },
    {
      $project: {
        _id: 0,
        name: '$_id',
        value: 1,
      },
    },
    { $sort: { value: -1 } },
  ]);

  return {
    dailyRevenueData,
    salesByCategory,
  };
};

export const dashboardService = {
  getDashboardData,
  salesDataForChart,
};
