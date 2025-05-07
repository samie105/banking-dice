"use server";
import { actionClient } from "@/lib/safeActionClient";
import User from "../userSchema";
import dbConnect from "..";
import { z } from "zod";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const loginDeets = z.object({
  email: z.string().email().optional(),
  password: z.string().optional(),
});

export const loginUser = actionClient
  .schema(loginDeets)
  .action(async ({ parsedInput: { email, password } }) => {
    await dbConnect();
    const lowerCaseEmail = email.toLowerCase();
    try {
      const user = await User.findOne({ email: lowerCaseEmail });
      if (!user)
        return { success: false, message: "No user found with such email" };

      if (user) {
        if (user.isBanned) {
          return {
            success: false,
            message: "Your account has been banned. Please contact support for assistance.",
          };
        }

        const passwordMatch = password === user.password;

        if (!passwordMatch)
          return {
            success: false,
            message: "Password does't match with this account",
          };
        if (passwordMatch) {
          if (user.codeVerification)
            cookies().set("verified", "true", {
              path: "/",
              httpOnly: true,
              secure: true,
              sameSite: "strict",
              maxAge: 4 * 24 * 60 * 60,
            });
          if (!user.codeVerification)
            cookies().set("verified", "false", {
              path: "/",
              httpOnly: true,
              secure: true,
              sameSite: "strict",
              maxAge: 4 * 24 * 60 * 60,
            });
          if (user.paymentVerification)
            cookies().set("paid", "true", {
              path: "/",
              httpOnly: true,
              secure: true,
              sameSite: "strict",
              maxAge: 4 * 24 * 60 * 60,
            });
          if (!user.paymentVerification)
            cookies().set("paid", "false", {
              path: "/",
              httpOnly: true,
              secure: true,
              sameSite: "strict",
              maxAge: 4 * 24 * 60 * 60,
            });

          cookies().set("userEmail", user.email, {
            path: "/",
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 4 * 24 * 60 * 60,
          });
          cookies().set("role", user.role, {
            path: "/",
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 4 * 24 * 60 * 60,
          });
          return {
            success: true,
            message: "Logged in successfully, redirecting...",
            role: user.role,
          };
        }

        revalidatePath("/auth");
      }
    } catch (error) {}
  });
