"use client";

import { useMemo, useState } from "react";
import DashboardLayout from "@/components/layout/dashboard-layout";
import {
  Check,
  ChevronDown,
  Eye,
  Filter,
  MessageSquare,
  Search,
  Star,
  ThumbsUp,
  X,
} from "lucide-react";

type ReviewStatus = "Approved" | "Pending" | "Rejected";

type Review = {
  id: number;
  customer: string;
  initials: string;
  product: string;
  rating: number;
  title: string;
  review: string;
  date: string;
  status: ReviewStatus;
  helpful: number;
};

const reviews: Review[] = [
  {
    id: 1,
    customer: "Rahul Patil",
    initials: "RP",
    product: "Mahyco Cotton Seeds",
    rating: 5,
    title: "Excellent product",
    review:
      "Very good quality seeds. Germination was excellent and the crop growth is also looking very good.",
    date: "Today, 10:30 AM",
    status: "Approved",
    helpful: 18,
  },
  {
    id: 2,
    customer: "Akash Shinde",
    initials: "AS",
    product: "Fungicide Premium 500ml",
    rating: 4,
    title: "Good results",
    review:
      "Product worked well for my crop. Packaging was also very good. Delivery was on time.",
    date: "Yesterday",
    status: "Pending",
    helpful: 9,
  },
  {
    id: 3,
    customer: "Sanjay Jadhav",
    initials: "SJ",
    product: "Organic Growth Booster",
    rating: 5,
    title: "Highly recommended",
    review:
      "I have used this product for the second time and the results are excellent.",
    date: "12 Aug 2026",
    status: "Approved",
    helpful: 24,
  },
  {
    id: 4,
    customer: "Pravin More",
    initials: "PM",
    product: "Crop Nutrition Plus",
    rating: 3,
    title: "Average product",
    review:
      "The product is okay but I expected better results. Packaging was good.",
    date: "10 Aug 2026",
    status: "Pending",
    helpful: 4,
  },
  {
    id: 5,
    customer: "Vijay Pawar",
    initials: "VP",
    product: "Insecticide 250ml",
    rating: 1,
    title: "Not satisfied",
    review:
      "I did not get the expected results from this product.",
    date: "08 Aug 2026",
    status: "Rejected",
    helpful: 2,
  },
];

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= rating
              ? "fill-amber-400 text-amber-400"
              : "text-slate-200"
          }`}
        />
      ))}
    </div>
  );
}

function StatusBadge({ status }: { status: ReviewStatus }) {
  const styles = {
    Approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Pending: "bg-amber-50 text-amber-700 border-amber-200",
    Rejected: "bg-red-50 text-red-700 border-red-200",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${styles[status]}`}
    >
      <span
        className={`mr-1.5 h-1.5 w-1.5 rounded-full ${
          status === "Approved"
            ? "bg-emerald-500"
            : status === "Pending"
              ? "bg-amber-500"
              : "bg-red-500"
        }`}
      />
      {status}
    </span>
  );
}

export default function ReviewsPage() {
  const [search, setSearch] = useState("");
  const [ratingFilter, setRatingFilter] = useState("All Ratings");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      const matchesSearch =
        review.customer.toLowerCase().includes(search.toLowerCase()) ||
        review.product.toLowerCase().includes(search.toLowerCase()) ||
        review.review.toLowerCase().includes(search.toLowerCase());

      const matchesRating =
        ratingFilter === "All Ratings" ||
        review.rating === Number(ratingFilter);

      const matchesStatus =
        statusFilter === "All Status" ||
        review.status === statusFilter;

      return matchesSearch && matchesRating && matchesStatus;
    });
  }, [search, ratingFilter, statusFilter]);

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-slate-50/60">

        <div className="space-y-7">

          {/* Header */}

          <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-emerald-600">
                <MessageSquare className="h-4 w-4" />
                Customer Feedback
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                Product Reviews
              </h1>

              <p className="mt-1 text-sm text-slate-500">
                Manage customer ratings, feedback and product reviews.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-2xl border border-emerald-100 bg-white px-4 py-3 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                <MessageSquare className="h-5 w-5 text-emerald-600" />
              </div>

              <div>
                <p className="text-xs text-slate-500">Total Reviews</p>
                <p className="text-lg font-bold text-slate-900">
                  1,248
                </p>
              </div>
            </div>
          </div>

          {/* Statistics */}

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    Average Rating
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-3xl font-bold text-slate-900">
                      4.6
                    </span>

                    <RatingStars rating={5} />
                  </div>

                  <p className="mt-2 text-xs text-emerald-600">
                    Excellent customer satisfaction
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50">
                  <Star className="h-6 w-6 fill-amber-400 text-amber-400" />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    Approved
                  </p>

                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    1,176
                  </p>

                  <p className="mt-2 text-xs text-emerald-600">
                    94.2% of all reviews
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50">
                  <Check className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    Pending
                  </p>

                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    48
                  </p>

                  <p className="mt-2 text-xs text-amber-600">
                    Requires moderation
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50">
                  <Filter className="h-6 w-6 text-amber-600" />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    Positive Reviews
                  </p>

                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    91%
                  </p>

                  <p className="mt-2 text-xs text-blue-600">
                    4★ and 5★ ratings
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50">
                  <ThumbsUp className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>

          </div>

          {/* Review Distribution */}

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-6">
              <h2 className="text-lg font-bold text-slate-900">
                Rating Overview
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Customer rating distribution across all products.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-5">

              {[
                { rating: 5, count: 876, percent: 70 },
                { rating: 4, count: 251, percent: 20 },
                { rating: 3, count: 72, percent: 6 },
                { rating: 2, count: 31, percent: 2 },
                { rating: 1, count: 18, percent: 1 },
              ].map((item) => (
                <div
                  key={item.rating}
                  className="rounded-2xl bg-slate-50 p-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-slate-800">
                        {item.rating}
                      </span>
                    </div>

                    <span className="text-xs text-slate-500">
                      {item.count}
                    </span>
                  </div>

                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-emerald-500"
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>

                  <p className="mt-2 text-xs text-slate-500">
                    {item.percent}% reviews
                  </p>
                </div>
              ))}

            </div>
          </div>

          {/* Reviews Table */}

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

            {/* Toolbar */}

            <div className="border-b border-slate-200 p-5">

              <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Customer Reviews
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Review and moderate customer feedback.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">

                  {/* Search */}

                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <input
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search reviews..."
                      className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 sm:w-64"
                    />
                  </div>

                  {/* Rating */}

                  <div className="relative">
                    <select
                      value={ratingFilter}
                      onChange={(e) =>
                        setRatingFilter(e.target.value)
                      }
                      className="h-10 appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-4 pr-10 text-sm font-medium text-slate-700 outline-none focus:border-emerald-500"
                    >
                      <option>All Ratings</option>
                      <option value="5">5 Stars</option>
                      <option value="4">4 Stars</option>
                      <option value="3">3 Stars</option>
                      <option value="2">2 Stars</option>
                      <option value="1">1 Star</option>
                    </select>

                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  </div>

                  {/* Status */}

                  <div className="relative">
                    <select
                      value={statusFilter}
                      onChange={(e) =>
                        setStatusFilter(e.target.value)
                      }
                      className="h-10 appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-4 pr-10 text-sm font-medium text-slate-700 outline-none focus:border-emerald-500"
                    >
                      <option>All Status</option>
                      <option>Approved</option>
                      <option>Pending</option>
                      <option>Rejected</option>
                    </select>

                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  </div>

                </div>

              </div>

            </div>

            {/* Desktop Table */}

            <div className="hidden overflow-x-auto md:block">

              <table className="w-full">

                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/70 text-left">
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                      Customer
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                      Product
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                      Rating
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                      Review
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                      Status
                    </th>

                    <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">

                  {filteredReviews.map((review) => (

                    <tr
                      key={review.id}
                      className="transition hover:bg-emerald-50/30"
                    >

                      <td className="px-6 py-5">

                        <div className="flex items-center gap-3">

                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-green-700 text-xs font-bold text-white shadow-sm">
                            {review.initials}
                          </div>

                          <div>
                            <p className="font-semibold text-slate-800">
                              {review.customer}
                            </p>

                            <p className="mt-0.5 text-xs text-slate-400">
                              {review.date}
                            </p>
                          </div>

                        </div>

                      </td>

                      <td className="px-6 py-5">
                        <p className="max-w-[180px] truncate text-sm font-semibold text-slate-700">
                          {review.product}
                        </p>
                      </td>

                      <td className="px-6 py-5">
                        <RatingStars rating={review.rating} />
                        <p className="mt-1 text-xs text-slate-400">
                          {review.rating}.0 / 5
                        </p>
                      </td>

                      <td className="max-w-[300px] px-6 py-5">
                        <p className="font-semibold text-slate-800">
                          {review.title}
                        </p>

                        <p className="mt-1 line-clamp-2 text-sm leading-5 text-slate-500">
                          {review.review}
                        </p>

                        <p className="mt-2 text-xs text-slate-400">
                          {review.helpful} people found this helpful
                        </p>
                      </td>

                      <td className="px-6 py-5">
                        <StatusBadge status={review.status} />
                      </td>

                      <td className="px-6 py-5">

                        <div className="flex items-center justify-end gap-2">

                          <button
                            onClick={() =>
                              setSelectedReview(review)
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600"
                            title="View review"
                          >
                            <Eye className="h-4 w-4" />
                          </button>

                          {review.status === "Pending" && (
                            <>
                              <button
                                className="flex h-9 w-9 items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-600 transition hover:bg-emerald-600 hover:text-white"
                                title="Approve review"
                              >
                                <Check className="h-4 w-4" />
                              </button>

                              <button
                                className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-red-500 transition hover:bg-red-500 hover:text-white"
                                title="Reject review"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </>
                          )}

                        </div>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

            {/* Mobile Cards */}

            <div className="divide-y divide-slate-100 md:hidden">

              {filteredReviews.map((review) => (

                <div
                  key={review.id}
                  className="space-y-4 p-5"
                >

                  <div className="flex items-start justify-between gap-3">

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">
                        {review.initials}
                      </div>

                      <div>
                        <p className="font-semibold text-slate-800">
                          {review.customer}
                        </p>

                        <p className="text-xs text-slate-400">
                          {review.date}
                        </p>
                      </div>

                    </div>

                    <StatusBadge status={review.status} />

                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      {review.product}
                    </p>

                    <div className="mt-2">
                      <RatingStars rating={review.rating} />
                    </div>

                    <p className="mt-3 font-semibold text-slate-800">
                      {review.title}
                    </p>

                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      {review.review}
                    </p>
                  </div>

                  <div className="flex gap-2">

                    <button
                      onClick={() =>
                        setSelectedReview(review)
                      }
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-600"
                    >
                      <Eye className="h-4 w-4" />
                      View
                    </button>

                    {review.status === "Pending" && (
                      <>
                        <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                          <Check className="h-4 w-4" />
                        </button>

                        <button className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500">
                          <X className="h-4 w-4" />
                        </button>
                      </>
                    )}

                  </div>

                </div>

              ))}

            </div>

            {filteredReviews.length === 0 && (
              <div className="px-6 py-16 text-center">

                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
                  <Search className="h-6 w-6 text-slate-400" />
                </div>

                <h3 className="mt-4 font-semibold text-slate-800">
                  No reviews found
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Try changing your search or filters.
                </p>

              </div>
            )}

          </div>

        </div>

        {/* Review Details Modal */}

        {selectedReview && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
            onClick={() => setSelectedReview(null)}
          >

            <div
              className="w-full max-w-2xl rounded-3xl border border-white/30 bg-white p-7 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                    Review Details
                  </p>

                  <h2 className="mt-1 text-2xl font-bold text-slate-900">
                    {selectedReview.title}
                  </h2>
                </div>

                <button
                  onClick={() => setSelectedReview(null)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition hover:bg-slate-200"
                >
                  <X className="h-4 w-4" />
                </button>

              </div>

              <div className="mt-6 rounded-2xl bg-slate-50 p-5">

                <div className="flex items-center gap-3">

                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-green-700 font-bold text-white">
                    {selectedReview.initials}
                  </div>

                  <div>
                    <p className="font-bold text-slate-800">
                      {selectedReview.customer}
                    </p>

                    <p className="text-sm text-slate-500">
                      {selectedReview.product}
                    </p>
                  </div>

                </div>

                <div className="mt-5">
                  <RatingStars rating={selectedReview.rating} />
                </div>

                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {selectedReview.review}
                </p>

              </div>

              <div className="mt-6 flex items-center justify-between">

                <StatusBadge status={selectedReview.status} />

                <div className="flex gap-2">

                  {selectedReview.status === "Pending" && (
                    <>
                      <button className="rounded-xl bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-100">
                        Reject
                      </button>

                      <button className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-700">
                        Approve Review
                      </button>
                    </>
                  )}

                </div>

              </div>

            </div>

          </div>
        )}

      </div>
    </DashboardLayout>
  );
}