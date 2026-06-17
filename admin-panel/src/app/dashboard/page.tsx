import DashboardLayout from "@/components/layout/dashboard-layout";
import StatsCard from "@/components/dashboard/stats-card";
import SalesChart from "@/components/dashboard/sales-chart";
import OrdersChart from "@/components/dashboard/orders-chart";
import RecentOrders from "@/components/dashboard/recent-orders";
import TopProducts from "@/components/dashboard/top-products";
import LowStock from "@/components/dashboard/low-stock";
import ActivityFeed from "@/components/dashboard/activity-feed";

import {
  DollarSign,
  ShoppingBag,
  Users,
  ShoppingCart,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <DashboardLayout>

      <div className="space-y-8">

        <div>
          <h1 className="text-4xl font-bold">
            Dashboard
          </h1>

          <p className="mt-2 text-slate-500">
            Welcome back, Admin!
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <StatsCard
            title="Total Sales"
            value="₹2,48,650"
            growth="18.6%"
            icon={
              <DollarSign className="h-7 w-7 text-green-600" />
            }
            iconBg="bg-green-100"
            growthColor="text-green-600"
          />

          <StatsCard
            title="Total Orders"
            value="256"
            growth="12.4%"
            icon={
              <ShoppingBag className="h-7 w-7 text-emerald-600" />
            }
            iconBg="bg-emerald-100"
            growthColor="text-green-600"
          />

          <StatsCard
            title="Customers"
            value="1,245"
            growth="15.8%"
            icon={
              <Users className="h-7 w-7 text-violet-600" />
            }
            iconBg="bg-violet-100"
            growthColor="text-green-600"
          />

          <StatsCard
            title="Average Order Value"
            value="₹971"
            growth="8.3%"
            icon={
              <ShoppingCart className="h-7 w-7 text-orange-600" />
            }
            iconBg="bg-orange-100"
            growthColor="text-green-600"
          />

        </div>
        <div className="grid gap-6 xl:grid-cols-3">

  <div className="xl:col-span-2">
    <SalesChart />
  </div>

  <OrdersChart />

</div>
<div className="grid gap-6 lg:grid-cols-2">

  <RecentOrders />

  <TopProducts />

  <LowStock />

  <ActivityFeed />

</div>
      </div>

    </DashboardLayout>
  );
}