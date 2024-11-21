import express, { Application } from 'express';
import cors from 'cors';
import productRouter from './modules/products/product.routers';

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use('/api', productRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;
