import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAcknowledgmentLogs,
  getAllUsers,
  getFilteredLogs,
} from "../services/api";
import { setLogs } from "../slices/logSlice";
import Navbar from "./NavBar";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const logs = useSelector((state) => state.logs.acknowledgmentLogs);
  const [filter, setFilter] = useState({
    userId: "",
    startDate: "",
    endDate: "",
  });
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await getAcknowledgmentLogs();
        dispatch(setLogs(response.data));
      } catch (error) {
        setError("Failed to fetch logs");
      }
    };

    fetchLogs();
  }, [dispatch]);

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const showTemporaryMessage = (setMessage) => {
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  const handleFilterLogs = async () => {
    try {
      const response = await getFilteredLogs(filter);
      dispatch(setLogs(response.data));
      if (response.data.length === 0) {
        setError("Logs not found");
        setSuccess(""); 
      } else {
        setError("");
        setSuccess("Logs filtered successfully.");
        showTemporaryMessage(setSuccess);
      }
    } catch (error) {
      // console.error("Error fetching filtered logs:", error);
      setError("Failed to filter logs. Please try again.");
      showTemporaryMessage(setError);
    }
  };
  

  return (
    <>
      <Navbar />
      <div className="p-4 mt-14 bg-gray-100 min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Users medicine log (for admin)</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 p-2 text-sm">User Name</th>
                <th className="border border-gray-300 p-2 text-sm">Email</th>
                <th className="border border-gray-300 p-2 text-sm">Medicine Name</th>
                <th className="border border-gray-300 p-2 text-sm">Dosage</th>
                <th className="border border-gray-300 p-2 text-sm">Status</th>
                <th className="border border-gray-300 p-2 text-sm">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log._id}>
                  <td className="border border-gray-300 p-2 text-sm">{log.userId.name}</td>
                  <td className="border border-gray-300 p-2 text-sm">{log.userId?.email}</td>
                  <td className="border border-gray-300 p-2 text-sm">{log?.medicineId?.name}</td>
                  <td className="border border-gray-300 p-2 text-sm">{log?.medicineId?.dosage}</td>
                  <td className="border border-gray-300 p-2 text-sm">{log.status}</td>
                  <td className="border border-gray-300 p-2 text-sm">{new Date(log.timestamp).toLocaleString("en-GB")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-semibold mt-6 mb-2">Filter Logs</h3>
        <div className="flex flex-col sm:flex-row sm:space-x-4 mb-4">
          <label className="mr-2">User</label>
          <select
            value={filter.userId}
            onChange={(e) => setFilter({ ...filter, userId: e.target.value })}
            className="border rounded py-2 px-3 mb-2 sm:mb-0 w-full"
          >
            <option value="">Select User ID</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name} (ID: {user._id})
              </option>
            ))}
          </select>
          <div className="flex items-center">
            <span className="mx-2">Or</span>
            <span className="mr-2">Date Range</span>
          </div>
          <div className="flex space-x-2 w-full">
            <input
              type="date"
              value={filter.startDate}
              onChange={(e) => setFilter({ ...filter, startDate: e.target.value })}
              className="border rounded py-2 px-3 w-full"
            />
            <input
              type="date"
              value={filter.endDate}
              onChange={(e) => setFilter({ ...filter, endDate: e.target.value })}
              className="border rounded py-2 px-3 w-full"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleFilterLogs}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 w-full sm:w-auto"
          >
            Filter Logs
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
