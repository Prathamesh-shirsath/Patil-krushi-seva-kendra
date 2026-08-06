import DashboardLayout from "@/components/layout/dashboard-layout";

export default function ContentPagesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-slate-800">Content Pages</h1>
        <p className="text-sm text-slate-500">Manage store pages and static content.</p>
      </div>
    </DashboardLayout>
  );
}
