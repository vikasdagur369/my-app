const { Schema, default: mongoose } = require("mongoose");

const adminSchema = new Schema({
  userid: { type: String, required: true },
  password: { type: String, required: true },
});

export const Admin = mongoose.model("admins", adminSchema);
