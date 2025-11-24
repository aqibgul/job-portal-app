import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/auth/server/auth.queries";
import StateCard from "@/components/employer-statecard";
import EmployerSideBar from "@/components/employer-sidebar";
import EmployerCompleteStatus from "@/components/employer-status";
import { log } from "console";

const EmployeeDashboardPage = async () => {
  const user = await getCurrentUser();
  // console.log("Employee Dashboard User:", user);
  if (!user) {
    return <div>Please log in to view your dashboard.</div>;
  }

  return (
    <div className="p-2.5 m-2.5 ">
      <div>Welcome, {user?.name} </div>

      <StateCard />
      <EmployerCompleteStatus />
    </div>
  );
};
export default EmployeeDashboardPage;
