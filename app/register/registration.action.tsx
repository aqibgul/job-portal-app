"use server";
import { db } from "@/config/db";
import { users } from "@/drizzle/schema";
import argon2 from "argon2";
import { eq, or } from "drizzle-orm";
import { toast } from "sonner";

export const registrationAction = async (data: {
  name: string;
  userName: string;
  Email: string;
  userType: "applicant" | "employee";
  password: string;
  confirmPassword: string;
}) => {
  try {
    const { name, userName, Email, userType, password, confirmPassword } = data;
    const [existingUser] = await db
      .select()
      .from(users)
      .where(or(eq(users.email, Email), eq(users.userName, userName)));
    if (existingUser) {
      if (existingUser.email === Email) {
        return { status: "error", message: "Email already in use" };
      } else {
        return { status: "error", message: "Username already in use" };
      }
    }

    const hashedPassword = await argon2.hash(password);
    const hashedConfirmPassword = await argon2.hash(confirmPassword);

    await db.insert(users).values({
      name: name,
      userName: userName,
      email: Email,
      userType: userType,
      password: hashedPassword,
      confirmPassword: hashedConfirmPassword,

      phoneNumber: "0000000000",
    });

    return { status: "success", message: "User registered successfully" };
  } catch (error) {
    return { status: "error", message: "Registration fail" };
  }
};
