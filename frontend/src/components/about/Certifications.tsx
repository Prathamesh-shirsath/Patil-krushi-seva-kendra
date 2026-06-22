
"use client";

const certifications = [
  {
    icon: "🏅",
    title: "ISO 9001:2015",
    description: "Certified quality management standards.",
  },
  {
    icon: "🏛️",
    title: "Government Registered",
    description: "Registered and compliant business entity.",
  },
  {
    icon: "🛡️",
    title: "100% Genuine Products",
    description: "Products sourced from trusted manufacturers.",
  },
  {
    icon: "🚚",
    title: "Fast Delivery",
    description: "Reliable delivery across Maharashtra.",
  },
];

export default function Certifications() {
  return (
    <section className="py-20 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold">
            🏆 CERTIFICATIONS
          </span>

          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold text-gray-900">
            Certified Quality & Trusted Service
          </h2>

          <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
            We maintain the highest standards of quality, transparency
            and customer satisfaction in every product we offer.
          </p>
        </div>

        {/* Certification Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {certifications.map((item) => (
            <div
              key={item.title}
              className="
                bg-white
                rounded-3xl
                p-8
                shadow-md
                hover:shadow-2xl
                hover:-translate-y-2
                transition-all
                duration-500
                text-center
              "
            >
              <div className="text-6xl mb-5">
                {item.icon}
              </div>

              <h3 className="text-xl font-bold text-gray-900">
                {item.title}
              </h3>

              <p className="mt-3 text-gray-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Trust Banner */}
        <div className="mt-14 rounded-3xl bg-gradient-to-r from-green-700 to-green-500 p-8 text-white">
          <div className="grid md:grid-cols-5 gap-6 text-center">

            <div>
              <h3 className="font-bold text-lg">🌱 Best Quality</h3>
              <p className="text-white/80 text-sm">
                Premium Products
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg">👨‍🌾 Expert Support</h3>
              <p className="text-white/80 text-sm">
                Farmer Guidance
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg">💰 Best Prices</h3>
              <p className="text-white/80 text-sm">
                Affordable Rates
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg">📦 500+ Products</h3>
              <p className="text-white/80 text-sm">
                Wide Range
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg">☎️ 24/7 Support</h3>
              <p className="text-white/80 text-sm">
                Always Available
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

