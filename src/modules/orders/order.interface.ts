import { model, Schema, Types } from 'mongoose';

// Define order interface
export interface IOrder {
  email: string;
  product: Types.ObjectId;
  quantity: number;
  totalPrice: number;
}

// simple email validaation
const validateEmail = (email: string) => {
  const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

// Define Order Schema
export const orderSchema = new Schema<IOrder>(
  {
    email: {
      type: String,
      required: [true, 'Email address is required'],
      unique: true,
      validate: [validateEmail, 'Please fill a valid email address'],
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: 'products',
      required: [true, 'Product reference is required'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [1, 'Quantity must be at least 1'],
    },
    totalPrice: {
      type: Number,
      required: [true, 'Total price is required'],
      min: [0, 'Total price must be a positive number'],
    },
  },
  { timestamps: true },
);

// Define Order Model
export const OrderModel = model<IOrder>('Order', orderSchema);
