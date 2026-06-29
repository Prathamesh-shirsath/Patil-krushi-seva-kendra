"use client";

import { useEffect, useRef, useState } from "react";
import {
  Package,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";

const statistics = [
  {
    value: "50K+",
    title: "Happy Farmers",
    description: "Serving farmers across Maharashtra",
    icon: Users,
  },
  {
    value: "1200+",
    title: "Products",
    description: "Agricultural products available",
    icon: Package,
  },
  {
    value: "100+",
    title: "Trusted Brands",
    description: "Leading agricultural companies",
    icon: ShieldCheck,
  },
  {
    value: "98%",
    title: "Customer Satisfaction",
    description: "Based on customer feedback",
    icon: Star,
  },
];

export default function StatisticsStrip() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section || hasEntered) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      const frame = requestAnimationFrame(() => setHasEntered(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.25,
      }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, [hasEntered]);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-gradient-to-b from-green-50 to-white py-12"
    >
      <div className="mx-auto w-full max-w-[1500px] px-4 md:px-8 lg:px-12">
        <div className="mb-8 text-center md:mb-10">
          <span className="inline-block rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
            Our Impact
          </span>

          <h2 className="mt-4 text-2xl font-extrabold text-gray-900 sm:text-3xl md:text-5xl">
            Trusted by Farmers Every Day
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 min-[390px]:grid-cols-2 lg:grid-cols-4">
          {statistics.map((statistic, index) => {
            const Icon = statistic.icon;

            return (
              <article
                key={statistic.title}
                className={`stat-card group rounded-2xl border border-gray-200 bg-white p-4 text-center shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-green-300 hover:bg-green-50/30 hover:shadow-lg hover:shadow-green-950/10 motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none sm:p-6 ${
                  hasEntered
                    ? "animate-[statReveal_500ms_ease-out_both]"
                    : "translate-y-5 opacity-0"
                }`}
                style={{
                  animationDelay: hasEntered ? `${index * 80}ms` : "0ms",
                }}
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-700 transition-all duration-300 ease-out group-hover:scale-[1.08] group-hover:bg-green-100 group-hover:text-green-600 motion-reduce:transform-none motion-reduce:transition-none sm:h-14 sm:w-14">
                  <Icon
                    className="h-6 w-6 sm:h-7 sm:w-7"
                    aria-hidden="true"
                  />
                </div>

                <p className="mt-4 text-3xl font-black tracking-tight text-green-700 transition-colors duration-300 ease-out group-hover:text-green-800 sm:mt-5 sm:text-4xl">
                  {statistic.value}
                </p>

                <h3 className="mt-2 text-sm font-extrabold text-gray-950 transition-colors duration-300 ease-out group-hover:text-gray-900 sm:text-base">
                  {statistic.title}
                </h3>

                <p className="mt-2 text-xs leading-5 text-gray-500 sm:text-sm sm:leading-6">
                  {statistic.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>

      <style jsx global>{`
        @keyframes statReveal {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .stat-card {
            animation: none !important;
            animation-delay: 0ms !important;
          }
        }
      `}</style>
    </section>
  );
}
