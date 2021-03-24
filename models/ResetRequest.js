const mongoose = require("mongoose");

const ResetRequestSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectID, ref: "Users" },
  createdAt: { type: Date, expires: "10m", default: Date.now },
});

module.exports = ResetRequest = mongoose.model(
  "reset_requests",
  ResetRequestSchema
);
