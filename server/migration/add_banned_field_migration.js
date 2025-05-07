import mongoose from "mongoose";
const { Schema } = mongoose;

// Define User Schema
const userSchema = new Schema({
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  accountBalance: Number,
  isBanned: {
    type: Boolean,
    default: false
  },
  banReason: String,
  transferHistory: [{
    id: Schema.Types.Mixed,
    recipientName: String,
    amount: Number,
    date: Date,
    receipientAccountNumber: Number,
    receipientRoutingNumber: Number,
    status: String,
    receipientBankName: String,
    description: String
  }],
  depositHistory: [{
    id: Schema.Types.Mixed,
    amount: Number,
    paymentMeans: String,
    status: String,
    date: Date,
    screenshotLink: String,
    description: String
  }],
  notifications: [{
    id: Schema.Types.Mixed,
    message: String,
    status: String,
    type: String,
    dateAdded: Date
  }],
  readNotification: Boolean,
  paymentImageLink: String,
  paymentVerification: Boolean,
  verificationDetails: {
    verificationType: String,
    verificationImageLinkFront: String,
    verificationImageLinkBack: String,
    status: String
  },
  transactionPin: Number
});

// Connect to MongoDB
mongoose.connect("mongodb+srv://samsonrichfield:Ij1BYLm09rP2NKjP@newsitesv2.ubixqpi.mongodb.net/?retryWrites=true&w=majority&appName=newSitesv2");

// Add isBanned field to all users
const addBannedField = async () => {
  try {
    const User = mongoose.model('UserDice', userSchema);
    
    const update = await User.updateMany(
      { isBanned: { $exists: false } },
      { $set: { isBanned: false } }
    );
    
    console.log('Successfully added isBanned field to all users:', update);
  } catch (error) {
    console.error('Error adding isBanned field:', error);
  }
};

// Run migration
const runMigration = async () => {
  try {
    await addBannedField();
    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Error running migration:', error);
  } finally {
    mongoose.disconnect();
  }
};

runMigration(); 