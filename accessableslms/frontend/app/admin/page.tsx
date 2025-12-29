// app/admin/page.tsx
"use client";

import DashboardLayout from '../components/dashbord/DashboardLayout';

export default function AdminDashboard() {
  return (
    <DashboardLayout title="Administrator Dashboard" requiredRole="admin">
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to the Administrator Dashboard
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Manage courses, sections, and system settings from here.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Courses
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Create, update, and delete courses.
            </p>
            <a
              href="/admin/courses"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Manage Courses
            </a>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Sections
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Manage course sections and schedules.
            </p>
            <a
              href="/admin/sections"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Manage Sections
            </a>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Users
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              View and manage user accounts.
            </p>
            <a
              href="/admin/users"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Manage Users
            </a>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}