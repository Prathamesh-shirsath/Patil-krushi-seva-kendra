import "./globals.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SectionReveal from "@/components/animations/SectionReveal";

import { Geist, Noto_Sans_Devanagari } from "next/font/google";

import { cn } from "@/lib/utils";

import QueryProvider from "@/providers/query-provider";
import { AuthProvider } from "@/providers/AuthProvider";
import LanguageProvider from "@/i18n/LanguageProvider";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-marathi",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "font-sans",
        geist.variable,
        notoSansDevanagari.variable
      )}
    >
      <body>
        {/* Google Translate */}
      
      
        <QueryProvider>
          <LanguageProvider>
            <AuthProvider>
              <Header />

              {children}

              <SectionReveal threshold={0.2}>
                <Footer />
              </SectionReveal>
            </AuthProvider>
          </LanguageProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
