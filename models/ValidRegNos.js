const mongoose = require("mongoose");

const ValidRegNosSchema = new mongoose.Schema({
  registration_no: { type: Number, unique: true },
});

module.exports = ValidRegNos = mongoose.model(
  "valid_reg_nos",
  ValidRegNosSchema
);
