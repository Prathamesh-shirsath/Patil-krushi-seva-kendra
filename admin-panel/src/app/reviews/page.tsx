import DashboardLayout from "@/components/layout/dashboard-layout";

export default function ReviewsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-slate-800">Product Reviews</h1>
        <p className="text-sm text-slate-500">Moderate customer product ratings and reviews.</p>
      </div>
    </DashboardLayout>
  );
}
