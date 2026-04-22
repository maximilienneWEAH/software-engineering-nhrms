"use client";

import { useState } from "react";

export default function DoctorDashboard() {

  // ================= DOCTOR PROFILE =================
  const doctor = {
    name: "Dr. Mayer KWAYO",
    specialty: "Cardiologist",
    id: "DR-102",
  };

  // ================= NAV STATE =================
  const [activeTab, setActiveTab] = useState("overview");

  // ================= DATA =================
  const stats = {
    patientsToday: 12,
    appointments: 8,
    referrals: 3,
    urgentCases: 2,
  };

  const patients = [
    { id: "PT-001", name: "WEAH", condition: "Hypertension" },
    { id: "PT-002", name: "TENKEN", condition: "Diabetes" },
    { id: "PT-003", name: "GUIMAZEU", condition: "Hypertension" },
    { id: "PT-004", name: "KWAIN", condition: "Malaria" },
    { id: "PT-005", name: "KWIDJA", condition: "Thyphoid" },
    { id: "PT-006", name: "TADJEU", condition: "Pregnant" },
    { id: "PT-007", name: "YASIRI", condition: "Hypertension" },
    { id: "PT-008", name: "KAMDJOU", condition: "Hypotension" },
  ];

  const labResults = [
    { patientId: "PT-001", test: "Blood Test", result: "Normal" },
    { patientId: "PT-002", test: "Glucose", result: "High" },
    { patientId: "PT-003", test: "Blood Test", result: "Normal" },
    { patientId: "PT-004", test: "Glucose", result: "High" },
    { patientId: "PT-005", test: "Blood Test", result: "Normal" },
    { patientId: "PT-006", test: "Glucose", result: "High" },
    { patientId: "PT-007", test: "Blood Test", result: "Normal" },
    { patientId: "PT-008", test: "Glucose", result: "High" },
  ];

  const consultations = [
    { id: "PT-001", date: "20/04/2026", note: "Improving condition" },
    { id: "PT-002", date: "19/04/2026", note: "Medication adjusted" },
    { id: "PT-004", date: "20/04/2026", note: "Improving condition" },
    { id: "PT-009", date: "19/04/2026", note: "Medication adjusted" },
    { id: "PT-030", date: "20/04/2026", note: "Improving condition" },
    { id: "PT-006", date: "19/04/2026", note: "Medication adjusted" },
    { id: "PT-020", date: "20/04/2026", note: "Improving condition" },
    { id: "PT-008", date: "19/04/2026", note: "Medication adjusted" },

  ];

  const notifications = [
    "Urgent: PT-002 requires attention",
    "New lab result available",
  ];

  // ================= UPDATE PATIENT =================
  const [selectedId, setSelectedId] = useState("");
  const [updateNote, setUpdateNote] = useState("");
  const [records, setRecords] = useState<any[]>([]);

  const updatePatient = () => {
    if (!selectedId || !updateNote) return;

    setRecords([
      ...records,
      {
        id: selectedId,
        note: updateNote,
        date: new Date().toLocaleDateString(),
      },
    ]);

    setUpdateNote("");
    alert("Patient record updated");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-green-50 text-black">

      {/* ================= SIDEBAR ================= */}
      <aside className="w-full md:w-80 bg-green-900 text-white p-6 space-y-6">

        {/* PROFILE */}
        <div className="text-center">
          <div className="w-24 h-24 mx-auto bg-green-700 rounded-full mb-3"></div>
          <h2 className="font-bold">{doctor.name}</h2>
          <p className="text-sm text-green-200">{doctor.specialty}</p>
          <p className="text-xs text-green-300">{doctor.id}</p>
        </div>

        {/* NAVIGATION MENU */}
        <div className="space-y-2 text-sm">

          <button onClick={() => setActiveTab("overview")} className="w-full text-left hover:bg-green-800 p-2 rounded">
            Dashboard Overview
          </button>

          <button onClick={() => setActiveTab("patients")} className="w-full text-left hover:bg-green-800 p-2 rounded">
            Patients Today ({stats.patientsToday})
          </button>

          <button onClick={() => setActiveTab("appointments")} className="w-full text-left hover:bg-green-800 p-2 rounded">
            Appointments ({stats.appointments})
          </button>

          <button onClick={() => setActiveTab("referrals")} className="w-full text-left hover:bg-green-800 p-2 rounded">
            Referrals ({stats.referrals})
          </button>

          <button onClick={() => setActiveTab("urgent")} className="w-full text-left hover:bg-red-700 p-2 rounded">
            🚨 Urgent Cases ({stats.urgentCases})
          </button>

          <button onClick={() => setActiveTab("lab")} className="w-full text-left hover:bg-green-800 p-2 rounded">
            Lab Results
          </button>

          <button onClick={() => setActiveTab("history")} className="w-full text-left hover:bg-green-800 p-2 rounded">
            Consultation History
          </button>

          <button onClick={() => setActiveTab("update")} className="w-full text-left hover:bg-green-800 p-2 rounded">
            Update Patient Record
          </button>

        </div>

        {/* NOTIFICATIONS */}
        <div>
          <h3 className="font-bold mb-2">Notifications</h3>
          <ul className="text-yellow-200 text-sm space-y-1">
            {notifications.map((n, i) => (
              <li key={i}>• {n}</li>
            ))}
          </ul>
        </div>

      </aside>

      {/* ================= MAIN AREA ================= */}
      <div className="flex-1 p-6 space-y-6">

        <h1 className="text-2xl font-bold text-green-900">
          Doctor Dashboard
        </h1>

        {/* ================= OVERVIEW ================= */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div className="bg-white p-4 rounded shadow">
              <h2 className="font-bold text-green-900">Quick Stats</h2>
              <p>Patients Today: {stats.patientsToday}</p>
              <p>Appointments: {stats.appointments}</p>
              <p>Referrals: {stats.referrals}</p>
              <p>Urgent Cases: {stats.urgentCases}</p>
            </div>

          </div>
        )}

        {/* ================= PATIENTS ================= */}
        {activeTab === "patients" && (
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-bold text-green-900 mb-2">Patients Today</h2>
            {patients.map((p) => (
              <div key={p.id} className="border p-2 rounded mb-2">
                <p><b>{p.id}</b> - {p.name}</p>
                <p>{p.condition}</p>
              </div>
            ))}
          </div>
        )}

        {/* ================= APPOINTMENTS ================= */}
        {activeTab === "appointments" && (
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-bold text-green-900">Appointments</h2>
            <p>No new appointments UI yet (ready for backend)</p>
          </div>
        )}

        {/* ================= REFERRALS ================= */}
        {activeTab === "referrals" && (
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-bold text-green-900">Referrals</h2>
            <p>Pending referrals: {stats.referrals}</p>
          </div>
        )}

        {/* ================= URGENT ================= */}
        {activeTab === "urgent" && (
          <div className="bg-red-50 p-4 rounded shadow border border-red-300">
            <h2 className="font-bold text-red-700">Urgent Cases</h2>
            <p>⚠ PT-002 requires immediate attention</p>
          </div>
        )}

        {/* ================= LAB ================= */}
        {activeTab === "lab" && (
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-bold text-green-900">Lab Results</h2>
            {labResults.map((l, i) => (
              <p key={i}>
                {l.patientId} - {l.test} - {l.result}
              </p>
            ))}
          </div>
        )}

        {/* ================= HISTORY ================= */}
        {activeTab === "history" && (
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-bold text-green-900">Consultation History</h2>
            {consultations.map((c, i) => (
              <p key={i}>
                {c.id} - {c.date} - {c.note}
              </p>
            ))}
          </div>
        )}

        {/* ================= UPDATE ================= */}
        {activeTab === "update" && (
          <div className="bg-white p-4 rounded shadow space-y-2">

            <input
              className="w-full p-2 border rounded"
              placeholder="Patient ID"
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
            />

            <textarea
              className="w-full p-2 border rounded"
              placeholder="Update note"
              value={updateNote}
              onChange={(e) => setUpdateNote(e.target.value)}
            />

            <button
              onClick={updatePatient}
              className="bg-green-800 text-white px-4 py-2 rounded"
            >
              Save Update
            </button>

            {records.map((r, i) => (
              <div key={i} className="border p-2 mt-2 rounded">
                {r.id} - {r.note}
              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}