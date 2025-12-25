// app/components/dashbord/DashboardLayout.tsx
"use client";

import { useAuth } from '../../hooks/useAuth';
import Sidebar from './Sidebar';
import DashboardHeader from './DashboardHeader';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  requiredRole?: 'student' | 'teacher' | 'admin';
}

export default function DashboardLayout({ 
  children, 
  title,
  requiredRole 
}: DashboardLayoutProps) {
  const { user, loading } = useAuth(requiredRole);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" role="status" aria-label="Loading">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar role={user.role} />
      <div className="flex-1 flex flex-col">
        <DashboardHeader title={title} />
        <main 
          className="flex-1 p-8"
          role="main"
        >
          {children}
        </main>
      </div>
    </div>
  );
}