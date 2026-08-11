import DashboardLayout from "@/components/layout/dashboard-layout";

export default function NewsletterPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-slate-800">Newsletter Subscribers</h1>
        <p className="text-sm text-slate-500">View and manage email newsletter subscribers.</p>
      </div>
    </DashboardLayout>
  );
}
