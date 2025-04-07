const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true, minlength: 3, maxlength: 10 },
    lastName: { type: String, required: true, minlength: 3, maxlength: 10 },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
    },
    companyId: {
      type: String,
    },
  },
  { timestamps: true, minimize: false }
);

module.exports = mongoose.model("clientUser", UserSchema);
