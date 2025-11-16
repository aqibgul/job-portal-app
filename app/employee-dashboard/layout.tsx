import { getCurrentUser } from "@/auth/server/auth.queries";
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
  return (
    <>
      <h1>Employee Dashboard Layout {user?.userName}</h1>
      {children}
    </>
  );
}
