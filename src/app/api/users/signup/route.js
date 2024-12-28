import { connectDb } from "@/helper/db";
import { User } from "@/models/userSchema";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    if (request.method !== "POST") {
      return NextResponse.json(
        { message: "Method not allowed.", success: false },
        { status: 405 }
      );
    }

    await connectDb();

    // Extract data from request body
    const { fullName, studentID, year, mobileNumber, password } =
      await request.json();

    // Check if all fields are provided
    if (!fullName || !studentID || !year || !mobileNumber || !password) {
      throw new Error("All fields are required.");
    }

    // Validate mobile number
    if (!/^\d{10}$/.test(mobileNumber)) {
      throw new Error("Invalid mobile number.");
    }

    // Check if the student already exists
    const existingUser = await User.findOne({ studentID });
    if (existingUser) {
      throw new Error("Student with this ID already exists.");
    }

    // Create a new user in the database
    const newUser = new User({
      fullName,
      studentID,
      year,
      mobileNumber,
      password,
    });

    // Validate and hash the password
    const saltRounds = parseInt(process.env.SALT);
    if (isNaN(saltRounds)) {
      throw new Error("Invalid salt value in environment variables.");
    }
    newUser.password = await bcrypt.hash(newUser.password, saltRounds);

    await newUser.save();

    // Respond with success message
    return NextResponse.json({
      message: "User signed up successfully.",
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: error.message,
        success: false,
      },
      { status: 500 }
    );
  }
}
