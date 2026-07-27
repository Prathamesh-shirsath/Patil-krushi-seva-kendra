"use client";

import { useMemo, useState } from "react";
import { ImageIcon, Pencil, Search, Trash2 } from "lucide-react";

import { useBanners } from "@/hooks/use-banners";
import type { Banner, BannerPlacement } from "@/types/banner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const placementLabels: Record<BannerPlacement, string> = {
  HOME_HERO: "Home Hero",
  HOME_PROMO: "Home Promo",
  CATEGORY_PAGE: "Category Page",
  BRAND_PAGE: "Brand Page",
  CONTACT_HERO: "Contact Hero",
  SHOP_PAGE: "Shop Page",
};

function getDisplayLocation(banner: Banner) {
  const placement = placementLabels[banner.placement];
  const scopeName = banner.scopeSlug
    ?.split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

  return scopeName ? `${placement}\n${scopeName}` : placement;
}

function formatDate(date?: string | null) {
  if (!date) return "—";

  return new Date(date).toLocaleDateString();
}

function BannerTableSkeleton() {
  return (
    <TableBody>
      {Array.from({ length: 5 }).map((_, index) => (
        <TableRow key={index}>
          {Array.from({ length: 10 }).map((__, cellIndex) => (
            <TableCell key={cellIndex} className="p-5">
              <Skeleton className="h-8 w-full min-w-16" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
}

function BannerThumbnail({ banner }: { banner: Banner }) {
  if (!banner.image) {
    return (
      <div className="flex h-12 w-20 items-center justify-center rounded-xl bg-green-100 text-green-700">
        <ImageIcon className="h-5 w-5" />
      </div>
    );
  }

  return (
    <img
      src={banner.image}
      alt={banner.title}
      className="h-12 w-20 rounded-xl border border-slate-200 object-cover shadow-sm"
    />
  );
}

type BannersTableProps = {
  onCreate: () => void;
  onEdit: (banner: Banner) => void;
};

export default function BannersTable({ onCreate, onEdit }: BannersTableProps) {
  const { data: banners = [], isLoading } = useBanners();
  const [search, setSearch] = useState("");

  const filteredBanners = useMemo(() => {
    const query = search.trim().toLowerCase();

    return banners
      .filter((banner) => {
        if (!query) return true;

        return [banner.title, banner.label, banner.placement]
          .filter(Boolean)
          .some((value) => value?.toLowerCase().includes(query));
      })
      .sort((first, second) => {
        if (first.displayOrder !== second.displayOrder) {
          return first.displayOrder - second.displayOrder;
        }

        return new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime();
      });
  }, [banners, search]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-3xl border border-slate-100 bg-white p-5 shadow-sm lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search banners by title, label, or placement..."
            className="rounded-2xl border-slate-200 bg-slate-50 pl-10 focus:bg-white focus:ring-2 focus:ring-green-500"
          />
        </div>

        <Button type="button" onClick={onCreate} className="rounded-2xl bg-green-700 px-6 hover:bg-green-800">
          Create Banner
        </Button>
      </div>

      <div className="overflow-hidden rounded-3xl border border-green-100 bg-white/80 shadow-sm">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="p-5">Image</TableHead>
                <TableHead className="p-5">Title</TableHead>
                <TableHead className="p-5">Display Location</TableHead>
                <TableHead className="p-5">Target Type</TableHead>
                <TableHead className="p-5">Status</TableHead>
                <TableHead className="p-5">Display Order</TableHead>
                <TableHead className="p-5">Start Date</TableHead>
                <TableHead className="p-5">End Date</TableHead>
                <TableHead className="p-5">Created At</TableHead>
                <TableHead className="p-5 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            {isLoading ? (
              <BannerTableSkeleton />
            ) : (
              <TableBody>
                {filteredBanners.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={10} className="p-12 text-center text-slate-500">
                      <div className="flex flex-col items-center gap-4">
                        <p>No banners found.</p>
                        <Button type="button" onClick={onCreate} className="rounded-2xl bg-green-700 px-6 hover:bg-green-800">
                          Create Banner
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredBanners.map((banner) => (
                    <TableRow key={banner.id} className="border-t transition-colors hover:bg-green-50">
                      <TableCell className="p-5"><BannerThumbnail banner={banner} /></TableCell>
                      <TableCell className="p-5">
                        <p className="font-semibold text-slate-800">{banner.title}</p>
                        {banner.label ? <p className="mt-1 text-sm text-slate-500">{banner.label}</p> : null}
                      </TableCell>
                      <TableCell className="whitespace-pre-line p-5 text-slate-600">{getDisplayLocation(banner)}</TableCell>
                      <TableCell className="p-5 text-slate-600">{banner.targetType}</TableCell>
                      <TableCell className="p-5">
                        <Badge className={banner.status ? "bg-green-100 text-green-700 hover:bg-green-100" : "bg-red-100 text-red-600 hover:bg-red-100"}>
                          {banner.status ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="p-5 font-medium text-slate-700">{banner.displayOrder}</TableCell>
                      <TableCell className="p-5 text-slate-600">{formatDate(banner.startsAt)}</TableCell>
                      <TableCell className="p-5 text-slate-600">{formatDate(banner.endsAt)}</TableCell>
                      <TableCell className="p-5 text-slate-600">{formatDate(banner.createdAt)}</TableCell>
                      <TableCell className="p-5">
                        <div className="flex justify-end gap-2">
                          <Button type="button" size="icon" variant="outline" onClick={() => onEdit(banner)} aria-label={`Edit ${banner.title}`} className="h-10 w-10 rounded-xl border-green-200 text-green-600">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button type="button" size="icon" variant="outline" disabled aria-label={`Delete ${banner.title}`} className="h-10 w-10 rounded-xl border-red-200 text-red-600 disabled:opacity-60">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            )}
          </Table>
        </div>
      </div>
    </div>
  );
}
