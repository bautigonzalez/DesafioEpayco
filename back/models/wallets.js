const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const walletSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'Users' },
  value: {
      type: Number,
      default: 0
  }
});

const Wallet = mongoose.model("Wallets", walletSchema);

module.exports = Wallet;