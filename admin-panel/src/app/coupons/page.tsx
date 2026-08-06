import DashboardLayout from "@/components/layout/dashboard-layout";

export default function CouponsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-slate-800">Coupons & Discounts</h1>
        <p className="text-sm text-slate-500">Manage promotional coupons and discount codes.</p>
      </div>
    </DashboardLayout>
  );
}
