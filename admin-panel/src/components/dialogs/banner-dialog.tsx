"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import BannerForm from "@/components/forms/banner-form";
import type { Banner } from "@/types/banner";

type BannerDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  banner?: Banner;
};

export default function BannerDialog({ open, onOpenChange, banner }: BannerDialogProps) {
  const isEditMode = Boolean(banner);

  return <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto rounded-3xl border border-green-100 bg-white">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold text-slate-800">{isEditMode ? "Edit Banner" : "Create Banner"}</DialogTitle>
        <DialogDescription>{isEditMode ? "Update banner content, imagery, and display settings." : "Configure a new promotional banner."}</DialogDescription>
      </DialogHeader>
      <BannerForm key={banner?.id ?? "create"} banner={banner} onSuccess={() => onOpenChange(false)} onCancel={() => onOpenChange(false)} />
    </DialogContent>
  </Dialog>;
}
