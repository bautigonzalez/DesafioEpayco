const crypto = require("crypto");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  phone:{
    type: Number,
    required: true,
  },
  document:{
    type: Number,
    required: true,
    unique: true,
  },
  wallet: { type: Schema.Types.ObjectId, ref: 'Wallets' },
});

userSchema.methods.setPassword = function (pass) {
  return crypto.createHmac("sha1", this.salt).update(pass).digest("hex");
};

userSchema.methods.validPassword = function (password) {
  return this.password === this.setPassword(password);
};

userSchema.pre("save", function (next) {
  this.salt = crypto.randomBytes(20).toString("hex");
  this.password = this.setPassword(this.password);
  next();
});

const User = mongoose.model("Users", userSchema);

module.exports = User;