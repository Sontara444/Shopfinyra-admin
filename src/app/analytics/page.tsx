"use client";

import React from "react";
import AdminLayout from "../components/layout/AdminLayout";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function AnalyticsPage() {
  const pieData = [
    { name: "Organic Search", value: 38 },
    { name: "Direct", value: 27 },
    { name: "Social Media", value: 23 },
    { name: "Referral", value: 13 },
  ];

  const COLORS = ["#3b82f6", "#22c55e", "#8b5cf6", "#facc15"]; // blue, green, purple, yellow

  const lineData = [
    { name: "Jan 1", desktop: 160, mobile: 80, tablet: 50 },
    { name: "Jan 8", desktop: 190, mobile: 90, tablet: 60 },
    { name: "Jan 15", desktop: 220, mobile: 100, tablet: 70 },
    { name: "Jan 22", desktop: 260, mobile: 120, tablet: 75 },
    { name: "Jan 29", desktop: 210, mobile: 95, tablet: 65 },
    { name: "Feb 5", desktop: 230, mobile: 100, tablet: 70 },
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
          <p className="text-sm text-gray-500">
            Detailed insights and performance metrics
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-3 mb-6">
          {["Overview", "Traffic", "Revenue"].map((tab, i) => (
            <button
              key={i}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                i === 0
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* User Sources Pie Chart */}
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              User Sources
            </h2>
            <div className="w-full h-64">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Device Distribution Line Chart */}
          <div className="bg-white border border-gray-200 shadow-sm rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Device Distribution
            </h2>
            <div className="w-full h-64">
              <ResponsiveContainer>
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="desktop"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="mobile"
                    stroke="#22c55e"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="tablet"
                    stroke="#8b5cf6"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
