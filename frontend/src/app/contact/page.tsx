"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiHeadphones, FiUsers } from "react-icons/fi";
import {
  FiPhone,
  FiMail,
  FiMapPin
} from "react-icons/fi";
import {
  FiShield,
  FiZap,
  FiUserCheck,
  FiRefreshCw,
  FiLock
} from "react-icons/fi";

import {
  FaWhatsapp
} from "react-icons/fa";
import { DEFAULT_BANNER_IMAGE } from "@/lib/image-fallbacks";
import { useBanners } from "@/hooks/use-banners";
import { useLanguage } from "@/i18n/useLanguage";

export default function ContactPage() {
  const { t } = useLanguage();
  const { data: contactBanners = [] } = useBanners("CONTACT_HERO");
  const contactBanner = contactBanners[0];
  const contactHeroDesktopImage = contactBanner?.image || DEFAULT_BANNER_IMAGE;
  const contactHeroMobileImage =
    contactBanner?.mobileImage || contactHeroDesktopImage;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Handle form submission here
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <main className="min-h-screen bg-white">
    {/* ── Hero Banner ── */}
    <section className="max-w-[1600px] mx-auto px-4 py-5">
  <div className="bg-gray-50 rounded-xl overflow-hidden grid md:grid-cols-2 items-center">

    <div className="p-10">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
        {t.contact.hero.title}
      </h1>

      <h2 className="text-xl font-semibold text-green-700 mt-2">
        {t.contact.hero.subtitle}
      </h2>

      <p className="text-gray-600 mt-4 leading-6">
        {t.contact.hero.description}
      </p>

      <div className="mt-6 flex flex-col gap-5 md:flex-row">

        <div className="flex min-w-0 items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm">
          <div className="bg-green-100 p-2 rounded-full">
            <FiHeadphones className="text-green-700 w-6 h-6" />
          </div>

          <div>
            <p className="font-semibold text-sm">
              {t.contact.hero.expertSupport}
            </p>

            <p className="text-xs text-gray-500">
              {t.contact.hero.assistance}
            </p>
          </div>
        </div>


        <div className="flex min-w-0 items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm">
          <div className="bg-green-100 p-2 rounded-full">
            <FiUsers className="text-green-700 w-6 h-6" />
          </div>

          <div>
            <p className="font-semibold text-sm">
              {t.contact.hero.farmerFirst}
            </p>

            <p className="text-xs text-gray-500">
              {t.contact.hero.successPriority}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div>
      <Image
        src={contactHeroDesktopImage}
        alt={t.contact.accessibility.farmSupport}
        width={700}
        height={400}
        className="hidden h-[260px] w-full object-cover md:block md:h-[320px]"
      />
      <Image
        src={contactHeroMobileImage}
        alt={t.contact.accessibility.farmSupport}
        width={700}
        height={400}
        className="h-[260px] w-full object-cover md:hidden"
      />
    </div>

  </div>
    </section>

      {/* ── Contact Info Cards ── */}
    <section className="bg-white py-10">
  <div className="max-w-[1600px] mx-auto px-4">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

      {/* Call */}
      <div className="border border-gray-200 rounded-xl p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
        <div className="bg-green-100 rounded-full p-3 flex-shrink-0">
          <FiPhone className="w-6 h-6 text-green-700" />
        </div>

        <div>
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">
            {t.contact.cards.callUs}
          </p>
          <p className="font-semibold text-gray-800">
            +91 92090 61629
                </p>
                <p className="font-semibold text-gray-800">
                  +91 70300 81617
                </p>
                <p className="font-semibold text-gray-800">
                  +91 8010070680
                </p>
          <p className="text-xs text-gray-500 mt-1 whitespace-pre-line">
            {t.contact.cards.callHours}
          </p>
        </div>
      </div>


      {/* WhatsApp */}
            <div className="border border-gray-200 rounded-xl p-5 flex items-start gap-4 hover:shadow-md transition-shadow" onClick={() => window.open("https://wa.me/919209061629", "_blank")}>
              <div className="bg-green-100 rounded-full p-3 flex-shrink-0">
                
          <FaWhatsapp className="w-6 h-6 text-green-700" />
              </div>
              

        <div>
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1 ">
            {t.contact.cards.whatsappUs}
          </p>
                
          <p className="font-semibold text-gray-800 ">
                  +91 92090 61629
                  
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {t.contact.cards.whatsappDescription}
          </p>
          <button className="mt-2 text-xs font-medium text-white bg-[#1a4d2e] hover:bg-green-800 px-3 py-1.5 rounded-lg transition-colors "  >
            {t.contact.cards.whatsappCta}
          </button>
          
        </div>
      </div>


      {/* Email */}
      <div className="border border-gray-200 rounded-xl p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
        <div className="bg-green-100 rounded-full p-3 flex-shrink-0">
          <FiMail className="w-6 h-6 text-green-700" />
        </div>

        <div>
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">
            {t.contact.cards.emailUs}
          </p>
          <p className="font-semibold text-gray-800 text-[11px]">
            support@patilkrushisevakendra.com
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {t.contact.cards.emailDescription}
          </p>
        </div>
      </div>


      {/* Visit */}
      <div className="border border-gray-200 rounded-xl p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
        <div className="bg-green-100 rounded-full p-3 flex-shrink-0">
          <FiMapPin className="w-6 h-6 text-green-700" />
        </div>

        <div>
          <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">
            {t.contact.cards.visitStore}
          </p>
          <p className="font-semibold text-gray-800 text-sm">
            Patil Krushi Seva Kendra,
          </p>
          <p className="text-xs text-gray-500">
           A/p. Tembhurni, Tal. Jafrabaad,
          </p>
          <p className="text-xs text-gray-500">
            Dist. Jalna, Maharashtra, India - 431208
          </p>
        </div>
      </div>

    </div>
  </div>
    </section>

      {/* ── Form + Map ── */}
    <section className="py-12 bg-gray-50">
        <div className="max-w-[1600px] mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-1">{t.contact.form.title}</h2>
              <p className="text-gray-500 text-sm mb-6">{t.contact.form.description}</p>

              {submitted && (
                <div className="mb-5 bg-green-50 border border-green-200 text-green-700 rounded-lg px-4 py-3 text-sm font-medium">
                  {t.contact.form.success}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.contact.form.labels.name} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t.contact.form.placeholders.name}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.contact.form.labels.email} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t.contact.form.placeholders.email}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{t.contact.form.labels.phone}</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t.contact.form.placeholders.phone}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t.contact.form.labels.subject} <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition bg-white"
                  >
                    <option value="">{t.contact.form.subjects.select}</option>
                    <option value="product-inquiry">{t.contact.form.subjects.productInquiry}</option>
                    <option value="order-support">{t.contact.form.subjects.orderSupport}</option>
                    <option value="expert-advice">{t.contact.form.subjects.farmingAdvice}</option>
                    <option value="return-refund">{t.contact.form.subjects.returnRefund}</option>
                    <option value="other">{t.contact.form.subjects.other}</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t.contact.form.labels.message} <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder={t.contact.form.placeholders.message}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition resize-none"
                />
              </div>

              <button
                onClick={handleSubmit}
                className="mt-5 w-full bg-[#1a4d2e] hover:bg-green-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                {t.contact.form.submit}
              </button>
            </div>

            {/* Map + Hours */}
            <div className="flex flex-col gap-5">
              {/* Map */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-5 border-b border-gray-100">
                  <h2 className="text-xl font-bold text-gray-800">{t.contact.location.title}</h2>
                </div>
                <div className="relative h-64">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3746.169979881338!2d75.99550507523239!3d20.12695498130617!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjDCsDA3JzM3LjAiTiA3NcKwNTknNTMuMSJF!5e0!3m2!1sen!2sin!4v1781587329568!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={t.contact.accessibility.storeLocation}
                  />
                </div>
                <div className="p-4 bg-gray-50">
                  <p className="text-sm font-semibold text-gray-800">Patil Krushi Seva Kendra</p>
                  <p className="text-xs text-gray-500 mt-0.5"> A/p. Tembhurni, Tal. Jafrabaad,Dist. Jalna, Maharashtra, India - 431208</p>
                  <a
                    href="https://goo.gl/maps/KLWJxb3s8qhVY2Ud7?g_st=aw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-2 text-xs font-medium text-white bg-[#1a4d2e] hover:bg-green-800 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    {t.contact.location.mapsCta}
                  </a>
                </div>
              </div>

              {/* Store Hours */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="bg-green-100 rounded-full p-2">
                        <svg className="w-4 h-4 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="font-semibold text-gray-800 text-sm">{t.contact.location.storeHours}</p>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between">
                        <span className="text-gray-500">{t.contact.location.mondaySaturday}</span>
                        <span className="font-medium text-gray-700">{t.contact.location.mondaySaturdayHours}</span>
                      </div>
                      <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between">
                        <span className="text-gray-500">{t.contact.location.sunday}</span>
                        <span className="font-medium text-gray-700">{t.contact.location.sundayHours}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="bg-green-100 rounded-full p-2">
                        <svg className="w-4 h-4 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <p className="font-semibold text-gray-800 text-sm">{t.contact.location.online247}</p>
                    </div>
                    <p className="text-sm text-gray-500">{t.contact.location.onlineDescription}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </section>

      {/* ── Trust Strip ── */}
    <section className="py-8 bg-white border-t border-gray-100">
    <div className="max-w-[1500px] mx-auto px-4">
    <div className="grid grid-cols-2 md:grid-cols-5 gap-6">

      {[
        {
          icon: FiShield,
          label: t.contact.trust.originalProducts,
          sub: t.contact.trust.originalProductsDescription
        },
        {
          icon: FiZap,
          label: t.contact.trust.fastDelivery,
          sub: t.contact.trust.fastDeliveryDescription
        },
        {
          icon: FiUserCheck,
          label: t.contact.trust.expertSupport,
          sub: t.contact.trust.expertSupportDescription
        },
        {
          icon: FiRefreshCw,
          label: t.contact.trust.easyReturns,
          sub: t.contact.trust.easyReturnsDescription
        },
        {
          icon: FiLock,
          label: t.contact.trust.securePayments,
          sub: t.contact.trust.securePaymentsDescription
        }
      ].map((item) => {
        const Icon = item.icon;

        return (
          <div key={item.label} className="flex items-start gap-3">

            <div className="bg-green-50 rounded-full p-2 flex-shrink-0 mt-0.5">
              <Icon className="w-5 h-5 text-green-700" />
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-800">
                {item.label}
              </p>

              <p className="text-xs text-gray-500">
                {item.sub}
              </p>
            </div>

          </div>
        );
      })}

    </div>
  </div>
    </section>
    </main>
  );
}
