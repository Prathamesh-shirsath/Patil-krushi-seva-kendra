import DashboardLayout from "@/components/layout/dashboard-layout";

export default function ProductDetailPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-slate-800">Product Details</h1>
        <p className="text-sm text-slate-500">View detailed product specifications.</p>
      </div>
    </DashboardLayout>
  );
}
