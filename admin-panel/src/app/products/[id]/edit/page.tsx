import DashboardLayout from "@/components/layout/dashboard-layout";

export default function EditProductPage() {
  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold text-slate-800">Edit Product</h1>
        <p className="text-sm text-slate-500">Update product details and pricing.</p>
      </div>
    </DashboardLayout>
  );
}
