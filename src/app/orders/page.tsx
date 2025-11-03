"use client";
import React from "react";
import AdminLayout from "../components/layout/AdminLayout";

export default function OrdersPage() {
  const orders = [
    {
      id: "#ORD-001",
      customer: "Rajesh Kumar",
      date: "2024-01-15",
      items: 2,
      total: "$498.00",
      status: "Completed",
    },
    {
      id: "#ORD-002",
      customer: "Priya Sharma",
      date: "2024-01-14",
      items: 1,
      total: "$1,299.00",
      status: "Processing",
    },
    {
      id: "#ORD-003",
      customer: "Amit Patel",
      date: "2024-01-13",
      items: 3,
      total: "$847.00",
      status: "Shipped",
    },
    {
      id: "#ORD-004",
      customer: "Meera Singh",
      date: "2024-01-12",
      items: 1,
      total: "$349.00",
      status: "Completed",
    },
    {
      id: "#ORD-005",
      customer: "Vijay Reddy",
      date: "2024-01-11",
      items: 2,
      total: "$699.00",
      status: "Pending",
    },
  ];

  return (
    <AdminLayout>
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Orders</h1>
          <p className="text-gray-500 text-sm">
            Manage and track your customer orders
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-gray-500 text-sm">Total Orders</h3>
            <p className="text-2xl font-semibold mt-2">156</p>
            <span className="text-green-500 text-xs">+12% from last month</span>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-gray-500 text-sm">Revenue</h3>
            <p className="text-2xl font-semibold mt-2">$23,456</p>
            <span className="text-green-500 text-xs">+18% from last month</span>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-gray-500 text-sm">Avg Order Value</h3>
            <p className="text-2xl font-semibold mt-2">$150.36</p>
            <span className="text-green-500 text-xs">+5% from last month</span>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm">
            <h3 className="text-gray-500 text-sm">This Month</h3>
            <p className="text-2xl font-semibold mt-2">42</p>
            <span className="text-green-500 text-xs">+8% from last month</span>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <h2 className="px-6 py-4 text-lg font-semibold text-gray-800 border-b">
            Recent Orders
          </h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {order.items} items
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.total}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        order.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.status === "Processing"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button className="text-blue-600 hover:underline text-sm">
                      View Details
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
