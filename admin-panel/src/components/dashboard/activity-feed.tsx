export default function ActivityFeed() {
  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">

      <h2 className="mb-5 text-xl font-bold">
        Activity Feed
      </h2>

      <div className="space-y-4">

        <p className="text-sm text-slate-600">
          ✅ New Order Received
        </p>

        <p className="text-sm text-slate-600">
          💰 Payment Successful
        </p>

        <p className="text-sm text-slate-600">
          👤 New Customer Registered
        </p>

        <p className="text-sm text-slate-600">
          ⚠ Low Stock Alert
        </p>

      </div>

    </div>
  );
}