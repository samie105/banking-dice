// userModel.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  motherMaidenName: string;
  ssn: string;
  password: string;
  codeVerification: boolean;
  paymentVerification: boolean;
  paymentImageLink: string;
  bankAccountNumber: string;
  bankRoutingNumber: string;
  notifications: NotificationType[];
  readNotification: boolean;
  isBanned: boolean;
  banReason?: string;
  card: {
    cardNumber: string;
    cardExpiry: string;
    cardType: string;
    cardCVC: string;
    cardBillingAddress: string;
    cardZipCode: string;
  };
  cardBalance: number;
  accountBalance: number;
  fixedBalance: number;
  accountLimit: number;
  isPaidOpeningDeposit: boolean;
  fixedHistory: FixedType[];
  role: "admin" | "user";
  accountType: "savings" | "checking";
  depositHistory: Deposits[];
  transferHistory: Transfers[];
  transactionPin: number;
  profilePictureLink: string;
  accountVerified: boolean;
  verificationDetails: verificationDetails;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  dob: { type: String },
  motherMaidenName: { type: String },
  ssn: { type: String },
  password: { type: String, required: true },
  codeVerification: { type: Boolean, required: true },
  paymentVerification: { type: Boolean, required: true },
  paymentImageLink: { type: String, required: true },
  bankAccountNumber: { type: String, required: true, unique: true },
  bankRoutingNumber: { type: String, required: true, unique: true },
  notifications: [Object],
  readNotification: { type: Boolean, default: false },
  isBanned: { type: Boolean, default: false },
  banReason: { type: String },
  card: Object,
  cardBalance: { type: Number },
  accountBalance: { type: Number },
  fixedBalance: { type: Number },
  accountLimit: { type: Number },
  role: { type: String },
  isPaidOpeningDeposit: { type: Boolean },
  accountType: { type: String },
  fixedHistory: [Object],
  depositHistory: [{
    id: { type: Schema.Types.Mixed },
    amount: { type: Number },
    paymentMeans: { type: String },
    status: { type: String },
    date: { type: Date },
    screenshotLink: { type: String },
    description: { type: String }
  }],
  transferHistory: [{
    id: { type: Schema.Types.Mixed },
    recipientName: { type: String },
    amount: { type: Number },
    date: { type: Date },
    receipientAccountNumber: { type: Number },
    receipientRoutingNumber: { type: Number },
    status: { type: String },
    receipientBankName: { type: String },
    description: { type: String }
  }],
  transactionPin: { type: Number },
  profilePictureLink: { type: String },
  verificationDetails: { type: Object },
  accountVerified: { type: Boolean },
});

const User: Model<IUser> =
  mongoose.models.UserDice ||
  mongoose.model<IUser>("UserDice", userSchema);

export default User;
