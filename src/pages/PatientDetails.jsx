import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import Badge from "../components/ui/Badge";

const initialPatients = [
  { name: "John Doe", room: 701, age: 65, status: "High Priority", statusColor: "red", summary: "John is under observation for cardiac issues." },
  { name: "Emma Wilson", room: 702, age: 45, status: "Stable", statusColor: "green", summary: "Emma is recovering well after surgery." },
  { name: "Aria Thompson", room: 703, age: 30, status: "Moderate", statusColor: "yellow", summary: "Aria is being monitored for respiratory concerns." },
  { name: "Maya Roberts", room: 704, age: 50, status: "Stable", statusColor: "green", summary: "Maya is managing her diabetes with medication." },
];

export default function PatientDetails() {
  const [patients, setPatients] = useState(initialPatients);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newPatient, setNewPatient] = useState({
    name: "",
    room: "",
    age: "",
    status: "",
    statusColor: "",
    summary: "",
  });

  const addPatient = () => {
    setPatients([...patients, newPatient]);
    setNewPatient({ name: "", room: "", age: "", status: "", statusColor: "", summary: "" });
    setShowForm(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Patients</h1>
      <Button className="mb-4" onClick={() => setShowForm(true)}>Add Patient</Button>

      {showForm && (
        <div className="mb-6 p-4 border rounded-lg bg-white shadow">
          <h2 className="text-xl font-bold mb-4">Add New Patient</h2>
          <input className="border p-2 w-full mb-2" placeholder="Name" value={newPatient.name} onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })} />
          <input className="border p-2 w-full mb-2" placeholder="Room" value={newPatient.room} onChange={(e) => setNewPatient({ ...newPatient, room: e.target.value })} />
          <input className="border p-2 w-full mb-2" placeholder="Age" value={newPatient.age} onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })} />
          <input className="border p-2 w-full mb-2" placeholder="Status" value={newPatient.status} onChange={(e) => setNewPatient({ ...newPatient, status: e.target.value })} />
          <input className="border p-2 w-full mb-2" placeholder="Status Color" value={newPatient.statusColor} onChange={(e) => setNewPatient({ ...newPatient, statusColor: e.target.value })} />
          <textarea className="border p-2 w-full mb-2" placeholder="Summary" value={newPatient.summary} onChange={(e) => setNewPatient({ ...newPatient, summary: e.target.value })} />
          <Button onClick={addPatient}>Save Patient</Button>
        </div>
      )}

      <div className="space-y-4">
        {patients.map((patient, index) => (
          <Card key={index} className="cursor-pointer hover:shadow-lg" onClick={() => setSelectedPatient(patient)}>
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-bold">{patient.name}</h2>
                <p className="text-gray-600">Room {patient.room} · Age {patient.age}</p>
              </div>
              <Badge className={`bg-${patient.statusColor}-500`}>{patient.status}</Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedPatient && (
        <div className="mt-6 p-4 border rounded-lg bg-white shadow">
          <h2 className="text-xl font-bold">{selectedPatient.name}</h2>
          <p className="text-gray-600">Room {selectedPatient.room} · Age {selectedPatient.age}</p>
          <Badge className={`bg-${selectedPatient.statusColor}-500 mt-2`}>{selectedPatient.status}</Badge>
          <p className="mt-4">{selectedPatient.summary}</p>
        </div>
      )}
    </div>
  );
}
