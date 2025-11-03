export default function Topbar() {
  return (
    <header className="h-full flex items-center justify-between px-6 bg-white border border-black-900 rounded-md shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 tracking-wide">Admin Panel</h2>

      <div className="flex items-center space-x-3">
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
        />
        <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-1.5 rounded-md text-sm">
          Logout
        </button>
      </div>
    </header>
  );
}
