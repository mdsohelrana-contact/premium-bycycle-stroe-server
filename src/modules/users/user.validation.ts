import { z } from 'zod';

const userValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(3, 'Password must be at least 3 characters'),
    role: z.literal('customer').default('customer'),
    isActive: z.boolean().default(true),
  }),
});

export const userValidation = {
  userValidationSchema,
};
