"use server";
import { db } from "@/config/db";
import { getCurrentUser } from "./auth.queries";
import { employers } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

const organizationTypes = [
  "development",
  "design",
  "marketing",
  "sales",
  "hr",
] as const;
type OrganizationType = (typeof organizationTypes)[number];

const teamSizeTypes = ["20-30", "30-50", "50-100", "100-200", "200+"] as const;
type TeamSizeType = (typeof teamSizeTypes)[number];

interface IFormType {
  companyName: string;
  description: string;
  yearOfEstablishment: string;
  location: string;
  websiteURL?: string;
  organizationType: OrganizationType;
  teamSize: TeamSizeType;
}

export const updateEmployerProfileAction = async (data: IFormType) => {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser || !currentUser.userType == !"employer") {
      return { status: "error", message: "Unauthorized" };
    }
    const {
      companyName,
      description,
      yearOfEstablishment,
      location,
      websiteURL,
      organizationType,
      teamSize,
    } = data;

    const updatedEmployerData = await db
      .update(employers)
      .set({
        name: companyName,
        description: description,
        organizationType: organizationType,
        teamSize: teamSize,
        yearFounded: parseInt(yearOfEstablishment),
        websiteUrl: websiteURL || "",
        location: location,
      })
      .where(eq(employers.id, currentUser.id));
    console.log("Updated Employer Data:", updatedEmployerData);
    return { status: "success", message: "Profile updated successful" };
  } catch (error) {
    console.error("Error updating employer profile:", error);
    return { status: "error", message: "Failed to update profile" };
  }
};
