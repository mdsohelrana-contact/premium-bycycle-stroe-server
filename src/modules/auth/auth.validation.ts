import { z } from 'zod';

const loginInfoValidationSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: 'Email is required !' })
      .email('Invalid Email format'),
    password: z.string({ required_error: 'Password is required !' }),
  }),
});

const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: 'Old password is required',
    }),
    newPassword: z.string({ required_error: 'Password is required' }),
  }),
});

export const authValidation = {
  loginInfoValidationSchema,
  changePasswordValidationSchema,
};
