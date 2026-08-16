"use client";

import AppNavbar from "../navbar/app-navbar";
import AppSidebar from "../sidebar/app-sidebar";

import { SidebarProvider } from "@/components/ui/sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full overflow-x-hidden bg-slate-100">

        <div className="flex min-h-screen w-full">

          {/* =====================================================
              SIDEBAR
          ===================================================== */}

          <AppSidebar />

          {/* =====================================================
              MAIN CONTENT
          ===================================================== */}

          <main className="min-w-0 flex-1 overflow-x-hidden">

            {/* ===================================================
                NAVBAR
            =================================================== */}

            <header
              className="
                sticky
                top-0
                z-40
                w-full
                border-b
                border-slate-200
                bg-white/95
                backdrop-blur
              "
            >
              <AppNavbar />
            </header>

            {/* ===================================================
                PAGE CONTENT
            =================================================== */}

            <div
              className="
                w-full
                min-w-0
                overflow-x-hidden
                p-3
                sm:p-4
                md:p-6
                lg:p-8
              "
            >
              <div
                className="
                  min-h-[calc(100vh-110px)]
                  w-full
                  min-w-0
                  overflow-hidden
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  shadow-sm
                  sm:rounded-3xl
                "
              >
                <div
                  className="
                    w-full
                    min-w-0
                    p-4
                    sm:p-5
                    md:p-6
                    lg:p-8
                  "
                >
                  {children}
                </div>
              </div>
            </div>

          </main>

        </div>

      </div>
    </SidebarProvider>
  );
}