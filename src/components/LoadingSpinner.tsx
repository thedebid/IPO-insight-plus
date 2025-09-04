import React from 'react';
import { TrendingUp } from 'lucide-react';

export default function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <TrendingUp className="h-16 w-16 text-blue-600 animate-pulse mx-auto" />
          <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
        </div>
        <p className="text-gray-600 mt-4 font-medium">Loading IPO Tracker Pro...</p>
      </div>
    </div>
  );
}