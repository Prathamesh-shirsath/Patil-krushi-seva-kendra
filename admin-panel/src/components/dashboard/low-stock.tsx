export default function LowStock() {
  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-bold">
        Low Stock Products
      </h2>

      <div className="space-y-4">

        <div className="flex justify-between">
          <p>Coragen</p>

          <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-600">
            5 left
          </span>
        </div>

        <div className="flex justify-between">
          <p>Roundup</p>

          <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-600">
            2 left
          </span>
        </div>

      </div>
    </div>
  );
}