"use client";
import ReduxProvider from "@/store/provider/ReduxProvider";
import AuthGuard from "@/components/auth/AuthGuard";
import DashboardSidebar from "@/components/layout/dashboard/Sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
     
      <AuthGuard>
        <div className="flex w-full min-h-screen fixed bg-[rgb(178,14,56,0.05)]">
            <SidebarProvider>
          <DashboardSidebar className="md:mt-2 md:h-[90dvh] !relative !inset-auto !z-auto " />
          <main className="flex-1 ">
            {children}</main>
          </SidebarProvider>
        </div>
      </AuthGuard>
      
    </ReduxProvider>
  );
}