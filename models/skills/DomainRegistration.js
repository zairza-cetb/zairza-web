const mongoose = require("mongoose");

const DomainRegistrationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    domain: { type: mongoose.Schema.Types.ObjectId, ref: "domains" },
    taskStatus: [{ 
      status: Boolean,
      reviewed: Boolean,
      comments: String
    }]
  },
  { strict: true, versionKey: false }
);

module.exports = DomainRegistrations = mongoose.model("domainRegistrations", DomainRegistrationSchema);