import { useState, useEffect } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

export default function MedicationManagement() {
  const [patients, setPatients] = useState([
    {
      name: "John Doe",
      medications: [
        { name: "Aspirin", dosage: "75mg", frequency: "8:00 AM", reminder: true },
      ],
    },
    {
      name: "Jane Smith",
      medications: [
        { name: "Metformin", dosage: "500mg", frequency: "6:00 PM", reminder: true },
      ],
    },
  ]);

  const [alerts, setAlerts] = useState([]);
  const [newMed, setNewMed] = useState({ name: "", medication: "", dosage: "", frequency: "", reminder: false });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const dueAlerts = [];
      
      patients.forEach((patient) => {
        patient.medications.forEach((med) => {
          if (med.reminder && med.frequency === currentTime) {
            dueAlerts.push(`${patient.name} - Time to take ${med.name} (${med.dosage})`);
          }
        });
      });
      
      setAlerts(dueAlerts);
    }, 60000);

    return () => clearInterval(interval);
  }, [patients]);

  const addMedication = () => {
    if (newMed.name && newMed.medication && newMed.dosage && newMed.frequency) {
      const updatedPatients = [...patients];
      const patientIndex = updatedPatients.findIndex((p) => p.name === newMed.name);
      
      if (patientIndex !== -1) {
        updatedPatients[patientIndex].medications.push({
          name: newMed.medication,
          dosage: newMed.dosage,
          frequency: newMed.frequency,
          reminder: newMed.reminder,
        });
      } else {
        updatedPatients.push({
          name: newMed.name,
          medications: [
            { name: newMed.medication, dosage: newMed.dosage, frequency: newMed.frequency, reminder: newMed.reminder },
          ],
        });
      }
      setPatients(updatedPatients);
      setNewMed({ name: "", medication: "", dosage: "", frequency: "", reminder: false });
    }
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Medication Management</h1>

      {patients.map((patient, index) => (
        <Card key={index} className="mb-6 shadow-lg rounded-2xl">
          <CardContent>
            <h2 className="text-xl font-semibold mb-4">{patient.name}</h2>
            <ul>
              {patient.medications.map((med, idx) => (
                <li key={idx} className="mt-2">
                  {med.name} - {med.dosage} @ {med.frequency} {med.reminder && "(Reminder ON)"}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}

      <h2 className="text-xl font-semibold mt-6">Medication Alerts</h2>
      <div>
        {alerts.length > 0 ? (
          alerts.map((alert, index) => (
            <Card key={index} className="mt-4 bg-red-100 border-l-4 border-red-500">
              <CardContent>🔔 {alert}</CardContent>
            </Card>
          ))
        ) : (
          <p className="mt-2 text-gray-600">No current alerts</p>
        )}
      </div>

      <h2 className="text-xl font-semibold mt-6">Add Medication</h2>
      <div className="mt-4 space-y-4">
        <Input placeholder="Patient Name" value={newMed.name} onChange={(e) => setNewMed({ ...newMed, name: e.target.value })} />
        <Input placeholder="Medication" value={newMed.medication} onChange={(e) => setNewMed({ ...newMed, medication: e.target.value })} />
        <Input placeholder="Dosage" value={newMed.dosage} onChange={(e) => setNewMed({ ...newMed, dosage: e.target.value })} />
        <Input placeholder="Frequency (e.g. 8:00 AM)" value={newMed.frequency} onChange={(e) => setNewMed({ ...newMed, frequency: e.target.value })} />
        <div className="flex items-center space-x-2">
          <input type="checkbox" checked={newMed.reminder} onChange={(e) => setNewMed({ ...newMed, reminder: e.target.checked })} />
          <span>Set Reminder</span>
        </div>
        <Button onClick={addMedication} className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">Add Medication</Button>
      </div>
    </div>
  );
}
