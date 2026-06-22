
"use client";

import Image from "next/image";

const team = [
  {
    name: "Agriculture Expert",
    role: "Crop & Farming Consultant",
    image: "/about/team.jpg",
  },
  {
    name: "Customer Support",
    role: "Farmer Assistance Team",
    image: "/about/team.jpg",
  },
  {
    name: "Logistics Team",
    role: "Delivery & Operations",
    image: "/about/team.jpg",
  },
];

export default function TeamSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block rounded-full bg-green-100 px-4 py-2 text-green-700 font-semibold">
            👥 OUR TEAM
          </span>

          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold text-gray-900">
            Meet The Team Behind Our Success
          </h2>

          <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
            Our dedicated team works tirelessly to provide
            quality agricultural products and exceptional service
            to farmers across the region.
          </p>
        </div>

        {/* Team Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {team.map((member) => (
            <div
              key={member.name}
              className="
                group
                overflow-hidden
                rounded-3xl
                bg-white
                shadow-lg
                hover:shadow-2xl
                hover:-translate-y-2
                transition-all
                duration-500
              "
            >
              <div className="overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={500}
                  height={500}
                  className="
                    h-80
                    w-full
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-110
                  "
                />
              </div>

              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold text-gray-900">
                  {member.name}
                </h3>

                <p className="mt-2 text-green-700 font-medium">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

