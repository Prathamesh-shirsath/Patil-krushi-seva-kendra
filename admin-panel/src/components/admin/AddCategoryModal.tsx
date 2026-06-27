"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useCreateCategory } from "@/hooks/use-categories";
import { toast } from "sonner";

export default function AddCategoryModal() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("true");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const { mutate: createCategory, isPending } = useCreateCategory();

  const handleSave = () => {
    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("slug", slug || name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
    formData.append("description", description);
    formData.append("status", status);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    createCategory(formData, {
      onSuccess: () => {
        toast.success("Category created successfully!");
        setOpen(false);
        // Reset form
        setName("");
        setSlug("");
        setDescription("");
        setStatus("true");
        setImageFile(null);
        setPreview(null);
      },
      onError: (err) => {
        console.error(err);
        toast.error("Failed to create category");
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className="
          flex items-center gap-2
          bg-gradient-to-r
          from-green-600
          to-emerald-600
          text-white
          px-6 py-3
          rounded-2xl
          shadow-lg
          hover:scale-105
          transition-all
        "
        >
          <Plus size={18} />
          Add Category
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Add New Category
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500">
            Fill in the details below to create a new category.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 mt-4">
          <input
            placeholder="Category Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              // auto-slug
              setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
            }}
            className="w-full border rounded-xl p-3"
          />

          <input
            placeholder="Slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full border rounded-xl p-3"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-xl p-3 h-28"
          />

          <div>
            <label className="font-medium">
              Category Image
            </label>

            <input
              type="file"
              accept="image/*"
              className="mt-2"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setImageFile(file);
                setPreview(
                  URL.createObjectURL(file)
                );
              }}
            />

            {preview && (
              <img
                src={preview}
                alt="preview"
                className="
                mt-4
                h-40
                w-full
                rounded-xl
                object-cover
                border
              "
              />
            )}
          </div>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full border rounded-xl p-3"
          >
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>

          <button
            onClick={handleSave}
            disabled={isPending}
            className="
            w-full
            bg-green-600
            text-white
            rounded-xl
            py-3
            font-semibold
            disabled:opacity-55
          "
          >
            {isPending ? "Saving..." : "Save Category"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

