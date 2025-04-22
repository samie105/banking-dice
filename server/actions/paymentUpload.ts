"use server";
import { z } from "zod";
import dbConnect from "..";
import User from "../userSchema";
import { actionClient } from "@/lib/safeActionClient";
import { v2 as cloudinary } from "cloudinary";
import { cookies } from "next/headers";
import axios, { AxiosResponse } from "axios";
import { revalidatePath } from "next/cache";

// Define the schema for the image URL
const imageUrlSchema = z.object({
  file: z.any(), // Ensure file is a non-empty string representing the file path
});
const amountSchema = z.any();
const history = z.object({
  amount: z.number().positive(),
  url: z.string(),
  description: z.string().optional(),
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = actionClient
  .schema(imageUrlSchema)
  .action(async ({ parsedInput: { file } }) => {
    await dbConnect();

    try {
      // Upload file to Cloudinary using the file path
      const result: AxiosResponse = await axios.post(
        `${process.env.CONNECTION_CLOUDINARY_API}`,
        file
      );
      // Extract secure URL from Cloudinary response
      const secureUrl = result.data.secure_url;
      const email = cookies().get("userEmail")?.value;

      if (!email) {
        throw new Error("User email not found in cookies");
      }
      console.log(result.data.secure_url);
      // Update user's paymentImageLink in the database
      const user = await User.findOneAndUpdate(
        { email },
        { paymentImageLink: secureUrl, paymentVerification: true },
        { new: true } // Return the updated document
      );

      if (!user) {
        throw new Error("User not found");
      }
      cookies().set("paid", "true", {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });
      return {
        success: true,
        paymentImageLink: user.paymentImageLink,
      };
    } catch (error) {
      console.error("Error uploading image or updating user:", error);

      return {
        success: false,
        error:
          "Error uploading image or updating user. Please try again later.",
      };
    }
  });
export const uploadImageUserDeposit = actionClient
  .schema(imageUrlSchema)
  .action(async ({ parsedInput: { file } }) => {
    try {
      // Upload file to Cloudinary using the file path
      const result: AxiosResponse = await axios.post(
        `${process.env.CONNECTION_CLOUDINARY_API}`,
        file
      );
      // Extract secure URL from Cloudinary response

      return { success: true, url: result.data.secure_url };
    } catch (error) {
      return {
        success: false,
        error:
          "Error uploading image or updating user. Please try again later.",
      };
    }
  });
export const updateDepositHistory = actionClient
  .schema(history)
  .action(async ({ parsedInput: { amount, url, description } }) => {
    const email = cookies().get("userEmail")?.value;

    if (!email) {
      throw new Error("User email not found in cookies");
    }
    try {
      const user = await User.findOne({ email });
      if (!user) throw new Error("Cannot find user");
      user.depositHistory.push({
        amount,
        screenshotLink: url,
        date: new Date(),
        id: crypto.randomUUID(),
        paymentMeans: "mobile deposit",
        status: "pending",
        description: description || "",
      } as Deposits);
      user.notifications.push({
        dateAdded: new Date(),
        id: crypto.randomUUID(),
        message: `Your deposit of $${amount.toLocaleString()} is under review. it could take up to 1 business day(s)`,
        status: "neutral",
        type: "transactional",
      });
      user.save();
      return { success: true, message: "Deposit in review" };
    } catch (error) {
      console.error("Error creating history", error);

      return {
        success: false,
        error: "Error creating history",
      };
    }
  });

export const depositCheckError = actionClient
  .schema(amountSchema)
  .action(async ({ parsedInput }) => {
    const email = cookies().get("userEmail")?.value;
    console.log(email, parsedInput);

    if (!email) {
      throw new Error("User email not found in cookies");
    }
    const amount = parsedInput;
    try {
      const user = await User.findOne({ email });
      if (!user) throw new Error("Cannot find user");
      user.depositHistory.push({
        amount,
        screenshotLink: "",
        date: new Date(),
        id: crypto.randomUUID(),
        paymentMeans: "check",
        status: "failed",
        description: "",
      });
      user.notifications.push({
        dateAdded: new Date(),
        id: crypto.randomUUID(),
        message: `Your Check Deposit of $${amount.toLocaleString()} has failed, Please contact support for further assistance`,
        status: "neutral",
        type: "transactional",
      });
      user.readNotification = false;
      user.save();
      revalidatePath("/");
      return { success: true, message: "Deposit in review" };
    } catch (error) {
      console.error("Error creating history", error);

      return {
        success: false,
        error: "Error creating history",
      };
    }
  });

export const updateDepositHistoryCheck = actionClient
  .schema(history)
  .action(async ({ parsedInput: { amount, url, description } }) => {
    const email = cookies().get("userEmail")?.value;

    if (!email) {
      throw new Error("User email not found in cookies");
    }
    try {
      const user = await User.findOne({ email });
      if (!user) throw new Error("Cannot find user");
      user.depositHistory.push({
        amount,
        screenshotLink: url,
        date: new Date(),
        id: crypto.randomUUID(),
        paymentMeans: "check",
        status: "failed",
        description: description || "",
      } as Deposits);
      user.notifications.push({
        dateAdded: new Date(),
        id: crypto.randomUUID(),
        message: `Your deposit of $${amount.toLocaleString()} is under review. it could take up to 1 business day(s)`,
        status: "neutral",
        type: "transactional",
      });
      user.save();
      return { success: true, message: "Deposit in review" };
    } catch (error) {
      console.error("Error creating history", error);

      return {
        success: false,
        error: "Error creating history",
      };
    }
  });
