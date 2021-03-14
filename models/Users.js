const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const ThirdPartyProviderSchema = require("./ThirdPartyAuth");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    email_is_verified: {
      type: Boolean,
      default: false,
    },
    registration_no: {
      type: Number,
      unique: true,
      sparse: true,
    },
    password: {
      type: String,
    },
    third_party_auth: [ThirdPartyProviderSchema],
    created_at: {
      type: Date,
      default: Date.now,
    },
    newsletter_subscription: {
      applied: { type: Boolean, default: false },
      applied_at: Date,
    },
  },
  { strict: false }
);

// generating a hash
UserSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = User = mongoose.model("users", UserSchema);
