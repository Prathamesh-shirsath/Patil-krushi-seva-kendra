export default function RecentOrders() {
  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-bold">
        Recent Orders
      </h2>

      <div className="space-y-4">

        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold">
              Order #1025
            </p>

            <p className="text-sm text-slate-500">
              Tomato Seeds
            </p>
          </div>

          <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
            Delivered
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold">
              Order #1026
            </p>

            <p className="text-sm text-slate-500">
              Urea Fertilizer
            </p>
          </div>

          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
            Processing
          </span>
        </div>

      </div>
    </div>
  );
}