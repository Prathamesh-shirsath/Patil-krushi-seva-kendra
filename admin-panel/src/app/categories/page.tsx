
"use client";
import AddCategoryModal from "@/components/admin/AddCategoryModal";
import {
  Plus,
  Search,
  Eye,
  Pencil,
  Trash2,
  Tag,
  Package,
  CheckCircle,
  XCircle,
} from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Seeds",
    slug: "seeds",
    products: 24,
    status: "Active",
  },
  {
    id: 2,
    name: "Fertilizers",
    slug: "fertilizers",
    products: 18,
    status: "Active",
  },
  {
    id: 3,
    name: "Pesticides",
    slug: "pesticides",
    products: 28,
    status: "Active",
  },
  {
    id: 4,
    name: "Organic Products",
    slug: "organic-products",
    products: 15,
    status: "Inactive",
  },
];

export default function CategoriesPage() {
  return (

<div
  className="
  min-h-screen
  relative
  overflow-hidden
  bg-gradient-to-br
  from-[#f8fff5]
  via-[#f4faf2]
  to-[#eef7ea]
  p-4
  md:p-6
  lg:p-8
  space-y-6
"
>
  {/* Background Glow Effects */}
  <div className="absolute inset-0 -z-10 overflow-hidden">
    <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-green-300 blur-3xl opacity-20" />

    <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-emerald-300 blur-3xl opacity-20" />

    <div className="absolute top-1/2 left-1/2 h-72 w-72 rounded-full bg-lime-200 blur-3xl opacity-10" />
  </div>

  {/* Header */}
  <div
    className="
    bg-white/80
    backdrop-blur-md
    rounded-3xl
    border
    border-green-100
    p-6
    shadow-sm
    flex
    flex-col
    gap-4
    lg:flex-row
    lg:items-center
    lg:justify-between
  "
  >
    <div>
      <h1 className="text-3xl font-bold text-slate-800">
        Categories Management
      </h1>

      <p className="text-slate-500 mt-1">
        Manage all agricultural product categories
      </p>
    </div>

    <button
      className="
      flex items-center gap-2
      bg-gradient-to-r
      from-green-600
      via-emerald-600
      to-green-700
      text-white
      px-6 py-3
      rounded-2xl
      shadow-lg
      hover:shadow-2xl
      hover:scale-105
      transition-all
      duration-300
    "
    >
      Add Category
    </button>

    
  </div>
 {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard
          title="Total Categories"
          value="24"
          icon={<Tag size={24} />}
        />

        <StatCard
          title="Active Categories"
          value="22"
          icon={<CheckCircle size={24} />}
        />

        <StatCard
          title="Inactive Categories"
          value="2"
          icon={<XCircle size={24} />}
        />

        <StatCard
          title="Total Products"
          value="120"
          icon={<Package size={24} />}
        />
      </div>

      {/* Search */}
      <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-sm flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-4 text-slate-400"
          />

          <input
            placeholder="Search categories..."
            className="
              w-full
              rounded-2xl
              border
              border-slate-200
              pl-10
              pr-4
              py-3
              focus:ring-2
              focus:ring-green-500
              outline-none
            "
          />
        </div>

        <select className="rounded-2xl border border-slate-200 px-4 py-3">
          <option>All Status</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="bg-slate-50">
              <tr>
                <th className="p-5 text-left text-sm font-semibold">
                  Category
                </th>
                <th className="p-5 text-left text-sm font-semibold">
                  Slug
                </th>
                <th className="p-5 text-left text-sm font-semibold">
                  Products
                </th>
                <th className="p-5 text-left text-sm font-semibold">
                  Status
                </th>
                <th className="p-5 text-right text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {categories.map((category) => (
                <tr
                  key={category.id}
                  className="
                    border-t
                    hover:bg-green-50
                    transition-all
                    duration-300
                  "
                >
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center">
                        🌱
                      </div>

                      <div>
                        <p className="font-semibold text-slate-800">
                          {category.name}
                        </p>

                        <p className="text-sm text-slate-500">
                          {category.products} Products
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="p-5 text-slate-500">
                    {category.slug}
                  </td>

                  <td className="p-5 font-medium">
                    {category.products}
                  </td>

                  <td className="p-5">
                    <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    category.status === "Active"
                ? "bg-green-100 text-green-700"
                 : "bg-red-100 text-red-600"
                }`}
>
                     {category.status}
                     </span>
                  </td>

                  <td className="p-5">
                    <div className="flex justify-end gap-2">
                      <button
                        className="
                        h-10 w-10
                        flex items-center justify-center
                        rounded-xl
                        border border-slate-200
                        hover:bg-slate-100
                        transition-all
                      "
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        className="
                        h-10 w-10
                        flex items-center justify-center
                        rounded-xl
                        border border-slate-200
                        hover:bg-slate-100
                        transition-all
                      "
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        className="
                        h-10 w-10
                        flex items-center justify-center
                        rounded-xl
                        border border-red-200
                        text-red-600
                        hover:bg-red-50
                        transition-all
                      "
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div
      className="
      bg-white
      rounded-3xl
      p-6
      shadow-sm
      border
      border-slate-100
      hover:shadow-xl
      transition-all
      duration-300
    "
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h3 className="text-3xl font-bold mt-2 text-slate-800">
            {value}
          </h3>
        </div>

        <div
          className="
          h-14
          w-14
          rounded-2xl
          bg-gradient-to-br
          from-green-500
          to-emerald-600
          text-white
          flex
          items-center
          justify-center
          shadow-lg
        "
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

