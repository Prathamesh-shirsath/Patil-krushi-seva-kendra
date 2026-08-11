"use client";

import AppNavbar from "../navbar/app-navbar";
import AppSidebar from "../sidebar/app-sidebar";

import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider defaultOpen>

            <AppSidebar />

            <SidebarInset
                className="
          min-h-screen
          bg-slate-100
          transition-all
          duration-300
        "
            >
                <AppNavbar />

                <main
                    className="
            w-full
            p-3
            sm:p-5
            lg:p-7
          "
                >
                    <div
                        className="
              w-full
              min-h-[calc(100vh-110px)]
              rounded-3xl
              border
              border-slate-200
              bg-white
              shadow-sm
              p-4
              sm:p-6
              lg:p-8
            "
                    >
                        {children}
                    </div>
                </main>

            </SidebarInset>

        </SidebarProvider>
    );
}