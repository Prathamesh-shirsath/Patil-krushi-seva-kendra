import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Globe,
  MessageCircle,
  Play,
} from "lucide-react";
export default function Footer() {
  return (
    <footer className="bg-green-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Company Info */}
          <div>
            <h2 className="text-2xl font-bold">
              Patil Krushi Kendra
            </h2>

            <p className="mt-4 text-green-100 leading-relaxed">
              Premium seeds, fertilizers, pesticides,
              and agricultural solutions for modern farmers.
            </p>

            <div className="flex gap-4 mt-6">
              <Globe className="cursor-pointer hover:text-green-300" />
               <MessageCircle className="cursor-pointer hover:text-green-300" />
                  <Play className="cursor-pointer hover:text-green-300" /> 
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Quick Links
            </h3>

            <ul className="space-y-3 text-green-100">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>

              <li>
                <Link href="/shop" className="hover:text-white">
                  Shop
                </Link>
              </li>

              <li>
                <Link href="/about" className="hover:text-white">
                  About
                </Link>
              </li>

              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Categories
            </h3>

            <ul className="space-y-3 text-green-100">
              <li>Seeds</li>
              <li>Fertilizers</li>
              <li>Pesticides</li>
              <li>Organic Products</li>
              <li>Irrigation</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Contact Us
            </h3>

            <div className="space-y-4 text-green-100">
              <div className="flex gap-3">
                <Phone size={18} />
                <span>+91 9876543210</span>
              </div>

              <div className="flex gap-3">
                <Mail size={18} />
                <span>info@patilkrushi.com</span>
              </div>

              <div className="flex gap-3">
                <MapPin size={18} />
                <span>Maharashtra, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-green-700 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-green-200">
          <p>
            © {new Date().getFullYear()} Patil Krushi Kendra.
            All Rights Reserved.
          </p>

          <div className="flex gap-4">
            <Link href="/privacy-policy">
              Privacy Policy
            </Link>

            <Link href="/terms">
              Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}