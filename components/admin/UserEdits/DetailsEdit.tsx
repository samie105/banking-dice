"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateUser } from "@/server/admin/edit-user-actions";
import { Loader2 } from "lucide-react";
import BanUser from "./BanUser";

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  motherMaidenName: string;
  ssn: string;
  codeVerification: boolean;
  paymentVerification: boolean;
  paymentImageLink: string;
  bankAccountNumber: string;
  bankRoutingNumber: string;
  readNotification: boolean;
  cardBalance: number;
  accountBalance: number;
  fixedBalance: number;
  accountLimit: number;
  isPaidOpeningDeposit: boolean;
  transactionPin: number;
  profilePictureLink: string;
  accountVerified: boolean;
  isBanned: boolean;
  [key: string]: any;
}

const excludedFields = [
  "__v",
  "profilePicture",
  "profilePictureLink",
  "readNotification",
  "paymentImageLink",
  "_id",
  "isBanned",
];

export default function UserEdit({ data }: { data: any }) {
  const [formData, setFormData] = useState(data);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) : value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [name]: value === "Yes",
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await updateUser(formData);
      toast.success("User data updated successfully");
      router.push("/admin"); // Redirect to admin page after successful update
    } catch (error) {
      toast.error("Failed to update user data");
    } finally {
      setIsLoading(false);
    }
  };

  const renderField = (key: string, value: any) => {
    if (typeof value === "boolean") {
      return (
        <Select
          onValueChange={(value) => handleSelectChange(key, value)}
          defaultValue={value ? "Yes" : "No"}
          disabled={isLoading}
        >
          <SelectTrigger className="w-full dark:bg-neutral-800 dark:border-neutral-800">
            <SelectValue placeholder="Select..." />
          </SelectTrigger>
          <SelectContent className="dark:bg-neutral-800 dark:border-neutral-800">
            <SelectItem value="Yes">Yes</SelectItem>
            <SelectItem value="No">No</SelectItem>
          </SelectContent>
        </Select>
      );
    } else if (typeof value === "number") {
      return (
        <Input
          type="number"
          id={key}
          name={key}
          value={formData[key]}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md dark:border-neutral-800"
          disabled={isLoading}
        />
      );
    } else {
      return (
        <Input
          type="text"
          id={key}
          name={key}
          value={formData[key]}
          onChange={handleInputChange}
          className="w-full p-2 border rounded-md dark:border-neutral-800"
          disabled={isLoading}
        />
      );
    }
  };

  return (
    <div className="space-y-8 max-w-2xl mx-auto p-4">
      <div
        className="back dark:bg-neutral-800 mt-3 px-4 py-2 rounded-xl text-sm font-medium cursor-pointer dark:text-white text-neutral-500 inline bg-neutral-50"
        onClick={() => {
          const proceed = confirm(
            "You might have unsaved changes, continue anyway?"
          );
          if (proceed) router.back();
        }}
      >
        Back
      </div>

      <div className="space-y-6">
        <h1 className="text-lg font-bold">Editing {data.email}</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2 grid-cols-1 md:grid-cols-2">
            {Object.entries(data).map(([key, value]) => {
              if (
                typeof value !== "object" &&
                !Array.isArray(value) &&
                !excludedFields.includes(key)
              ) {
                return (
                  <div key={key} className="space-y-2">
                    <Label htmlFor={key} className="text-sm font-medium">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </Label>
                    {renderField(key, value)}
                  </div>
                );
              }
              return null;
            })}
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving Changes...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>

        <div className="border-t pt-6">
          <BanUser email={data.email} isBanned={data.isBanned} />
        </div>
      </div>
    </div>
  );
}
