import React, { useEffect, useState } from "react";
import axios from "axios";

function WorkloadMonitoring() {
  const [workloadData, setWorkloadData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/workload")
      .then((response) => setWorkloadData(response.data))
      .catch((error) => console.error("Error fetching workload data:", error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Workload Monitoring Dashboard
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="py-3 px-4 border">ID</th>
                <th className="py-3 px-4 border">Staff ID</th>
                <th className="py-3 px-4 border">Workload Level</th>
                <th className="py-3 px-4 border">Suggested Break Time</th>
                <th className="py-3 px-4 border">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {workloadData.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-blue-100 transition-colors"
                >
                  <td className="py-2 px-4 border text-center">{item.id}</td>
                  <td className="py-2 px-4 border text-center">{item.staff_id}</td>
                  <td
                    className={`py-2 px-4 border text-center font-semibold ${
                      item.workload_level === "high"
                        ? "text-red-500"
                        : item.workload_level === "moderate"
                        ? "text-yellow-500"
                        : "text-green-500"
                    }`}
                  >
                    {item.workload_level}
                  </td>
                  <td className="py-2 px-4 border text-center">
                    {item.suggested_break_time}
                  </td>
                  <td className="py-2 px-4 border text-center">
                    {new Date(item.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default WorkloadMonitoring;

// Let me know if you want any adjustments, like adding filters or charts! 🚀
