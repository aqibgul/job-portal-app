import crypto from "crypto";
import { get } from "http";
import Head from "next/head";
import { cookies, headers } from "next/headers";
import { getUserIpAddress } from "./location";
import { db } from "@/config/db";
import { sessions } from "@/drizzle/schema";
import { HeartHandshake } from "lucide-react";
import { eq } from "drizzle-orm";
import { users } from "@/drizzle/schema";

type SessionData = {
  userAgent: string;
  ip: string;
  userId: number;
  token: string;
  tx?: dbClient;
};
const generateSessionToken = () => {
  return crypto.randomBytes(16).toString("hex").normalize();
};

const createUserSession = async ({
  token,
  userId,

  userAgent,
  ip,
  tx = db,
}: SessionData) => {
  const hashedToken = crypto.createHash("sha-256").update(token).digest("hex");
  const [session] = await tx.insert(sessions).values({
    // token,

    id: hashedToken,
    userId: userId,

    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    ip: ip,
    userAgent: userAgent,
    // id: hashedToken,
  });
  return session;
};
type dbClient = typeof db | Parameters<Parameters<typeof db.transaction>[0]>[0];

export const createSessionSetCookies = async (
  userId: number,
  tx: dbClient = db
) => {
  const token = generateSessionToken();
  const ip = await getUserIpAddress();
  const headersList = await headers();
  await createUserSession({
    token: token,
    userId: userId,
    userAgent: headersList.get("user-agent") || "",
    ip: ip,
    tx: tx,
  }); // Create session in DB to make sure to store session info in db

  const cookieStore = await cookies();
  cookieStore.set("session_token", token, {
    // Set cookie
    secure: true,
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
  });
};
export const validateSessionAndGetUserId = async (token: string) => {
  const hashedToken = crypto.createHash("sha-256").update(token).digest("hex");

  const [user] = await db
    .select({
      id: users.id,
      session: {
        id: sessions.id,
        expiresAt: sessions.expiresAt,
        useragent: sessions.userAgent,
        ip: sessions.ip,
      },
      name: users.f_name,
      userName: users.userName,
      userType: users.userType,
      phoneNumber: users.phoneNumber,
      email: users.email,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
    })
    .from(sessions)
    .innerJoin(users, eq(users.id, sessions.userId))
    .where(eq(sessions.id, hashedToken));
  if (!user) {
    return null;
  }

  if (Date.now() > user.session.expiresAt.getTime()) {
    await invalidateSession(user.session.id);

    // Session expired
    return null;
  }
  if (Date.now() > user.session.expiresAt.getTime() - 24 * 60 * 60 * 1000) {
    await db
      .update(sessions)
      .set({
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      })
      .where(eq(sessions.id, user.session.id));
  }

  return user;
};

export const invalidateSession = async (id: string) => {
  await db.delete(sessions).where(eq(sessions.id, id));
};
