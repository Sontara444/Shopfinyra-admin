"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminAuth() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const endpoint = isLogin ? "/admin/login" : "/admin/register";

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"}${endpoint}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");

      if (isLogin) {
        localStorage.setItem("adminToken", data.token);
        if (data.admin?.name) localStorage.setItem("adminName", data.admin.name);
        router.push("/dashboard");
      } else {
        alert("Admin account created successfully! Please log in.");
        setIsLogin(true);
      }
    } catch (err: any) {
      setError(err.message || "Failed to connect to server");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 transition-all">
      <div className="w-full max-w-md bg-white border border-gray-200 p-8 rounded-xl shadow-sm transition-all duration-300">
        <h1 className="text-2xl font-semibold text-center mb-2">
          {isLogin ? "Admin Login" : "Create Admin Account"}
        </h1>
        <p className="text-center text-sm text-gray-600 mb-6">
          {isLogin ? (
            <>
              Don’t have an account?{" "}
              <button
                onClick={toggleMode}
                className="text-gray-900 font-medium hover:underline"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={toggleMode}
                className="text-gray-900 font-medium hover:underline"
              >
                Log in
              </button>
            </>
          )}
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                placeholder="Admin Name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              type="email"
              placeholder="admin@finyra.com"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 transition"
            />
          </div>

          {error && (
            <p className="text-red-600 text-center text-sm font-medium">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-lg font-medium transition-all duration-200 shadow-sm"
          >
            {isLogin ? "Sign in" : "Sign up"}
          </button>
        </form>
      </div>
    </div>
  );
}
