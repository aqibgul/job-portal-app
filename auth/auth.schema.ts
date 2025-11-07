import { type } from "os";
import { z } from "zod";
export const loginSchema = z.object({
  userName: z.string().min(3, { message: "Username is required" }),
  // email: z
  //   .string()
  //   .min(1, { message: "Email is required" })
  //   .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});
export type loginUserData = z.infer<typeof loginSchema>;

export const registerUserSchema = z.object({
  id: z.string().optional(),

  f_name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .trim()
    .max(50, { message: "Name must be at most 50 characters long" }),
  userName: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(30, { message: "Username must be at most 30 characters long" })
    .trim()
    .regex(/^[a-zA-Z0-9-_\s]+$/, {
      message:
        "Name can only contain letters, numbers, spaces, hyphens, and underscores",
    }),
  email: z
    .string()
    .max(100, { message: "Email must be at most 100 characters long" })
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: "Invalid email address" })
    .toLowerCase(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(100, { message: "Password must be at most 100 characters long" })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/, {
      message: "Password must contain at least one letter and one number",
    }),
  confirmPassword: z
    .string()
    .min(6, { message: "Confirm Password must be at least 6 characters long" }),
  userType: z
    .enum(["employee", "applicant"], {
      error: "Invalid user type",
    })
    .default("applicant"),
});
export type registerUserData = z.infer<typeof registerUserSchema>;
const registerWithConfirmPasswordSchema = registerUserSchema
  .extend({
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type registerWithConfirmPasswordData = z.infer<
  typeof registerWithConfirmPasswordSchema
>;
export default registerWithConfirmPasswordSchema;
