const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const ValidRegNos = require("./ValidRegNos");
const ThirdPartyProviderSchema = require("./ThirdPartyAuth");

const UserSchema = new mongoose.Schema(
  {
    firebase_uid: {
      type: String,
      unique: true,
      index: true,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
      index: true,
    },
    registration_no: {
      type: Number,
      unique: true,
      sparse: true,
    },
    password: {
      type: String,
    },
    wing: {
      type: String,
      enum: ["Software", "Hardware", "Design"],
    },
    branch: {
      type: String,
      enum: [
        "Computer Science & Engineering",
        "Information Technology",
        "Electrical Engineering",
        "Mechanical Engineering",
        "Electronics & Intrumentation Engineering",
        "Biotechnology",
        "Civil Engineering",
        "Textile Engineering",
        "Fashion & Apparel Technology",
        "Architecture",
        "Computer Science & Application",
        "Planning",
        "Mathematics & Humanities",
        "Physics",
        "Chemistry",
      ],
    },
    third_party_auth: [ThirdPartyProviderSchema],
    newsletter_subscription: {
      applied: { type: Boolean, default: false },
      applied_at: Date,
    },
    role: {
      type: String,
      enum: ["admin", "restricted"],
      required: true,
      default: "restricted",
    },
  },
  {
    strict: true,
    versionKey: false,
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

// generating a hash
UserSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function (password) {
  if (!this.password) return false;
  return bcrypt.compareSync(password, this.password);
};

// checking if registration no is valid
UserSchema.methods.checkValidRegistrationNo = async function (registration_no) {
  return await ValidRegNos.exists({ registration_no });
};

module.exports = User = mongoose.model("users", UserSchema);
