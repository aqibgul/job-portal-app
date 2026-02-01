import { z } from "zod";

export const organizationTypes = [
  "Startup",
  "Small Business",
  "Medium Enterprise",
  "Large Corporation",
  "Non-Profit",
  "Government Agency",
  "Educational Institution",
  "Healthcare Organization",
  "Technology Company",
  "Retail Company",
  "Manufacturing Company",
  "Financial Services",
  "Consulting Firm",
  "Other",
] as const;
export const teamSizes = [
  "1-10",
  "11-50",
  "51-200",
  "201-500",
  "501-1000",
  "1001-5000",
  "5001-10000",
  "10000+",
] as const;

export const employerSchema = z.object({
  name: z
    .string()
    .trim()
    .min(5, "Name must be at least 2 characters long")
    .max(200, "Name must be at most 100 characters long"),
  description: z
    .string()
    .trim()
    .min(20, "Description must be at least 20 characters long")
    .max(1000, "Description must be at most 1000 characters long"),
  organizationType: z.enum(organizationTypes, {
    error: "Please select a valid organization type",
  }),
  teamSize: z.enum(teamSizes, {
    error: "Please select a valid team size",
  }),
  yearFounded: z.string().refine((val) => {
    const year = parseInt(val, 10);
    const currentYear = new Date().getFullYear();
    return year >= 1800 && year <= currentYear;
  }),

  location: z
    .string()
    .trim()
    .min(5, "Location must be at least 5 characters long")
    .max(100, "Location must be at most 100 characters long"),
  websiteUrl: z
    .string()
    .url("Please enter a valid URL e.g.https://example.com")
    .optional()
    .or(z.literal("")),
  avatarUrl: z
    .string()
    .url("Please enter a valid URL for avatar")
    .optional()
    .or(z.literal("")),
  bannerUrl: z
    .string()
    .url("Please enter a valid URL for banner")
    .optional()
    .or(z.literal("")),
});
export type EmployerSettingFormType = z.infer<typeof employerSchema>;
