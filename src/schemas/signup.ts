import { z } from 'zod';

export const signupSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: 'Name is required' })
      .max(50, { message: 'Name must be 50 characters or less' }),

    email: z
      .email({ message: 'Invalid email address' })
      .min(1, { message: 'Email is required' }),

    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters' }),

    confirmPassword: z
      .string()
      .min(1, { message: 'Confirm Password is required' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'], // points the error to confirmPassword field
  });

export type SignupFormData = z.infer<typeof signupSchema>;
