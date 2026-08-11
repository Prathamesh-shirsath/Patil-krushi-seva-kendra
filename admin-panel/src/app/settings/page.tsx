import DashboardLayout from "@/components/layout/dashboard-layout";

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-slate-800">Admin Settings</h1>
        <p className="text-sm text-slate-500">Manage store settings and configurations.</p>
      </div>
    </DashboardLayout>
  );
}
