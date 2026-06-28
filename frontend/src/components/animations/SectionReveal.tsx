"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
};

export default function SectionReveal({
  children,
  className = "",
  delay = 0,
  threshold = 0.25,
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element || isVisible) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      const frame = requestAnimationFrame(() => setIsVisible(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [isVisible, threshold]);

  return (
    <div
      ref={ref}
      className={`section-reveal transition-all duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
        isVisible
          ? "is-visible translate-y-0 opacity-100"
          : "translate-y-[30px] opacity-0"
      } ${className}`}
      style={{
        transitionDelay: isVisible ? `${delay}ms` : "0ms",
      }}
    >
      {children}

      <style jsx global>{`
        .section-reveal > section > div > *,
        .section-reveal > footer > div > * {
          opacity: 0;
          transform: translateY(18px);
          transition:
            opacity 560ms ease-out,
            transform 560ms ease-out;
          will-change: opacity, transform;
        }

        .section-reveal.is-visible > section > div > *,
        .section-reveal.is-visible > footer > div > * {
          opacity: 1;
          transform: translateY(0);
        }

        .section-reveal.is-visible > section > div > *:nth-child(1),
        .section-reveal.is-visible > footer > div > *:nth-child(1) {
          transition-delay: 80ms;
        }

        .section-reveal.is-visible > section > div > *:nth-child(2),
        .section-reveal.is-visible > footer > div > *:nth-child(2) {
          transition-delay: 160ms;
        }

        .section-reveal.is-visible > section > div > *:nth-child(3),
        .section-reveal.is-visible > footer > div > *:nth-child(3) {
          transition-delay: 240ms;
        }

        @media (prefers-reduced-motion: reduce) {
          .section-reveal > section > div > *,
          .section-reveal > footer > div > * {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
            transition-delay: 0ms !important;
          }
        }
      `}</style>
    </div>
  );
}
