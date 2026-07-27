"use client";

import { useEffect, useState } from "react";
import { ImageIcon } from "lucide-react";
import { toast } from "sonner";

import { useBrands } from "@/hooks/use-brands";
import { useCategories } from "@/hooks/use-categories";
import { useCreateBanner, useUpdateBanner } from "@/hooks/use-banners";
import { useProducts } from "@/hooks/use-products";
import type { Banner, BannerPlacement, BannerScopeType, BannerTargetType, BannerTextTheme } from "@/types/banner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type TargetOption = { id: string; name: string; slug: string };

type BannerFormProps = {
  banner?: Banner;
  onSuccess: () => void;
  onCancel: () => void;
};

function getBannerErrorMessage(error: unknown, fallback: string) {
  if (
    typeof error === "object" &&
    error !== null &&
    "response" in error
  ) {
    const message = (error as { response?: { data?: { message?: unknown } } })
      .response?.data?.message;

    if (typeof message === "string" && message.trim()) return message;
  }

  return fallback;
}

const placementOptions: Array<{ value: BannerPlacement; label: string }> = [
  { value: "HOME_HERO", label: "Home Hero" },
  { value: "HOME_PROMO", label: "Home Promo" },
  { value: "CATEGORY_PAGE", label: "Category Page" },
  { value: "BRAND_PAGE", label: "Brand Page" },
  { value: "CONTACT_HERO", label: "Contact Hero" },
  { value: "SHOP_PAGE", label: "Shop Page" },
];

function toDateTimeLocal(value?: string | null) {
  return value ? new Date(value).toISOString().slice(0, 16) : "";
}

function usePreviewUrl(file: File | null) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  return previewUrl;
}

export default function BannerForm({ banner, onSuccess, onCancel }: BannerFormProps) {
  const isEditMode = Boolean(banner);
  const createMutation = useCreateBanner();
  const updateMutation = useUpdateBanner();
  const { data: products = [] } = useProducts() as { data?: TargetOption[] };
  const { data: categories = [] } = useCategories();
  const { data: brands = [] } = useBrands() as { data?: TargetOption[] };

  const [label, setLabel] = useState("");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [targetType, setTargetType] = useState<BannerTargetType>("NONE");
  const [targetSlug, setTargetSlug] = useState("");
  const [targetUrl, setTargetUrl] = useState("");
  const [placement, setPlacement] = useState<BannerPlacement>("HOME_HERO");
  const [scopeType, setScopeType] = useState<BannerScopeType>("GLOBAL");
  const [scopeSlug, setScopeSlug] = useState("");
  const [textTheme, setTextTheme] = useState<BannerTextTheme>("LIGHT");
  const [displayOrder, setDisplayOrder] = useState("0");
  const [status, setStatus] = useState(true);
  const [startsAt, setStartsAt] = useState("");
  const [endsAt, setEndsAt] = useState("");
  const [desktopImage, setDesktopImage] = useState<File | null>(null);
  const [mobileImage, setMobileImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const desktopPreview = usePreviewUrl(desktopImage);
  const mobilePreview = usePreviewUrl(mobileImage);
  const isPending = createMutation.isPending || updateMutation.isPending;

  useEffect(() => {
    setLabel(banner?.label ?? "");
    setTitle(banner?.title ?? "");
    setSubtitle(banner?.subtitle ?? "");
    setButtonText(banner?.buttonText ?? "");
    setTargetType(banner?.targetType ?? "NONE");
    setTargetSlug(banner?.targetSlug ?? "");
    setTargetUrl(banner?.targetUrl ?? "");
    setPlacement(banner?.placement ?? "HOME_HERO");
    setScopeType(banner?.scopeType ?? "GLOBAL");
    setScopeSlug(banner?.scopeSlug ?? "");
    setTextTheme(banner?.textTheme ?? "LIGHT");
    setDisplayOrder(String(banner?.displayOrder ?? 0));
    setStatus(banner?.status ?? true);
    setStartsAt(toDateTimeLocal(banner?.startsAt));
    setEndsAt(toDateTimeLocal(banner?.endsAt));
    setDesktopImage(null);
    setMobileImage(null);
    setErrors({});
  }, [banner]);

  const targetOptions: TargetOption[] =
    targetType === "PRODUCT"
      ? products
      : targetType === "CATEGORY"
        ? categories
        : targetType === "BRAND"
          ? brands
          : [];

  const scopeOptions: TargetOption[] = scopeType === "CATEGORY"
    ? categories
    : scopeType === "BRAND"
      ? brands
      : [];

  function selectTargetType(value: BannerTargetType) {
    setTargetType(value);
    setTargetSlug("");
    setTargetUrl("");
  }

  function selectPlacement(value: BannerPlacement) {
    setPlacement(value);

    if (value === "CATEGORY_PAGE") {
      setScopeType("CATEGORY");
      setScopeSlug("");
      return;
    }

    if (value === "BRAND_PAGE") {
      setScopeType("BRAND");
      setScopeSlug("");
      return;
    }

    setScopeType("GLOBAL");
    setScopeSlug("");
  }

  function validate() {
    const nextErrors: Record<string, string> = {};
    const order = Number(displayOrder);

    if (title.trim().length < 2) nextErrors.title = "Title must be at least 2 characters.";
    if (!isEditMode && !desktopImage) nextErrors.image = "A desktop banner image is required.";
    if (!Number.isInteger(order) || order < 0) nextErrors.displayOrder = "Display order must be a whole number of 0 or greater.";
    if (["CATEGORY_PAGE", "BRAND_PAGE"].includes(placement) && !scopeSlug) {
      nextErrors.scopeSlug = "Select where this banner should be displayed.";
    }
    if (["PRODUCT", "CATEGORY", "BRAND"].includes(targetType) && !targetSlug) {
      nextErrors.targetSlug = "Select a target.";
    }
    if (targetType === "CUSTOM" && !targetUrl.trim()) nextErrors.targetUrl = "A destination URL is required.";
    if (startsAt && endsAt && new Date(endsAt) <= new Date(startsAt)) {
      nextErrors.endsAt = "End date must be after the start date.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;

    const formData = new FormData();
    const appendOptional = (key: string, value: string) => {
      if (value.trim()) formData.append(key, value.trim());
    };

    appendOptional("label", label);
    formData.append("title", title.trim());
    appendOptional("subtitle", subtitle);
    appendOptional("buttonText", buttonText);
    formData.append("targetType", targetType);
    if (["PRODUCT", "CATEGORY", "BRAND"].includes(targetType)) appendOptional("targetSlug", targetSlug);
    if (targetType === "CUSTOM") appendOptional("targetUrl", targetUrl);
    formData.append("placement", placement);
    formData.append("scopeType", scopeType);
    formData.append("scopeSlug", scopeSlug);
    formData.append("textTheme", textTheme);
    formData.append("status", String(status));
    formData.append("displayOrder", displayOrder);
    if (startsAt) formData.append("startsAt", startsAt);
    if (endsAt) formData.append("endsAt", endsAt);
    if (desktopImage) formData.append("image", desktopImage);
    if (mobileImage) formData.append("mobileImage", mobileImage);

    try {
      if (banner) {
        await updateMutation.mutateAsync({ id: banner.id, formData });
        toast.success("Banner updated successfully.");
      } else {
        await createMutation.mutateAsync(formData);
        toast.success("Banner created successfully.");
      }
      onSuccess();
    } catch (error) {
      toast.error(
        getBannerErrorMessage(
          error,
          isEditMode ? "Failed to update banner." : "Failed to create banner."
        )
      );
    }
  }

  const desktopImageSrc = desktopPreview || banner?.image;
  const mobileImageSrc = mobilePreview || banner?.mobileImage;

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      <section className="space-y-4">
        <h3 className="text-base font-semibold text-slate-800">Content</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Label"><Input value={label} onChange={(event) => setLabel(event.target.value)} placeholder="Optional badge text" /></Field>
          <Field label="Title" required error={errors.title}><Input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Banner title" /></Field>
        </div>
        <Field label="Subtitle"><Textarea value={subtitle} onChange={(event) => setSubtitle(event.target.value)} placeholder="Optional supporting text" rows={3} /></Field>
      </section>

      <section className="space-y-4 border-t border-slate-100 pt-6">
        <h3 className="text-base font-semibold text-slate-800">Images</h3>
        <div className="grid gap-5 lg:grid-cols-2">
          <ImageField label="Desktop Banner Image" required={!isEditMode} preview={desktopImageSrc} onChange={(file) => setDesktopImage(file)} />
          <ImageField label="Mobile Banner Image (Optional)" preview={mobileImageSrc} onChange={(file) => setMobileImage(file)} />
        </div>
        {errors.image ? <p className="text-sm text-red-600">{errors.image}</p> : null}
      </section>

      <section className="space-y-4 border-t border-slate-100 pt-6">
        <h3 className="text-base font-semibold text-slate-800">CTA / Navigation</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Button Text"><Input value={buttonText} onChange={(event) => setButtonText(event.target.value)} placeholder="Optional call to action" /></Field>
          <Field label="Target Type" required>
            <select value={targetType} onChange={(event) => selectTargetType(event.target.value as BannerTargetType)} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
              <option value="NONE">None</option><option value="PRODUCT">Product</option><option value="CATEGORY">Category</option><option value="BRAND">Brand</option><option value="CUSTOM">Custom URL</option>
            </select>
          </Field>
        </div>
        {["PRODUCT", "CATEGORY", "BRAND"].includes(targetType) ? (
          <Field label="Target" required error={errors.targetSlug}>
            <select value={targetSlug} onChange={(event) => setTargetSlug(event.target.value)} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
              <option value="">Select a target</option>
              {targetSlug && !targetOptions.some((option) => option.slug === targetSlug) ? <option value={targetSlug}>{targetSlug}</option> : null}
              {targetOptions.map((option) => <option key={option.id} value={option.slug}>{option.name}</option>)}
            </select>
          </Field>
        ) : null}
        {targetType === "CUSTOM" ? <Field label="Destination URL" required error={errors.targetUrl}><Input type="url" value={targetUrl} onChange={(event) => setTargetUrl(event.target.value)} placeholder="https://example.com" /></Field> : null}
      </section>

      <section className="space-y-4 border-t border-slate-100 pt-6">
        <h3 className="text-base font-semibold text-slate-800">Display Location</h3>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Placement" required><select value={placement} onChange={(event) => selectPlacement(event.target.value as BannerPlacement)} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">{placementOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></Field>
          <Field label="Text Theme" required><select value={textTheme} onChange={(event) => setTextTheme(event.target.value as BannerTextTheme)} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"><option value="LIGHT">Light</option><option value="DARK">Dark</option></select></Field>
          <Field label="Display Order" required error={errors.displayOrder}><Input type="number" min="0" step="1" value={displayOrder} onChange={(event) => setDisplayOrder(event.target.value)} /></Field>
        </div>
        {scopeType !== "GLOBAL" ? (
          <Field label={scopeType === "CATEGORY" ? "Display on Category" : "Display on Brand"} required error={errors.scopeSlug}>
            <select value={scopeSlug} onChange={(event) => setScopeSlug(event.target.value)} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
              <option value="">Select a {scopeType === "CATEGORY" ? "category" : "brand"}</option>
              {scopeSlug && !scopeOptions.some((option) => option.slug === scopeSlug) ? <option value={scopeSlug}>{scopeSlug}</option> : null}
              {scopeOptions.map((option) => <option key={option.id} value={option.slug}>{option.name}</option>)}
            </select>
          </Field>
        ) : null}
        <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4">
          <div><p className="font-medium text-slate-800">Banner Status</p><p className="text-sm text-slate-500">Active banners are eligible for public display.</p></div>
          <Checkbox checked={status} onCheckedChange={(checked) => setStatus(checked === true)} />
        </div>
      </section>

      <section className="space-y-4 border-t border-slate-100 pt-6">
        <h3 className="text-base font-semibold text-slate-800">Schedule</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Start Date"><Input type="datetime-local" value={startsAt} onChange={(event) => setStartsAt(event.target.value)} /></Field>
          <Field label="End Date" error={errors.endsAt}><Input type="datetime-local" value={endsAt} onChange={(event) => setEndsAt(event.target.value)} /></Field>
        </div>
      </section>

      <div className="flex justify-end gap-3 border-t border-slate-100 pt-6">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isPending}>Cancel</Button>
        <Button type="submit" disabled={isPending} className="bg-green-700 hover:bg-green-800">{isPending ? "Saving..." : isEditMode ? "Save Changes" : "Create Banner"}</Button>
      </div>
    </form>
  );
}

function Field({ label, required, error, children }: { label: string; required?: boolean; error?: string; children: React.ReactNode }) {
  return <div className="space-y-2"><Label>{label}{required ? <span className="ml-1 text-red-500">*</span> : null}</Label>{children}{error ? <p className="text-sm text-red-600">{error}</p> : null}</div>;
}

function ImageField({ label, required, preview, onChange }: { label: string; required?: boolean; preview?: string | null; onChange: (file: File | null) => void }) {
  return <div className="space-y-3"><Label>{label}{required ? <span className="ml-1 text-red-500">*</span> : null}</Label><Input type="file" accept="image/*" onChange={(event) => onChange(event.target.files?.[0] ?? null)} />{preview ? <img src={preview} alt={`${label} preview`} className="h-40 w-full rounded-2xl border border-slate-200 object-cover" /> : <div className="flex h-40 items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-slate-50 text-slate-400"><ImageIcon className="mr-2 h-5 w-5" />No image selected</div>}</div>;
}
