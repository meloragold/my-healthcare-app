import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent } from "../components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

export default function DischargeDashboard() {
  const [summaries, setSummaries] = useState([]);
  const [newSummary, setNewSummary] = useState({
    user_id: "",
    summary: "",
    doctor_name: "",
    discharge_date: "",
  });

  const fetchSummaries = () => {
    axios
      .get("http://localhost:5000/api/discharge")
      .then((response) => setSummaries(response.data))
      .catch((error) => console.error("Error fetching discharge summaries:", error));
  };

  useEffect(() => {
    fetchSummaries();
  }, []);

  const handleAddSummary = () => {
    axios
      .post("http://localhost:5000/api/discharge", newSummary)
      .then(() => {
        fetchSummaries();
        setNewSummary({ user_id: "", summary: "", doctor_name: "", discharge_date: "" });
      })
      .catch((error) => console.error("Failed to add discharge summary:", error));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Discharge Summary Dashboard</h1>
      <Card>
        <CardContent>
          <h2 className="text-xl mb-4">Add New Discharge Summary</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <Input placeholder="User ID" value={newSummary.user_id} onChange={(e) => setNewSummary({ ...newSummary, user_id: e.target.value })} />
            <Input placeholder="Doctor Name" value={newSummary.doctor_name} onChange={(e) => setNewSummary({ ...newSummary, doctor_name: e.target.value })} />
            <Input placeholder="Discharge Date" type="date" value={newSummary.discharge_date} onChange={(e) => setNewSummary({ ...newSummary, discharge_date: e.target.value })} />
            <Input placeholder="Summary" value={newSummary.summary} onChange={(e) => setNewSummary({ ...newSummary, summary: e.target.value })} />
          </div>
          <Button onClick={handleAddSummary}>Add Summary</Button>
        </CardContent>
      </Card>

      <h2 className="text-xl font-bold my-6">Discharge Summaries</h2>
      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>User ID</TableHead>
                <TableHead>Summary</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Discharge Date</TableHead>
                <TableHead>Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {summaries.map((summary) => (
                <TableRow key={summary.id}>
                  <TableCell>{summary.id}</TableCell>
                  <TableCell>{summary.user_id}</TableCell>
                  <TableCell>{summary.summary}</TableCell>
                  <TableCell>{summary.doctor_name}</TableCell>
                  <TableCell>{summary.discharge_date}</TableCell>
                  <TableCell>{new Date(summary.timestamp).toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

// Let me know if you want me to tweak anything! 🚀
