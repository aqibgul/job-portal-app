"use server";
import { registerUserData, registerUserSchema } from "@/auth/auth.schema";
import { createSessionSetCookies } from "@/auth/server/use-cases/sessions";
import { db } from "@/config/db";
import { employers, users } from "@/drizzle/schema";
import argon2 from "argon2";
import { eq, or } from "drizzle-orm";

export const registrationAction = async (data: registerUserData) => {
  try {
    const { data: validatedData, error } = registerUserSchema.safeParse(data);
    if (error) {
      return { status: "error", message: error.issues[0].message };
    }

    const { f_name, userName, email, userType, password, confirmPassword } =
      validatedData;
    const [existingUser] = await db
      .select()
      .from(users)
      .where(or(eq(users.email, email), eq(users.userName, userName)));
    if (existingUser) {
      if (existingUser.email === email) {
        return { status: "error", message: "Email already in use" };
      } else {
        return { status: "error", message: "Username already in use" };
      }
    }

    const hashedPassword = await argon2.hash(password);
    const hashedConfirmPassword = await argon2.hash(confirmPassword);

    await db.transaction(async (tx) => {
      const [result] = await tx.insert(users).values({
        f_name: f_name,
        userName: userName,
        email: email,
        userType: userType,
        password: hashedPassword,
        confirmPassword: hashedConfirmPassword,

        phoneNumber: "0000000000",
      });

      await tx.insert(employers).values({
        id: result.insertId,
      });

      console.log(result);

      await createSessionSetCookies(result.insertId, tx);
    });

    return { status: "success", message: "User registered successfully" };
  } catch (error) {
    console.error("Registration error:", error);
    return { status: "error", message: "Registration fail" };
  }
};
