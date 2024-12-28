"use client";
import { signUp } from "@/services/userService";
import React, { useState } from "react";
import { toast } from "react-toastify";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    studentID: "",
    year: "",
    mobileNumber: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // calling user service
      const result = await signUp(formData);
      console.log(result);
      toast.success("Sign Up !");
    } catch (error) {
      console.log(error);
      toast.error("Error in Signup", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          User Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="space-y-1">
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2  text-black border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Student ID */}
          <div className="space-y-1">
            <label
              htmlFor="studentID"
              className="block text-sm font-medium text-gray-700"
            >
              Student ID
            </label>
            <input
              type="text"
              id="studentID"
              name="studentID"
              value={formData.studentID}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2  text-black border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Year */}
          <div className="space-y-1">
            <label
              htmlFor="year"
              className="block text-sm font-medium text-gray-700"
            >
              Year
            </label>
            <select
              id="year"
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              required
              className="w-full px-3  text-black py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value="">Select Year</option>
              <option value="1st">1st</option>
              <option value="2nd">2nd</option>
              <option value="3rd">3rd</option>
              <option value="4th">4th</option>
            </select>
          </div>

          {/* Mobile Number */}
          <div className="space-y-1">
            <label
              htmlFor="mobileNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Mobile Number
            </label>
            <input
              type="tel"
              id="mobileNumber"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleInputChange}
              required
              pattern="[0-9]{10}"
              className="w-full px-3 py-2 border text-black border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Password */}
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
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border  text-black border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
