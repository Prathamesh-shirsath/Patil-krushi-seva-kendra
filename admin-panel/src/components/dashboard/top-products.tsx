export default function TopProducts() {
  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-bold">
        Top Selling Products
      </h2>

      <div className="space-y-4">

        <div className="flex justify-between">
          <p>Syngenta Amistar</p>
          <p className="font-semibold">
            120 Sold
          </p>
        </div>

        <div className="flex justify-between">
          <p>UPL Saaf</p>
          <p className="font-semibold">
            95 Sold
          </p>
        </div>

        <div className="flex justify-between">
          <p>Bayer Confidor</p>
          <p className="font-semibold">
            88 Sold
          </p>
        </div>

      </div>
    </div>
  );
}