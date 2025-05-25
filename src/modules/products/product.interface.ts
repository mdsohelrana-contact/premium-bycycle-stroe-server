import { Schema, model } from 'mongoose';

// CYCLE TYPE ENUM
export enum BicycleType {
  Mountain = 'Mountain',
  Road = 'Road',
  Hybrid = 'Hybrid',
  BMX = 'BMX',
  Electric = 'Electric',
}

// Interface matching the new Zod structure
export interface IBicycle {
  id?: string;
  basicInfo: {
    name: string;
    description: string;
    price: number;
    quantity: number;
    brand?: string; // Optional field for brand
    sku?: string;
    category: BicycleType;
    tags: string[];
    featured: boolean;
    status: 'active' | 'draft' | 'archived';
  };
  images: string[];
  specifications: Record<string, string>;
  inStock?: boolean;
  isDeleted?: boolean;
  createdBy?: string; 
  updatedBy?: string; 
}

// Bicycle Schema
const BasicInfoSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'The bicycle name is required.'],
      minlength: [1, 'The bicycle name must have at least 1 character.'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'The description is required.'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'The price of the bicycle is required.'],
      min: [0, 'Price must be a positive number, got {VALUE}'],
    },
    brand: {
      type: String,
      required: false, 
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, 'The quantity is required.'],
      min: [0, 'The quantity cannot be negative, got {VALUE}'],
    },
    sku: {
      type: String,
      required: false,
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'The category is required.'],
      enum: Object.values(BicycleType),
    },
    tags: {
      type: [String],
      required: [true, 'At least one tag is required.'],
    },
    featured: {
      type: Boolean,
      required: [true, 'Featured flag is required.'],
    },
    status: {
      type: String,
      required: [true, 'Status is required.'],
      enum: ['active', 'draft', 'archived'],
    },
  },
  { _id: false },
);

const bicycleSchema = new Schema<IBicycle>(
  {
    basicInfo: {
      type: BasicInfoSchema,
      required: true,
    },
    images: {
      type: [String],
      required: true,
      validate: {
        validator: function (urls: string[]) {
          return urls.every((url) =>
            /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/.test(url),
          );
        },
        message: 'One or more image URLs are invalid.',
      },
    },
    specifications: {
      type: Map,
      of: String,
      required: true,
      default: {},
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: String,
      required: false, 
      default: null,
    },
    updatedBy: {
      type: String,
      required: false, 
      default: null,
    },
  },
  { timestamps: true, versionKey: false },
);

// Define Bicycle Model (as a collection)
export const BicycleModel = model<IBicycle>('Bicycle', bicycleSchema);
