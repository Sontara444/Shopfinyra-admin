"use client";
import React from "react";
import AdminLayout from "../components/layout/AdminLayout";
import { Search } from "lucide-react";

export default function CustomersPage() {
  const customers = [
    { id: 1, name: "Rajesh Kumar", email: "rajesh@example.com", contact: "+91 9876543210", totalOrders: 12, totalSpent: "$1,540.00", status: "Active" },
    { id: 2, name: "Priya Sharma", email: "priya@example.com", contact: "+91 9123456789", totalOrders: 9, totalSpent: "$950.00", status: "Active" },
    { id: 3, name: "Amit Patel", email: "amit@example.com", contact: "+91 9988776655", totalOrders: 5, totalSpent: "$420.00", status: "Inactive" },
    { id: 4, name: "Meera Singh", email: "meera@example.com", contact: "+91 9090909090", totalOrders: 18, totalSpent: "$2,340.00", status: "Active" },
    { id: 5, name: "Vijay Reddy", email: "vijay@example.com", contact: "+91 9786543210", totalOrders: 7, totalSpent: "$750.00", status: "Active" },
  ];

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-50 text-gray-900 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">Customers</h1>
            <p className="text-gray-500 text-sm mt-1">
              Manage and track your store customers.
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-white border border-gray-200 px-3 py-2 rounded-xl shadow-sm w-64">
            <Search className="w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search customers..."
              className="w-full text-sm text-gray-700 bg-transparent focus:outline-none"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-900">All Customers</h2>
          </div>

          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-gray-100">
              <tr>
                {["Name", "Email", "Contact", "Total Orders", "Total Spent", "Status", "Actions"].map((col) => (
                  <th
                    key={col}
                    className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {customers.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{c.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{c.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{c.contact}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{c.totalOrders}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">{c.totalSpent}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        c.status === "Active"
                          ? "bg-gray-900 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-sm font-medium text-gray-600 hover:text-gray-900 transition">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
