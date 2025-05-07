"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useColors } from "@/context/colorContext";

export default function AccountBanned() {
  const router = useRouter();
  const colors = useColors();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-neutral-950 p-4">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-red-600">Account Banned</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Your account has been banned. Please contact support for assistance.
          </p>
        </div>
        
        <div className="space-y-4">
          <Button
            onClick={() => router.push("/auth/login")}
            className="w-full h-12 font-bold"
            style={{ backgroundColor: colors.defaultblue }}
          >
            Return to Login
          </Button>
          
          <Button
            onClick={() => router.push("/dashboard/support")}
            variant="outline"
            className="w-full h-12 font-bold"
          >
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
} 