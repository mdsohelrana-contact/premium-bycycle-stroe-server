import { z } from 'zod';

export const loginInfoValidation = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required !' })
      .email('Invalid Email format'),
    password: z.string({ required_error: 'Password is required !' }),
  }),
});
