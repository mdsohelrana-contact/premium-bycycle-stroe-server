import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { dashboardService } from './dashboard.service';
import { JwtPayload } from 'jsonwebtoken';
import responseHandelar from '../../utils/responseHandelar';
import { StatusCodes } from 'http-status-codes';

// Custom Request Interface

interface CustomRequest extends Request {
  user?: JwtPayload;
}



 const getDashboardStats = catchAsync(async (req: CustomRequest, res: Response) => {
  const user = req.user;
  
  const data = await dashboardService.getDashboardData(user!);

   responseHandelar(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Dashboard statistics fetched successfully',
    data,
  });
});

// sales chart data
const getSalesChartData = catchAsync(async (req: CustomRequest, res: Response) => {
  const user = req.user;

  const data = await dashboardService.salesDataForChart(user!);

  responseHandelar(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Sales chart data fetched successfully',
    data,
  });
});

export const dashboardController = {
  getDashboardStats,
  getSalesChartData,
};
