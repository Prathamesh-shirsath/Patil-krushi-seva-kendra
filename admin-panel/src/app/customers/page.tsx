"use client";

import { useState } from "react";
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
  TrendingUp,
  TrendingDown,
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

const MOCK_CUSTOMERS: Customer[] = [
  {
    id: "1",
    code: "CUS1245",
    name: "Ramesh Patil",
    email: "rameshpatil@gmail.com",
    phone: "9765 432 109",
    city: "Kolhapur",
    state: "Maharashtra",
    orders: 12,
    totalSpent: 24560,
    status: "Active",
    joinedOn: "May 18, 2024 10:30 AM",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "2",
    code: "CUS1244",
    name: "Suresh Jadhav",
    email: "sureshjadhav@gmail.com",
    phone: "9823 654 321",
    city: "Pune",
    state: "Maharashtra",
    orders: 8,
    totalSpent: 11230,
    status: "Active",
    joinedOn: "May 18, 2024 09:15 AM",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "3",
    code: "CUS1243",
    name: "Anita Deshmukh",
    email: "anitadeshmukh@gmail.com",
    phone: "9890 112 233",
    city: "Satara",
    state: "Maharashtra",
    orders: 15,
    totalSpent: 32480,
    status: "Active",
    joinedOn: "May 17, 2024 06:45 PM",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "4",
    code: "CUS1242",
    name: "Mahesh More",
    email: "maheshmore@gmail.com",
    phone: "9730 789 123",
    city: "Nashik",
    state: "Maharashtra",
    orders: 5,
    totalSpent: 6730,
    status: "Active",
    joinedOn: "May 17, 2024 03:10 PM",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "5",
    code: "CUS1241",
    name: "Vijay Kumbhar",
    email: "vijaykumbhar@gmail.com",
    phone: "9845 678 910",
    city: "Sangli",
    state: "Maharashtra",
    orders: 18,
    totalSpent: 41950,
    status: "Active",
    joinedOn: "May 16, 2024 11:05 AM",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "6",
    code: "CUS1240",
    name: "Sunil Chavan",
    email: "sunilchavan@gmail.com",
    phone: "9767 654 321",
    city: "Solapur",
    state: "Maharashtra",
    orders: 7,
    totalSpent: 9850,
    status: "Inactive",
    joinedOn: "May 16, 2024 09:50 AM",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "7",
    code: "CUS1239",
    name: "Priyanka Pawar",
    email: "priyankapawar@gmail.com",
    phone: "9833 221 445",
    city: "Nagpur",
    state: "Maharashtra",
    orders: 6,
    totalSpent: 8120,
    status: "Active",
    joinedOn: "May 15, 2024 07:30 PM",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "8",
    code: "CUS1238",
    name: "Kiran Gaikwad",
    email: "kirangaikwad@gmail.com",
    phone: "9876 543 210",
    city: "Aurangabad",
    state: "Maharashtra",
    orders: 10,
    totalSpent: 15300,
    status: "Active",
    joinedOn: "May 15, 2024 04:10 PM",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80",
  },
];

export default function CustomersPage() {
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedCity, setSelectedCity] = useState("All Cities");
  const [selectedState, setSelectedState] = useState("All States");
  const [selectedJoined, setSelectedJoined] = useState("Joined: All Time");
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredCustomers = MOCK_CUSTOMERS.filter((cust) => {
    const matchesSearch =
      cust.name.toLowerCase().includes(search.toLowerCase()) ||
      cust.email.toLowerCase().includes(search.toLowerCase()) ||
      cust.phone.includes(search) ||
      cust.code.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      selectedStatus === "All Status" || cust.status === selectedStatus;

    const matchesCity =
      selectedCity === "All Cities" || cust.city === selectedCity;

    const matchesState =
      selectedState === "All States" || cust.state === selectedState;

    return matchesSearch && matchesStatus && matchesCity && matchesState;
  });

  const toggleSelectAll = () => {
    if (selectedRows.length === filteredCustomers.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredCustomers.map((c) => c.id));
    }
  };

  const toggleSelectRow = (id: string) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((item) => item !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleResetFilters = () => {
    setSearch("");
    setSelectedStatus("All Status");
    setSelectedCity("All Cities");
    setSelectedState("All States");
    setSelectedJoined("Joined: All Time");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Customers</h1>
            <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
              <span>Home</span>
              <span>&gt;</span>
              <span className="font-medium text-slate-700">Customers</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="outline" className="h-10 rounded-xl border-slate-200 bg-white text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50">
              <Download className="mr-2 h-4 w-4 text-slate-500" />
              Export
              <ChevronDown className="ml-2 h-3.5 w-3.5 text-slate-400" />
            </Button>

            <Button className="h-10 rounded-xl bg-[#0f542c] hover:bg-[#0c4323] text-xs font-semibold text-white shadow-sm">
              <Plus className="mr-1.5 h-4 w-4" />
              Add Customer
            </Button>
          </div>
        </div>

        {/* 5 Metrics Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
          {/* Card 1: Total Customers */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <Users className="h-5 w-5" />
              </div>
              <p className="text-[11px] font-medium text-emerald-700 flex items-center gap-1 bg-emerald-50 px-2 py-0.5 rounded-full">
                <TrendingUp className="h-3 w-3" />
                15.8%
              </p>
            </div>
            <div className="mt-3">
              <p className="text-xs font-medium text-slate-500">Total Customers</p>
              <p className="text-2xl font-bold text-slate-900 mt-0.5">1,245</p>
              <p className="text-[11px] text-slate-400 mt-1">vs last week</p>
            </div>
          </div>

          {/* Card 2: New Customers */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-50 text-purple-700">
                <UserPlus className="h-5 w-5" />
              </div>
              <p className="text-[11px] font-medium text-purple-700 flex items-center gap-1 bg-purple-50 px-2 py-0.5 rounded-full">
                <TrendingUp className="h-3 w-3" />
                12.4%
              </p>
            </div>
            <div className="mt-3">
              <p className="text-xs font-medium text-slate-500">New Customers</p>
              <p className="text-2xl font-bold text-slate-900 mt-0.5">156</p>
              <p className="text-[11px] text-slate-400 mt-1">vs last week</p>
            </div>
          </div>

          {/* Card 3: Repeat Customers */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <p className="text-[11px] font-medium text-blue-700 flex items-center gap-1 bg-blue-50 px-2 py-0.5 rounded-full">
                <TrendingUp className="h-3 w-3" />
                10.2%
              </p>
            </div>
            <div className="mt-3">
              <p className="text-xs font-medium text-slate-500">Repeat Customers</p>
              <p className="text-2xl font-bold text-slate-900 mt-0.5">432</p>
              <p className="text-[11px] text-slate-400 mt-1">vs last week</p>
            </div>
          </div>

          {/* Card 4: Active Customers */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
                <Wallet className="h-5 w-5" />
              </div>
              <p className="text-[11px] font-medium text-amber-700 flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-full">
                <TrendingUp className="h-3 w-3" />
                14.6%
              </p>
            </div>
            <div className="mt-3">
              <p className="text-xs font-medium text-slate-500">Active Customers</p>
              <p className="text-2xl font-bold text-slate-900 mt-0.5">1,102</p>
              <p className="text-[11px] text-slate-400 mt-1">vs last week</p>
            </div>
          </div>

          {/* Card 5: Inactive Customers */}
          <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <UserX className="h-5 w-5" />
              </div>
              <p className="text-[11px] font-medium text-red-600 flex items-center gap-1 bg-red-50 px-2 py-0.5 rounded-full">
                <TrendingDown className="h-3 w-3" />
                4.3%
              </p>
            </div>
            <div className="mt-3">
              <p className="text-xs font-medium text-slate-500">Inactive Customers</p>
              <p className="text-2xl font-bold text-slate-900 mt-0.5">143</p>
              <p className="text-[11px] text-slate-400 mt-1">vs last week</p>
            </div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-2xs flex flex-wrap items-center justify-between gap-3">
          {/* Search bar */}
          <div className="relative flex-1 min-w-[200px] w-full sm:w-auto max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search by name, email or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 pl-9 rounded-xl border-slate-200 bg-slate-50/50 text-xs focus-visible:bg-white focus-visible:ring-emerald-600"
            />
          </div>

          {/* Dropdown Filters */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 w-full sm:w-auto">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="h-10 rounded-xl border border-slate-200 bg-slate-50/50 px-3 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              <option value="All Status">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="h-10 rounded-xl border border-slate-200 bg-slate-50/50 px-3 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              <option value="All Cities">All Cities</option>
              <option value="Kolhapur">Kolhapur</option>
              <option value="Pune">Pune</option>
              <option value="Satara">Satara</option>
              <option value="Nashik">Nashik</option>
              <option value="Sangli">Sangli</option>
              <option value="Solapur">Solapur</option>
              <option value="Nagpur">Nagpur</option>
              <option value="Aurangabad">Aurangabad</option>
            </select>

            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="h-10 rounded-xl border border-slate-200 bg-slate-50/50 px-3 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              <option value="All States">All States</option>
              <option value="Maharashtra">Maharashtra</option>
            </select>

            <select
              value={selectedJoined}
              onChange={(e) => setSelectedJoined(e.target.value)}
              className="h-10 rounded-xl border border-slate-200 bg-slate-50/50 px-3 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              <option value="Joined: All Time">Joined: All Time</option>
              <option value="This Month">This Month</option>
              <option value="Last Month">Last Month</option>
            </select>

            <Button variant="outline" className="h-10 rounded-xl border-slate-200 text-xs font-semibold text-slate-700 px-3">
              <Filter className="mr-1.5 h-3.5 w-3.5 text-slate-500" />
              Filter
            </Button>

            <Button
              variant="ghost"
              onClick={handleResetFilters}
              className="h-10 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 px-3"
            >
              <RotateCcw className="mr-1.5 h-3.5 w-3.5 text-slate-500" />
              Reset
            </Button>
          </div>
        </div>

        {/* Table Container */}
        <div className="rounded-2xl border border-slate-200/80 bg-white shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200/80 bg-slate-50/70 text-slate-600 font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3.5 w-10">
                    <input
                      type="checkbox"
                      checked={selectedRows.length === filteredCustomers.length && filteredCustomers.length > 0}
                      onChange={toggleSelectAll}
                      className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-600 h-4 w-4"
                    />
                  </th>
                  <th className="px-4 py-3.5">Customer</th>
                  <th className="px-4 py-3.5">Contact</th>
                  <th className="px-4 py-3.5">Location</th>
                  <th className="px-4 py-3.5 text-center">Orders</th>
                  <th className="px-4 py-3.5">Total Spent</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-4 py-3.5">Joined On</th>
                  <th className="px-4 py-3.5 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredCustomers.map((cust) => {
                  const isSelected = selectedRows.includes(cust.id);

                  return (
                    <tr
                      key={cust.id}
                      className={`hover:bg-slate-50/70 transition-colors ${
                        isSelected ? "bg-emerald-50/30" : ""
                      }`}
                    >
                      <td className="px-4 py-3.5">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleSelectRow(cust.id)}
                          className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-600 h-4 w-4"
                        />
                      </td>

                      {/* Customer Info */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center gap-3">
                          <img
                            src={cust.avatar}
                            alt={cust.name}
                            className="h-9 w-9 rounded-full object-cover border border-slate-200 shrink-0"
                          />
                          <div>
                            <p className="font-bold text-slate-900 text-xs">{cust.name}</p>
                            <p className="text-[10px] text-slate-400">{cust.code}</p>
                          </div>
                        </div>
                      </td>

                      {/* Contact Info */}
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
                        <p className="font-semibold text-xs">{cust.city},</p>
                        <p className="text-[10px] text-slate-400">{cust.state}</p>
                      </td>

                      {/* Orders */}
                      <td className="px-4 py-3.5 text-center font-bold text-slate-800">
                        {cust.orders}
                      </td>

                      {/* Total Spent */}
                      <td className="px-4 py-3.5 font-bold text-slate-900">
                        ₹{cust.totalSpent.toLocaleString("en-IN")}
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3.5">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold ${
                            cust.status === "Active"
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {cust.status}
                        </span>
                      </td>

                      {/* Joined On */}
                      <td className="px-4 py-3.5 text-slate-500 text-[11px]">
                        {cust.joinedOn}
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3.5">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            type="button"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 transition"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-blue-700 hover:bg-blue-50 transition"
                            title="Edit Customer"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
                            title="More Options"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Table Pagination Footer */}
          <div className="px-4 py-3.5 border-t border-slate-200/80 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <p>Showing 1 to 10 of 1,245 customers</p>

            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="icon"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="h-8 w-8 rounded-lg border-slate-200 p-0"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <Button
                variant={currentPage === 1 ? "default" : "outline"}
                onClick={() => setCurrentPage(1)}
                className={`h-8 w-8 rounded-lg p-0 text-xs font-bold ${
                  currentPage === 1 ? "bg-[#0f542c] text-white" : "border-slate-200 text-slate-700"
                }`}
              >
                1
              </Button>

              <Button
                variant={currentPage === 2 ? "default" : "outline"}
                onClick={() => setCurrentPage(2)}
                className={`h-8 w-8 rounded-lg p-0 text-xs font-bold ${
                  currentPage === 2 ? "bg-[#0f542c] text-white" : "border-slate-200 text-slate-700"
                }`}
              >
                2
              </Button>

              <Button
                variant={currentPage === 3 ? "default" : "outline"}
                onClick={() => setCurrentPage(3)}
                className={`h-8 w-8 rounded-lg p-0 text-xs font-bold ${
                  currentPage === 3 ? "bg-[#0f542c] text-white" : "border-slate-200 text-slate-700"
                }`}
              >
                3
              </Button>

              <span className="px-1 text-slate-400">...</span>

              <Button
                variant="outline"
                onClick={() => setCurrentPage(125)}
                className="h-8 w-8 rounded-lg border-slate-200 p-0 text-xs font-bold text-slate-700"
              >
                125
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage((p) => p + 1)}
                className="h-8 w-8 rounded-lg border-slate-200 p-0"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Page Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 pt-4 border-t border-slate-200/60">
          <p>© 2024 Patil Krushi Seva Kendra. All rights reserved.</p>
          <p className="flex items-center gap-1 mt-1 sm:mt-0">
            Made with <span className="text-red-500">❤️</span> for farmers
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
