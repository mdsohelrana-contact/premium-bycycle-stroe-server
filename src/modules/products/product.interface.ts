import { Schema, model } from 'mongoose';

// CYCLE TYPE ENUM
export enum Bicycletype {
  Mountain = 'Mountain',
  Road = 'Road',
  Hybrid = 'Hybrid',
  BMX = 'BMX',
  Electric = 'Electric',
}

// Define bycicle interface
export interface IBicycle {
  name: string;
  brand: string;
  price: number;
  type: Bicycletype;
  imageUrl: string;
  description: string;
  quantity: number;
  rating: number;
  inStock: boolean;
}

// Define Bycicle schema
export const bicycleSchema = new Schema<IBicycle>(
  {
    name: {
      type: String,
      required: [true, 'The bicycle name is required.'],
      minlength: [1, 'The bicycle name must have at least 1 character.'],
      trim: true,
    },
    brand: {
      type: String,
      required: [true, 'The bicycle brand is required.'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'The price of the bicycle is required.'],
      min: [0, 'Price must be a positive number, got {VALUE}'],
    },
    type: {
      type: String,
      required: [true, 'The type of the bicycle is required.'],
      enum: Object.values(Bicycletype),
      message: '{VALUE} is not supported',
    },
    imageUrl: {
      type: String,
      required: [true, 'The image URL is required.'],
      validate: {
        validator: function (v: string) {
          return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/.test(v);
        },
        message: 'Invalid image URL format.',
      },
    },
    description: {
      type: String,
      required: [true, 'The description is required.'],
    },
    quantity: {
      type: Number,
      required: [true, 'The quantity is required.'],
      min: [0, 'The quantity cannot be negative, got {VALUE}'],
    },
    rating: {
      type: Number,
      required: [true, 'The quantity is required.'],
      min: [0, 'The quantity cannot be negative, got {VALUE}'],
      max: [5, 'The rating cannot be greater than 5, got {VALUE}.'],
    },
    inStock: {
      type: Boolean,
      required: [true, 'The inStock status is required.'],
    },
  },
  { timestamps: true, versionKey: false },
);

// Define Bicle Model (as a collection)
export const BicycleModel = model<IBicycle>('Bicycle', bicycleSchema);
