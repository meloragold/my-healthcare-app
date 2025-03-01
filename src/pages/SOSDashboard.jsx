import { useState, useEffect } from "react";
import axios from "axios";

export default function SOSDashboard() {
  const [alerts, setAlerts] = useState([]);
  const [alertType, setAlertType] = useState("medical");
  const [message, setMessage] = useState("");
  const [location, setLocation] = useState(null);

  useEffect(() => {
    fetchAlerts();
    getLocation();
  }, []);

  const fetchAlerts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/sos");
      setAlerts(response.data);
    } catch (error) {
      console.error("Failed to fetch alerts:", error);
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Location access denied:", error);
        }
      );
    }
  };

  const sendAlert = async () => {
    try {
      await axios.post("http://localhost:5000/api/sos", {
        staff_id: 1, // Hardcoded for now — you can replace with actual staff ID
        alert_type: alertType,
        message,
        location,
      });
      fetchAlerts();
      setMessage("");
      alert("SOS alert sent successfully!");
    } catch (error) {
      console.error("Failed to send alert:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">SOS Alerts Dashboard</h1>
      <div className="mb-6 p-4 border rounded-lg">
        <h2 className="text-xl mb-2">Trigger New SOS Alert</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            value={alertType}
            onChange={(e) => setAlertType(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="medical">Medical</option>
            <option value="security">Security</option>
            <option value="other">Other</option>
          </select>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe the emergency"
            className="p-2 border rounded"
          />
          <button
            onClick={sendAlert}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Send SOS
          </button>
        </div>
      </div>
      <div>
        <h2 className="text-xl mb-2">Recent SOS Alerts</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">ID</th>
                <th className="p-2">Staff ID</th>
                <th className="p-2">Type</th>
                <th className="p-2">Message</th>
                <th className="p-2">Time</th>
                <th className="p-2">Location</th>
              </tr>
            </thead>
            <tbody>
              {alerts.map((alert) => (
                <tr key={alert.id} className="border-t">
                  <td className="p-2">{alert.id}</td>
                  <td className="p-2">{alert.staff_id}</td>
                  <td className="p-2 capitalize">{alert.alert_type}</td>
                  <td className="p-2">{alert.message}</td>
                  <td className="p-2">{new Date(alert.alert_time).toLocaleString()}</td>
                  <td className="p-2">
                    {alert.location?.lat && alert.location?.lng ? (
                      <a
                        href={`https://www.google.com/maps?q=${alert.location.lat},${alert.location.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        View Location
                      </a>
                    ) : (
                      "N/A"
                    )}
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

// Let me know if you want me to refine anything! 🚀
