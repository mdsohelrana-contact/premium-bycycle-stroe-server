import express, { Application } from 'express';
import cors from 'cors';
import productRouter from './modules/products/product.routers';
import orderRouter from './modules/orders/order.routers';
import notFound from './middlewares/notFound';
import globalErrorHandlar from './middlewares/globalErrorHandelar';
import userRoutes from './modules/users/user.routes';
import authRouter from './modules/auth/auth.routes';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }),
);

// Define Product ROUTE
app.use('/api', productRouter);

// Define Product Order ROUTE
app.use('/api', orderRouter);

// Define User Routes
app.use('/api', userRoutes);

// Define auth routes
app.use('/api', authRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// //! global error handaling midlleware
app.use(globalErrorHandlar);

app.use(notFound);

export default app;
