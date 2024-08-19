"use server";
import dbConnect from "..";
import User, { IUser } from "../userSchema";
import { actionClient } from "@/lib/safeActionClient";
import { signUpSchemaFull } from "../schema";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { logout } from "../dashboard/navActions";

// Function to generate a 10-digit random number
function generateRandomNumber(): string {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
}

// Function to generate a unique 10-digit bank account number
async function generateUniqueAccountNumber() {
  let isUnique = false;
  let accountNumber = "";

  while (!isUnique) {
    accountNumber = generateRandomNumber();
    const existingUser = await User.findOne({
      bankAccountNumber: accountNumber,
    });
    if (!existingUser) {
      isUnique = true;
    }
  }

  return accountNumber;
}

// Function to generate a unique 10-digit bank routing number
async function generateUniqueRoutingNumber() {
  let isUnique = false;
  let routingNumber = "";

  while (!isUnique) {
    routingNumber = generateRandomNumber();
    const existingUser = await User.findOne({
      bankRoutingNumber: routingNumber,
    });
    if (!existingUser) {
      isUnique = true;
    }
  }

  return routingNumber;
}

// Default user details
const deets = {
  codeVerification: false,
  paymentVerification: false,
  paymentImageLink: "image link",
  bankRoutingNumber: "",
  notifications: [
    {
      id: 1,
      message: "Welcome to wilson bank",
      status: "neutral",
      type: "neutral",
      dateAdded: new Date(),
    },
  ],
  readNotification: false,
  card: {
    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCVC: "",
    cardBillingAddress: "",
    cardZipCode: "",
  },
};

// Action to create a new user
export const createUser = actionClient
  .schema(signUpSchemaFull)
  .action(async ({ parsedInput }) => {
    parsedInput.email = parsedInput.email.toLowerCase();
    const userDeets: IUser = { ...parsedInput, ...deets };

    await dbConnect();

    try {
      // Generate a unique 10-digit bank account number
      const uniqueAccountNumber = await generateUniqueAccountNumber();
      const uniqueRoutingNumber = await generateUniqueRoutingNumber();
      userDeets.bankAccountNumber = uniqueAccountNumber;
      userDeets.bankRoutingNumber = uniqueRoutingNumber;

      // Create a new user with the parsed input data
      const createdUser: IUser = await User.create(userDeets);

      // Set cookies
      cookies().set("userEmail", createdUser.email, {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 4 * 24 * 60 * 60,
      });
      cookies().set("verified", "false", {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });
      cookies().set("paid", "false", {
        path: "/",
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });

      return {
        success: true,
        user: {
          firstName: createdUser.firstName,
          lastName: createdUser.lastName,
          email: createdUser.email,
          phone: createdUser.phone,
          motherMaidenName: createdUser.motherMaidenName,
          ssn: createdUser.ssn,
          password: createdUser.password,
          bankAccountNumber: createdUser.bankAccountNumber,
        },
      };
    } catch (error) {
      console.error("Error creating user:", error);

      // Return error response
      return {
        success: false,
        error: "Error creating user. Please try again later.",
      };
    }
  });

// Function to fetch user details
export const fetchDetails = async () => {
  await dbConnect();
  const email = cookies().get("userEmail")?.value;
  if (!email) logout();
  const data = await User.findOne({ email });
  if (!data) {
    logout();
    return;
  }
  if (data) {
    const cleanData: IUser = JSON.parse(JSON.stringify(data));
    console.log(cleanData.card.cardNumber);
    return { data: cleanData };
  }
  revalidatePath("/");
};
