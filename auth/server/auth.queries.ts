import { cache } from "react";
import { cookies } from "next/headers";
import { validateSessionAndGetUserId } from "@/auth/server/use-cases/sessions";

export const getCurrentUser = cache(async () => {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("session_token")?.value;
  if (!sessionToken) {
    return null;
  }

  const user = await validateSessionAndGetUserId(sessionToken);
  return user;
});
