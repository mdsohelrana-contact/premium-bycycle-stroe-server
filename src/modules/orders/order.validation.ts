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
    orderIntent: z
      .enum(['Confirm', 'Reject', 'Delivered', 'Pending'])
      .default('Pending'),
    address: z.object({
      city: z.string().min(1, 'City is required'),
      country: z.string().min(1, 'Country is required'),
    }),
    phoneNumber: z
      .string()
      .min(10, 'Phone number should be at least 10 digits'),
    transactionInfo: z
      .object({
        transactionId: z.string().optional(),
        paymentMethod: z.string().optional(),
        paymentStatus: z
          .enum(['Pending', 'Paid', 'Failed', 'Cancel'])
          .optional(),
        paymentDate: z.date().optional(),
      })
      .optional(),
  }),
});

export const orderValidation = {
  orderValidationSchema,
};
