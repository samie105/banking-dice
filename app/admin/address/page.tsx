import React from "react";
import AddressEdit from "@/components/admin/UserEdits/AddresssEdit";
import dbConnect from "@/server";
import Address, { PaymentAddress } from "@/server/addressSchema";
import { revalidatePath } from "next/cache";

export default async function Page() {
  await dbConnect();
revalidatePath("/")
  const rawData = await Address.findOne({ name: "swiftnexusbn" });
  const data: PaymentAddress = JSON.parse(JSON.stringify(rawData));
  // console.log(data);

  return (
    <div>
      <AddressEdit data={data} />
    </div>
  );
}
