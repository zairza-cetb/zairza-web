const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    name: { 
        type: String, 
        required: true
    },
    imageURL: { 
        type: String, 
        required: true
    },
    startTime: {
        type: Date, 
        required: true
    },
    endTime: {
        type: Date, 
        required: true
    } 
  },
  { strict: true, versionKey: false }
);

module.exports = Events = mongoose.model("events", EventSchema);