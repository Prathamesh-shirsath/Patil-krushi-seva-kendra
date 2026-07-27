"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import BannerDialog from "@/components/dialogs/banner-dialog";
import BannersTable from "@/components/tables/banners-table";
import type { Banner } from "@/types/banner";

export default function BannersPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState<Banner | undefined>();

  function openCreate() {
    setSelectedBanner(undefined);
    setDialogOpen(true);
  }

  function openEdit(banner: Banner) {
    setSelectedBanner(banner);
    setDialogOpen(true);
  }

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-[1500px] space-y-8">
        <div className="flex flex-col gap-4 rounded-3xl border border-green-100 bg-white/80 p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Banners Management</h1>
            <p className="mt-1 text-slate-500">
              View and organize promotional banners across the website.
            </p>
          </div>
        </div>

        <BannersTable onCreate={openCreate} onEdit={openEdit} />
      </div>

      <BannerDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        banner={selectedBanner}
      />
    </DashboardLayout>
  );
}
