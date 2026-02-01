import { getCurrentEmployerDetails } from "@/auth/server/employer.queries";
import EmployerSetting from "@/components/employer-setting";
import { desc } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";

const EmployerSettingPage = async () => {
  const employer = await getCurrentEmployerDetails();
  console.log("current employer", employer);
  if (!employer) {
    redirect("/login");
  }
  return (
    <div>
      <EmployerSetting
        initialData={{
          name: employer.employerDetails.name,
          email: employer.employerDetails.email,
          description: employer.employerDetails.description,
          location: employer.employerDetails.location,
          website: employer.employerDetails.website,
          teamSize: employer.employerDetails.teamSize,
          websiteUrl: employer.employerDetails.websiteUrl,
          organizationType: employer.employerDetails.organizationType,
          yearFounded: employer.employerDetails.yearFounded,
        }}
      />
    </div>
  );
};
export default EmployerSettingPage;
