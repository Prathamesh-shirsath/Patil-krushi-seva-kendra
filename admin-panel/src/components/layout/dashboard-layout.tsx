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
      <div className="min-h-screen w-full overflow-hidden bg-slate-100">
        <div className="flex min-h-screen w-full overflow-hidden">

          {/* Sidebar */}
       <div className="hidden lg:flex">
         <AppSidebar />
          </div>

          {/* Main Content */}
          <main className="flex-1 min-w-0 overflow-x-hidden">

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

            {/* Page Content */}
            <div className="w-full p-4 sm:p-6 lg:p-8">

              <div
                className="
                  w-full
                  min-h-[calc(100vh-110px)]
                  overflow-x-hidden
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

            </div>

          </main>

        </div>
      </div>
    </SidebarProvider>
  );
}