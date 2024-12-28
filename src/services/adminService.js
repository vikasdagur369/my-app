import { httpAxios } from "@/helper/httpHelper";

export async function login(loginData) {
  const result = await httpAxios
    .post("/api/admin", loginData)
    .then((response) => response.data);

  return result;
}

export async function fetchPendingRequests() {
  try {
    const response = await httpAxios.get("/api/admin/pendingRequests");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching pending requests:", error);
    throw error; // Propagate the error for further handling
  }
}

export async function approve(id) {
  try {
    const response = await httpAxios.patch("/api/admin/approveUser", {
      id: id,
    });
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to approve user";
    console.error("Error while approving user:", errorMessage);
    throw new Error(errorMessage);
  }
}

export async function reject(id) {
  try {
    console.log("reject id is:", id);
    const response = await httpAxios.post("/api/admin/rejectUser", { id: id });
    return response.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Failed to reject user";
    console.error("Error while rejecting user:", errorMessage);
    throw new Error(errorMessage);
  }
}
