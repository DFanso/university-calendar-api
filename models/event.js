const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  degree: { type: String, ref: "Degree" },
  faculty: { type: String, ref: "Faculty" },
  batch: { type: String, ref: "Batch" },
});

module.exports = mongoose.model("Event", EventSchema);
