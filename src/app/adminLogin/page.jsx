"use client";
import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import { toast } from "react-toastify";
import { login } from "@/services/adminService";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    userId: "",
    password: "",
  });

  const loginFormSubmitted = async (event) => {
    event.preventDefault();
    if (loginData.userId.trim() === "" || loginData.password.trim() === "") {
      toast.info("Invalid Data !", {
        position: "top-center",
      });
      return;
    }
    try {
      const result = await login(loginData);
      console.log(result);
      toast.success("Logged In");

      //redirect

      router.push("/admin/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Error in login", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl text-black font-bold text-center">
          Admin Login
        </h2>
        <form onSubmit={loginFormSubmitted} className="space-y-6">
          <div className="space-y-1">
            <label
              htmlFor="userID"
              className="block text-sm font-medium text-gray-700"
            >
              User ID
            </label>
            <input
              type="text"
              id="userID"
              name="userID"
              onChange={(event) => {
                setLoginData({
                  ...loginData,
                  userId: event.target.value,
                });
              }}
              value={loginData.userId}
              required
              className="text-black w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div className="space-y-1">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              onChange={(event) => {
                setLoginData({
                  ...loginData,
                  password: event.target.value,
                });
              }}
              value={loginData.password}
              className=" text-black w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
