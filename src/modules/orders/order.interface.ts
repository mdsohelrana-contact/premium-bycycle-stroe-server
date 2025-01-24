import { Document, model, Schema, Types } from 'mongoose';
import { BicycleModel } from '../products/product.interface';

// Define order interface
export interface IOrder extends Document {
  email: string;
  products: {
    product: Types.ObjectId;
    quantity: number;
  }[];
  totalPrice: number;
}

// simple email validaation
const validateEmail = (email: string) => {
  const emailSyntax = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return emailSyntax.test(email);
};

// Define Order Schema
export const orderSchema = new Schema<IOrder>(
  {
    email: {
      type: String,
      required: [true, 'Email address is required'],
      validate: [validateEmail, 'Please fill a valid email address'],
    },
    products: [
      new Schema(
        {
          product: {
            type: Schema.Types.ObjectId,
            ref: 'Bycicle',
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
            min: [1, 'Quantity must be at least 1'],
          },
        },
        { _id: false },
      ),
    ],

    totalPrice: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true, versionKey: false },
);

// Pre-save hook to validate stock and update inventory
orderSchema.pre('save', async function (next) {
  try {
    let totalPrice = 0;

    for (const item of this.products) {
      const { quantity, product } = item;

      // Fetch the product
      const bicycle = await BicycleModel.findById(product);

      if (!bicycle) {
        return next(new Error(`Product with ID ${product} not found`));
      }

      // Check if enough stock is available
      if (bicycle.quantity < quantity) {
        return next(
          new Error(
            `Insufficient stock for product: ${bicycle.name}. Available: ${bicycle.quantity}, requested: ${quantity}.`,
          ),
        );
      }

      // calculatePrice
      totalPrice += bicycle.price * quantity;

      // Update the product quantity
      bicycle.quantity -= quantity;

      // Update the inStock
      if (bicycle.quantity === 0) {
        bicycle.inStock = false;
      }

      await bicycle.save();
    }

    // Set total price
    this.totalPrice = totalPrice;

    next();
  } catch (error) {
    return error;
  }
});

// Define Order Model
export const OrderModel = model<IOrder>('Order', orderSchema);
