"use client";

import React, { ChangeEvent, FormEvent, Profiler } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserIcon } from "lucide-react";
import { registrationAction } from "./registration.action";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { useForm, SubmitHandler } from "react-hook-form";
import { registerWithConfirmPasswordData } from "@/auth/auth.schema";
import registerWithConfirmPasswordSchema from "@/auth/auth.schema";
import { ZodObject, ZodString, ZodDefault, ZodEnum } from "zod/v4";
import { $strip } from "zod/v4/core";
import { zodResolver } from "@hookform/resolvers/zod";

// interface RegistrationFormData {
//   name: string;
//   userName: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
//   userType: "employee" | "applicant";
// }

const Registration: React.FC = () => {
  // const [formData, setFormData] = useState<RegistrationFormData>({
  //   name: "",
  //   userName: "",
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  //   userType: "applicant",
  // });

  const {
    register,
    handleSubmit,
    watch,

    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerWithConfirmPasswordSchema),
  });

  // const handleInputChange = (name: string, value: string) => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [name]: value,
  //   }));
  // };
  const onSubmit = async (data: registerWithConfirmPasswordData) => {
    // e.preventDefault();

    // const registrationData = {
    //   name: formData.name.trim(),
    //   userName: formData.userName.trim(),
    //   Email: formData.email.toLowerCase().trim(),
    //   userType: formData.userType,
    //   password: formData.password,
    //   confirmPassword: formData.confirmPassword,
    // };
    // if (formData.password !== formData.confirmPassword)
    //   return toast.error("Passwords do not match");

    const result = await registrationAction(
      data

      // registrationData
    );
    if (result.status === "success") {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };
  return (
    <>
      <div className="flex justify-center items-center     lg:min-h-screen bg-gray-100">
        <Card className="w-[400px]  m-3  shadow-lg">
          <UserIcon className="mx-auto mt-6  h-18 w-18 text-gray-800" />

          <CardHeader>
            <CardTitle className="text-center text-2xl font-semibold">
              Join Our Job Portal
            </CardTitle>
            <CardDescription className="text-center text-gray-500">
              Create your account below
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  // name="name"
                  placeholder="Enter your full name"
                  {...register("f_name")}
                  // value={formData.name}
                  // onChange={
                  //   (e: ChangeEvent<HTMLInputElement>) =>
                  //     handleInputChange("name", e.target.value) // Update state
                  // }
                  required
                />
                <div>
                  {errors.f_name && (
                    <p className="text-sm text-red-600">
                      {errors.f_name.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  // name="userName"
                  placeholder="Enter a username"
                  {...register("userName")}
                  // value={formData.userName}
                  // onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  //   handleInputChange("userName", e.target.value)
                  // }
                  required
                  className={errors.userName ? "border-destructive" : ""}
                />
                <div className="flex ">
                  {errors.userName && (
                    <p className="text-sm text-red-600">
                      {errors.userName.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  // name="email"
                  type="email"
                  placeholder="Enter your email"
                  {...register("email")}
                  // value={formData.email}
                  // onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  //   handleInputChange("email", e.target.value)
                  // }
                  required
                />
                <div>
                  {errors.email && (
                    <p className="text-sm text-red-600">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* User Type */}
              <div className="space-y-2">
                <Label>I am </Label>
                <Select
                  {...register("userType")}
                  // name="userType"
                  // value={formData.userType}

                  // onValueChange={(value: "employee" | "applicant") =>
                  //   handleInputChange("userType", value)
                  // }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="employee">Employee</SelectItem>
                    <SelectItem value="applicant">Applicant</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>

                <Input
                  id="password"
                  type="password"
                  // name="password"
                  placeholder="Enter password"
                  {...register("password")}
                  // value={formData.password}
                  // onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  //   handleInputChange("password", e.target.value)
                  // }
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

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  // name="confirmPassword"
                  placeholder="Confirm your password"
                  {...register("confirmPassword")}
                  // value={formData.confirmPassword}
                  // onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  //   handleInputChange("confirmPassword", e.target.value)
                  // }
                  required
                />
                <div>
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-600">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>

              <CardFooter className="flex justify-center pt-4">
                <Button type="submit" className="w-full">
                  Register
                </Button>
              </CardFooter>
            </form>
            <div className="text-center mt-4 text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 hover:underline">
                Log in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Registration;
