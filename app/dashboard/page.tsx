import React from "react";
import { Chart } from "@/components/dashboard/Dashboard/Chart";
import Fixed from "@/components/dashboard/Dashboard/Fixed";
import Dashboard from "@/components/dashboard/Dashboard/Main";
import dbConnect from "@/server";
import { fetchDetails } from "@/server/actions/createUser";
import User, { IUser } from "@/server/userSchema";
import { revalidatePath, unstable_noStore } from "next/cache";
import { cookies } from "next/headers";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";

export default async function page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["deets"],
    queryFn: fetchDetails,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="bg-white/ overflow-hidden p-1/ rounded-md ">
        <div className="h-[calc(100vh-5.5rem)] overflow-scroll rounded-md">
          {" "}
          <Dashboard />
          <div className="grid grid-cols-1 md:grid-cols-2 mt-2 gap-x-2 ">
            {" "}
            <Fixed />
            <Chart />
          </div>
        </div>
      </div>
    </HydrationBoundary>
  );
}
