import { getCurrentUser } from "@/auth/server/auth.queries";
import EmployerSideBar from "@/components/employer-sidebar";
import { redirect } from "next/navigation";

export default async function EmployeeDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) {
    // Handle unauthenticated state, e.g., redirect to login
    return redirect("/login");
  }
  if (user.userType !== "employee") {
    // Handle unauthorized access
    return redirect("/");
  }
  return (
    <div className=" flex min-h-screen bg-amber-50">
      <EmployerSideBar />
      <main className="container mx-auto mt-5 ml-55  md:ml-70 sm:ml-60  mr-5">
        {children}
      </main>
    </div>
  );
}
