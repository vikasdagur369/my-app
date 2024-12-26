import { connectDb } from "@/helper/db";
import { Admin } from "@/models/adminSchema";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connectDb();
export async function POST(request) {
  const { userId, password } = await request.json();

  try {
    // find admin in database
    const admin = await Admin.findOne({
      userId: userId,
    });

    // if admin don't exist
    if (admin == null) {
      throw new Error("Invalid Credentials !");
    }

    //checking password

    if (admin.password != password) {
      throw new Error("Invalid Credentials !");
    }
    // creating token
    const token = jwt.sign(
      {
        _id: admin.id,
      },
      process.env.JWT_KEY_ADMIN
    );
    console.log(token);
    const response = NextResponse.json({
      message: "success",
      success: true,
    });

    response.cookies.set("adminToken", token, {
      expiresIn: "1d",
      httpOnly: true,
    });

    return response;
  } catch (error) {
    // error handler
    return NextResponse.json(
      {
        message: error.message,
        success: false,
      },
      { status: 500 }
    );
  }
}
