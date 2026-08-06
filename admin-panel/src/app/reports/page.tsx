import DashboardLayout from "@/components/layout/dashboard-layout";

export default function ReportsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-slate-800">Sales & Analytics Reports</h1>
        <p className="text-sm text-slate-500">View detailed sales, inventory, and revenue analytics.</p>
      </div>
    </DashboardLayout>
  );
}
