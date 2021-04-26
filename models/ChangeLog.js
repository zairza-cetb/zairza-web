const mongoose = require("mongoose");

module.exports = ChangeLog = mongoose.model(
  "ChangeLog",
  mongoose.Schema(
    {
      action: { type: String },
      userId: { type: mongoose.Types.ObjectId, ref: "User" },
      resource: { type: String },
      recordId: { type: mongoose.Types.ObjectId },
      createdAt: { type: Date, expires: "720h", default: Date.now }
    },
    { versionKey: false }
  )
);