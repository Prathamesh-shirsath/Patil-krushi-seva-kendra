
"use client";

const stats = [
  {
    number: "10,000+",
    label: "Happy Farmers",
  },
  {
    number: "500+",
    label: "Agricultural Products",
  },
  {
    number: "50+",
    label: "Trusted Brands",
  },
  {
    number: "100%",
    label: "Genuine Products",
  },
];

export default function StatsBanner() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold">
            📊 OUR IMPACT
          </span>

          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold text-gray-900">
            Numbers That Reflect Our Success
          </h2>

          <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
            Our commitment to quality and service has helped us
            build trust among thousands of farmers.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div
              key={item.label}
              className="
                rounded-3xl
                bg-gradient-to-r
                from-green-700
                to-green-500
                p-8
                text-center
                text-white
                shadow-xl
                hover:scale-105
                transition-all
                duration-500
              "
            >
              <h3 className="text-4xl md:text-5xl font-extrabold">
                {item.number}
              </h3>

              <p className="mt-3 text-white/90">
                {item.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

