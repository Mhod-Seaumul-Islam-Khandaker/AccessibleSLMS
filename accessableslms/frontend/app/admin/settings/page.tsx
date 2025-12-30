// app/admin/settings/page.tsx
"use client";

import { useAuth } from '../../hooks/useAuth';
import DashboardLayout from '../../components/dashbord/DashboardLayout';
import Link from 'next/link';

export default function AdminSettingsPage() {
  const { user } = useAuth('admin');

  if (!user) return null;

  return (
    <DashboardLayout title="Settings" requiredRole="admin">
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Administrator Settings
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Manage system settings and configurations.
          </p>

          {/* Placeholder Content */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Feature Coming Soon
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              This feature will be implemented in the next update.
            </p>
            <Link
              href="/admin"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Return to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}