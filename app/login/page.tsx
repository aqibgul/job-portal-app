"use client";

import React, { ChangeEvent, Profiler } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserIcon } from "lucide-react";
import { loginAction } from "./login.action";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { toast } from "sonner";
interface LoginFormData {
  userName: string;

  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = React.useState<LoginFormData>({
    userName: "",

    password: "",
  });
  const handleInputChange = (name: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLoginButton = async (e: React.FormEvent) => {
    e.preventDefault();
    const loginData = {
      userName: formData.userName.trim(),

      password: formData.password,
    };
    // Handle login logic here

    const result = await loginAction(loginData);
    if (result.status === "success") {
      toast.success("Login successful!");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center    min-h-screen bg-gray-100">
        <Card className="w-[400px] shadow-lg">
          <UserIcon className="mx-auto mt-6  h-18 w-18 text-gray-800" />

          <CardHeader>
            <CardTitle className="text-center text-2xl font-semibold">
              Login Job Portal
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLoginButton} className="space-y-4">
              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  placeholder="Enter a username"
                  value={formData.userName}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleInputChange("userName", e.target.value)
                  }
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleInputChange("password", e.target.value)
                  }
                  required
                />
              </div>

              <CardFooter className="flex justify-center pt-4">
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </CardFooter>
            </form>
            <div className="text-center mt-4 text-sm text-gray-600">
              Sign up for new Account{" "}
              <Link href="/register" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Login;
