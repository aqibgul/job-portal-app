"use server";

import { db } from "@/config/db";
import { users } from "@/drizzle/schema";
import { eq, or } from "drizzle-orm";
import argon2 from "argon2";

export const loginAction = async (data: {
  userName: string;
  password: string;
}) => {
  // Implement login logic here, e.g., verify user credentials against the database
  try {
    const { userName, password } = data;
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.userName, userName));
    if (!user) {
      return { status: "error", message: "Invalid username or password" };
    }
    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      return { status: "error", message: "Invalid username or password" };
    }
    return { status: "success", message: "Login successful" };
  } catch (error) {
    return { status: "error", message: "unknown error occurred" };
  }
};
