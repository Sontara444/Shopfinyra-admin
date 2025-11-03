"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) return router.push("/login");

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/users`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, [router]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6">All Users</h1>
      <div className="space-y-3">
        {users.map((u) => (
          <div key={u._id} className="flex justify-between border p-3 rounded">
            <p>{u.email}</p>
            <button className="text-red-600">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
