"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) router.push("/login");
    else setAdmin("Admin");
  }, [router]);

  if (!admin) return null;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>
      <div className="grid grid-cols-3 gap-6">
        <a
          href="/dashboard/products"
          className="bg-white shadow p-6 rounded-xl hover:bg-gray-50"
        >
          🛍️ Manage Products
        </a>
        <a
          href="/dashboard/users"
          className="bg-white shadow p-6 rounded-xl hover:bg-gray-50"
        >
          👥 Manage Users
        </a>
      </div>
    </div>
  );
}
