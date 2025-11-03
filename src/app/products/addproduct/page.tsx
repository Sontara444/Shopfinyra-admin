"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "../../components/layout/AdminLayout";

export default function AddProductPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
    featured: false,
    inStock: true,
    stock: 0,
    dimensions: "",
    material: "",
    weight: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("adminToken");

      const res = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          stock: Number(form.stock),
        }),
      });

      if (!res.ok) throw new Error("Failed to add product");

      alert("✅ Product added successfully!");
      router.push("/products");
    } catch (err) {
      console.error(err);
      alert("❌ Error adding product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8 mt-6">
        <h1 className="text-2xl font-semibold mb-2">Add Product</h1>
        <p className="text-gray-500 mb-6">Add a new marble decor or murti product.</p>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-black"
              placeholder="e.g. White Marble Ganesha"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-black"
            >
              <option value="">Select category</option>
              <option value="Murtis">Murtis</option>
              <option value="Showpieces">Showpieces</option>
              <option value="Marble Decor">Marble Decor</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-black"
              placeholder="e.g. 2499"
            />
          </div>

          {/* Stock */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
            <input
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-black"
              placeholder="e.g. 20"
            />
          </div>

          {/* Featured */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="featured"
              checked={form.featured}
              onChange={handleChange}
              className="w-4 h-4 border-gray-300 rounded"
            />
            <label className="text-sm font-medium text-gray-700">Mark as Featured</label>
          </div>

          {/* In Stock */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="inStock"
              checked={form.inStock}
              onChange={handleChange}
              className="w-4 h-4 border-gray-300 rounded"
            />
            <label className="text-sm font-medium text-gray-700">In Stock</label>
          </div>

          {/* Dimensions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dimensions</label>
            <input
              type="text"
              name="dimensions"
              value={form.dimensions}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-black"
              placeholder="e.g. 10x5x8 inches"
            />
          </div>

          {/* Material */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Material</label>
            <input
              type="text"
              name="material"
              value={form.material}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-black"
              placeholder="e.g. Makrana Marble"
            />
          </div>

          {/* Weight */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
            <input
              type="text"
              name="weight"
              value={form.weight}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-black"
              placeholder="e.g. 2.5 kg"
            />
          </div>

          {/* Image */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input
              type="text"
              name="image"
              value={form.image}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-black"
              placeholder="Paste Cloudinary or image URL"
            />
          </div>

          {/* Description */}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-black"
              placeholder="Short description of the product..."
            />
          </div>

          {/* Buttons */}
          <div className="col-span-2 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => router.push("/products")}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
            >
              {loading ? "Adding..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
