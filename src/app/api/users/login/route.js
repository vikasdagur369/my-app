import { connectDb } from "@/helper/db";
import { User } from "@/models/userSchema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Connect to the database
    await connectDb();

    // Parse the request body
    const { studentID, password } = await request.json();

    // Validate input
    if (!studentID || !password) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // Find the user in the database
    const user = await User.findOne({ studentID });
    if (!user) {
      return NextResponse.json(
        { error: "Account doesn't exist!" },
        { status: 404 }
      );
    }

    // Check if the user is approved
    if (!user.isApproved) {
      return NextResponse.json(
        { error: "Your account is not approved by the admin." },
        { status: 403 }
      );
    }

    // Compare the password
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      return NextResponse.json(
        { error: "Invalid credentials!" },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { _id: user.id },
      process.env.JWT_KEY_USER,
      { expiresIn: "1d" } // Token valid for 1 day
    );

    // Create a response with a cookie
    const response = NextResponse.json(
      { message: "Login successful!" },
      { status: 200 }
    );

    response.cookies.set("userToken", token, {
      maxAge: 24 * 60 * 60, // 1 day in seconds
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return response;
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Something went wrong!" },
      { status: 500 }
    );
  }
}
