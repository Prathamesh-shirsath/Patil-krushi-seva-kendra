"use client";

import AppNavbar from "../navbar/app-navbar";
import AppSidebar from "../sidebar/app-sidebar";

import {
  SidebarProvider,
} from "@/components/ui/sidebar";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full overflow-hidden bg-slate-100">
        <div className="flex h-screen w-full overflow-hidden">

          {/* Sidebar */}
          <AppSidebar />

          {/* Main */}
          <main className="min-w-0 flex-1">

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
                                w-full
                                p-4
                                sm:p-6
                                lg:p-8
                            "
            >

              <div
                className="
                                    min-h-[calc(100vh-110px)]
                                    w-full
                                    rounded-3xl
                                    border
                                    border-slate-200
                                    bg-white
                                    p-4
                                    shadow-sm
                                    sm:p-6
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