"use client";
import { logoutAction } from "@/app/login/login.action";
import { cn } from "@/lib/utils";
import {
  Book,
  Bookmark,
  Briefcase,
  Building,
  CreditCard,
  LayoutDashboard,
  LogOutIcon,
  Plus,
  Settings,
  User,
  icons,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { URLPattern } from "next/server";
import { use } from "react";
const base = "/employee-dashboard";

const navigationItems = [
  { name: "Overview", icon: LayoutDashboard, href: base + "/" },
  { name: "Employer Profile", icon: User },
  { name: "Post a Job", icon: Plus },
  { name: "My Jobs", icon: Briefcase },
  { name: "Saved Candidates", icon: Bookmark },
  { name: "Planes & Billing", icon: CreditCard },
  { name: "All Companies", icon: Building },
  { name: "settings", icon: Settings, href: base + "/settings" },
];

const EmployerSideBar = () => {
  const pathname = usePathname();
  const isActiveLink = ({
    href,
    pathname,
    base = "/",
  }: {
    href: string;
    pathname: string;
    base?: string;
  }) => {
    const normalizedHref = href.replace(/\/+$/, "") || "/"; // Remove trailing slashes
    // URL pattern is build-in browser API to match URL patterns
    // properties: pathname, search, hash, username, password, port, hostname, protocol

    const pattern = new URLPattern({
      pathname: normalizedHref === base ? base : `${normalizedHref}{/*}?`,
    });
    // console.log("Matching pattern:", pattern, "with pathname:", pathname);
    return pattern.test({ pathname });
  };
  return (
    <div className=" sm:w-48 md:w-64   h-screen bg-white shadow-md fixed">
      <div>
        <h2 className=" font-medium p-4 border-b border-gray-200">
          Employer Dashboard
        </h2>
      </div>
      <nav className="">
        {navigationItems.map((item) => (
          <Link
            key={item.name}
            href={item.href || "#"}
            className={cn(
              "flex items-center p-4 hover:bg-gray-100 transition-colors",
              isActiveLink({
                href: item.href || "#",
                pathname,
                base,
              }) && "bg-blue-300 font-medium"
            )}
          >
            <item.icon className="mr-3" />
            <span className="capitalize ">{item.name}</span>
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-6 left-3 right-3">
        <button
          onClick={logoutAction}
          className="m-4 bg-amber-100   py-2 px-4 rounded hover:bg-amber-300 transition-colors"
        >
          <LogOutIcon className="inline mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
};
export default EmployerSideBar;
