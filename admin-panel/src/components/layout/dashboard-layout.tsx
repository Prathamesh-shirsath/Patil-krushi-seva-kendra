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

            <div className="min-h-screen bg-slate-100">

                <div className="flex">

                    {/* Sidebar */}

                    <AppSidebar />

                    {/* Main */}

                    <main className="flex-1 min-w-0">

                        {/* Navbar */}

                        <header
                            className="
                                sticky
                                top-0
                                z-40
                                border-b
                                border-slate-200
                                bg-white/90
                                backdrop-blur
                            "
                        >
                            <AppNavbar />
                        </header>

                        {/* Content */}

                        <div
                            className="
                                p-4
                                sm:p-6
                                lg:p-8
                            "
                        >

                            <div
                                className="
                                    min-h-[calc(100vh-110px)]
                                    rounded-3xl
                                    border
                                    border-slate-200
                                    bg-white
                                    p-6
                                    shadow-sm
                                    lg:p-8
                                "
                            >

                                {children}

                            </div>

                        </div>

                    </main>

                </div>

            </div>

        </SidebarProvider>
    );
}