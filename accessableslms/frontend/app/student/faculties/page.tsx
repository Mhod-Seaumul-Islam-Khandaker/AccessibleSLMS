// app/student/faculties/page.tsx
"use client";

import { useAuth } from '../../hooks/useAuth';
import { useAccessibility } from '../../context/AccessibilityContext';
import DashboardLayout from '../../components/dashbord/DashboardLayout';
import Link from 'next/link';

export default function StudentFacultiesPage() {
  const { user } = useAuth('student');
  const { fontSizeMultiplier } = useAccessibility();

  if (!user) return null;

  return (
    <DashboardLayout title="Faculties" requiredRole="student">
      <div className="max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1
            className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
            style={{ fontSize: `${32 * fontSizeMultiplier}px` }}
          >
            Faculties
          </h1>
          <p
            className="text-gray-600 dark:text-gray-400"
            style={{ fontSize: `${16 * fontSizeMultiplier}px` }}
          >
            Explore information about our academic faculties and departments.
          </p>
        </div>

        {/* Placeholder Content */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="text-center">
            <h2
              className="text-xl font-semibold text-gray-900 dark:text-white mb-4"
              style={{ fontSize: `${20 * fontSizeMultiplier}px` }}
            >
              Feature Coming Soon
            </h2>
            <p
              className="text-gray-600 dark:text-gray-300 mb-6"
              style={{ fontSize: `${16 * fontSizeMultiplier}px` }}
            >
              This feature will be available in the next version.
            </p>
            <Link
              href="/student"
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