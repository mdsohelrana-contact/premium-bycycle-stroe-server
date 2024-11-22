import { Document, model, Schema, Types } from 'mongoose';
import { BicycleModel } from '../products/product.interface';

// Define order interface
export interface IOrder extends Document {
  email: string;
  product: Types.ObjectId;
  quantity: number;
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
    product: {
      type: Schema.Types.ObjectId,
      required: [true, 'Product reference is required'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [1, 'Quantity must be at least 1'],
    },
    totalPrice: {
      type: Number,
      // required: [true, 'Total price is required'],
      // min: [0, 'Total price must be a positive number'],
    },
  },
  { timestamps: true, versionKey: false },
);

// Pre-save hook to validate stock and update inventory
orderSchema.pre('save', async function (next) {
  try {
    // Fetch the product
    const product = await BicycleModel.findById(this.product);
    if (!product) {
      return next(new Error('Product not found'));
    }

    // ! calculatePrice Unuse Support sesion instuctor sister command Date: 11/22/24 11:03 PM
    // if (product.price * this.quantity !== this.totalPrice) {
    //   return next(
    //     new Error(
    //       `Price mismatch: Expected total price is ${product.price * this.quantity}, but received ${this.totalPrice}`,
    //     ),
    //   );
    // }

    // calculatePrice
    this.totalPrice = product.price * this.quantity;

    // enough stock is available
    if (product.quantity < this.quantity) {
      return next(new Error('Insufficient stock available'));
    }

    // Update the product quantity
    product.quantity -= this.quantity;

    // Update the inStock
    if (product.quantity === 0) {
      product.inStock = false;
    }

    await product.save();
    next();
  } catch (error) {
    return error;
  }
});

// Define Order Model
export const OrderModel = model<IOrder>('Order', orderSchema);
