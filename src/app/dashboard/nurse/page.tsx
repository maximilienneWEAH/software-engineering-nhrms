"use client";

import { useState } from "react";

export default function NurseDashboard() {

  // ================= NURSE PROFILE =================
  const nurse = {
    name: "Nurse Emily KAMWA",
    id: "NR-204",
    department: "Cardiology Unit",
  };

  // ================= PATIENTS =================
  type Patient = {
  id: string;
  name: string;
  age: number;
  condition: string;
};
  const [patients, setPatients] = useState<Patient[]>([
    { id: "PT-001", name: "John Doe", age: 45, condition: "Hypertension" },
    { id: "PT-002", name: "Mary Smith", age: 50, condition: "Diabetes" },
  ]);

  // ================= NEW PATIENT FORM =================
  const [newPatient, setNewPatient] = useState({
    id: "",
    name: "",
    age: 0,
    condition: "",
  });

  // ================= HEALTH RECORDS =================
  const [records, setRecords] = useState<any[]>([]);

  const [recordInput, setRecordInput] = useState({
    patientId: "",
    note: "",
  });

  // ================= REFERRALS =================
  const [referrals, setReferrals] = useState<any[]>([]);

  const [doctorId, setDoctorId] = useState("");

  // ================= ADD PATIENT =================
  const addPatient = () => {
  if (!newPatient.id || !newPatient.name) return;

  const patientToAdd: Patient = {
    ...newPatient,
  };

  setPatients([...patients, patientToAdd]);

  setNewPatient({
    id: "",
    name: "",
    age: 0,
    condition: "",
  });

  alert("Patient added successfully");
};

  // ================= ADD HEALTH RECORD =================
  const addRecord = () => {
    if (!recordInput.patientId || !recordInput.note) return;

    setRecords([
      ...records,
      {
        ...recordInput,
        date: new Date().toLocaleDateString(),
      },
    ]);

    setRecordInput({ patientId: "", note: "" });
  };

  // ================= FORWARD TO DOCTOR =================
  const forwardToDoctor = () => {
    if (!doctorId || !recordInput.patientId) return;

    setReferrals([
      ...referrals,
      {
        doctorId,
        patientId: recordInput.patientId,
        date: new Date().toLocaleDateString(),
      },
    ]);

    alert(`Forwarded to Doctor ${doctorId}`);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-green-50 text-black">

      {/* ================= SIDEBAR ================= */}
      <aside className="w-full md:w-80 bg-green-900 text-white p-6 space-y-6">

        {/* PROFILE */}
        <div className="text-center">
          <div className="w-24 h-24 mx-auto bg-green-700 rounded-full mb-3"></div>
          <h2 className="font-bold">{nurse.name}</h2>
          <p className="text-sm text-green-200">{nurse.department}</p>
          <p className="text-xs text-green-300">{nurse.id}</p>
        </div>

        {/* QUICK INFO */}
        <div className="text-sm space-y-2">
          <p>📌 Patients: {patients.length}</p>
          <p>🧾 Records: {records.length}</p>
          <p>📤 Referrals: {referrals.length}</p>
        </div>

      </aside>

      {/* ================= MAIN ================= */}
      <div className="flex-1 p-6 space-y-6">

        <h1 className="text-2xl font-bold text-green-900">
          Nurse Dashboard
        </h1>

        {/* ================= ADD PATIENT ================= */}
        <div className="bg-white p-4 rounded shadow space-y-2">
          <h2 className="font-bold text-green-900">Add New Patient</h2>

          <input
  type="number"
  className="w-full p-2 border rounded"
  placeholder="Age"
  value={newPatient.age}
  onChange={(e) =>
    setNewPatient({
      ...newPatient,
      age: Number(e.target.value),
    })
  }
/>

          <input
            className="w-full p-2 border rounded"
            placeholder="Name"
            value={newPatient.name}
            onChange={(e) => setNewPatient({ ...newPatient, name: e.target.value })}
          />

          <input
            className="w-full p-2 border rounded"
            placeholder="Age"
            value={newPatient.age}
            onChange={(e) => setNewPatient({ ...newPatient, age: e.target.value })}
          />

          <input
            className="w-full p-2 border rounded"
            placeholder="Condition"
            value={newPatient.condition}
            onChange={(e) =>
              setNewPatient({ ...newPatient, condition: e.target.value })
            }
          />

          <button
            onClick={addPatient}
            className="bg-green-800 text-white px-4 py-2 rounded hover:bg-green-900"
          >
            Add Patient
          </button>
        </div>

        {/* ================= PATIENT LIST ================= */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold text-green-900">Patients</h2>

          {patients.map((p) => (
            <div key={p.id} className="border p-2 rounded mt-2">
              <p><b>ID:</b> {p.id}</p>
              <p><b>Name:</b> {p.name}</p>
              <p><b>Condition:</b> {p.condition}</p>
            </div>
          ))}
        </div>

        {/* ================= HEALTH RECORD ================= */}
        <div className="bg-white p-4 rounded shadow space-y-2">
          <h2 className="font-bold text-green-900">Add Health Record</h2>

          <input
            className="w-full p-2 border rounded"
            placeholder="Patient ID"
            value={recordInput.patientId}
            onChange={(e) =>
              setRecordInput({ ...recordInput, patientId: e.target.value })
            }
          />

          <textarea
            className="w-full p-2 border rounded"
            placeholder="Health note"
            value={recordInput.note}
            onChange={(e) =>
              setRecordInput({ ...recordInput, note: e.target.value })
            }
          />

          <button
            onClick={addRecord}
            className="bg-green-800 text-white px-4 py-2 rounded"
          >
            Save Record
          </button>
        </div>

        {/* ================= FORWARD TO DOCTOR ================= */}
        <div className="bg-white p-4 rounded shadow space-y-2">
          <h2 className="font-bold text-green-900">Forward to Doctor</h2>

          <input
            className="w-full p-2 border rounded"
            placeholder="Doctor ID"
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
          />

          <input
            className="w-full p-2 border rounded"
            placeholder="Patient ID"
            value={recordInput.patientId}
            onChange={(e) =>
              setRecordInput({ ...recordInput, patientId: e.target.value })
            }
          />

          <button
            onClick={forwardToDoctor}
            className="bg-green-900 text-white px-4 py-2 rounded hover:bg-green-800"
          >
            Forward
          </button>
        </div>

        {/* ================= REFERRALS ================= */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-bold text-green-900">Sent Referrals</h2>

          {referrals.map((r, i) => (
            <div key={i} className="border p-2 rounded mt-2">
              <p><b>Doctor:</b> {r.doctorId}</p>
              <p><b>Patient:</b> {r.patientId}</p>
              <p><b>Date:</b> {r.date}</p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}