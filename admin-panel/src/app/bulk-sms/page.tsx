import DashboardLayout from "@/components/layout/dashboard-layout";

export default function BulkSMSPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-slate-800">Bulk SMS Marketing</h1>
        <p className="text-sm text-slate-500">Send promotional SMS updates to farmers.</p>
      </div>
    </DashboardLayout>
  );
}
