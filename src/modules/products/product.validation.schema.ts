import { z } from 'zod';
import { Bicycletype } from './product.interface';

const BicycletypeSchema = z.enum([
  Bicycletype.Mountain,
  Bicycletype.Road,
  Bicycletype.Hybrid,
  Bicycletype.BMX,
  Bicycletype.Electric,
]);

const productValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    brand: z.string().min(1, 'Brand is required'),
    price: z.number().positive('Price must be a positive number'),
    type: BicycletypeSchema,
    imageUrl: z.string().url('Invalid image URL'),
    description: z.string().min(1, 'Description is required'),
    quantity: z
      .number()
      .int()
      .nonnegative('Quantity must be a non-negative integer'),
    rating: z.number().default(0),
    inStock: z.boolean().optional().default(true),
  }),
});

const updateProductValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    brand: z.string().optional(),
    price: z.number().optional(),
    type: BicycletypeSchema.optional(),
    imageUrl: z.string().url('Invalid image URL').optional(),
    description: z.string().min(1, 'Description is required').optional(),
    quantity: z
      .number()
      .int()
      .nonnegative('Quantity must be a non-negative integer')
      .optional(),
    rating: z.number().default(0).optional(),
    inStock: z.boolean().optional(),
  }),
});

export const productValidation = {
  productValidationSchema,
  updateProductValidationSchema,
};
