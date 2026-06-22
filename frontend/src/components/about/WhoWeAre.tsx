import Image from "next/image";
import { ShieldCheck, UserCheck, Truck, IndianRupee } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "100% Genuine Products",
  },
  {
    icon: UserCheck,
    title: "Expert Guidance",
  },
  {
    icon: Truck,
    title: "Fast & Safe Delivery",
  },
  {
    icon: IndianRupee,
    title: "Affordable Prices",
  },
];

export default function WhoWeAre() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Image */}
          <div className="relative">
            <Image
              src="/about/shop.jpg"
              alt="Who We Are"
              width={700}
              height={500}
              className="rounded-3xl shadow-xl object-cover"
            />
          </div>

          {/* Content */}
          <div>
            <span className="text-green-600 font-semibold uppercase tracking-wide">
              🌱 Who We Are
            </span>

            <h2 className="mt-3 text-4xl font-extrabold text-gray-900 leading-tight">
              More Than a Store,
              <span className="block text-green-600">
                We Are Your Farming Partner
              </span>
            </h2>

            <p className="mt-6 text-gray-600 leading-8">
              Patil Krushi Seva Kendra is dedicated to providing farmers
              with premium agricultural products, genuine solutions and
              expert guidance. We believe in building long-term
              relationships and supporting farmers at every step of
              their journey.
            </p>

            <div className="grid grid-cols-2 gap-6 mt-8">
              {features.map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col items-center text-center p-4 rounded-2xl bg-green-50 hover:bg-green-100 transition"
                >
                  <item.icon className="h-10 w-10 text-green-600 mb-3" />
                  <p className="font-medium text-gray-800">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}