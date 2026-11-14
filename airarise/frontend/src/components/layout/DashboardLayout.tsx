'use client';

import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { AppProvider } from '@/context/AppContext';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <div className="min-h-screen bg-surface flex">
        <Sidebar />
        <div className="flex-1 pl-72 flex flex-col min-w-0">
          <Header />
          <main className="pt-16 min-h-screen flex-1 p-space-lg max-w-[1720px] w-full mx-auto">
            {children}
          </main>
        </div>
      </div>
    </AppProvider>
  );
}
