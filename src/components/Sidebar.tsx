import Link from "next/link";

export function Sidebar() {
  return (
    <div className="w-64 bg-white h-screen shadow-md hidden md:flex flex-col p-4 gap-4">
      <Link href="/dashboard" className="hover:text-blue-600">Dashboard</Link>
      <Link href="/patients" className="hover:text-blue-600">Patients</Link>
      <Link href="/records" className="hover:text-blue-600">Records</Link>
    </div>
  );
}