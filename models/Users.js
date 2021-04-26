const mongoose = require("mongoose");
const ValidRegNos = require("./ValidRegNos");

const UserSchema = new mongoose.Schema(
  {
    firebaseUid: {
      type: String,
      unique: true,
      index: true,
    },
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      sparse: true,
    },
    registrationNo: {
      type: String,
      index: true,
      unique: true,
      sparse: true,
    },
    wing: [
      {
        type: String,
        enum: ["Software", "Hardware", "Design"],
      },
    ],
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
    newsletterSubscription: Boolean,
    role: {
      type: String,
      enum: ["admin", "user", "restricted"],
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

// checking if registration no is valid
UserSchema.methods.checkValidRegistrationNo = async function (registrationNo) {
  return await ValidRegNos.exists({ registrationNo });
};

module.exports = User = mongoose.model("users", UserSchema);
