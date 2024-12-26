"use client";
import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);

  // Fetch pending requests from the server
  useEffect(() => {
    const fetchRequests = async () => {
      const response = await fetch("/api/admin/requests"); // Replace with your API endpoint
      const data = await response.json();
      setRequests(data.requests);
    };

    fetchRequests();
  }, []);

  // Handle Approve/Reject Actions
  const handleAction = async (id, action) => {
    try {
      const response = await fetch(`/api/admin/requests/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action }),
      });

      const result = await response.json();
      if (result.success) {
        // Update the UI after approval/rejection
        setRequests((prevRequests) =>
          prevRequests.filter((request) => request.id !== id)
        );
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error handling request:", error);
    }
  };

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Admin Dashboard
      </h1>
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700">
          Pending Account Approvals
        </h2>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.length > 0 ? (
              requests.map((request) => (
                <tr key={request.id} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-3 text-gray-800">{request.name}</td>
                  <td className="px-4 py-3 text-gray-800">{request.email}</td>
                  <td className="px-4 py-3 text-gray-800">
                    {request.role || "Student"}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleAction(request.id, "approve")}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 mr-2"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleAction(request.id, "reject")}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No pending requests.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
