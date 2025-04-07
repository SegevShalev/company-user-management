const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  companyName: { type: String, required: true, minlength: 3 },
  companyId: { type: String, unique: true, required: true, minlength: 3 },
  serialId: { type: String, unique: true, required: true, minlength: 3 },
});

module.exports = mongoose.model("Company", companySchema);
