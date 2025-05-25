import { Document, model, Schema, Types } from 'mongoose';
import { BicycleModel } from '../products/product.interface';

// Define order interface
export interface IOrder extends Document {
  userId: { type: Types.ObjectId; ref: 'User'; required: true };
  products: {
    product: { type: Types.ObjectId; ref: 'Bicycle'; required: true };
    quantity: number;
  }[];
  totalPrice: number;
  orderIntent: 'Confirm' | 'Reject' | 'Delivered' | 'Pending';
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
    orderIntent: {
      type: String,
      enum: ['Confirm', 'Reject', 'Delivered', 'Pending'],
      default: 'Pending',
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
      if (bicycle.basicInfo.quantity < quantity) {
        return next(
          new Error(
            `Insufficient stock for product: ${bicycle.basicInfo.name}. Available: ${bicycle.basicInfo.quantity}, requested: ${quantity}.`,
          ),
        );
      }

      // calculatePrice
      totalPrice += bicycle.basicInfo.price * quantity;

      // Update the product quantity
      bicycle.basicInfo.quantity -= quantity;

      // Update the inStock
      if (bicycle.basicInfo.quantity === 0) {
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
