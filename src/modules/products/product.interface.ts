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
  description: string;
  quantity: number;
  inStock: boolean;
}

// Define Bycicle schema
export const bicicleSchema = new Schema<IBicycle>(
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
    description: {
      type: String,
      required: [true, 'The description is required.'],
    },
    quantity: {
      type: Number,
      required: [true, 'The quantity is required.'],
      min: [0, 'The quantity cannot be negative, got {VALUE}'],
    },
    inStock: {
      type: Boolean,
      required: [true, 'The inStock status is required.'],
    },
  },
  { timestamps: true, versionKey: false },
);

// Define Bicle Model (as a collection)
export const BicycleModel = model<IBicycle>('Bycicle', bicicleSchema);
