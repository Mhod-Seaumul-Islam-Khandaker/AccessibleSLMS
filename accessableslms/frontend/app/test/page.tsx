// Contains links to all tests
import React from 'react';
import Link from "next/link";

export default function TestPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center space-y-6 p-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
        Accessibility Tests
      </h1>
      <div className="space-y-4">
        <Link 
          href="/test/accessibility" 
          className="block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Font Size Adjuster
        </Link>
        {/* Add more test links here */}
      </div>
    </main>
  );
}