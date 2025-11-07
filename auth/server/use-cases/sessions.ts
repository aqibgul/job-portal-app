import crypto from "crypto";
import { get } from "http";
import Head from "next/head";
import { headers } from "next/headers";
import { getUserIpAddress } from "./location";
import { db } from "@/config/db";
import { sessions } from "@/drizzle/schema";

type SessionData = {
  userAgent: string;
  ip: string;
  userId: number;
  token: string;
};
const generateSessionToken = () => {
  return crypto.randomBytes(16).toString("hex").normalize();
};

const createUserSession = async ({
  token,
  userId,

  userAgent,
  ip,
}: SessionData) => {
  const hashedToken = crypto.createHash("sha-256").update(token).digest("hex");
  const [session] = await db.insert(sessions).values({
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

export const createSessionSetCookies = async (userId: number) => {
  const token = generateSessionToken();
  const ip = await getUserIpAddress();
  const headersList = await headers();
  await createUserSession({
    token: token,
    userId: userId,
    userAgent: headersList.get("user-agent") || "",
    ip: ip,
  }); // Create session in DB to make sure to store session info in db
};
