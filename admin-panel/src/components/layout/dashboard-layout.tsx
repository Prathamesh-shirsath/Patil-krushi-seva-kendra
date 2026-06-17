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

      <AppSidebar />

      <main className="flex-1 bg-slate-50">

        <AppNavbar />

        <div className="p-4 lg:p-8">
          {children}
        </div>

      </main>

    </SidebarProvider>
  );
}