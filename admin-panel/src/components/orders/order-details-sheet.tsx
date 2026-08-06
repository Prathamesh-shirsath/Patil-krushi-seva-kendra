"use client";

import {
  Package,
  User,
  MapPin,
  CreditCard,
  Truck,
  Printer,
  Download,
} from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: any;
}

export default function OrderDetailsSheet({
  open,
  onOpenChange,
  order,
}: Props) {

  if (!order) return null;

  return (

    <Sheet
      open={open}
      onOpenChange={onOpenChange}
    >

      <SheetContent
        side="right"
        className="w-full overflow-y-auto sm:max-w-xl"
      >

        <SheetHeader>

          <SheetTitle className="text-2xl font-bold">

            Order Details

          </SheetTitle>

        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Customer */}

<div className="rounded-2xl border border-slate-200 p-5">

  <div className="mb-4 flex items-center gap-2">

    <User className="h-5 w-5 text-green-600" />

    <h3 className="font-semibold text-lg">
      Customer Information
    </h3>

  </div>

  <div className="space-y-3">

    <div className="flex justify-between">
      <span className="text-slate-500">Name</span>
      <span className="font-medium">
        {order.user?.name || "Guest User"}
      </span>
    </div>

    <div className="flex justify-between">
      <span className="text-slate-500">Phone</span>
      <span>
        {order.user?.phone || "-"}
      </span>
    </div>

    <div className="flex justify-between">
      <span className="text-slate-500">Order ID</span>
      <span className="font-semibold">
        {order.id}
      </span>
    </div>

  </div>

</div>

{/* Shipping Address */}

<div className="rounded-2xl border border-slate-200 p-5">

  <div className="mb-4 flex items-center gap-2">

    <MapPin className="h-5 w-5 text-green-600" />

    <h3 className="font-semibold text-lg">
      Shipping Address
    </h3>

  </div>

  {order.address ? (

    <div className="space-y-2 text-sm">

      <p>{order.address.addressLine}</p>

      <p>
        {order.address.village},
        {order.address.taluka}
      </p>

      <p>
        {order.address.district},
        {order.address.state}
      </p>

      <p>
        {order.address.pincode}
      </p>

    </div>

  ) : (

    <p className="text-slate-500">
      Address not available
    </p>

  )}

</div>

{/* Products */}

<div className="rounded-2xl border border-slate-200 p-5">

  <div className="mb-4 flex items-center gap-2">

    <Package className="h-5 w-5 text-green-600" />

    <h3 className="font-semibold text-lg">
      Ordered Products
    </h3>

  </div>

  <div className="space-y-4">

    {order.items?.map((item: any) => (

      <div
        key={item.id}
        className="flex items-center justify-between rounded-xl bg-slate-50 p-3"
      >

        <div>

          <p className="font-medium">
            {item.productName}
          </p>

          <p className="text-sm text-slate-500">
            Qty : {item.quantity}
          </p>

        </div>

        <p className="font-semibold">
          ₹{item.price}
        </p>

      </div>

    ))}

  </div>

</div>
{/* Payment */}

<div className="rounded-2xl border border-slate-200 p-5">

  <div className="mb-4 flex items-center gap-2">

    <CreditCard className="h-5 w-5 text-green-600" />

    <h3 className="text-lg font-semibold">
      Payment Details
    </h3>

  </div>

  <div className="space-y-3">

    <div className="flex justify-between">
      <span className="text-slate-500">Status</span>

      <Badge
        className={
          order.paymentStatus === "SUCCESS"
            ? "bg-green-100 text-green-700"
            : order.paymentStatus === "PENDING"
            ? "bg-yellow-100 text-yellow-700"
            : "bg-red-100 text-red-700"
        }
      >
        {order.paymentStatus}
      </Badge>
    </div>

    <div className="flex justify-between">
      <span className="text-slate-500">
        Amount
      </span>

      <span className="text-lg font-bold">
        ₹{order.totalAmount}
      </span>
    </div>

  </div>

</div>

{/* Order Timeline */}

<div className="rounded-2xl border border-slate-200 p-5">

  <div className="mb-4 flex items-center gap-2">

    <Truck className="h-5 w-5 text-green-600" />

    <h3 className="text-lg font-semibold">
      Order Status
    </h3>

  </div>

  <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">

    <Badge className="bg-blue-100 text-blue-700">
      {order.status}
    </Badge>

    <span className="text-sm text-slate-500">
      {new Date(order.createdAt).toLocaleDateString("en-IN")}
    </span>

  </div>

</div>

{/* Action Buttons */}

<div className="grid grid-cols-1 gap-3 sm:grid-cols-3">

  <Button
    variant="outline"
    className="rounded-xl"
  >
    <Printer className="mr-2 h-4 w-4" />
    Print
  </Button>

  <Button
    variant="outline"
    className="rounded-xl"
  >
    <Download className="mr-2 h-4 w-4" />
    Invoice
  </Button>

  <Button
    className="rounded-xl bg-green-600 hover:bg-green-700"
  >
    Update Status
  </Button>

</div>

</div>

</SheetContent>

</Sheet>
);
}