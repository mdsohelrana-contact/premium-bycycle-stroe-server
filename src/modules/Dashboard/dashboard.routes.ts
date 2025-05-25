import express from 'express';
import { dashboardController } from './dashboard.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get('/dashboard', auth('admin'), dashboardController.getDashboardStats );

router.get('/dashboard/chart', auth('admin'), dashboardController.getSalesChartData );

export  const dashboardRoutes = router;
