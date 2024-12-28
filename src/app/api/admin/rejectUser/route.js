import { connectDb } from "@/helper/db";
import { User } from "@/models/userSchema";
import { NextResponse } from "next/server";

connectDb();

export async function POST(request) {
  try {
    const { id } = await request.json();
    console.log(id);
    // Delete the user from the database
    const user = await User.findByIdAndDelete(id);

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
