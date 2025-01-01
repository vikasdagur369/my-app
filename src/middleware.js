import { NextResponse } from "next/server";

export default function middleware(req) {
  // const { pathname } = req.nextUrl;
  // const adminToken = req.cookies.get("adminToken");
  // const userToken = req.cookies.get("userToken");

  // // Redirect to login if no token is present
  // if (!adminToken && !userToken) {
  //   if (pathname.startsWith("/admin") || pathname.startsWith("/user")) {
  //     return NextResponse.redirect(new URL("/login", req.url));
  //   }
  // }

  // // Admin routes protection
  // if (pathname.startsWith("/admin")) {
  //   if (!adminToken) {
  //     return NextResponse.redirect(new URL("/admin/login", req.url));
  //   }
  // }

  // // User routes protection
  // if (pathname.startsWith("/user")) {
  //   if (!userToken) {
  //     return NextResponse.redirect(new URL("/user/login", req.url));
  //   }
  // }

  // Allow all other routes
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/user/:path*"], // Protect these routes
};
