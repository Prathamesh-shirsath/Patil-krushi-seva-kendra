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

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Categories", href: "/categories" },
  { label: "Brands", href: "/brands" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const categories = [
  { label: "Seeds", href: "/categories?name=seeds" },
  { label: "Fertilizers", href: "/categories?name=fertilizers" },
  { label: "Pesticides", href: "/categories?name=pesticides" },
  { label: "Organic Farming", href: "/categories?name=organic-farming" },
  { label: "Plant Growth", href: "/categories?name=plant-growth" },
];

const supportLinks = [
  { label: "FAQ", href: "/contact" },
  { label: "Shipping Policy", href: "/shipping-policy" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Returns", href: "/returns" },
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
    label: "Maharashtra, India",
    href: "/contact",
    icon: MapPin,
  },
  {
    label: "Mon - Sat, 9:00 AM - 7:00 PM",
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

export default function Footer() {
  return (
    <footer className="mt-12 rounded-t-[2rem] bg-[#071f16] text-white md:mt-16">
      <div className="mx-auto max-w-[1500px] px-4 py-14 md:px-8 lg:px-12 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.9fr_1fr_1.25fr]">
          <section>
            <Link
              href="/"
              className="inline-flex items-center gap-3 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-300 focus-visible:ring-offset-2 focus-visible:ring-offset-green-950"
              aria-label="Patil Krushi Seva Kendra home"
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
              Providing quality agricultural products to farmers with trusted
              brands and expert support.
            </p>
          </section>

          <nav aria-labelledby="footer-quick-links">
            <FooterHeading>
              <span id="footer-quick-links">Quick Links</span>
            </FooterHeading>

            <ul className="mt-5 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-categories">
            <FooterHeading>
              <span id="footer-categories">Categories</span>
            </FooterHeading>

            <ul className="mt-5 space-y-3">
              {categories.map((category) => (
                <li key={category.href}>
                  <FooterLink href={category.href}>{category.label}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-support">
            <FooterHeading>
              <span id="footer-support">Customer Support</span>
            </FooterHeading>

            <ul className="mt-5 space-y-3">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          <section aria-labelledby="footer-contact">
            <FooterHeading>
              <span id="footer-contact">Contact</span>
            </FooterHeading>

            <ul className="mt-5 space-y-4">
              {contactDetails.map((item) => {
                const Icon = item.icon;

                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="group flex min-h-11 items-center gap-3 rounded text-sm text-green-50/75 transition-colors hover:text-green-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-300 focus-visible:ring-offset-2 focus-visible:ring-offset-green-950"
                    >
                      <Icon
                        className="mt-0.5 h-4 w-4 shrink-0 text-green-400 transition-transform group-hover:scale-110"
                        aria-hidden="true"
                      />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <p className="text-sm text-green-50/65">
              © 2026 Patil Krushi Seva Kendra. All rights reserved.
            </p>

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
