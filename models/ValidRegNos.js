const mongoose = require("mongoose");

const ValidRegNosSchema = new mongoose.Schema(
  {
    registrationNo: { type: String, unique: true },
  },
  { strict: true, versionKey: false }
);

module.exports = ValidRegNos = mongoose.model("validRegNos", ValidRegNosSchema);
