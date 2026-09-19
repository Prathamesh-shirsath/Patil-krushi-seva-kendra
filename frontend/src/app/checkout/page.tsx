"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Lock,
  Truck,
  CheckCircle2,
  MapPin,
  Plus,
  CreditCard,
  Banknote,
  ArrowLeft,
  Loader2,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

import { useCart } from "@/hooks/cart/useCart";
import { useAddresses } from "@/hooks/use-addresses";
import { useAuth } from "@/providers/AuthProvider";
import AddressDialog from "@/components/profile/AddressDialog";
import { Address } from "@/types/address";
import { createOrder, verifyPayment } from "@/services/order.service";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { user, loading: authLoading } = useAuth();
  const { data: cartData, isLoading: cartLoading } = useCart();
  const {
    data: addresses = [],
    isLoading: addressesLoading,
  } = useAddresses();

  // =========================
  // State
  // =========================

  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null
  );

  const [paymentMethod, setPaymentMethod] = useState<"RAZORPAY" | "COD">(
    "RAZORPAY"
  );

  const [addressDialogOpen, setAddressDialogOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  // =========================
  // Address Selection
  // =========================

  useEffect(() => {
    if (addressesLoading) {
      return;
    }

    if (!addresses.length) {
      setSelectedAddressId(null);
      return;
    }

    // Check whether currently selected address still exists
    const selectedStillExists =
      selectedAddressId &&
      addresses.some((address) => address.id === selectedAddressId);

    if (selectedStillExists) {
      return;
    }

    // Select default address first
    // Otherwise select first address
    const defaultAddress =
      addresses.find((address) => address.isDefault) || addresses[0];

    setSelectedAddressId(defaultAddress.id);
  }, [addresses, addressesLoading, selectedAddressId]);

  // Actual selected address
  const activeAddress = addresses.find(
    (address) => address.id === selectedAddressId
  );

  // =========================
  // Cart Data
  // =========================

  const items = cartData?.items || [];

  const summary = cartData?.summary || {
    totalItems: 0,
    subTotal: 0,
    deliveryCharge: 0,
    discount: 0,
    grandTotal: 0,
  };

  // =========================
  // Razorpay Payment
  // =========================

  const handleRazorpayPayment = async () => {
    if (!user) {
      toast.error("Please sign in to complete your checkout.");
      router.push("/login?redirect=/checkout");
      return;
    }

    if (!activeAddress) {
      toast.error("Please add and select a delivery address.");
      setAddressDialogOpen(true);
      return;
    }

    if (!items.length) {
      toast.error("Your cart is empty.");
      router.push("/cart");
      return;
    }

    setIsProcessing(true);

    try {
      // 1. Create order on backend
      const orderPayload = {
        items: items.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
        addressId: activeAddress.id,
        paymentMethod: "RAZORPAY" as const,
      };

      const res = await createOrder(orderPayload);

      if (!res.success || !res.data) {
        throw new Error("Failed to create order on server.");
      }

      const { order, razorpayOrder, keyId } = res.data;

      if (!razorpayOrder) {
        throw new Error(
          "Razorpay order details missing from server response."
        );
      }

      // 2. Razorpay configuration
      const options = {
        key: keyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency || "INR",

        name: "Patil Krushi Seva Kendra",

        description: `Agricultural Order #${order.id
          .slice(-6)
          .toUpperCase()}`,

        image: "/logo.png",

        order_id: razorpayOrder.id,

        prefill: {
          name: activeAddress.fullName || user.name || "",
          email: user.email || "",
          contact: activeAddress.phone || user.phone || "",
        },

        notes: {
          orderId: order.id,
          userId: user.id,
        },

        theme: {
          color: "#15803d",
        },

        handler: async function (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) {
          try {
            toast.loading("Verifying payment...", {
              id: "payment-verify",
            });

            const verifyRes = await verifyPayment({
              orderId: order.id,
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });

            if (verifyRes.success) {
              queryClient.invalidateQueries({
                queryKey: ["cart"],
              });

              window.dispatchEvent(new Event("cart-updated"));

              toast.success(
                "Payment successful! Your order has been placed.",
                {
                  id: "payment-verify",
                }
              );

              router.push(`/orders/${order.id}`);
            } else {
              toast.error(
                "Payment verification failed. Please contact support.",
                {
                  id: "payment-verify",
                }
              );
            }
          } catch (verifyError: any) {
            console.error("Verification error:", verifyError);

            toast.error(
              verifyError?.response?.data?.message ||
                "Failed to verify payment. Please contact support.",
              {
                id: "payment-verify",
              }
            );
          } finally {
            setIsProcessing(false);
          }
        },

        modal: {
          ondismiss: function () {
            setIsProcessing(false);

            toast.info(
              "Payment was not completed. You can try again whenever ready."
            );
          },
        },
      };

      if (!window.Razorpay) {
        throw new Error(
          "Razorpay payment SDK could not be loaded. Please check your internet connection."
        );
      }

      const rzpInstance = new window.Razorpay(options);

      rzpInstance.on("payment.failed", function (resp: any) {
        console.error("Razorpay Payment Failed:", resp);

        toast.error(
          resp.error?.description ||
            "Payment failed. Please try another method."
        );

        setIsProcessing(false);
      });

      rzpInstance.open();
    } catch (error: any) {
      console.error("Checkout error:", error);

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to initialize payment. Please try again."
      );

      setIsProcessing(false);
    }
  };

  // =========================
  // COD Payment
  // =========================

  const handleCodPayment = async () => {
    if (!user) {
      toast.error("Please sign in to place an order.");
      router.push("/login?redirect=/checkout");
      return;
    }

    if (!activeAddress) {
      toast.error("Please add and select a delivery address.");
      setAddressDialogOpen(true);
      return;
    }

    if (!items.length) {
      toast.error("Your cart is empty.");
      router.push("/cart");
      return;
    }

    setIsProcessing(true);

    try {
      const orderPayload = {
        items: items.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),

        addressId: activeAddress.id,

        paymentMethod: "COD" as const,
      };

      const res = await createOrder(orderPayload);

      if (res.success && res.data?.order) {
        queryClient.invalidateQueries({
          queryKey: ["cart"],
        });

        window.dispatchEvent(new Event("cart-updated"));

        toast.success(
          "Order placed successfully with Cash on Delivery!"
        );

        router.push(`/orders/${res.data.order.id}`);
      } else {
        throw new Error("Failed to place Cash on Delivery order.");
      }
    } catch (error: any) {
      console.error("COD Order Error:", error);

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to place order. Please try again."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  // =========================
  // Proceed
  // =========================

  const handleProceed = () => {
    if (paymentMethod === "RAZORPAY") {
      handleRazorpayPayment();
    } else {
      handleCodPayment();
    }
  };

  // =========================
  // Loading
  // =========================

  if (cartLoading || authLoading) {
    return (
      <div className="min-h-screen bg-slate-50/60 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-64 items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />

              <p className="text-sm font-medium text-slate-600">
                Loading checkout details...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================
  // Empty Cart
  // =========================

  if (!items.length) {
    return (
      <div className="min-h-screen bg-slate-50/60 py-16">
        <div className="mx-auto max-w-md px-4 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <Truck className="h-8 w-8" />
          </div>

          <h1 className="text-2xl font-bold text-slate-900">
            Your Cart is Empty
          </h1>

          <p className="mt-2 text-sm text-slate-600">
            You don't have any items in your cart to checkout.
          </p>

          <div className="mt-6">
            <Link href="/shop">
              <Button className="rounded-xl bg-emerald-700 px-6 font-semibold hover:bg-emerald-800">
                Explore Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Razorpay SDK */}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        onLoad={() => setRazorpayLoaded(true)}
        onError={() =>
          console.error("Razorpay SDK failed to load.")
        }
      />

      <div className="min-h-screen bg-[#FAF9F5] pb-20 pt-4 text-slate-800 sm:pt-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Breadcrumb */}
          <div className="mb-6 flex items-center justify-between">
            <Link
              href="/cart"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-emerald-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Cart
            </Link>

            <div className="hidden items-center gap-2 text-xs font-semibold sm:flex">
              <span className="text-slate-400">
                1. Cart
              </span>

              <span className="text-slate-300">
                /
              </span>

              <span className="text-emerald-700">
                2. Delivery & Payment
              </span>

              <span className="text-slate-300">
                /
              </span>

              <span className="text-slate-400">
                3. Confirmation
              </span>
            </div>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-xs font-bold text-emerald-800">
              <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
              Secure Checkout
            </div>

            <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
              Delivery & Payment
            </h1>

            <p className="mt-1 text-sm text-slate-600">
              Review your items, choose shipping address and complete payment securely.
            </p>
          </div>

          {/* Auth Warning */}
          {!user && (
            <div className="mb-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-amber-200 bg-amber-50/90 p-4 sm:flex-row sm:items-center sm:p-5">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 shrink-0 text-amber-700" />

                <div>
                  <p className="text-sm font-bold text-amber-900">
                    Sign in to complete order
                  </p>

                  <p className="text-xs text-amber-700">
                    Please log in with your phone number to link your order history and addresses.
                  </p>
                </div>
              </div>

              <Button
                asChild
                className="shrink-0 rounded-xl bg-amber-700 px-5 text-xs font-bold text-white hover:bg-amber-800"
              >
                <Link href="/login?redirect=/checkout">
                  Sign In with OTP
                </Link>
              </Button>
            </div>
          )}

          {/* Main Grid */}
          <div className="grid gap-8 lg:grid-cols-12">

            {/* LEFT */}
            <div className="space-y-6 lg:col-span-8">

              {/* DELIVERY ADDRESS */}
              <Card className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

                <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/60 p-5 sm:px-7">

                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                      <MapPin className="h-5 w-5" />
                    </div>

                    <div>
                      <h2 className="text-base font-bold text-slate-900 sm:text-lg">
                        1. Delivery Address
                      </h2>

                      <p className="text-xs text-slate-500">
                        Where should we deliver your order?
                      </p>
                    </div>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setAddressDialogOpen(true)}
                    className="gap-1.5 rounded-xl border-emerald-600 text-xs font-bold text-emerald-700 hover:bg-emerald-50"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Add Address
                  </Button>
                </div>

                <CardContent className="p-5 sm:p-7">

                  {addressesLoading ? (
                    <div className="flex h-24 items-center justify-center">
                      <Loader2 className="h-5 w-5 animate-spin text-emerald-600" />
                    </div>
                  ) : addresses.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-center">

                      <MapPin className="mx-auto mb-2 h-7 w-7 text-slate-400" />

                      <p className="text-sm font-semibold text-slate-800">
                        No delivery address saved yet
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Please add your farm or doorstep address to proceed.
                      </p>

                      <Button
                        type="button"
                        onClick={() => setAddressDialogOpen(true)}
                        className="mt-4 rounded-xl bg-emerald-700 px-4 text-xs font-bold text-white hover:bg-emerald-800"
                      >
                        <Plus className="mr-1.5 h-3.5 w-3.5" />
                        Add New Address
                      </Button>

                    </div>
                  ) : (
                    <div className="grid gap-3 sm:grid-cols-2">

                      {addresses.map((address: Address) => {

                        const isSelected =
                          activeAddress?.id === address.id;

                        return (
                          <div
                            key={address.id}
                            onClick={() =>
                              setSelectedAddressId(address.id)
                            }
                            className={`relative cursor-pointer rounded-2xl border p-4 transition-all ${
                              isSelected
                                ? "border-emerald-600 bg-emerald-50/40 ring-2 ring-emerald-600/20"
                                : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50"
                            }`}
                          >

                            <div className="flex items-start justify-between gap-2">

                              <div className="min-w-0 flex-1">

                                <div className="flex items-center gap-2">

                                  <p className="truncate font-bold text-slate-900">
                                    {address.fullName}
                                  </p>

                                  {address.isDefault && (
                                    <span className="rounded-md bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800">
                                      Default
                                    </span>
                                  )}

                                </div>

                                <p className="mt-0.5 text-xs font-semibold text-slate-700">
                                  {address.phone}
                                </p>

                                <p className="mt-2 text-xs leading-relaxed text-slate-600">
                                  {address.addressLine}

                                  {address.landmark
                                    ? `, Near ${address.landmark}`
                                    : ""}
                                </p>

                                <p className="text-xs font-medium text-slate-500">

                                  {address.village},{" "}

                                  {address.taluka
                                    ? `${address.taluka}, `
                                    : ""}

                                  {address.district},{" "}

                                  {address.state} -{" "}

                                  <span className="font-semibold text-slate-700">
                                    {address.pincode}
                                  </span>

                                </p>

                              </div>

                              {/* Selection Indicator */}
                              <div
                                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                                  isSelected
                                    ? "border-emerald-600 bg-emerald-600 text-white"
                                    : "border-slate-300 bg-white"
                                }`}
                              >
                                {isSelected && (
                                  <CheckCircle2 className="h-3.5 w-3.5" />
                                )}
                              </div>

                            </div>

                          </div>
                        );
                      })}

                    </div>
                  )}

                </CardContent>
              </Card>

              {/* PAYMENT METHOD */}
              <Card className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

                <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/60 p-5 sm:px-7">

                  <div className="flex items-center gap-3">

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                      <CreditCard className="h-5 w-5" />
                    </div>

                    <div>

                      <h2 className="text-base font-bold text-slate-900 sm:text-lg">
                        2. Payment Method
                      </h2>

                      <p className="text-xs text-slate-500">
                        Choose your preferred mode of payment
                      </p>

                    </div>

                  </div>

                  <Badge className="border-emerald-200 bg-emerald-50 text-[10px] font-bold text-emerald-800">
                    256-Bit SSL Encrypted
                  </Badge>

                </div>

                <CardContent className="space-y-4 p-5 sm:p-7">

                  {/* Razorpay */}
                  <div
                    onClick={() =>
                      setPaymentMethod("RAZORPAY")
                    }
                    className={`cursor-pointer rounded-2xl border p-4 sm:p-5 transition-all ${
                      paymentMethod === "RAZORPAY"
                        ? "border-emerald-600 bg-emerald-50/30 ring-2 ring-emerald-600/20"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >

                    <div className="flex items-start justify-between gap-4">

                      <div className="flex items-start gap-3.5">

                        <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-700 text-white shadow-sm">
                          <CreditCard className="h-5 w-5" />
                        </div>

                        <div>

                          <div className="flex items-center gap-2">

                            <h3 className="font-bold text-slate-900">
                              Online Payment via Razorpay
                            </h3>

                            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                              Instant &amp; Recommended
                            </span>

                          </div>

                          <p className="mt-1 text-xs text-slate-600">
                            Pay via UPI (GPay, PhonePe, Paytm), Debit/Credit Cards, NetBanking, and Wallets.
                          </p>

                          <div className="mt-3 flex flex-wrap items-center gap-2">

                            <span className="rounded-lg border border-slate-200 bg-white px-2 py-0.5 text-[10px] font-bold text-slate-700 shadow-2xs">
                              ⚡ UPI (GPay / PhonePe)
                            </span>

                            <span className="rounded-lg border border-slate-200 bg-white px-2 py-0.5 text-[10px] font-bold text-slate-700 shadow-2xs">
                              💳 Cards (Visa, RuPay, MC)
                            </span>

                            <span className="rounded-lg border border-slate-200 bg-white px-2 py-0.5 text-[10px] font-bold text-slate-700 shadow-2xs">
                              🏦 Net Banking (All Banks)
                            </span>

                          </div>

                        </div>

                      </div>

                      <div
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                          paymentMethod === "RAZORPAY"
                            ? "border-emerald-600 bg-emerald-600 text-white"
                            : "border-slate-300 bg-white"
                        }`}
                      >
                        {paymentMethod === "RAZORPAY" && (
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        )}
                      </div>

                    </div>
                  </div>

                  {/* COD */}
                  <div
                    onClick={() => setPaymentMethod("COD")}
                    className={`cursor-pointer rounded-2xl border p-4 sm:p-5 transition-all ${
                      paymentMethod === "COD"
                        ? "border-emerald-600 bg-emerald-50/30 ring-2 ring-emerald-600/20"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >

                    <div className="flex items-start justify-between gap-4">

                      <div className="flex items-start gap-3.5">

                        <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-700 text-white shadow-sm">
                          <Banknote className="h-5 w-5" />
                        </div>

                        <div>

                          <h3 className="font-bold text-slate-900">
                            Cash on Delivery (COD)
                          </h3>

                          <p className="mt-1 text-xs text-slate-600">
                            Pay in cash to the courier representative when the package arrives at your doorstep.
                          </p>

                        </div>

                      </div>

                      <div
                        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                          paymentMethod === "COD"
                            ? "border-emerald-600 bg-emerald-600 text-white"
                            : "border-slate-300 bg-white"
                        }`}
                      >
                        {paymentMethod === "COD" && (
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        )}
                      </div>

                    </div>
                  </div>

                </CardContent>
              </Card>

              {/* TRUST */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">

                <div className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-2xs">
                  <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-600" />

                  <div>
                    <p className="text-xs font-bold text-slate-900">
                      100% Genuine
                    </p>

                    <p className="text-[10px] text-slate-500">
                      Certified Agro Products
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-2xs">
                  <Lock className="h-5 w-5 shrink-0 text-emerald-600" />

                  <div>
                    <p className="text-xs font-bold text-slate-900">
                      Secure Payments
                    </p>

                    <p className="text-[10px] text-slate-500">
                      Razorpay Protected
                    </p>
                  </div>
                </div>

                <div className="col-span-2 flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-2xs sm:col-span-1">
                  <Truck className="h-5 w-5 shrink-0 text-emerald-600" />

                  <div>
                    <p className="text-xs font-bold text-slate-900">
                      Fast Delivery
                    </p>

                    <p className="text-[10px] text-slate-500">
                      To Your Village/Farm
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* RIGHT - ORDER SUMMARY */}
            <div className="lg:col-span-4">

              <div className="sticky top-20 space-y-6">

                <Card className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">

                    <h2 className="text-lg font-bold text-slate-900">
                      Order Summary
                    </h2>

                    <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-800">
                      {summary.totalItems}{" "}
                      {summary.totalItems === 1
                        ? "Item"
                        : "Items"}
                    </span>

                  </div>

                  {/* Items */}
                  <div className="my-4 max-h-60 divide-y divide-slate-100 overflow-y-auto pr-1">

                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
                      >

                        <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-100 bg-slate-50 p-1">

                          {item.product.image ? (
                            <Image
                              src={item.product.image}
                              alt={item.product.name}
                              width={50}
                              height={50}
                              className="max-h-full max-w-full object-contain"
                            />
                          ) : (
                            <div className="text-[10px] font-bold text-slate-400">
                              PKS
                            </div>
                          )}

                        </div>

                        <div className="min-w-0 flex-1">

                          <h4 className="truncate text-xs font-bold text-slate-900">
                            {item.product.name}
                          </h4>

                          <p className="text-[11px] text-slate-500">
                            Qty: {item.quantity} × ₹
                            {Number(
                              item.product.price
                            ).toLocaleString("en-IN")}
                          </p>

                        </div>

                        <p className="text-xs font-bold text-slate-900">
                          ₹
                          {(
                            Number(item.product.price) *
                            item.quantity
                          ).toLocaleString("en-IN")}
                        </p>

                      </div>
                    ))}

                  </div>

                  <Separator />

                  {/* Calculations */}
                  <div className="space-y-3 py-4 text-xs sm:text-sm">

                    <div className="flex justify-between text-slate-600">
                      <span>Subtotal</span>

                      <span className="font-bold text-slate-900">
                        ₹
                        {summary.subTotal.toLocaleString(
                          "en-IN"
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between text-slate-600">

                      <span>Delivery Fee</span>

                      {summary.deliveryCharge === 0 ? (
                        <span className="font-bold text-emerald-700">
                          FREE
                        </span>
                      ) : (
                        <span className="font-bold text-slate-900">
                          ₹
                          {summary.deliveryCharge.toLocaleString(
                            "en-IN"
                          )}
                        </span>
                      )}

                    </div>

                    {summary.discount > 0 && (
                      <div className="flex justify-between text-slate-600">

                        <span>Discount</span>

                        <span className="font-bold text-emerald-700">
                          - ₹
                          {summary.discount.toLocaleString(
                            "en-IN"
                          )}
                        </span>

                      </div>
                    )}

                    <div className="border-t border-slate-100 pt-3">

                      <div className="flex items-baseline justify-between">

                        <span className="text-sm font-bold text-slate-900 sm:text-base">
                          Grand Total
                        </span>

                        <span className="text-2xl font-black text-emerald-700">
                          ₹
                          {summary.grandTotal.toLocaleString(
                            "en-IN"
                          )}
                        </span>

                      </div>

                      <p className="mt-0.5 text-[11px] text-slate-400">
                        (Inclusive of all taxes &amp; charges)
                      </p>

                    </div>
                  </div>

                  {/* Selected Address */}
                  {activeAddress && (
                    <div className="mb-4 rounded-2xl border border-slate-100 bg-slate-50/70 p-3 text-xs text-slate-600">

                      <p className="font-bold text-slate-800">
                        Delivering to:{" "}
                        {activeAddress.fullName}
                      </p>

                      <p className="truncate text-slate-500">
                        {activeAddress.village},{" "}
                        {activeAddress.district} -{" "}
                        {activeAddress.pincode}
                      </p>

                    </div>
                  )}

                  {/* Place Order */}
                  <Button
                    onClick={handleProceed}
                    disabled={isProcessing}
                    className="h-12 w-full rounded-2xl bg-emerald-700 text-sm font-bold text-white shadow-md shadow-emerald-700/20 transition-all hover:bg-emerald-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                  >

                    {isProcessing ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Processing Order...
                      </span>
                    ) : paymentMethod === "RAZORPAY" ? (
                      <span className="flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        Pay ₹
                        {summary.grandTotal.toLocaleString(
                          "en-IN"
                        )}{" "}
                        with Razorpay
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Banknote className="h-4 w-4" />
                        Confirm Cash on Delivery Order
                      </span>
                    )}

                  </Button>

                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Address Dialog */}
      <AddressDialog
        open={addressDialogOpen}
        onOpenChange={setAddressDialogOpen}
        address={null}
      />
    </>
  );
}