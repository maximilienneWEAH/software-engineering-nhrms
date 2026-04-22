import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";

export default function Records() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6">
          <h1 className="text-2xl font-bold">Medical Records</h1>
          <p className="text-gray-600">Manage patient health records here.</p>
        </div>
      </div>
    </div>
  );
}