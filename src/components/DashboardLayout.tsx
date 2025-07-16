import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import React from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="bg-muted flex min-h-screen">
        <AppSidebar />
        <main className="flex-1 bg-white p-6">{children}</main>
      </div>
    </SidebarProvider>
  );
}
