"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) return router.push("/login");

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [router]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-6">All Products</h1>
      <button
        onClick={() => router.push("/dashboard/products/new")}
        className="bg-gray-900 text-white px-4 py-2 rounded mb-4"
      >
        ➕ Add Product
      </button>
      <div className="grid gap-4">
        {products.map((p) => (
          <div key={p._id} className="p-4 border rounded flex justify-between">
            <div>
              <h2 className="font-medium">{p.name}</h2>
              <p className="text-sm text-gray-600">${p.price}</p>
            </div>
            <button className="text-red-600">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
