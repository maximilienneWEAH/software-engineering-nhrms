"use client";

import { useState } from "react";

type Patient = {
  id: string;
  name: string;
  age: number;
  condition: string;
};

type NurseProfile = {
  name: string;
  id: string;
  department: string;
};

export default function NurseDashboard() {

  // ================= NAVIGATION =================
  const [activeTab, setActiveTab] = useState("dashboard");

  // ================= NURSE PROFILE =================
  const [nurse, setNurse] = useState<NurseProfile>({
    name: "Nurse Emily KAMWA",
    id: "NR-204",
    department: "Cardiology Unit",
  });

  // ================= PATIENTS =================
  const [patients, setPatients] = useState<Patient[]>([
    { id: "PT-001", name: "John Doe", age: 45, condition: "Hypertension" },
    { id: "PT-002", name: "Mary Smith", age: 50, condition: "Diabetes" },
  ]);

  // ================= NEW PATIENT =================
  const [newPatient, setNewPatient] = useState<Patient>({
    id: "",
    name: "",
    age: 0,
    condition: "",
  });

  // ================= RECORDS =================
  const [records, setRecords] = useState<any[]>([]);
  const [recordInput, setRecordInput] = useState({
    patientId: "",
    note: "",
  });

  // ================= REFERRALS =================
  const [referrals, setReferrals] = useState<any[]>([]);
  const [doctorId, setDoctorId] = useState("");

  // ================= PROFILE EDIT =================
  const handleProfileChange = (e: any) => {
    setNurse({
      ...nurse,
      [e.target.name]: e.target.value,
    });
  };

  // ================= ADD PATIENT =================
  const addPatient = () => {
    if (!newPatient.id || !newPatient.name) return;

    setPatients([...patients, newPatient]);

    setNewPatient({
      id: "",
      name: "",
      age: 0,
      condition: "",
    });

    alert("Patient added");
  };

  // ================= ADD RECORD =================
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

  // ================= FORWARD =================
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

    alert("Forwarded to doctor");
  };

  return (
    <div className="min-h-screen flex bg-green-50 text-black">

      {/* ================= SIDEBAR ================= */}
      <aside className="w-80 bg-green-900 text-white p-6 space-y-6">

        {/* PROFILE */}
        <div className="text-center">
          <div className="w-24 h-24 mx-auto bg-green-700 rounded-full mb-3"></div>
          <h2 className="font-bold">{nurse.name}</h2>
          <p className="text-sm text-green-200">{nurse.department}</p>
          <p className="text-xs text-green-300">{nurse.id}</p>
        </div>

        {/* NAV */}
        <div className="space-y-2 text-sm">
          {[
            "dashboard",
            "patients",
            "add patient",
            "records",
            "referrals",
            "profile",
          ].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left p-2 rounded hover:bg-green-800 ${
                activeTab === tab ? "bg-green-800" : ""
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>
      </aside>

      {/* ================= MAIN ================= */}
      <div className="flex-1 p-6 space-y-6">

        <h1 className="text-2xl font-bold text-green-900">
          Nurse Dashboard
        </h1>

        {/* ================= DASHBOARD ================= */}
        {activeTab === "dashboard" && (
          <div className="grid md:grid-cols-3 gap-4">

            <div className="bg-white p-4 rounded shadow">
              Patients: {patients.length}
            </div>

            <div className="bg-white p-4 rounded shadow">
              Records: {records.length}
            </div>

            <div className="bg-white p-4 rounded shadow">
              Referrals: {referrals.length}
            </div>

          </div>
        )}

        {/* ================= PATIENTS ================= */}
        {activeTab === "patients" && (
          <div className="bg-white p-4 rounded shadow">
            {patients.map((p) => (
              <div key={p.id} className="border p-2 rounded mt-2">
                <p>{p.id} - {p.name} - {p.condition}</p>
              </div>
            ))}
          </div>
        )}

        {/* ================= ADD PATIENT ================= */}
        {activeTab === "add patient" && (
          <div className="bg-white p-4 rounded shadow space-y-2">

            <input
              className="w-full p-2 border"
              placeholder="ID"
              value={newPatient.id}
              onChange={(e) =>
                setNewPatient({ ...newPatient, id: e.target.value })
              }
            />

            <input
              className="w-full p-2 border"
              placeholder="Name"
              value={newPatient.name}
              onChange={(e) =>
                setNewPatient({ ...newPatient, name: e.target.value })
              }
            />

            <input
              type="number"
              className="w-full p-2 border"
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
              className="w-full p-2 border"
              placeholder="Condition"
              value={newPatient.condition}
              onChange={(e) =>
                setNewPatient({ ...newPatient, condition: e.target.value })
              }
            />

            <button
              onClick={addPatient}
              className="bg-green-800 text-white px-4 py-2"
            >
              Add Patient
            </button>

          </div>
        )}

        {/* ================= RECORDS ================= */}
        {activeTab === "records" && (
          <div className="bg-white p-4 rounded shadow space-y-2">

            <input
              className="w-full p-2 border"
              placeholder="Patient ID"
              value={recordInput.patientId}
              onChange={(e) =>
                setRecordInput({ ...recordInput, patientId: e.target.value })
              }
            />

            <textarea
              className="w-full p-2 border"
              placeholder="Note"
              value={recordInput.note}
              onChange={(e) =>
                setRecordInput({ ...recordInput, note: e.target.value })
              }
            />

            <button
              onClick={addRecord}
              className="bg-green-800 text-white px-4 py-2"
            >
              Save Record
            </button>

          </div>
        )}

        {/* ================= REFERRALS ================= */}
        {activeTab === "referrals" && (
          <div className="bg-white p-4 rounded shadow space-y-2">

            <input
              className="w-full p-2 border"
              placeholder="Doctor ID"
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
            />

            <button
              onClick={forwardToDoctor}
              className="bg-green-900 text-white px-4 py-2"
            >
              Forward
            </button>

            {referrals.map((r, i) => (
              <div key={i} className="border p-2 mt-2">
                {r.doctorId} → {r.patientId}
              </div>
            ))}

          </div>
        )}

        {/* ================= PROFILE ================= */}
        {activeTab === "profile" && (
          <div className="bg-white p-4 rounded shadow space-y-2">

            <input
              name="name"
              className="w-full p-2 border"
              value={nurse.name}
              onChange={handleProfileChange}
            />

            <input
              name="department"
              className="w-full p-2 border"
              value={nurse.department}
              onChange={handleProfileChange}
            />

          </div>
        )}

      </div>
    </div>
  );
}