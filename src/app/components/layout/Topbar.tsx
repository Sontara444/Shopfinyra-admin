"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function Topbar() {
  const [adminInitial, setAdminInitial] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const name = localStorage.getItem("adminName");
    const token = localStorage.getItem("adminToken");

    if (token && name) {
      setAdminInitial(name.charAt(0).toUpperCase());
    } else {
      setAdminInitial(null);
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminName");
    router.push("/adminLogin");
  };

  return (
    <header className="h-full flex items-center justify-between px-6 bg-white border border-black-900 rounded-md shadow-sm">
      <h2 className="text-lg font-semibold text-gray-800 tracking-wide">Admin Panel</h2>

      <div className="flex items-center space-x-3">
        <input
          type="text"
          placeholder="Search..."
          className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
        />

        {adminInitial ? (
          <div className="relative" ref={dropdownRef}>
            {/* Avatar */}
            <div
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-800 text-white font-semibold cursor-pointer select-none"
              title="Admin Profile"
            >
              {adminInitial}
            </div>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50">
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    router.push("/admin/profile"); // 👈 change if needed
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Profile
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
          <button
            onClick={() => router.push("/admin")}
            className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-1.5 rounded-md text-sm"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
}
