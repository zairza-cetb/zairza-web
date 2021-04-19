const mongoose = require("mongoose");

const ValidRegNosSchema = new mongoose.Schema({
  registrationNo: { type: Number, unique: true },
});

module.exports = ValidRegNos = mongoose.model(
  "validRegNos",
  ValidRegNosSchema
);
