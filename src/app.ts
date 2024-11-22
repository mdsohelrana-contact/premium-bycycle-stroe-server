import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import productRouter from './modules/products/product.routers';
import orderRouter from './modules/orders/order.routers';

const app: Application = express();

app.use(cors());
app.use(express.json());

// Define Product ROUTE
app.use('/api', productRouter);

// Define Product Order ROUTE
app.use('/api', orderRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// //! Define error interface
interface IError extends Error {
  status: number;
  name: string;
  stack: string;
  errors: object;
}
// //! global error handaling midlleware
app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
  // I understand this better than TypeScript.
  const error = err as IError;

  res.status(error.status || 500).json({
    message: 'Validation failed',
    success: false,
    error: {
      name: error.name,
      errors: error.errors,
    },
    stack: error.stack || 'Something went wrong',
  });

  next();
});

export default app;
