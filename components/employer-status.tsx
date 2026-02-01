import { BadgeCheckIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import Link from "next/link";
import { get } from "http";
import { getCurrentEmployerDetails } from "@/auth/server/employer.queries";
const EmployerCompleteStatus = async () => {
  const getCurrentEmployer = await getCurrentEmployerDetails();
  console.log("Employer Details in Status Component:", getCurrentEmployer);
  if (getCurrentEmployer?.isProfileComplete) return null; // Profile is complete, do not render anything

  return (
    <div className="mt-6">
      <Item className="bg-red-600  hover:bg-gray-100 rounded-lg border-black p-4">
        <ItemMedia>
          <BadgeCheckIcon className="h-6 w-6 text-green-500" />
        </ItemMedia>
        <ItemContent>
          <ItemTitle className="text-lg font-semibold text-white">
            Incomplete Employer Profile
          </ItemTitle>
          <ItemDescription className="text-sm text-gray-900">
            Enhance your profile to attract more candidates and post jobs.
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Button variant="outline" size="sm" asChild>
            <Link href="employee-dashboard/settings">
              Complete Profile <ChevronRightIcon className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </ItemActions>
      </Item>
    </div>
  );
};
export default EmployerCompleteStatus;
