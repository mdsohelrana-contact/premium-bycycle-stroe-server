import { Document, model, Schema, Types } from 'mongoose';
import { BicycleModel } from '../products/product.interface';

// Define order interface
export interface IOrder extends Document {
  userId: Types.ObjectId;
  products: {
    product: Types.ObjectId;
    quantity: number;
  }[];
  totalPrice: number;
  address: {
    city: string;
    country: string;
  };
  phoneNumber: string;
  transactionInfo?: {
    transactionId: string;
    paymentMethod: string;
    paymentStatus: 'Pending' | 'Paid' | 'Failed' | 'Cancel';
    paymentDate?: Date;
  };
}

// Define Order Schema
export const orderSchema = new Schema<IOrder>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    products: [
      new Schema(
        {
          product: {
            type: Schema.Types.ObjectId,
            ref: 'Bicycle',
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
      min: [0, 'Total price cannot be negative'],
    },
    address: {
      city: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    transactionInfo: {
      transactionId: {
        type: String,
        required: false,
      },
      paymentMethod: {
        type: String,
        required: false,
      },
      paymentStatus: {
        type: String,
        enum: ['Pending', 'Paid', 'Failed', 'Cancel'],
        default: 'Pending',
      },
      paymentDate: {
        type: Date,
      },
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
