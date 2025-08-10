import { z } from "zod";

export const SignUpSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email address required!")
      .email("This email address is invalid!"),
    password: z
      .string()
      .min(1, "Password required!")
      .min(8, "Password must be 8 characters or longer!")
      .regex(/[a-z]/, "Please use at least one lowercase letter!")
      .regex(/[A-Z]/, "Please use at least one capital letter!")
      .regex(/\d/, "Please use at least one number!")
      .regex(/[^a-zA-Z0-9]/, "Please use at least one special character!"),
    confirmPassword: z
      .string()
      .min(1, "Confirm Password required!")
      .min(8, "Confirm Password must be 8 characters or longer!")
      .regex(/[a-z]/, "Please use at least one lowercase letter!")
      .regex(/[A-Z]/, "Please use at least one capital letter!")
      .regex(/\d/, "Please use at least one number!")
      .regex(/[^a-zA-Z0-9]/, "Please use at least one special character!"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
