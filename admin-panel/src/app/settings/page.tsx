import Link from "next/link";
import DashboardLayout from "@/components/layout/dashboard-layout";
import {
  MapPin,
  ArrowRight,
} from "lucide-react";



export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Admin Settings
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage store settings, administrators and configurations.
          </p>
        </div>

        {/* =====================================================
            SETTINGS GRID
        ===================================================== */}

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {/* ===================================================
              MANAGE ADMINS
          =================================================== */}

          <Link
            href="/settings/admins"
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              {/* Icon */}

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition-colors group-hover:bg-slate-200">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 21V19C16 17.3431 14.6569 16 13 16H6C4.34315 16 3 17.3431 3 19V21"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />

                  <path
                    d="M9.5 12C11.7091 12 13.5 10.2091 13.5 8C13.5 5.79086 11.7091 4 9.5 4C7.29086 4 5.5 5.79086 5.5 8C5.5 10.2091 7.29086 12 9.5 12Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />

                  <path
                    d="M19 8V14"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />

                  <path
                    d="M22 11H16"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* Arrow */}

              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                className="text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-slate-500"
              >
                <path
                  d="M9 18L15 12L9 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="mt-5">
              <h2 className="text-base font-semibold text-slate-800">
                Manage Admins
              </h2>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Add, edit, disable or remove administrators who can access
                the admin panel.
              </p>
            </div>

            <div className="mt-5 text-sm font-medium text-slate-700">
              Manage administrators →
            </div>
          </Link>

          

          <Link
            href="/settings/delivery-pincodes"
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <MapPin className="h-6 w-6" />
              </div>

              <ArrowRight className="h-5 w-5 text-slate-300 transition-all group-hover:translate-x-1 group-hover:text-emerald-600" />
            </div>

            <div className="mt-5">
              <h2 className="text-base font-semibold text-slate-800">
                Delivery Pincodes
              </h2>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Add and manage the pincodes where your store
                provides delivery.
              </p>
            </div>

            <div className="mt-5 text-sm font-semibold text-emerald-600">
              Manage delivery areas →
            </div>
          </Link>






          {/* ===================================================
              STORE SETTINGS
          =================================================== */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 15.5C13.933 15.5 15.5 13.933 15.5 12C15.5 10.067 13.933 8.5 12 8.5C10.067 8.5 8.5 10.067 8.5 12C8.5 13.933 10.067 15.5 12 15.5Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />

                <path
                  d="M19.4 15C19.55 14.67 19.67 14.32 19.75 13.96L21.5 12.62L19.5 9.38L17.35 10.1C16.82 9.68 16.24 9.33 15.61 9.08L15.28 6.84H11.28L10.95 9.08C10.32 9.33 9.74 9.68 9.21 10.1L7.06 9.38L5.06 12.62L6.81 13.96C6.89 14.32 7.01 14.67 7.16 15L6.81 17.24L9.21 18.62C9.74 18.99 10.32 19.34 10.95 19.59L11.28 21.84H15.28L15.61 19.59C16.24 19.34 16.82 18.99 17.35 18.62L19.75 17.24L19.4 15Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="mt-5">
              <h2 className="text-base font-semibold text-slate-800">
                Store Settings
              </h2>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Manage general store configuration and operational settings.
              </p>
            </div>

            <div className="mt-5 text-sm font-medium text-slate-400">
              Coming soon
            </div>
          </div>

          {/* ===================================================
              SECURITY
          =================================================== */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 3L20 6V11C20 16.1 16.6 20.3 12 21C7.4 20.3 4 16.1 4 11V6L12 3Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                <path
                  d="M9 12L11 14L15 10"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="mt-5">
              <h2 className="text-base font-semibold text-slate-800">
                Security
              </h2>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Manage authentication and administrator security settings.
              </p>
            </div>

            <div className="mt-5 text-sm font-medium text-slate-400">
              Coming soon
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}