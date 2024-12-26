import { connectDb } from "@/helper/db";
import { User } from "@/models/userSchema";
import { NextResponse } from "next/server";

connectDb();

export async function POST(request) {
  try {
    const { userId } = await request.json();

    // Delete the user from the database
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      throw new Error("User not found");
    }

    return NextResponse.json({
      success: true,
      message: "User rejected and deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
