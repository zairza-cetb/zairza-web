const mongoose = require("mongoose");

const NewsletterSchema = new mongoose.Schema(
  {
    scheduleDate: {
      type: Date,
      required: true
    },
    subscribed: Number,
    sent: Number,
    notSent: Number,
    status: String,
  },
  {
    strict: true,
    versionKey: false,
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);


module.exports = Newsletter = mongoose.model("newsletter", NewsletterSchema);