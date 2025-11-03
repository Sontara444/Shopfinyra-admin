"use client";

import React, { useState } from "react";
import AdminLayout from "../components/layout/AdminLayout";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <AdminLayout>
      <div className="p-8 text-gray-800">
        <h1 className="text-3xl font-semibold mb-2 text-gray-900">Settings</h1>
        <p className="text-gray-500 mb-6">
          Manage your profile, security, and notification preferences.
        </p>

        {/* Tabs */}
        <div className="flex space-x-4 border-b border-gray-200 mb-6">
          {["general", "security", "notifications"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 capitalize font-medium transition-all ${
                activeTab === tab
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* General Tab */}
        {activeTab === "general" && (
          <div className="space-y-10">
            {/* Profile Info */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Profile Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    First Name
                  </label>
                  <input
                    type="text"
                    defaultValue="John"
                    className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Last Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Doe"
                    className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  defaultValue="john@example.com"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-600">
                  Phone
                </label>
                <input
                  type="tel"
                  defaultValue="+1 (555) 000-0000"
                  className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              {/* Blue Gradient Button */}
              <div className="mt-6">
                <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-2.5 rounded-lg font-medium shadow-sm transition">
                  Save Changes
                </button>
              </div>
            </section>

            {/* Company Info */}
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Company Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Company Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Acme Inc."
                    className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">
                    Website
                  </label>
                  <input
                    type="url"
                    defaultValue="https://example.com"
                    className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-6">
                <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-2.5 rounded-lg font-medium shadow-sm transition">
                  Save Changes
                </button>
              </div>
            </section>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
