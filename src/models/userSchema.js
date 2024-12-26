import mongoose  from "mongoose";
import { Schema } from "mongoose";
const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true, // Ensure full name is mandatory
      trim: true, // Remove unnecessary whitespaces
    },
    studentID: {
      type: String,
      required: true,
      unique: true, // Each student ID should be unique
      trim: true,
    },
    year: {
      type: String,
      required: true,
      enum: ["1st", "2nd", "3rd", "4th"], // Allow only these values
    },
    mobileNumber: {
      type: String,
      required: true,
      unique: true,
      match: /^[0-9]{10}$/, // Validate 10-digit phone numbers
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Ensure password has a minimum length
    },
    isApproved: { type: Boolean, default: false },
  },
  { timestamps: true }
); 

export const User = mongoose.model("User", userSchema);
