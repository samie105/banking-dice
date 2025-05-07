"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { toggleUserBan } from "@/server/admin/edit-user-actions";
import { Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface BanUserProps {
  email: string;
  isBanned: boolean;
}

export default function BanUser({ email, isBanned }: BanUserProps) {
  const [banReason, setBanReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await toggleUserBan(email, !isBanned, banReason);
      toast.success(`User ${isBanned ? "unbanned" : "banned"} successfully`);
      router.refresh();
    } catch (error) {
      toast.error(`Failed to ${isBanned ? "unban" : "ban"} user`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto p-4">
      <div className="space-y-2">
        <h2 className="text-lg font-bold">
          {isBanned ? "Unban User" : "Ban User"}
        </h2>
        <p className="text-sm text-gray-500">
          {isBanned
            ? "This will restore the user's access to their account."
            : "This will prevent the user from accessing their account."}
        </p>
      </div>

      {!isBanned && (
        <div className="space-y-2">
          <Label htmlFor="banReason" className="text-sm font-medium">
            Reason for Ban (Optional)
          </Label>
          <Textarea
            id="banReason"
            value={banReason}
            onChange={(e) => setBanReason(e.target.value)}
            placeholder="Enter reason for banning the user..."
            className="w-full p-2 border rounded-md dark:border-neutral-800"
            disabled={isLoading}
          />
        </div>
      )}

      <Button
        type="submit"
        className={`w-full p-2 rounded disabled:opacity-50 ${
          isBanned
            ? "bg-green-500 hover:bg-green-600"
            : "bg-red-500 hover:bg-red-600"
        } text-white`}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {isBanned ? "Unbanning..." : "Banning..."}
          </>
        ) : (
          isBanned ? "Unban User" : "Ban User"
        )}
      </Button>
    </form>
  );
} 