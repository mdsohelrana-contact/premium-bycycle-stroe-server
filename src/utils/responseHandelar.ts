import { Response } from 'express';

interface IMeta {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
}

interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message?: string;
  meta?: IMeta;
  data: T | null;
}

// Define responseHandelar for global respose
const responseHandelar = <T>(res: Response, data: IResponse<T>) => {
  res.status(data.statusCode).json({
    success: data.success,
    message: data.message,
    meta: data.meta,
    data: data.data,
  });
};

export default responseHandelar;
