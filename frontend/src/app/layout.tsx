import "./globals.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SectionReveal from "@/components/animations/SectionReveal";

import { Geist } from "next/font/google";

import { cn } from "@/lib/utils";

import QueryProvider
  from "@/providers/query-provider";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
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
        geist.variable
      )}
    >
      <body>

        <QueryProvider>

          <Header />

          {children}

          <SectionReveal threshold={0.2}>
            <Footer />
          </SectionReveal>

        </QueryProvider>

      </body>
    </html>
  );
}
