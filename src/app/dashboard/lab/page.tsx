"use client";

import { useState } from "react";

type LabRequest = {
  patientId: string;
  test: string;
  status: string;
};

type LabResult = {
  patientId: string;
  test: string;
  result: string;
  status: "Normal" | "Abnormal" | "Critical";
  date: string;
};

export default function LabDashboard() {

  // ================= NAVIGATION =================
  const [activeTab, setActiveTab] = useState("dashboard");

  // ================= LAB TECH PROFILE =================
  const labTech = {
    name: "Lab Technician - KAMGA ALAIN",
    id: "LAB-301",
    department: "Medical Laboratory",
  };

  // ================= LAB REQUESTS =================
  const [requests] = useState<LabRequest[]>([
    { patientId: "PT-001", test: "Blood Test", status: "Pending" },
    { patientId: "PT-002", test: "Glucose Test", status: "Pending" },
    { patientId: "PT-003", test: "Malaria Test", status: "Pending" },
  ]);

  // ================= LAB RESULTS =================
  const [results, setResults] = useState<LabResult[]>([]);

  // ================= RESULT FORM =================
  const [form, setForm] = useState({
    patientId: "",
    test: "",
    result: "",
    status: "Normal",
  });

  // ================= DOCTOR FORWARD =================
  const [doctorId, setDoctorId] = useState("");

  const [sentResults, setSentResults] = useState<any[]>([]);

  // ================= ADD RESULT =================
  const addResult = () => {
    if (!form.patientId || !form.test || !form.result) return;

    const newResult: LabResult = {
      ...form,
      status: form.status as any,
      date: new Date().toLocaleDateString(),
    };

    setResults([...results, newResult]);

    setForm({
      patientId: "",
      test: "",
      result: "",
      status: "Normal",
    });
  };

  // ================= SEND TO DOCTOR =================
  const sendToDoctor = (result: LabResult) => {
    if (!doctorId) return;

    setSentResults([
      ...sentResults,
      {
        ...result,
        doctorId,
      },
    ]);

    alert(`Sent to Doctor ${doctorId}`);
  };

  return (
    <div className="min-h-screen flex bg-green-50 text-black">

      {/* ================= SIDEBAR ================= */}
      <aside className="w-80 bg-green-900 text-white p-6 space-y-6">

        {/* PROFILE */}
        <div className="text-center">
          <div className="w-24 h-24 mx-auto bg-green-700 rounded-full mb-3"></div>
          <h2 className="font-bold">{labTech.name}</h2>
          <p className="text-sm text-green-200">{labTech.department}</p>
          <p className="text-xs text-green-300">{labTech.id}</p>
        </div>

        {/* NAV */}
        <div className="space-y-2">
          {["dashboard", "requests", "results", "send"].map((tab) => (
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
          Lab Technician Dashboard
        </h1>

        {/* ================= DASHBOARD ================= */}
        {activeTab === "dashboard" && (
          <div className="grid md:grid-cols-3 gap-4">

            <div className="bg-white p-4 rounded shadow">
              Lab Requests: {requests.length}
            </div>

            <div className="bg-white p-4 rounded shadow">
              Results: {results.length}
            </div>

            <div className="bg-white p-4 rounded shadow">
              Sent to Doctors: {sentResults.length}
            </div>

          </div>
        )}

        {/* ================= REQUESTS ================= */}
        {activeTab === "requests" && (
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-bold text-green-900">Incoming Requests</h2>

            {requests.map((r, i) => (
              <div key={i} className="border p-2 rounded mt-2">
                <p><b>Patient:</b> {r.patientId}</p>
                <p><b>Test:</b> {r.test}</p>
                <p><b>Status:</b> {r.status}</p>
              </div>
            ))}
          </div>
        )}

        {/* ================= ADD RESULT ================= */}
        {activeTab === "results" && (
          <div className="bg-white p-4 rounded shadow space-y-2">

            <h2 className="font-bold text-green-900">Upload Lab Result</h2>

            <input
              className="w-full p-2 border"
              placeholder="Patient ID"
              value={form.patientId}
              onChange={(e) =>
                setForm({ ...form, patientId: e.target.value })
              }
            />

            <input
              className="w-full p-2 border"
              placeholder="Test Type"
              value={form.test}
              onChange={(e) =>
                setForm({ ...form, test: e.target.value })
              }
            />

            <textarea
              className="w-full p-2 border"
              placeholder="Result"
              value={form.result}
              onChange={(e) =>
                setForm({ ...form, result: e.target.value })
              }
            />

            <select
              className="w-full p-2 border"
              value={form.status}
              onChange={(e) =>
                setForm({ ...form, status: e.target.value })
              }
            >
              <option>Normal</option>
              <option>Abnormal</option>
              <option>Critical</option>
            </select>

            <button
              onClick={addResult}
              className="bg-green-800 text-white px-4 py-2 rounded"
            >
              Save Result
            </button>

            {/* RESULTS LIST */}
            <div className="mt-4">
              {results.map((r, i) => (
                <div
                  key={i}
                  className={`border p-2 rounded mt-2 ${
                    r.status === "Critical"
                      ? "bg-red-100 border-red-400"
                      : ""
                  }`}
                >
                  <p><b>Patient:</b> {r.patientId}</p>
                  <p><b>Test:</b> {r.test}</p>
                  <p><b>Result:</b> {r.result}</p>
                  <p><b>Status:</b> {r.status}</p>

                  <button
                    onClick={() => sendToDoctor(r)}
                    className="mt-2 bg-green-900 text-white px-3 py-1 rounded"
                  >
                    Send to Doctor
                  </button>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ================= SEND HISTORY ================= */}
        {activeTab === "send" && (
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-bold text-green-900">Sent Results</h2>

            <input
              className="w-full p-2 border mb-2"
              placeholder="Doctor ID"
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
            />

            {sentResults.map((s, i) => (
              <div key={i} className="border p-2 rounded mt-2">
                <p><b>Doctor:</b> {s.doctorId}</p>
                <p><b>Patient:</b> {s.patientId}</p>
                <p><b>Test:</b> {s.test}</p>
                <p><b>Status:</b> {s.status}</p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}