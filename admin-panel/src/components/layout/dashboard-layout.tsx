import { SidebarProvider } from "@/components/ui/sidebar";
import AppNavbar from "../navbar/app-navbar";
import AppSidebar from "../sidebar/app-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[#f8faf7] text-slate-900 font-sans">
        {/* Fixed/Sticky Sidebar */}
        <AppSidebar />

        {/* Main Area */}
        <div className="flex flex-1 flex-col min-w-0">
          <AppNavbar />
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}