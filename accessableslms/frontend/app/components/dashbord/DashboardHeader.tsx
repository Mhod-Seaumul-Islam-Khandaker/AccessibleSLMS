"use client";

import { useAuth } from '@/hooks/useAuth';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import Link from 'next/link';
import { LogOut, Settings as SettingsIcon } from 'lucide-react';

interface DashboardHeaderProps {
  title?: string;
}

export default function DashboardHeader({ title = "Student dashboard" }: DashboardHeaderProps) {
  const { logout } = useAuth();
  const { fontSizeMultiplier } = useAccessibility();

  return (
    <header 
      className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-8 py-4"
      role="banner"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link
            href="/dashboard/accessibility"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md px-2 py-1"
            style={{ fontSize: `${14 * fontSizeMultiplier}px` }}
            aria-label="Accessibility settings"
          >
            <span className="flex items-center gap-2">
              <SettingsIcon size={16} aria-hidden="true" />
              Accessibility settings
            </span>
          </Link>
          
          <h1 
            className="text-gray-900 dark:text-white font-semibold"
            style={{ fontSize: `${20 * fontSizeMultiplier}px` }}
          >
            {title}
          </h1>
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          style={{ fontSize: `${16 * fontSizeMultiplier}px` }}
          aria-label="Logout"
        >
          <LogOut size={18} aria-hidden="true" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </header>
  );
}