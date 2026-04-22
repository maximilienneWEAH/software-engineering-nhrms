import { Navbar } from "@/components/navbar/page";
import { Sidebar } from "@/components/sidebar/page";
import { Card } from "@/components/card/page";

export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card title="Total Patients" value="1,245" />
          <Card title="Active Doctors" value="87" />
          <Card title="Records Today" value="320" />
        </div>
      </div>
    </div>
  );
}