import { type } from "os";
import z from "zod";
export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const registerUserSchema = z.object({
  name: z
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
  role: z
    .enum(["employee", "applicant"], {
      error: () => ({
        message: "Role must be either 'employee' or 'applicant'",
      }),
    })
    .default("applicant"),
});
export type registerUserData = z.infer<typeof registerUserSchema>;
