"use client";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { User } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { updateEmployerProfileAction } from "@/auth/server/employer.action";
import { toast } from "sonner";
import {
  EmployerSettingFormType,
  employerSchema,
  organizationTypes,
  teamSizes,
} from "@/auth/employer.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { is } from "drizzle-orm";
import Tiptap from "./texteditor";

// const organizationTypes = [
//   "development",
//   "design",
//   "marketing",
//   "sales",
//   "hr",
// ] as const;
// type OrganizationType = (typeof organizationTypes)[number];

// const teamSizeTypes = ["20-30", "30-50", "50-100", "100-200", "200+"] as const;
// type TeamSizeType = (typeof teamSizeTypes)[number];

// interface IFormType {
//   username: string;
//   email: string;
//   companyName: string;
//   description: string;
//   yearOfEstablishment: string;
//   location: string;
//   websiteURL?: string;
//   organizationType: OrganizationType;
//   teamSize: TeamSizeType;
// }

const EmployerSetting = ({
  initialData,
}: {
  initialData?: Partial<EmployerSettingFormType>;
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<EmployerSettingFormType>({
    resolver: zodResolver(employerSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      organizationType: initialData?.organizationType || undefined,
      teamSize: initialData?.teamSize || undefined,
      yearFounded: initialData?.yearFounded || "",
      location: initialData?.location || "",
      websiteUrl: initialData?.websiteUrl || "",
    },
  });
  const handleFormSubmit = async (data: EmployerSettingFormType) => {
    console.log("updated data", data);
    const response = await updateEmployerProfileAction(data);
    if (response.status === "success") {
      toast.success(response.message);
    } else {
      toast.error("Error updating profile");
    }
  };
  return (
    <div>
      <Card className=" p-6">
        <CardContent>
          <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
            {/* <div>
              <Label htmlFor="username" className="block  text-sm font-medium ">
                Username *
              </Label>
              <div className="">
                <Input
                  type="text"
                  id="username"
                  {...register("username")}
                  placeholder="Enter Username"
                  className="
                  pl-19 mt-1 block w-1/2 border border-gray-300 rounded-md shadow-sm p-2 
                  "
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email" className="block text-sm font-medium ">
                Email *
              </Label>
              <Input
                type="email"
                id="email"
                {...register("email")}
                placeholder="Enter Email"
                className="mt-1 block w-1/2 border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div> */}
            {/* Company Name */}
            <div>
              <Label
                htmlFor="companyName"
                className="block text-sm font-medium "
              >
                Company Name *
              </Label>
              <Input
                type="text"
                id="companyName"
                {...register("name")}
                placeholder="Enter Company Name"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
            {/* Description */}
            <div>
              <Label
                htmlFor="description"
                className="block text-sm font-medium "
              >
                Description *
              </Label>
              <Textarea
                id="description"
                {...register("description")}
                placeholder="Enter Description"
                className="h-40 mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            {errors.description && (
              <p className="text-red-500 text-sm ">
                {errors.description.message}
              </p>
            )}

            <div>
              <Tiptap />
            </div>

            {/* organization details  */}
            <div className="sm:flex mt-9 w-full">
              <div className="sm:w-full">
                <Controller
                  name="organizationType"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <Label htmlFor="organizationType" className="block mb-2">
                        Organization Type *
                      </Label>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className=" w-full sm:w-1/2 ">
                          <SelectValue placeholder="Select Organization Type *" />
                          <SelectContent>
                            {organizationTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </SelectTrigger>
                      </Select>
                    </div>
                  )}
                />
                {errors.organizationType && (
                  <p className="text-red-500 text-sm ">
                    {errors.organizationType.message}
                  </p>
                )}
              </div>

              {/* Team size */}
              <div className="  sm:w-full">
                <Controller
                  name="teamSize"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <Label htmlFor="teamSize" className="block mt-2 mb-2">
                        Team Size *
                      </Label>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className=" w-full sm:w-1/2 ">
                          <SelectValue placeholder="Select Team Size *" />
                          <SelectContent>
                            {teamSizes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </SelectTrigger>
                      </Select>
                    </div>
                  )}
                />
                {errors.teamSize && (
                  <p className="text-red-500 text-sm ">
                    {errors.teamSize.message}
                  </p>
                )}
              </div>
            </div>

            <div className="sm:flex w-full ">
              <div className="sm:w-1/2 ">
                <Label className="" htmlFor="yearOfEstablishment">
                  Year of Establishment *
                </Label>
                <Input
                  type="text"
                  id="yearOfEstablishment"
                  {...register("yearFounded")}
                  placeholder="Enter Year of Establishment"
                  className="mt-1 block  border border-gray-300 rounded-md shadow-sm p-2"
                />
                {errors.yearFounded && (
                  <p className="text-red-500 text-sm ">
                    {errors.yearFounded.message}
                  </p>
                )}
              </div>

              <div className="sm:w-1/2 sm:ml-3.5">
                <Label htmlFor="location">location *</Label>
                <Input
                  type="text"
                  id="location"
                  {...register("location")}
                  placeholder="Enter location"
                  className="mt-1 block  border border-gray-300 rounded-md shadow-sm p-2"
                />
                {errors.location && (
                  <p className="text-red-500 text-sm ">
                    {errors.location.message}
                  </p>
                )}
              </div>
            </div>
            <div>
              <Label
                htmlFor="websiteURL"
                className="block text-sm font-medium "
              >
                Website URL (optional)
              </Label>
              <Input
                type="text"
                id="websiteURL"
                {...register("websiteUrl")}
                placeholder="Enter Website URL"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div className="flex">
              <Button type="submit">
                {isSubmitting && (
                  <span className="mr-2 animate-spin">&#9696;</span>
                )}
                {isSubmitting ? "Saving..." : " Save Changes"}
              </Button>
              {!isDirty && <p className="pt-1.5 pl-1.5">No changes to save </p>}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
export default EmployerSetting;
