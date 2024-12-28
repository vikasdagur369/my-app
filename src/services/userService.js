import { httpAxios } from "@/helper/httpHelper";

export async function signUp(formData) {
  try {
    // Ensure formData is provided
    if (!formData || typeof formData !== "object") {
      throw new Error("Invalid form data provided.");
    }

    // Make the POST request
    const response = await httpAxios.post("/api/users/signup", formData);

    // Return the response data
    return response.data;
  } catch (error) {
    // Handle and log errors
    console.error("Error during sign-up:", error.message || error);

    // Throw an error to notify the calling function
    throw new Error(
      error.response?.data?.message || "Failed to sign up. Please try again."
    );
  }
}
