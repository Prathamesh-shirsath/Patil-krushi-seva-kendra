
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Plus, Upload } from "lucide-react";

export default function AddCategoryModal() {
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <Dialog>
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
        </DialogHeader>

        <div className="space-y-5 mt-4">
          <input
            placeholder="Category Name"
            className="w-full border rounded-xl p-3"
          />

          <input
            placeholder="Slug"
            className="w-full border rounded-xl p-3"
          />

          <textarea
            placeholder="Description"
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

          <select className="w-full border rounded-xl p-3">
            <option>Active</option>
            <option>Inactive</option>
          </select>

          <button
            className="
            w-full
            bg-green-600
            text-white
            rounded-xl
            py-3
            font-semibold
          "
          >
            Save Category
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

