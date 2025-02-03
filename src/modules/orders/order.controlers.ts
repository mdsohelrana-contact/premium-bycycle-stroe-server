import { orderServices } from './order.services';
import responseHandelar from '../../utils/responseHandelar';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';

// postOrder Data
const postOrder = catchAsync(async (req, res) => {
  const result = await orderServices.postOrderData(req.body, req.ip!);

  responseHandelar(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Order created successful.',
    data: result,
  });
});

// calculate Revenew
const totalRevenue = catchAsync(async (req, res) => {
  const result = await orderServices.getTotalRevenew();

  responseHandelar(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Revenue calculated successfully',
    data: result,
  });
});

const getOrder = catchAsync(async (req, res) => {
  const { userId } = req.params;

  const result = await orderServices.getOrderByUserId(userId, req.query);

  responseHandelar(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Order retrived successfully',
    meta: result.meta,
    data: {
      totalCost: result.totalCost,
      allOrders: result.result,
    },
  });
});

// update orderintent
const updateOrderStatus = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const result = await orderServices.updateOrderStatus(status, id);

  if (!result) {
    responseHandelar(res, {
      statusCode: StatusCodes.NOT_FOUND,
      success: false,
      message: 'Order not found!',
      data: null,
    });
  }

  responseHandelar(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Order status updated successfully.',
    data: result,
  });
});

const verifyPayment = catchAsync(async (req, res) => {
  const result = await orderServices.verifyPayment(
    req.query.order_id as string,
  );

  console.log(result);

  responseHandelar(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Order verified successfully',
    data: result,
  });
});

export const orderControlers = {
  totalRevenue,
  postOrder,
  getOrder,
  verifyPayment,
  updateOrderStatus,
};
