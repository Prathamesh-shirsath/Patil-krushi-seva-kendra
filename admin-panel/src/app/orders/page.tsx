import DashboardLayout from "@/components/layout/dashboard-layout";

export default function OrdersPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-slate-800">Orders Management</h1>
        <p className="text-sm text-slate-500">Manage customer orders and order fulfillment.</p>
      </div>
    </DashboardLayout>
  );
}
