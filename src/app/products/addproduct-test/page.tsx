"use client";
import { useState } from "react";

export default function AddProductTest() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // ✅ handle input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // ✅ handle image upload to Cloudinary
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
     formData.append("upload_preset", "images_preset"); // 👈 from Cloudinary
    formData.append("cloud_name", "ddaqjp5js");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/ddaqjp5js/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      console.log("✅ Cloudinary upload response:", data);

      if (data.secure_url) {
        setForm({ ...form, image: data.secure_url });
      }
    } catch (error) {
      console.error("❌ Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  // ✅ handle product submission (you can connect to backend later)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("🧾 Final Product Data:", form);

    // later you can call your backend here:
    // await fetch("/api/products", { method: "POST", body: JSON.stringify(form) });

    alert("✅ Product data logged — check console!");
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">🧪 Add Product (Cloudinary Test)</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md space-y-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          className="border w-full p-2 rounded-lg"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Product Price"
          className="border w-full p-2 rounded-lg"
          value={form.price}
          onChange={handleChange}
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Product Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="border p-2 w-full rounded-lg"
          />
        </div>

        {uploading && <p className="text-blue-500 text-sm">Uploading image...</p>}

        {form.image && (
          <div className="mt-4">
            <img
              src={form.image}
              alt="Uploaded preview"
              className="w-full h-48 object-cover rounded-lg border"
            />
            <p className="text-xs text-green-600 mt-1 break-all">{form.image}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={loading || uploading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 w-full"
        >
          {loading ? "Submitting..." : "Submit Product"}
        </button>
      </form>
    </div>
  );
}
