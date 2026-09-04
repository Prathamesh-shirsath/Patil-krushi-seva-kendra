"use client";

import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Users,
  UserPlus,
  ShoppingBag,
  Wallet,
  UserX,
  Search,
  Mail,
  Phone,
  Filter,
  RotateCcw,
  Download,
  Plus,
  ChevronDown,
  Eye,
  Pencil,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";

type Customer = {
  id: string;
  code: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  orders: number;
  totalSpent: number;
  status: "Active" | "Inactive";
  joinedOn: string;
  avatar: string;
};

type CustomerStats = {
  totalCustomers: number;
  newCustomers: number;
  repeatCustomers: number;
  activeCustomers: number;
  inactiveCustomers: number;
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  const [stats, setStats] = useState<CustomerStats>({
    totalCustomers: 0,
    newCustomers: 0,
    repeatCustomers: 0,
    activeCustomers: 0,
    inactiveCustomers: 0,
  });

  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [selectedState, setSelectedState] = useState("All States");
  const [selectedJoined, setSelectedJoined] =
    useState("Joined: All Time");

  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const PAGE_SIZE = 10;

  // ==========================================
  // FETCH CUSTOMERS
  // ==========================================

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/api/admin/customers`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message || "Failed to fetch customers."
        );
      }

      const formattedCustomers: Customer[] = (
        data.customers || []
      ).map((customer: any, index: number) => ({
        id: customer.id,
        code: `CUS${String(index + 1).padStart(4, "0")}`,
        name: customer.name || "Unknown Customer",
        email: customer.email || "-",
        phone: customer.phone || "-",
        city: customer.city || "-",
        state: customer.state || "-",
        orders: Number(customer.orders || 0),
        totalSpent: Number(customer.totalSpent || 0),
        status:
          customer.status === "Active"
            ? "Active"
            : "Inactive",
        joinedOn: customer.joinedOn
          ? new Date(customer.joinedOn).toLocaleDateString(
              "en-IN",
              {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }
            )
          : "-",
        avatar: customer.image || "",
      }));

      setCustomers(formattedCustomers);
    } catch (err) {
      console.error("Customer fetch error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to load customers."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // FETCH CUSTOMER STATS
  // ==========================================

  const fetchStats = async () => {
    try {
      setStatsLoading(true);

      const response = await fetch(
        `${API_URL}/api/admin/customers/stats`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Failed to fetch customer statistics."
        );
      }

      setStats({
        totalCustomers: Number(
          data.stats?.totalCustomers || 0
        ),
        newCustomers: Number(
          data.stats?.newCustomers || 0
        ),
        repeatCustomers: Number(
          data.stats?.repeatCustomers || 0
        ),
        activeCustomers: Number(
          data.stats?.activeCustomers || 0
        ),
        inactiveCustomers: Number(
          data.stats?.inactiveCustomers || 0
        ),
      });
    } catch (err) {
      console.error("Customer stats error:", err);
    } finally {
      setStatsLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
    fetchStats();
  }, []);

  // ==========================================
  // DYNAMIC CITY / STATE FILTERS
  // ==========================================

  const cities = useMemo(() => {
    const uniqueCities = Array.from(
      new Set(
        customers
          .map((customer) => customer.city)
          .filter(
            (city) => city && city !== "-"
          )
      )
    );

    return ["All Cities", ...uniqueCities];
  }, [customers]);

  const states = useMemo(() => {
    const uniqueStates = Array.from(
      new Set(
        customers
          .map((customer) => customer.state)
          .filter(
            (state) => state && state !== "-"
          )
      )
    );

    return ["All States", ...uniqueStates];
  }, [customers]);

  // ==========================================
  // FILTER CUSTOMERS
  // ==========================================

  const filteredCustomers = useMemo(() => {
    return customers.filter((cust) => {
      const searchText = search
        .toLowerCase()
        .trim();

      const matchesSearch =
        cust.name
          .toLowerCase()
          .includes(searchText) ||
        cust.email
          .toLowerCase()
          .includes(searchText) ||
        cust.phone
          .toLowerCase()
          .includes(searchText) ||
        cust.code
          .toLowerCase()
          .includes(searchText);

      const matchesStatus =
        selectedStatus === "All Status" ||
        cust.status === selectedStatus;

      const matchesCity =
        selectedCity === "All Cities" ||
        cust.city === selectedCity;

      const matchesState =
        selectedState === "All States" ||
        cust.state === selectedState;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCity &&
        matchesState
      );
    });
  }, [
    customers,
    search,
    selectedStatus,
    selectedCity,
    selectedState,
  ]);

  // ==========================================
  // PAGINATION
  // ==========================================

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredCustomers.length / PAGE_SIZE
    )
  );

  const startIndex =
    (currentPage - 1) * PAGE_SIZE;

  const paginatedCustomers =
    filteredCustomers.slice(
      startIndex,
      startIndex + PAGE_SIZE
    );

  useEffect(() => {
    setCurrentPage(1);
  }, [
    search,
    selectedStatus,
    selectedCity,
    selectedState,
    selectedJoined,
  ]);

  // ==========================================
  // SELECT ALL
  // ==========================================

  const toggleSelectAll = () => {
    const currentIds = paginatedCustomers.map(
      (customer) => customer.id
    );

    const allSelected = currentIds.every(
      (id) => selectedRows.includes(id)
    );

    if (allSelected) {
      setSelectedRows((prev) =>
        prev.filter(
          (id) => !currentIds.includes(id)
        )
      );
    } else {
      setSelectedRows((prev) => [
        ...new Set([
          ...prev,
          ...currentIds,
        ]),
      ]);
    }
  };

  // ==========================================
  // SELECT SINGLE ROW
  // ==========================================

  const toggleSelectRow = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(
        selectedRows.filter(
          (item) => item !== id
        )
      );
    } else {
      setSelectedRows([
        ...selectedRows,
        id,
      ]);
    }
  };

  // ==========================================
  // RESET FILTERS
  // ==========================================

  const handleResetFilters = () => {
    setSearch("");
    setSelectedStatus("All Status");
    setSelectedCity("All Cities");
    setSelectedState("All States");
    setSelectedJoined("Joined: All Time");
    setCurrentPage(1);
  };

  // ==========================================
  // EXPORT
  // ==========================================

  const handleExport = () => {
    if (filteredCustomers.length === 0) {
      return;
    }

    const headers = [
      "Customer ID",
      "Name",
      "Email",
      "Phone",
      "City",
      "State",
      "Orders",
      "Total Spent",
      "Status",
      "Joined On",
    ];

    const rows = filteredCustomers.map(
      (customer) => [
        customer.code,
        customer.name,
        customer.email,
        customer.phone,
        customer.city,
        customer.state,
        customer.orders,
        customer.totalSpent,
        customer.status,
        customer.joinedOn,
      ]
    );

    const csvContent = [
      headers,
      ...rows,
    ]
      .map((row) =>
        row
          .map(
            (value) =>
              `"${String(value).replace(
                /"/g,
                '""'
              )}"`
          )
          .join(",")
      )
      .join("\n");

    const blob = new Blob(
      [csvContent],
      {
        type: "text/csv;charset=utf-8;",
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;
    link.download =
      "customers.csv";

    link.click();

    URL.revokeObjectURL(url);
  };

  // ==========================================
  // STAT CARD DATA
  // ==========================================

  const statCards = [
    {
      title: "Total Customers",
      value: stats.totalCustomers,
      icon: Users,
      iconClass:
        "bg-emerald-50 text-emerald-700",
    },
    {
      title: "New Customers",
      value: stats.newCustomers,
      icon: UserPlus,
      iconClass:
        "bg-purple-50 text-purple-700",
    },
    {
      title: "Repeat Customers",
      value: stats.repeatCustomers,
      icon: ShoppingBag,
      iconClass:
        "bg-blue-50 text-blue-700",
    },
    {
      title: "Active Customers",
      value: stats.activeCustomers,
      icon: Wallet,
      iconClass:
        "bg-amber-50 text-amber-700",
    },
    {
      title: "Inactive Customers",
      value: stats.inactiveCustomers,
      icon: UserX,
      iconClass:
        "bg-red-50 text-red-600",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">

        {/* =====================================
            PAGE HEADER
        ====================================== */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Customers
            </h1>

            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
              <span>Home</span>
              <span>&gt;</span>
              <span className="font-medium text-slate-700">
                Customers
              </span>
            </div>
          </div>

          <div className="flex flex-col xs:flex-row sm:flex-row items-stretch gap-2 sm:gap-3">
            <Button
              variant="outline"
              onClick={handleExport}
              className="h-10 rounded-xl border-slate-200 bg-white text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50"
            >
              <Download className="mr-2 h-4 w-4 text-slate-500" />

              Export

              <ChevronDown className="ml-2 h-3.5 w-3.5 text-slate-400" />
            </Button>

            <Button
              className="h-10 rounded-xl bg-[#0f542c] hover:bg-[#0c4323] text-xs font-semibold text-white shadow-sm"
            >
              <Plus className="mr-1.5 h-4 w-4" />
              Add Customer
            </Button>
          </div>
        </div>

        {/* =====================================
            ERROR
        ====================================== */}

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* =====================================
            STAT CARDS
        ====================================== */}

        <div className="grid grid-cols-1 min-[420px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {statCards.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.iconClass}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                </div>

                <div className="mt-3">
                  <p className="text-xs font-medium text-slate-500">
                    {stat.title}
                  </p>

                  <p className="text-2xl font-bold text-slate-900 mt-0.5">
                    {statsLoading ? (
                      <Loader2 className="h-6 w-6 animate-spin" />
                    ) : (
                      stat.value.toLocaleString(
                        "en-IN"
                      )
                    )}
                  </p>

                  <p className="text-[11px] text-slate-400 mt-1">
                    Live database data
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* =====================================
            FILTER TOOLBAR
        ====================================== */}

        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-2xs">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

            {/* Search */}
            <div className="relative w-full lg:max-w-sm">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />

              <Input
                placeholder="Search by name, email or phone..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="h-10 pl-9 rounded-xl border-slate-200 bg-slate-50/50 text-xs focus-visible:bg-white focus-visible:ring-emerald-600"
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 min-[420px]:grid-cols-2 sm:grid-cols-3 lg:flex items-center gap-2 w-full lg:w-auto">

              {/* Status */}
              <select
                value={selectedStatus}
                onChange={(e) =>
                  setSelectedStatus(
                    e.target.value
                  )
                }
                className="h-10 rounded-xl border border-slate-200 bg-slate-50/50 px-3 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                <option value="All Status">
                  All Status
                </option>

                <option value="Active">
                  Active
                </option>

                <option value="Inactive">
                  Inactive
                </option>
              </select>

              {/* City */}
              <select
                value={selectedCity}
                onChange={(e) =>
                  setSelectedCity(
                    e.target.value
                  )
                }
                className="h-10 rounded-xl border border-slate-200 bg-slate-50/50 px-3 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                {cities.map((city) => (
                  <option
                    key={city}
                    value={city}
                  >
                    {city}
                  </option>
                ))}
              </select>

              {/* State */}
              <select
                value={selectedState}
                onChange={(e) =>
                  setSelectedState(
                    e.target.value
                  )
                }
                className="h-10 rounded-xl border border-slate-200 bg-slate-50/50 px-3 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                {states.map((state) => (
                  <option
                    key={state}
                    value={state}
                  >
                    {state}
                  </option>
                ))}
              </select>

              {/* Joined */}
              <select
                value={selectedJoined}
                onChange={(e) =>
                  setSelectedJoined(
                    e.target.value
                  )
                }
                className="h-10 rounded-xl border border-slate-200 bg-slate-50/50 px-3 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              >
                <option value="Joined: All Time">
                  Joined: All Time
                </option>

                <option value="This Month">
                  This Month
                </option>

                <option value="Last Month">
                  Last Month
                </option>
              </select>

              <Button
                variant="outline"
                className="h-10 rounded-xl border-slate-200 text-xs font-semibold text-slate-700 px-3"
              >
                <Filter className="mr-1.5 h-3.5 w-3.5 text-slate-500" />
                Filter
              </Button>

              <Button
                variant="ghost"
                onClick={
                  handleResetFilters
                }
                className="h-10 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 px-3"
              >
                <RotateCcw className="mr-1.5 h-3.5 w-3.5 text-slate-500" />
                Reset
              </Button>
            </div>
          </div>
        </div>

        {/* =====================================
            TABLE
        ====================================== */}

        <div className="rounded-2xl border border-slate-200/80 bg-white shadow-2xs overflow-hidden">

          {/* Horizontal responsive scroll */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-left text-xs">

              <thead className="border-b border-slate-200/80 bg-slate-50/70 text-slate-600 font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3.5 w-10">
                    <input
                      type="checkbox"
                      checked={
                        paginatedCustomers.length >
                          0 &&
                        paginatedCustomers.every(
                          (customer) =>
                            selectedRows.includes(
                              customer.id
                            )
                        )
                      }
                      onChange={
                        toggleSelectAll
                      }
                      className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-600 h-4 w-4"
                    />
                  </th>

                  <th className="px-4 py-3.5">
                    Customer
                  </th>

                  <th className="px-4 py-3.5">
                    Contact
                  </th>

                  <th className="px-4 py-3.5">
                    Location
                  </th>

                  <th className="px-4 py-3.5 text-center">
                    Orders
                  </th>

                  <th className="px-4 py-3.5">
                    Total Spent
                  </th>

                  <th className="px-4 py-3.5">
                    Status
                  </th>

                  <th className="px-4 py-3.5">
                    Joined On
                  </th>

                  <th className="px-4 py-3.5 text-center">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 font-medium">

                {/* Loading */}
                {loading && (
                  <tr>
                    <td
                      colSpan={9}
                      className="px-4 py-16 text-center"
                    >
                      <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Loading customers...
                      </div>
                    </td>
                  </tr>
                )}

                {/* Empty */}
                {!loading &&
                  filteredCustomers.length ===
                    0 && (
                    <tr>
                      <td
                        colSpan={9}
                        className="px-4 py-16 text-center text-slate-500"
                      >
                        No customers found.
                      </td>
                    </tr>
                  )}

                {/* Customers */}
                {!loading &&
                  paginatedCustomers.map(
                    (cust) => {
                      const isSelected =
                        selectedRows.includes(
                          cust.id
                        );

                      return (
                        <tr
                          key={cust.id}
                          className={`hover:bg-slate-50/70 transition-colors ${
                            isSelected
                              ? "bg-emerald-50/30"
                              : ""
                          }`}
                        >
                          {/* Checkbox */}
                          <td className="px-4 py-3.5">
                            <input
                              type="checkbox"
                              checked={
                                isSelected
                              }
                              onChange={() =>
                                toggleSelectRow(
                                  cust.id
                                )
                              }
                              className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-600 h-4 w-4"
                            />
                          </td>

                          {/* Customer */}
                          <td className="px-4 py-3.5">
                            <div className="flex items-center gap-3">
                              {cust.avatar ? (
                                <img
                                  src={
                                    cust.avatar
                                  }
                                  alt={
                                    cust.name
                                  }
                                  className="h-9 w-9 rounded-full object-cover border border-slate-200 shrink-0"
                                />
                              ) : (
                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 font-bold shrink-0">
                                  {cust.name
                                    .charAt(
                                      0
                                    )
                                    .toUpperCase()}
                                </div>
                              )}

                              <div>
                                <p className="font-bold text-slate-900 text-xs">
                                  {cust.name}
                                </p>

                                <p className="text-[10px] text-slate-400">
                                  {cust.code}
                                </p>
                              </div>
                            </div>
                          </td>

                          {/* Contact */}
                          <td className="px-4 py-3.5">
                            <div className="space-y-0.5 text-slate-600">
                              <p className="flex items-center gap-1.5 text-[11px]">
                                <Mail className="h-3 w-3 text-slate-400 shrink-0" />
                                {cust.email}
                              </p>

                              <p className="flex items-center gap-1.5 text-[11px] text-slate-500">
                                <Phone className="h-3 w-3 text-slate-400 shrink-0" />
                                {cust.phone}
                              </p>
                            </div>
                          </td>

                          {/* Location */}
                          <td className="px-4 py-3.5 text-slate-700">
                            <p className="font-semibold text-xs">
                              {cust.city}
                            </p>

                            <p className="text-[10px] text-slate-400">
                              {cust.state}
                            </p>
                          </td>

                          {/* Orders */}
                          <td className="px-4 py-3.5 text-center font-bold text-slate-800">
                            {cust.orders}
                          </td>

                          {/* Total */}
                          <td className="px-4 py-3.5 font-bold text-slate-900 whitespace-nowrap">
                            ₹
                            {cust.totalSpent.toLocaleString(
                              "en-IN"
                            )}
                          </td>

                          {/* Status */}
                          <td className="px-4 py-3.5">
                            <span
                              className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                cust.status ===
                                "Active"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : "bg-red-100 text-red-700"
                              }`}
                            >
                              {cust.status}
                            </span>
                          </td>

                          {/* Joined */}
                          <td className="px-4 py-3.5 text-slate-500 text-[11px] whitespace-nowrap">
                            {cust.joinedOn}
                          </td>

                          {/* Actions */}
                          <td className="px-4 py-3.5">
                            <div className="flex items-center justify-center gap-1">
                              <button
                                type="button"
                                className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 transition"
                                title="View"
                              >
                                <Eye className="h-4 w-4" />
                              </button>

                              <button
                                type="button"
                                className="p-1.5 rounded-lg text-slate-400 hover:text-blue-700 hover:bg-blue-50 transition"
                                title="Edit"
                              >
                                <Pencil className="h-4 w-4" />
                              </button>

                              <button
                                type="button"
                                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
                                title="More"
                              >
                                <MoreVertical className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    }
                  )}
              </tbody>
            </table>
          </div>

          {/* =====================================
              PAGINATION
          ====================================== */}

          {!loading &&
            filteredCustomers.length > 0 && (
              <div className="px-4 py-3.5 border-t border-slate-200/80 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">

                <p className="text-center sm:text-left">
                  Showing{" "}
                  {startIndex + 1} to{" "}
                  {Math.min(
                    startIndex +
                      PAGE_SIZE,
                    filteredCustomers.length
                  )}{" "}
                  of{" "}
                  {filteredCustomers.length}{" "}
                  customers
                </p>

                <div className="flex items-center gap-1">

                  <Button
                    variant="outline"
                    size="icon"
                    disabled={
                      currentPage === 1
                    }
                    onClick={() =>
                      setCurrentPage(
                        (page) =>
                          Math.max(
                            1,
                            page - 1
                          )
                      )
                    }
                    className="h-8 w-8 rounded-lg border-slate-200 p-0"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  {Array.from(
                    {
                      length: Math.min(
                        totalPages,
                        5
                      ),
                    },
                    (_, index) =>
                      index + 1
                  ).map((page) => (
                    <Button
                      key={page}
                      variant="outline"
                      onClick={() =>
                        setCurrentPage(
                          page
                        )
                      }
                      className={`h-8 w-8 rounded-lg p-0 text-xs font-bold ${
                        currentPage === page
                          ? "bg-[#0f542c] text-white hover:bg-[#0c4323] border-[#0f542c]"
                          : "border-slate-200 text-slate-700"
                      }`}
                    >
                      {page}
                    </Button>
                  ))}

                  <Button
                    variant="outline"
                    size="icon"
                    disabled={
                      currentPage >=
                      totalPages
                    }
                    onClick={() =>
                      setCurrentPage(
                        (page) =>
                          Math.min(
                            totalPages,
                            page + 1
                          )
                      )
                    }
                    className="h-8 w-8 rounded-lg border-slate-200 p-0"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>

                </div>
              </div>
            )}
        </div>

        {/* =====================================
            FOOTER
        ====================================== */}

        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 pt-4 border-t border-slate-200/60">
          <p className="text-center sm:text-left">
            © 2024 Patil Krushi Seva Kendra.
            All rights reserved.
          </p>

          <p className="flex items-center gap-1 mt-1 sm:mt-0">
            Made with{" "}
            <span className="text-red-500">
              ❤️
            </span>{" "}
            for farmers
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}