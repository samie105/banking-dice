"use server";

import Address, { PaymentAddress } from "@/server/addressSchema";
import { revalidatePath } from "next/cache";
import dbConnect from "..";

export async function updateAddress(address: PaymentAddress) {
  try {
    await dbConnect();

    // Use findOneAndUpdate to update or create the document
    const result = await Address.findOneAndUpdate(
      { name: address.name }, // Filter by name
      address, // Update with the new address data
      { upsert: true, new: true } // Create if not exists, return the updated document
    );

    if (!result) {
      return { success: false, error: "Failed to update or create address" };
    }

    console.log("Updated/Created address:", result);

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Error updating payment address:", error);
    return { success: false, error: String(error) };
  }
}
