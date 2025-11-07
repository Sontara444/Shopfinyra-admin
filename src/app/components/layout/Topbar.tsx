"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function Topbar() {
  const [adminInitial, setAdminInitial] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // ✅ Check admin login status on mount
  useEffect(() => {
    const name = localStorage.getItem("adminName");
    const token = localStorage.getItem("adminToken");

    if (token && name) {
      setAdminInitial(name.charAt(0).toUpperCase());
    } else {
      setAdminInitial(null);
    }
  }, []);

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminName");
    setAdminInitial(null);
    router.push("/admin"); // Redirect to login page
  };

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white border border-gray-200 rounded-md shadow-sm">
      {/* Left: Logo or title */}
      <h2 className="text-lg font-semibold text-gray-800 tracking-wide">
        Admin Panel
      </h2>

      {/* Right: Search + Avatar/Login */}
      <div className="flex items-center space-x-3">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400 transition"
        />

        {/* ✅ Avatar or Login Button */}
        {adminInitial ? (
          // When logged in → show avatar + dropdown
          <div className="relative" ref={dropdownRef}>
            <div
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="h-9 w-9 flex items-center justify-center rounded-full bg-gray-900 text-white font-semibold cursor-pointer hover:bg-gray-800 transition-all duration-200"
              title="Admin Profile"
            >
              {adminInitial}
            </div>

            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50 animate-fadeIn">
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    router.push("/admin/profile");
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Account
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          // When not logged in → show login button
          <button
            onClick={() => router.push("/admin")}
            className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
}
