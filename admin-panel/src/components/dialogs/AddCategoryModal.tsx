"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  Check,
  ImageIcon,
  Loader2,
  Plus,
  Save,
  Tag,
  Upload,
  X,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { useCreateCategory } from "@/hooks/use-categories";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddCategoryModal({
  open,
  onOpenChange,
}: Props) {
  const createCategory =
    useCreateCategory();

  const [name, setName] =
    useState("");

  const [slug, setSlug] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [status, setStatus] =
    useState(true);

  const [imageFile, setImageFile] =
    useState<File | null>(null);

  const [preview, setPreview] =
    useState<string | null>(null);

  const [error, setError] =
    useState<string | null>(null);

  /* ========================================================= */
  /* RESET */
  /* ========================================================= */

  function resetForm() {
    if (
      preview &&
      preview.startsWith("blob:")
    ) {
      URL.revokeObjectURL(preview);
    }

    setName("");
    setSlug("");
    setDescription("");
    setStatus(true);
    setImageFile(null);
    setPreview(null);
    setError(null);
  }

  /* ========================================================= */
  /* OPEN / CLOSE */
  /* ========================================================= */

  function handleOpenChange(
    value: boolean
  ) {
    if (!value) {
      resetForm();
    }

    onOpenChange(value);
  }

  /* ========================================================= */
  /* NAME */
  /* ========================================================= */

  function handleNameChange(
    value: string
  ) {
    setName(value);
    setSlug(slugify(value));

    if (error) {
      setError(null);
    }
  }

  /* ========================================================= */
  /* IMAGE */
  /* ========================================================= */

  function handleImageChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file =
      event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError(
        "Please select a valid image."
      );
      return;
    }

    if (
      file.size >
      5 * 1024 * 1024
    ) {
      setError(
        "Image size must be less than 5 MB."
      );
      return;
    }

    setError(null);

    if (
      preview &&
      preview.startsWith("blob:")
    ) {
      URL.revokeObjectURL(preview);
    }

    const objectUrl =
      URL.createObjectURL(file);

    setImageFile(file);
    setPreview(objectUrl);
  }

  /* ========================================================= */
  /* REMOVE IMAGE */
  /* ========================================================= */

  function removeImage() {
    if (
      preview &&
      preview.startsWith("blob:")
    ) {
      URL.revokeObjectURL(preview);
    }

    setImageFile(null);
    setPreview(null);
  }

  /* ========================================================= */
  /* SUBMIT */
  /* ========================================================= */

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!name.trim()) {
      setError(
        "Category name is required."
      );
      return;
    }

    try {
      setError(null);

      const formData =
        new FormData();

      formData.append(
        "name",
        name.trim()
      );

      formData.append(
        "slug",
        slug ||
        slugify(name)
      );

      formData.append(
        "description",
        description.trim()
      );

      formData.append(
        "status",
        String(status)
      );

      if (imageFile) {
        formData.append(
          "image",
          imageFile
        );
      }

      await createCategory.mutateAsync(
        formData
      );

      toast.success(
        "Category created successfully."
      );

      handleOpenChange(false);
    } catch (err: any) {
      console.error(
        "Create category error:",
        err
      );

      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to create category.";

      setError(message);

      toast.error(message);
    }
  }

  /* ========================================================= */
  /* UI */
  /* ========================================================= */

  return (
    <Dialog
      open={open}
      onOpenChange={handleOpenChange}
    >
      <DialogContent
        className="
                    flex
                    h-[calc(100dvh-24px)]
                    w-[calc(100vw-24px)]
                    max-w-[560px]
                    flex-col
                    overflow-hidden
                    rounded-[24px]
                    border
                    border-emerald-100
                    bg-white
                    p-0
                    shadow-2xl

                    sm:h-[92dvh]
                    sm:max-h-[92dvh]
                    sm:rounded-[28px]
                "
      >

        {/* ================================================= */}
        {/* HEADER - FIXED */}
        {/* ================================================= */}

        <div
          className="
                        shrink-0
                        border-b
                        border-emerald-100
                        bg-gradient-to-br
                        from-emerald-50
                        via-white
                        to-green-50
                    "
        >

          <DialogHeader
            className="
                            p-5
                            pr-14
                            sm:p-7
                            sm:pr-16
                        "
          >

            <div
              className="
                                flex
                                items-start
                                gap-3
                                sm:gap-4
                            "
            >

              {/* ICON */}

              <div
                className="
                                    flex
                                    h-11
                                    w-11
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    bg-emerald-100
                                    text-emerald-600

                                    sm:h-14
                                    sm:w-14
                                "
              >
                <Plus
                  className="
                                        h-5
                                        w-5
                                        sm:h-6
                                        sm:w-6
                                    "
                />
              </div>

              {/* TITLE */}

              <div
                className="
                                    min-w-0
                                    flex-1
                                "
              >

                <p
                  className="
                                        text-[10px]
                                        font-bold
                                        uppercase
                                        tracking-[0.18em]
                                        text-emerald-600

                                        sm:text-xs
                                    "
                >
                  Category Management
                </p>

                <DialogTitle
                  className="
                                        mt-1
                                        text-[23px]
                                        font-bold
                                        leading-tight
                                        tracking-tight
                                        text-slate-900

                                        sm:text-3xl
                                    "
                >
                  Add New Category
                </DialogTitle>

                <DialogDescription
                  className="
                                        mt-1
                                        max-w-[390px]
                                        text-xs
                                        leading-5
                                        text-slate-500

                                        sm:text-sm
                                        sm:leading-6
                                    "
                >
                  Create a new agricultural
                  product category.
                </DialogDescription>

              </div>

            </div>

          </DialogHeader>

        </div>

        {/* ================================================= */}
        {/* FORM */}
        {/* ================================================= */}

        <form
          onSubmit={handleSubmit}
          className="
                        flex
                        min-h-0
                        flex-1
                        flex-col
                        overflow-hidden
                    "
        >

          {/* ================================================= */}
          {/* SCROLL AREA */}
          {/* ================================================= */}

          <div
            className="
                            min-h-0
                            flex-1
                            overflow-y-auto
                            overflow-x-hidden
                            overscroll-contain
                            touch-pan-y
                        "
          >

            <div
              className="
                                w-full
                                max-w-full
                                space-y-4
                                p-4

                                sm:space-y-5
                                sm:p-6

                                lg:p-7
                            "
            >

              {/* ================================================= */}
              {/* BASIC INFORMATION */}
              {/* ================================================= */}

              <section
                className="
                                    w-full
                                    overflow-hidden
                                    rounded-2xl
                                    border
                                    border-slate-200
                                    bg-white
                                    shadow-sm
                                "
              >

                {/* SECTION HEADER */}

                <div
                  className="
                                        border-b
                                        border-slate-200
                                        bg-slate-50/80
                                        px-4
                                        py-4

                                        sm:px-5
                                    "
                >

                  <div
                    className="
                                            flex
                                            items-center
                                            gap-3
                                        "
                  >

                    <div
                      className="
                                                flex
                                                h-9
                                                w-9
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-xl
                                                bg-emerald-100
                                                text-emerald-600
                                            "
                    >
                      <Tag className="h-4 w-4" />
                    </div>

                    <div className="min-w-0">

                      <h3
                        className="
                                                    font-semibold
                                                    text-slate-900
                                                "
                      >
                        Basic Information
                      </h3>

                      <p
                        className="
                                                    text-xs
                                                    text-slate-500
                                                "
                      >
                        Category identity
                      </p>

                    </div>

                  </div>

                </div>

                {/* FIELDS */}

                <div
                  className="
                                        space-y-5
                                        p-4

                                        sm:p-5
                                    "
                >

                  {/* NAME */}

                  <div>

                    <Label
                      htmlFor="category-name"
                      className="
                                                text-sm
                                                font-semibold
                                                text-slate-700
                                            "
                    >
                      Category Name
                    </Label>

                    <Input
                      id="category-name"
                      value={name}
                      onChange={(event) =>
                        handleNameChange(
                          event.target.value
                        )
                      }
                      placeholder="e.g. Insecticides"
                      disabled={
                        createCategory.isPending
                      }
                      autoComplete="off"
                      className="
                                                mt-2
                                                h-11
                                                w-full
                                                rounded-xl
                                                border-slate-200
                                                bg-white
                                                px-4
                                                text-sm
                                                shadow-none
                                                transition

                                                focus-visible:border-emerald-500
                                                focus-visible:ring-2
                                                focus-visible:ring-emerald-100
                                            "
                    />

                  </div>

                  {/* SLUG */}

                  <div>

                    <Label
                      className="
                                                text-sm
                                                font-semibold
                                                text-slate-700
                                            "
                    >
                      Slug
                    </Label>

                    <div
                      className="
                                                mt-2
                                                min-h-11
                                                w-full
                                                max-w-full
                                                overflow-hidden
                                                rounded-xl
                                                border
                                                border-slate-200
                                                bg-slate-50
                                                px-4
                                                py-3
                                            "
                    >

                      <span
                        className="
                                                    block
                                                    break-all
                                                    font-mono
                                                    text-sm
                                                    text-slate-500
                                                "
                      >
                        {slug ||
                          "category-slug"}
                      </span>

                    </div>

                    <p
                      className="
                                                mt-1.5
                                                text-[11px]
                                                leading-5
                                                text-slate-400
                                            "
                    >
                      Automatically generated
                      from category name.
                    </p>

                  </div>

                  {/* DESCRIPTION */}

                  <div>

                    <Label
                      htmlFor="category-description"
                      className="
                                                text-sm
                                                font-semibold
                                                text-slate-700
                                            "
                    >
                      Description
                    </Label>

                    <Textarea
                      id="category-description"
                      value={
                        description
                      }
                      onChange={(event) =>
                        setDescription(
                          event.target.value
                        )
                      }
                      placeholder="Enter category description..."
                      disabled={
                        createCategory.isPending
                      }
                      className="
                                                mt-2
                                                min-h-[110px]
                                                w-full
                                                resize-none
                                                rounded-xl
                                                border-slate-200
                                                px-4
                                                py-3
                                                text-sm
                                                shadow-none

                                                focus-visible:border-emerald-500
                                                focus-visible:ring-2
                                                focus-visible:ring-emerald-100
                                            "
                    />

                  </div>

                </div>

              </section>

              {/* ================================================= */}
              {/* CATEGORY IMAGE */}
              {/* ================================================= */}

              <section
                className="
                                    w-full
                                    overflow-hidden
                                    rounded-2xl
                                    border
                                    border-slate-200
                                    bg-white
                                    shadow-sm
                                "
              >

                <div
                  className="
                                        border-b
                                        border-slate-200
                                        bg-slate-50/80
                                        px-4
                                        py-4

                                        sm:px-5
                                    "
                >

                  <div
                    className="
                                            flex
                                            items-center
                                            gap-3
                                        "
                  >

                    <div
                      className="
                                                flex
                                                h-9
                                                w-9
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-xl
                                                bg-violet-100
                                                text-violet-600
                                            "
                    >
                      <ImageIcon className="h-4 w-4" />
                    </div>

                    <div>

                      <h3
                        className="
                                                    font-semibold
                                                    text-slate-900
                                                "
                      >
                        Category Image
                      </h3>

                      <p
                        className="
                                                    text-xs
                                                    text-slate-500
                                                "
                      >
                        JPG, PNG or WEBP · Max 5 MB
                      </p>

                    </div>

                  </div>

                </div>

                <div className="p-4 sm:p-5">

                  <label
                    htmlFor="add-category-image"
                    className="
                                            group
                                            relative
                                            flex
                                            min-h-[170px]
                                            w-full
                                            cursor-pointer
                                            items-center
                                            justify-center
                                            overflow-hidden
                                            rounded-2xl
                                            border-2
                                            border-dashed
                                            border-slate-200
                                            bg-slate-50
                                            transition

                                            hover:border-emerald-400
                                            hover:bg-emerald-50/20

                                            sm:min-h-[190px]
                                        "
                  >

                    {preview ? (
                      <>
                        <img
                          src={preview}
                          alt="Category preview"
                          className="
                                                        absolute
                                                        inset-0
                                                        h-full
                                                        w-full
                                                        object-cover
                                                    "
                        />

                        {/* MOBILE */}
                        <div
                          className="
                                                        absolute
                                                        inset-0
                                                        flex
                                                        items-center
                                                        justify-center
                                                        bg-slate-950/40

                                                        sm:opacity-0
                                                        sm:transition
                                                        sm:group-hover:opacity-100
                                                    "
                        >

                          <div
                            className="
                                                            rounded-xl
                                                            bg-white
                                                            px-4
                                                            py-2.5
                                                            text-sm
                                                            font-semibold
                                                            text-slate-800
                                                            shadow-lg
                                                        "
                          >
                            Change Image
                          </div>

                        </div>

                        {/* REMOVE */}

                        <button
                          type="button"
                          onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            removeImage();
                          }}
                          className="
                                                        absolute
                                                        right-3
                                                        top-3
                                                        z-10
                                                        flex
                                                        h-9
                                                        w-9
                                                        items-center
                                                        justify-center
                                                        rounded-xl
                                                        bg-white
                                                        text-red-500
                                                        shadow-lg
                                                        transition
                                                        hover:bg-red-50
                                                    "
                          aria-label="Remove image"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </>
                    ) : (
                      <div
                        className="
                                                    px-4
                                                    text-center
                                                "
                      >

                        <div
                          className="
                                                        mx-auto
                                                        flex
                                                        h-12
                                                        w-12
                                                        items-center
                                                        justify-center
                                                        rounded-2xl
                                                        bg-white
                                                        text-emerald-600
                                                        shadow-sm
                                                    "
                        >
                          <Upload className="h-5 w-5" />
                        </div>

                        <p
                          className="
                                                        mt-3
                                                        text-sm
                                                        font-semibold
                                                        text-slate-700
                                                    "
                        >
                          Upload category image
                        </p>

                        <p
                          className="
                                                        mt-1
                                                        text-xs
                                                        text-slate-400
                                                    "
                        >
                          Click to browse
                        </p>

                        <p
                          className="
                                                        mt-2
                                                        text-[10px]
                                                        font-medium
                                                        uppercase
                                                        tracking-wider
                                                        text-slate-400
                                                    "
                        >
                          PNG · JPG · WEBP
                        </p>

                      </div>
                    )}

                    <input
                      id="add-category-image"
                      type="file"
                      accept="
                                                image/png,
                                                image/jpeg,
                                                image/webp
                                            "
                      className="hidden"
                      onChange={
                        handleImageChange
                      }
                      disabled={
                        createCategory.isPending
                      }
                    />

                  </label>

                </div>

              </section>

              {/* ================================================= */}
              {/* STATUS */}
              {/* ================================================= */}

              <section
                className="
                                    w-full
                                    rounded-2xl
                                    border
                                    border-slate-200
                                    bg-white
                                    p-4
                                    shadow-sm

                                    sm:p-5
                                "
              >

                <div
                  className="
                                        flex
                                        items-center
                                        justify-between
                                        gap-4
                                    "
                >

                  <div className="min-w-0">

                    <p
                      className="
                                                font-semibold
                                                text-slate-900
                                            "
                    >
                      Category Status
                    </p>

                    <p
                      className="
                                                mt-1
                                                text-xs
                                                leading-5
                                                text-slate-500
                                            "
                    >
                      Active categories are visible
                      to customers.
                    </p>

                  </div>

                  {/* SWITCH */}

                  <button
                    type="button"
                    disabled={
                      createCategory.isPending
                    }
                    onClick={() =>
                      setStatus(
                        (current) =>
                          !current
                      )
                    }
                    aria-label="Toggle category status"
                    className={`
                                            relative
                                            h-7
                                            w-12
                                            shrink-0
                                            rounded-full
                                            transition-colors
                                            ${status
                        ? "bg-emerald-600"
                        : "bg-slate-300"
                      }
                                        `}
                  >

                    <span
                      className={`
                                                absolute
                                                top-1
                                                flex
                                                h-5
                                                w-5
                                                items-center
                                                justify-center
                                                rounded-full
                                                bg-white
                                                shadow-sm
                                                transition-transform
                                                ${status
                          ? "translate-x-6"
                          : "translate-x-1"
                        }
                                            `}
                    >

                      {status && (
                        <Check
                          className="
                                                        h-3
                                                        w-3
                                                        text-emerald-600
                                                    "
                        />
                      )}

                    </span>

                  </button>

                </div>

                <div
                  className={`
                                        mt-4
                                        rounded-xl
                                        px-4
                                        py-3
                                        text-xs
                                        font-medium
                                        ${status
                      ? "bg-emerald-50 text-emerald-700"
                      : "bg-slate-100 text-slate-500"
                    }
                                    `}
                >
                  {status
                    ? "This category will be active after creation."
                    : "This category will be created as inactive."}
                </div>

              </section>

              {/* ================================================= */}
              {/* ERROR */}
              {/* ================================================= */}

              {error && (
                <div
                  className="
                                        w-full
                                        rounded-xl
                                        border
                                        border-red-200
                                        bg-red-50
                                        px-4
                                        py-3
                                        text-sm
                                        leading-5
                                        text-red-600
                                    "
                >
                  {error}
                </div>
              )}

            </div>

          </div>

          {/* ================================================= */}
          {/* FOOTER - FIXED */}
          {/* ================================================= */}

          <div
            className="
                            shrink-0
                            border-t
                            border-slate-200
                            bg-white
                            p-4

                            sm:p-5
                        "
          >

            <div
              className="
                                flex
                                flex-col-reverse
                                gap-2.5

                                sm:flex-row
                                sm:justify-end
                            "
            >

              <Button
                type="button"
                variant="outline"
                disabled={
                  createCategory.isPending
                }
                onClick={() =>
                  handleOpenChange(
                    false
                  )
                }
                className="
                                    h-11
                                    w-full
                                    rounded-xl
                                    border-slate-200
                                    px-6

                                    sm:w-auto
                                "
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={
                  createCategory.isPending ||
                  !name.trim()
                }
                className="
                                    h-11
                                    w-full
                                    rounded-xl
                                    bg-emerald-600
                                    px-7
                                    font-semibold
                                    text-white
                                    shadow-sm
                                    hover:bg-emerald-700

                                    sm:w-auto
                                "
              >

                {createCategory.isPending ? (
                  <>
                    <Loader2
                      className="
                                                mr-2
                                                h-4
                                                w-4
                                                animate-spin
                                            "
                    />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Category
                  </>
                )}

              </Button>

            </div>

          </div>

        </form>

      </DialogContent>
    </Dialog>
  );
}

/* ============================================================= */
/* SLUGIFY */
/* ============================================================= */

function slugify(
  value: string
) {
  return value
    .toLowerCase()
    .trim()
    .replace(
      /[^a-z0-9\s-]/g,
      ""
    )
    .replace(
      /\s+/g,
      "-"
    )
    .replace(
      /-+/g,
      "-"
    );
}