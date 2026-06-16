export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="bg-green-700 text-white text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between">
          <span>📞 +91 87665 87665</span>
          <span>🚚 Free Shipping Above ₹999</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4">
        <h1 className="text-2xl font-bold text-green-700">
          Patil Krushi Seva Kendra
        </h1>
      </div>
    </header>
  );
}