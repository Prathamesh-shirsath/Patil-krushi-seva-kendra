
"use client";

import Image from "next/image";

export default function FounderSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Founder Image */}
          <div className="relative">
            <div className="absolute -top-5 -left-5 h-32 w-32 rounded-full bg-green-200 blur-3xl opacity-40" />

            <Image
              src="/about/founder.jpg"
              alt="Founder"
              width={600}
              height={700}
              className="
                relative
                z-10
                rounded-3xl
                shadow-2xl
                object-cover
                w-full
                h-auto
              "
            />
          </div>

          {/* Founder Content */}
          <div>

            <span className="inline-block rounded-full bg-green-100 px-4 py-2 text-green-700 font-semibold">
              👨‍💼 FOUNDER MESSAGE
            </span>

            <h2 className="mt-5 text-4xl md:text-5xl font-extrabold text-gray-900">
              Meet Our Founder
            </h2>

            <h3 className="mt-4 text-2xl font-bold text-green-700">
             Pradyumna Ramesh Rokade
            </h3>

            <p className="text-gray-500 font-medium">
              Founder, Patil Krushi Seva Kendra
            </p>

            <blockquote className="mt-8 text-lg leading-8 text-gray-700 border-l-4 border-green-600 pl-6 italic">
              Our mission is simple — empower farmers with
              genuine products, modern agricultural solutions
              and expert guidance that helps them achieve
              better harvests and sustainable growth.
            </blockquote>

            <p className="mt-6 text-gray-600 leading-8">
              We believe agriculture is the backbone of our nation.
              Through innovation, trust and quality service,
              we are committed to helping every farmer succeed.
            </p>

            {/* Achievements */}
            <div className="mt-8 grid grid-cols-2 gap-4">

              <div className="rounded-2xl bg-white p-5 shadow-md">
                <h4 className="text-2xl font-bold text-green-700">
                  10,000+
                </h4>
                <p className="text-sm text-gray-600">
                  Farmers Served
                </p>
              </div>

              <div className="rounded-2xl bg-white p-5 shadow-md">
                <h4 className="text-2xl font-bold text-green-700">
                  500+
                </h4>
                <p className="text-sm text-gray-600">
                  Products Available
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

