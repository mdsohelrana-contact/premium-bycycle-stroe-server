import express, { Application } from 'express';
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

export default app;
