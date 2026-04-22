export function Navbar() {
  return (
    <div className="w-full h-16 bg-white shadow flex items-center justify-between px-6">
      <h1 className="text-xl font-bold text-blue-700">HealthSys</h1>
      <div className="flex items-center gap-4">
        <span className="text-sm">Admin</span>
        <div className="w-8 h-8 bg-blue-500 rounded-full" />
      </div>
    </div>
  );
}
