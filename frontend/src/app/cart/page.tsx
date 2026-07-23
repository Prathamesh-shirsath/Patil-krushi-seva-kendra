import { Metadata } from "next";
import CartClient from "@/components/cart/CartClient";

export const metadata: Metadata = {
  title: "My Cart | Patil Krushi Seva Kendra",
  description: "View and manage your shopping cart items, calculate shipping, and proceed to checkout.",
};

export default function CartPage() {
  return <CartClient />;
}
