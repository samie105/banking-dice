import Navbar from "@/components/dashboard/Navbar/Navbar";
import SideBar from "@/components/dashboard/SideBar";
import Providers from "@/lib/queryClient";
import BottomNav from "@/components/dashboard/Navbar/BottomNav";
import React from "react";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchDetails } from "@/server/actions/createUser";
import dbConnect from "@/server";
import { cookies, headers } from "next/headers";
import User from "@/server/userSchema";
import AccountNotFound from "@/components/account-not-found";
import AccountBanned from "@/components/account-banned";
import LiveSupport from "@/components/dashboard/LiveSupport";
import Script from "next/script";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await dbConnect();
  const headersList = headers();
  const pathname = headersList.get("x-invoke-path") || "";

  const email = cookies().get("userEmail")?.value;
  const data = await User.findOne({ email });

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["deets"],
    queryFn: fetchDetails,
  });

  return (
    <>
    <Script src="//code.jivosite.com/widget/1U5DmgXFzL" async strategy="beforeInteractive"/>
      {data && email ? (
        data.isBanned ? (
          <AccountBanned />
        ) : (
          <Providers>
            <HydrationBoundary state={dehydrate(queryClient)}>
              <div className="grid gap-x-1. bg-neutral-100/80 md:bg-neutral-100 dark:bg-neutral-950 md:grid-cols-12 relative w-screen h-screen overflow-hidden ">
                <div className="lg:col-span-2 pl-2 py-2 hidden md:block md:col-span-3">
                  <SideBar />
                </div>
                <div className="md:col-span-9 md:pl-1 lg:col-span-10 relative">
                  <nav className="md:pr-2 md:pt-2 ">
                    <Navbar />
                  </nav>
                  <div className="mt-[4.6rem] w-full overflow-x-hidden pl-2 md:pl-0 pr-1.5 md:mt-[4.6rem]">
                    {children}
                  </div>

                  <div className="fixed md:hidden w-full bottom-0 left-0 buttom-nav">
                    <BottomNav />
                  </div>
                </div>
              </div>
            </HydrationBoundary>
          </Providers>
        )
      ) : (
        <div className="w-full h-screen dark:bg-neutral-950">
          {" "}
          <AccountNotFound />
        </div>
      )}

      <LiveSupport />
    </>
  );
}
