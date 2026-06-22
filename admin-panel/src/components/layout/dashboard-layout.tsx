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
            <div className="min-h-screen bg-white">
                <div className="mx-auto flex max-w-[1500px]">
                    {/* Sidebar */}
                    <AppSidebar />

                    {/* Main Content */}
                    <main className="flex-1">
                        {/* Navbar */}
                        <div className="sticky top-0 z-20 border-b border-gray-100 bg-white">
                            <AppNavbar />
                        </div>

                        {/* Page Content */}
                        <div className="bg-gray-50 px-4 py-5 sm:px-6 lg:px-8">
                            <div className="min-h-[calc(100vh-80px)] rounded-2xl border border-gray-100 bg-white p-5 shadow-sm lg:p-8">
                                {children}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
}