const mongoose = require("mongoose");

const ValidRegNosSchema = new mongoose.Schema(
  {
    registrationNo: { type: String, unique: true },
  },
  { strict: true, versionKey: false }
);

ValidRegNosSchema.post("save", function (data) {
  User.findOne({ registrationNo: data.registrationNo }, function (err, user) {
    if (user.role === "restricted") {
      user.role = "user";
      user.save();
    }
  });
});

ValidRegNosSchema.post("findOneAndRemove", function (data) {
  User.findOne({ registrationNo: data.registrationNo }, function (err, user) {
    user.role = "restricted";
    user.save();
  });
});

module.exports = ValidRegNos = mongoose.model("validRegNos", ValidRegNosSchema);
