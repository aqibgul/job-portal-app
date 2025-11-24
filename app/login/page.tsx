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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, loginUserData } from "@/auth/auth.schema";
import { useRouter } from "next/navigation";

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,

    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const router = useRouter();

  const onSubmit = async (data: loginUserData) => {
    const result = await loginAction(data);

    if (result.status === "success") {
      toast.success("Login successful!");
      router.push("/employee-dashboard");
    } else {
      toast.error(result.message);
    }
  };
  // Handle login logic here

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
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="Enter a username"
                  {...register("userName")}
                  required
                />
                <div>
                  {errors.userName && (
                    <p className="text-sm text-red-600">
                      {errors.userName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  {...register("password")}
                  required
                />
                <div>
                  {errors.password && (
                    <p className="text-sm text-red-600">
                      {errors.password.message}
                    </p>
                  )}
                </div>
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
