import { connectDb } from "@/helper/db";
import { User } from "@/models/userSchema";
import { NextResponse } from "next/server";

connectDb();

export async function POST(request) {
  try {
    const { userId } = await request.json(); // Extract userId from request body

    // Find the user and set `isApproved: true`
    const user = await User.findByIdAndUpdate(
      userId,
      { isApproved: true },
      { new: true }
    );

    if (!user) {
      throw new Error("User not found");
    }

    return NextResponse.json({
      success: true,
      message: "User approved successfully",
      data: user,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
