"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
//import Image from "next/image";

export default function Home() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");
  const [error, setError] = useState("");

  const handleLogin = () => {
    // ⚠️ Simple demo passwords (we will secure this later)
    const passwords: Record<string, string> = {
      patient: "1234",
      doctor: "doctor123",
      nurse: "nurse123",
      lab: "lab123",
    };

    if (password !== passwords[role]) {
      setError("Invalid password for selected role");
      return;
    }

    // Redirect based on role
    if (role === "patient") router.push("/dashboard/patient");
    if (role === "doctor") router.push("/dashboard/doctor");
    if (role === "nurse") router.push("/dashboard/nurse");
    if (role === "lab") router.push("/dashboard/lab");
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left Image Section */}
      <div className="hidden md:flex items-center justify-center bg-blue-600 p-6">
        <img
          src="https://images.unsplash.com/photo-1581595219315-a187dd40c322"
          alt="health image"
          className="w-full h-96 object-cover"
        />
      </div>

      {/* Right Login Section */}
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
          <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">
            Health System Login
          </h1>

          {/* Name */}
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mb-3 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* ID */}
          <input
            type="text"
            placeholder="User ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="w-full mb-3 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Role */}
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full mb-3 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="nurse">Nurse</option>
            <option value="lab">Lab Technician</option>
          </select>

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-3 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm mb-3 text-center">{error}</p>
          )}

          {/* Button */}
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}