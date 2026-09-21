"use client";

import Link from "next/link";
import {
  Clock,
  Globe,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Video,
} from "lucide-react";

import { DEFAULT_BRAND_IMAGE } from "@/lib/image-fallbacks";
import { useLanguage } from "@/i18n/useLanguage";

const quickLinkHrefs = [
  { key: "home" as const, href: "/" },
  { key: "shop" as const, href: "/shop" },
  { key: "categories" as const, href: "/categories" },
  { key: "brands" as const, href: "/brands" },
  { key: "about" as const, href: "/about" },
  { key: "contact" as const, href: "/contact" },
];

const categoryLinks = [
  { key: "seeds" as const, href: "/categories?name=seeds" },
  { key: "fertilizers" as const, href: "/categories?name=fertilizers" },
  { key: "pesticides" as const, href: "/categories?name=pesticides" },
  { key: "organicFarming" as const, href: "/categories?name=organic-farming" },
  { key: "plantGrowth" as const, href: "/categories?name=plant-growth" },
];

const supportLinkKeys = [
  { key: "faq" as const, href: "/contact" },
  { key: "shippingPolicy" as const, href: "/shipping-policy" },
  { key: "privacyPolicy" as const, href: "/privacy-policy" },
  { key: "terms" as const, href: "/terms" },
  { key: "returns" as const, href: "/returns" },
];

const contactDetails = [
  {
    label: "+91 98765 43210",
    href: "tel:+919876543210",
    icon: Phone,
  },
  {
    label: "info@patilkrushi.com",
    href: "mailto:info@patilkrushi.com",
    icon: Mail,
  },
  {
    kind: "location" as const,
    href: "/contact",
    icon: MapPin,
  },
  {
    kind: "hours" as const,
    href: "/contact",
    icon: Clock,
  },
];

const socialLinks = [
  { label: "Facebook", href: "https://facebook.com", icon: Globe },
  { label: "Instagram", href: "https://instagram.com", icon: MessageCircle },
  { label: "LinkedIn", href: "https://linkedin.com", icon: Send },
  { label: "YouTube", href: "https://youtube.com", icon: Video },
];

const paymentMethods = ["Visa", "Mastercard", "UPI", "RuPay"];

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-sm font-extrabold uppercase tracking-wide text-white">
      {children}
    </h2>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="inline-flex min-h-11 items-center rounded text-sm text-green-50/75 transition-colors hover:text-green-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-300 focus-visible:ring-offset-2 focus-visible:ring-offset-green-950"
    >
      {children}
    </Link>
  );
}

export default function FooterContent() {
  const { t } = useLanguage();

  return (
    <footer className="mt-12 rounded-t-[2rem] bg-[#071f16] text-white md:mt-16">
      <div className="mx-auto max-w-[1500px] px-4 py-14 md:px-8 lg:px-12 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.9fr_1fr_1.25fr]">
          <section>
            <Link
              href="/"
              className="inline-flex items-center gap-3 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-300 focus-visible:ring-offset-2 focus-visible:ring-offset-green-950"
              aria-label={t.header.logoAlt}
            >
              <img
                src={DEFAULT_BRAND_IMAGE}
                alt=""
                className="h-12 w-12 rounded-2xl bg-white object-contain p-1.5"
              />
              <div>
                <p className="text-lg font-black leading-tight">
                  Patil Krushi
                </p>
                <p className="text-xs font-semibold uppercase tracking-wide text-green-300">
                  Seva Kendra
                </p>
              </div>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-green-50/70">
              {t.footer.description}
            </p>
          </section>

          <nav aria-labelledby="footer-quick-links">
            <FooterHeading>
              <span id="footer-quick-links">{t.footer.quickLinks}</span>
            </FooterHeading>

            <ul className="mt-5 space-y-3">
              {quickLinkHrefs.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href}>
                    {t.navigation[link.key]}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-categories">
            <FooterHeading>
              <span id="footer-categories">{t.footer.categories}</span>
            </FooterHeading>

            <ul className="mt-5 space-y-3">
              {categoryLinks.map((category) => (
                <li key={category.href}>
                  <FooterLink href={category.href}>
                    {t.footer[category.key]}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-support">
            <FooterHeading>
              <span id="footer-support">{t.footer.customerSupport}</span>
            </FooterHeading>

            <ul className="mt-5 space-y-3">
              {supportLinkKeys.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href}>
                    {t.footer[link.key]}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          <section aria-labelledby="footer-contact">
            <FooterHeading>
              <span id="footer-contact">{t.footer.contact}</span>
            </FooterHeading>

            <ul className="mt-5 space-y-4">
              {contactDetails.map((item, index) => {
                const Icon = item.icon;
                const displayLabel =
                  "kind" in item && item.kind === "location"
                    ? t.footer.location
                    : "kind" in item && item.kind === "hours"
                      ? t.footer.hours
                      : "label" in item
                        ? item.label
                        : "";

                return (
                  <li key={`${item.href}-${index}`}>
                    <Link
                      href={item.href}
                      className="group flex min-h-11 items-center gap-3 rounded text-sm text-green-50/75 transition-colors hover:text-green-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-300 focus-visible:ring-offset-2 focus-visible:ring-offset-green-950"
                    >
                      <Icon
                        className="mt-0.5 h-4 w-4 shrink-0 text-green-400 transition-transform group-hover:scale-110"
                        aria-hidden="true"
                      />
                      <span>{displayLabel}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <p className="text-sm text-green-50/65">{t.footer.copyright}</p>

            <div className="flex flex-wrap items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-green-50/75 transition-all hover:-translate-y-0.5 hover:border-green-400 hover:text-green-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-300 focus-visible:ring-offset-2 focus-visible:ring-offset-green-950"
                  >
                    <Icon
                      className="h-4 w-4"
                      aria-hidden="true"
                    />
                  </Link>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {paymentMethods.map((method) => (
                <span
                  key={method}
                  className="inline-flex min-h-9 items-center rounded-lg border border-white/10 bg-white px-3 py-2 text-xs font-black uppercase tracking-wide text-green-950 shadow-sm"
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
