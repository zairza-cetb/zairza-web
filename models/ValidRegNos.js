const mongoose = require("mongoose");

const ValidRegNosSchema = new mongoose.Schema({
    reg_nos:Number
});

module.exports = ValidRegNos = mongoose.model("valid_reg_nos", ValidRegNosSchema);