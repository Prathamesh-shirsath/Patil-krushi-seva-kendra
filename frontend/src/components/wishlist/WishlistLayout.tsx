import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Wishlist | Patil Krushi Seva Kendra",
  description:
    "Manage your favourite seeds, fertilizers, pesticides and farming essentials.",
};

interface WishlistLayoutProps {
  children: React.ReactNode;
}

export default function WishlistLayout({
  children,
}: WishlistLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fff7] via-white to-[#eef8ef]">

      {/* Background Decorations */}

      <div className="fixed inset-0 -z-10 overflow-hidden">

        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-green-300/20 blur-3xl" />

        <div className="absolute right-0 top-40 h-[450px] w-[450px] rounded-full bg-lime-200/20 blur-3xl" />

        <div className="absolute bottom-0 left-1/3 h-[350px] w-[350px] rounded-full bg-emerald-200/20 blur-3xl" />

      </div>

      {/* Container */}

      <div className="mx-auto max-w-[1700px]">

        {children}

      </div>

    </div>
  );
}