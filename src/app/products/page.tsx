"use client";

import { useState, useEffect } from "react";
import AdminLayout from "../components/layout/AdminLayout";
import { useRouter } from "next/navigation";

interface Product {
  _id?: string;
  name: string;
  price: number;
  category: string;
  image?: string;
}

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editForm, setEditForm] = useState({ name: "", price: "", category: "", image: "" });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/products");
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : data.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    }
  };

  const handleDeleteClick = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete product");
      setProducts((prev) => prev.filter((p) => p._id !== productId));
      alert("✅ Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("❌ Error deleting product.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setEditForm({
      name: product.name,
      price: String(product.price),
      category: product.category,
      image: product.image || "",
    });
    setShowEdit(true);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdateProduct = async () => {
    if (!editingProduct?._id) return;
    setLoading(true);

    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`http://localhost:5000/api/products/${editingProduct._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          name: editForm.name,
          price: Number(editForm.price),
          category: editForm.category,
          image: editForm.image,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update product");

      setProducts((prev) =>
        prev.map((p) => (p._id === editingProduct._id ? data.updatedProduct || data : p))
      );

      alert("✅ Product updated successfully!");
      setShowEdit(false);
      setEditingProduct(null);
    } catch (error) {
      console.error("Error updating product:", error);
      alert("❌ Error updating product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your Finyra marble collection.</p>
        </div>

        <button
          onClick={() => router.push("/products/addproduct")}
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition"
        >
          + Add Product
        </button>
      </div>

      {/* 🧾 Product List Table */}
      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-80 bg-gray-50 rounded-xl border border-gray-200">
          <div className="text-5xl mb-4">📦</div>
          <p className="text-lg font-medium text-gray-800">No products found</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white border border-gray-200 rounded-xl shadow-sm">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-gray-100 text-gray-700 text-sm font-semibold">
                <th className="py-3 px-4">Image</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4">
                    <img
                      src={product.image || "/placeholder.png"}
                      alt={product.name}
                      className="h-14 w-14 object-cover rounded-md border border-gray-200"
                    />
                  </td>
                  <td className="py-3 px-4 font-medium text-gray-900">{product.name}</td>
                  <td className="py-3 px-4 text-gray-700">{product.category}</td>
                  <td className="py-3 px-4 text-gray-800 font-semibold">₹{product.price}</td>
                  <td className="py-3 px-4 text-right space-x-3">
                    <button
                      onClick={() => handleEditClick(product)}
                      className="px-3 py-1 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(product._id!)}
                      className="px-3 py-1 text-sm rounded-md border border-red-200 text-red-600 hover:bg-red-50 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ✏️ Edit Product Modal */}
      {showEdit && editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-xl">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Edit Product</h2>

            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={editForm.name}
                onChange={handleEditChange}
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="Product name"
              />
              <input
                type="number"
                name="price"
                value={editForm.price}
                onChange={handleEditChange}
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="Price (₹)"
              />
              <input
                type="text"
                name="category"
                value={editForm.category}
                onChange={handleEditChange}
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="Category"
              />
              <input
                type="text"
                name="image"
                value={editForm.image}
                onChange={handleEditChange}
                className="w-full border border-gray-300 rounded-lg p-2"
                placeholder="Image URL"
              />
            </div>

            <div className="flex justify-end mt-6 space-x-3">
              <button
                onClick={() => setShowEdit(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateProduct}
                disabled={loading}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? "Updating..." : "Update Product"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
