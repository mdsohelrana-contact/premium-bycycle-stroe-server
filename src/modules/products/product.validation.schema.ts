import { z } from 'zod';
import { BicycleType } from './product.interface';

const StatusEnum = z.enum(['active', 'draft', 'archived']);

const SpecificationsSchema = z.record(z.string());

const BicycleCategorySchema = z.enum([
  BicycleType.Mountain,
  BicycleType.Road,
  BicycleType.Hybrid,
  BicycleType.BMX,
  BicycleType.Electric,
]);

const BasicInfoSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.number().positive('Price must be a positive number'),
  brand: z.string().min(1, 'Brand is required'),
  quantity: z
    .number()
    .int()
    .nonnegative('Quantity must be a non-negative integer'),
  sku: z.string().optional(),
  category: BicycleCategorySchema,
  tags: z.array(z.string()),
  featured: z.boolean(),
  status: StatusEnum,
});

const productValidationSchema = z.object({
  body: z.object({
    id: z.string().optional(),
    basicInfo: BasicInfoSchema,
    images: z.array(z.string().url('Invalid image URL')),
    specifications: SpecificationsSchema,
    inStock: z.boolean().default(true).optional(),
    isDeleted: z.boolean().default(false).optional(),
  }),
});

// update product validation schema
const BasicInfoUpdateSchema = z.object({
  name: z.string().min(1, 'Name is required').optional(),
  description: z.string().min(1, 'Description is required').optional(),
  price: z.number().positive('Price must be a positive number').optional(),
  quantity: z
    .number()
    .int()
    .nonnegative('Quantity must be a non-negative integer')
    .optional(),
  sku: z.string().optional(),
  category: BicycleCategorySchema.optional(),
  tags: z.array(z.string()).optional(),
  featured: z.boolean().optional(),
  status: StatusEnum.optional(),
});

const updateProductValidationSchema = z.object({
  body: z.object({
    basicInfo: BasicInfoUpdateSchema,
    images: z.array(z.string().url('Invalid image URL')).optional(),
    specifications: SpecificationsSchema.optional(),
    inStock: z.boolean().default(true).optional(),
    isDeleted: z.boolean().default(false).optional(),
    createdBy: z.string().optional(),
    updatedBy: z.string().optional(),
  }),
});

export const productValidation = {
  productValidationSchema,
  updateProductValidationSchema,
};
