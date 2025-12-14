import { employers } from "@/drizzle/schema";
import { getCurrentUser } from "./auth.queries";
import { db } from "@/config/db";
import { eq } from "drizzle-orm";

export const getCurrentEmployerDetails = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) return null;
  if (currentUser.userType !== "employee") return null;
  const [employerDetails] = await db
    .select()
    .from(employers)
    .where(eq(employers.id, currentUser.id));
  console.log("Employer Details:", employerDetails);

  const isProfileComplete =
    employers.name &&
    employers.description &&
    employers.avatarUrl &&
    employers.location &&
    employers.yearFounded;
  return { ...currentUser, employerDetails, isProfileComplete };
};
