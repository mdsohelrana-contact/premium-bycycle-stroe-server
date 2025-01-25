import { z } from 'zod';

// Zod schema for validating the products array
const productSchema = z.object({
  product: z.string(),
  quantity: z.number().int().positive(),
});

// Zod schema for validating the IOrder object
const orderValidationSchema = z.object({
  body: z.object({
    userId: z.string({ required_error: 'User is required' }),
    products: z.array(productSchema).min(1),
    totalPrice: z.number().optional(),
    status: z
      .enum(['Pending', 'Paid', 'Completed', 'Cancel', 'Failed'])
      .default('Pending')
      .optional(),
  }),
});

export const orderValidation = {
  orderValidationSchema,
};
