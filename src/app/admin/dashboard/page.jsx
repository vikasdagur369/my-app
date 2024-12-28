"use client";
import { approve, fetchPendingRequests, reject } from "@/services/adminService";
import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetching accounts from server with isApproved=false
  useEffect(() => {
    const loadPendingRequests = async () => {
      try {
        const data = await fetchPendingRequests();
        setPendingRequests(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching pending requests:", err);
        setError("Failed to load pending requests.");
        setLoading(false);
      }
    };

    loadPendingRequests();
  }, []);

  // Handle approve button functionality
  const handleApprove = async (id) => {
    try {
      await approve(id);
      console.log(`Approved user with ID: ${id}`);
      // Update UI: Remove approved user
      setPendingRequests((prev) => prev.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error while approving user:", error.message);
      alert("Failed to approve user. Please try again.");
    }
  };

  // Handle reject button functionality
  const handleReject = async (id) => {
    try {
      await reject(id);
      console.log(`Rejected user with ID: ${id}`);
      setPendingRequests((prev) => prev.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error while rejecting user:", error.message);
      alert("Failed to reject user. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-green-500">
        Admin Dashboard
      </h1>
      {loading && <p className="text-center">Loading pending requests...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && pendingRequests.length === 0 && (
        <p className="text-center text-gray-600">No pending requests found.</p>
      )}
      <div className="max-w-4xl mx-auto">
        <table className="w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Student ID</th>
              <th className="py-3 px-4 text-left">Year</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingRequests.map((request) => (
              <tr
                key={request._id}
                className="border-t hover:bg-gray-50 text-gray-700"
              >
                <td className="py-3 px-4">{request.fullName}</td>
                <td className="py-3 px-4">{request.studentID}</td>
                <td className="py-3 px-4">{request.year}</td>
                <td className="py-3 px-4 flex justify-center space-x-2">
                  <button
                    onClick={() => handleApprove(request._id)}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(request._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
