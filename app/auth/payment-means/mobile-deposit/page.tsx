import PaymentSection from "@/components/auth/signup/PaymentSection";
import dbConnect from "@/server";
import Address, { PaymentAddress } from "@/server/addressSchema";
import React from "react";

export default async function page() {
  await dbConnect();

  const rawData = await Address.findOne({ name: "swiftnexusbk" });
  const data: PaymentAddress = JSON.parse(JSON.stringify(rawData));
  // console.log(data);

  return (
    <div>
      <PaymentSection data={data} />
    </div>
  );
}
