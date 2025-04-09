import React from "react";
import Deposits from "@/components/dashboard/deposit/Deposit";
import DepHeader from "@/components/dashboard/deposit/DepHeader";
import dbConnect from "@/server";
import Address, { PaymentAddress } from "@/server/addressSchema";

export default async function Page() {
  await dbConnect();

  const rawData = await Address.findOne({ name: "swiftnexusbk" });
  const data: PaymentAddress = JSON.parse(JSON.stringify(rawData));
  // console.log(data);

  return (
    <div className="bg-white dark:bg-neutral-950 rounded-sm md:pt-0.5 p-2 md:p-0 h-[calc(100vh-5.5rem)] w-[calc(100vw-0.8rem)] md:w-full  pb-[4.5rem]  overflow-x-hidden">
      <DepHeader />
      <Deposits data={data} />
    </div>
  );
}
