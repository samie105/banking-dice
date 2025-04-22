import mongoose from "mongoose";
const { Schema } = mongoose;

// Define User Schema
const userSchema = new Schema({
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  accountBalance: Number,
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

// Update transfer history schema
const updateTransferHistory = async () => {
  try {
    const User = mongoose.model('UserDice', userSchema);
    const users = await User.find({});

    for (const user of users) {
      console.log('\nBefore update - Transfer History:');
      console.log(JSON.stringify(user.transferHistory, null, 2));
      
      const update = await User.updateOne(
        { _id: user._id },
        { 
          $set: { 
            transferHistory: user.transferHistory.map(transfer => ({
              ...transfer.toObject(),
              description: 'Transfer'
            }))
          } 
        }
      );
      console.log('\nUpdate result:', update);
    }
    
    console.log('Successfully updated transfer history with description field');
  } catch (error) {
    console.error('Error updating transfer history:', error);
  }
};

// Update deposit history schema
const updateDepositHistory = async () => {
  try {
    const User = mongoose.model('UserDice', userSchema);
    const users = await User.find({});
    
    for (const user of users) {
      console.log('\nBefore update - Deposit History:');
      console.log(JSON.stringify(user.depositHistory, null, 2));
      
      const update = await User.updateOne(
        { _id: user._id },
        { 
          $set: { 
            depositHistory: user.depositHistory.map(deposit => ({
              ...deposit.toObject(),
              description: 'Deposit'
            }))
          } 
        }
      );
      console.log('\nUpdate result:', update);
    }
    
    console.log('Successfully updated deposit history with description field');
  } catch (error) {
    console.error('Error updating deposit history:', error);
  }
};

// Run migrations
const runMigrations = async () => {
  try {
    await updateTransferHistory();
    await updateDepositHistory();
    console.log('All migrations completed successfully');
  } catch (error) {
    console.error('Error running migrations:', error);
  } finally {
    mongoose.disconnect();
  }
};

runMigrations();