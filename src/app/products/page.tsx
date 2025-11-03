"use client";

import { useState, useEffect } from "react";
import AdminLayout from "../components/layout/AdminLayout";

interface Product {
  _id?: string;
  name: string;
  price: number;
  category: string;
  image?: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  // Fetch products from backend API (placeholder)
  useEffect(() => {
    fetchProducts();
  }, []);

 const fetchProducts = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/products");
    if (!res.ok) throw new Error("Failed to fetch products");
    const data = await res.json();

    // ✅ Fix here
    setProducts(Array.isArray(data) ? data : data.products || []);
  } catch (error) {
    console.error("Error fetching products:", error);
    setProducts([]); // fallback
  }
};


  const handleAddProduct = () => {
    alert("Add Product functionality coming soon!");
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage your Finyra marble collection.
          </p>
        </div>

        <button
          onClick={handleAddProduct}
          className="px-4 py-2 bg-black text-white rounded-lg hover:opacity-90 transition"
        >
          + Add Product
        </button>
      </div>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-80 bg-gray-50 rounded-xl border border-gray-200">
          <div className="text-5xl mb-4">📦</div>
          <p className="text-lg font-medium text-gray-800">No products found</p>
          <p className="text-gray-500 text-sm mt-2">
            Create your first product by telling me what you'd like to add.
            <br />
            Example: “Add a white marble Ganesha murti priced at ₹2999”
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition p-4"
            >
              <img
                src={product.image || "/placeholder.png"}
                alt={product.name}
                className="h-48 w-full object-cover rounded-lg mb-3"
              />
              <h3 className="text-lg font-semibold text-gray-900">
                {product.name}
              </h3>
              <p className="text-gray-600 text-sm">{product.category}</p>
              <p className="text-gray-800 font-medium mt-1">₹{product.price}</p>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
