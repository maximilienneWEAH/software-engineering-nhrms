"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [role, setRole] = useState("patient");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    const passwords: Record<string, string> = {
      patient: "1234",
      doctor: "doctor123",
      nurse: "nurse123",
      lab: "lab123",
    };

    if (password !== passwords[role]) {
      setError("Wrong password");
      return;
    }

    router.push(`/dashboard/${role}`);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">

      {/* IMAGE SIDE (FIXED + RESPONSIVE) */}
      <div className="relative w-full md:w-1/2 h-64 md:h-screen">
        <Image
          src="https://images.unsplash.com/photo-1551190822-a9333d879b1f"
          alt="Healthcare professionals"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* LOGIN SIDE */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-6 bg-gray-50">

        <div className="w-full max-w-md bg-white p-6 rounded-xl shadow">

          {/* TITLE (BLUE → DARK GREEN) */}
          <h1 className="text-2xl font-bold text-green-900 mb-6 text-center">
            Welcome To NHRMS!!!
          </h1>

          {/* ROLE SELECT */}
          <select
            className="w-full p-3 mb-3 border rounded text-black focus:outline-none focus:ring-2 focus:ring-green-800"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="nurse">Nurse</option>
            <option value="lab">Lab Technician</option>
          </select>

          {/* PASSWORD INPUT */}
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-green-800 text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* ERROR MESSAGE */}
          {error && (
            <p className="text-red-500 text-sm mb-3">{error}</p>
          )}

          {/* LOGIN BUTTON (BLUE → DARK GREEN) */}
          <button
            onClick={handleLogin}
            className="w-full bg-green-800 text-white p-3 rounded hover:bg-green-900 transition"
          >
            Login
          </button>

        </div>
      </div>
    </div>
  );
}