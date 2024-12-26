import { connectDb } from "@/helper/db";
import { User } from "@/models/userSchema";
import { NextResponse } from "next/server";

connectDb();

export async function GET() {
  try {
    // Fetch users with `isApproved: false`
    const pendingRequests = await User.find({ isApproved: false });

    return NextResponse.json({
      success: true,
      data: pendingRequests,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
