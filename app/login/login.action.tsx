"use server";

import { db } from "@/config/db";
import { users } from "@/drizzle/schema";
import { eq, or } from "drizzle-orm";
import argon2 from "argon2";
import { loginSchema, loginUserData } from "@/auth/auth.schema";
import { create } from "domain";
import { createSessionSetCookies } from "@/auth/server/use-cases/sessions";

export const loginAction = async (data: loginUserData) => {
  // Implement login logic here, e.g., verify user credentials against the database
  try {
    const { data: validatedData, error } = loginSchema.safeParse(data);
    if (error) {
      return { status: "error", message: error.issues[0].message };
    }

    const { userName, password } = validatedData;
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.userName, userName));
    if (!user) {
      return { status: "error", message: "Invalid username or password" };
    }
    const isPasswordValid = await argon2.verify(user.password, password);
    await createSessionSetCookies(user.id);

    if (!isPasswordValid) {
      return { status: "error", message: "Invalid username or password" };
    }
    return { status: "success", message: "Login successful" };
  } catch (error) {
    console.error("Login error:", error);
    return { status: "error", message: "unknown error occurred" };
  }
};
