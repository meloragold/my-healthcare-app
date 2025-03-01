import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent } from "../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { LoaderCircle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function VitalsDashboard() {
  const [vitals, setVitals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/vitals")
      .then((response) => {
        setVitals(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching vitals data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Vitals Monitoring Dashboard</h1>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <LoaderCircle className="animate-spin" size={48} />
        </div>
      ) : (
        <>
          <Card>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>User ID</TableHead>
                    <TableHead>Blood Pressure (BP)</TableHead>
                    <TableHead>Heart Rate (HR)</TableHead>
                    <TableHead>Temperature (°C)</TableHead>
                    <TableHead>Timestamp</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vitals.map((vital) => (
                    <TableRow key={vital.id}>
                      <TableCell>{vital.id}</TableCell>
                      <TableCell>{vital.user_id}</TableCell>
                      <TableCell>{vital.bp}</TableCell>
                      <TableCell>{vital.hr}</TableCell>
                      <TableCell>{vital.temperature}</TableCell>
                      <TableCell>{new Date(vital.timestamp).toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <h2 className="text-xl font-semibold mt-6 mb-4">Vitals Overview</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={vitals}>
              <XAxis dataKey="user_id" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="hr" fill="#8884d8" name="Heart Rate (HR)" />
              <Bar dataKey="temperature" fill="#82ca9d" name="Temperature (°C)" />
            </BarChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  );
}

// This will render a bar graph showing Heart Rate and Temperature for each User ID.
// Let me know if you want to visualize other vitals or customize the chart further! 🚀