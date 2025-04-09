import mongoose, { Schema, Document, Model } from "mongoose";
export interface PaymentAddress extends Document {
  name: string;
  bitcoin: string;
  ethereum: string;
  litecoin: string;
  dogecoin: string;
  cashapp: string;
  zelle: string;
  venmo: string;
  paypal: string;
}

const userSchema: Schema<PaymentAddress> = new mongoose.Schema({
  name: { type: String },
  bitcoin: { type: String },
  ethereum: { type: String },
  litecoin: { type: String },
  dogecoin: { type: String },
  cashapp: { type: String },
  venmo: { type: String },
  zelle: { type: String },
  paypal: { type: String },
});

const Address: Model<PaymentAddress> =
  mongoose.models.PaymentAddressPraiz ||
  mongoose.model<PaymentAddress>("PaymentAddressPraiz", userSchema);

export default Address;
