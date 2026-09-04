"use client";

import { useEffect, useMemo, useState } from "react";

import DashboardLayout from "@/components/layout/dashboard-layout";

import {
  ChevronDown,
  Eye,
  Filter,
  MessageSquare,
  Search,
  Star,
  Trash2,
  X,
} from "lucide-react";

type Review = {
  id: string;
  productId: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  updatedAt: string;

  user: {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
  };

  product: {
    id: string;
    name: string;
    slug: string;
    image: string | null;
  };
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

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

function getInitials(name: string | null) {
  if (!name) return "CU";

  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("");
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [ratingFilter, setRatingFilter] =
    useState("All Ratings");

  const [selectedReview, setSelectedReview] =
    useState<Review | null>(null);

  const [deletingId, setDeletingId] =
    useState<string | null>(null);

  // =====================================================
  // FETCH REVIEWS
  // =====================================================

  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/admin/reviews`,
        {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message || "Failed to fetch reviews"
        );
      }

      setReviews(result?.data ?? []);
    } catch (err) {
      console.error("Fetch reviews error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to fetch reviews"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // =====================================================
  // DELETE REVIEW
  // =====================================================

  const handleDelete = async (reviewId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this review?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(reviewId);

      const response = await fetch(
        `${API_URL}/admin/reviews/${reviewId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message || "Failed to delete review"
        );
      }

      setReviews((currentReviews) =>
        currentReviews.filter(
          (review) => review.id !== reviewId
        )
      );

      if (selectedReview?.id === reviewId) {
        setSelectedReview(null);
      }
    } catch (err) {
      console.error("Delete review error:", err);

      alert(
        err instanceof Error
          ? err.message
          : "Failed to delete review"
      );
    } finally {
      setDeletingId(null);
    }
  };

  // =====================================================
  // FILTER REVIEWS
  // =====================================================

  const filteredReviews = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return reviews.filter((review) => {
      const customerName =
        review.user?.name?.toLowerCase() ?? "";

      const customerEmail =
        review.user?.email?.toLowerCase() ?? "";

      const productName =
        review.product?.name?.toLowerCase() ?? "";

      const comment =
        review.comment?.toLowerCase() ?? "";

      const matchesSearch =
        !searchValue ||
        customerName.includes(searchValue) ||
        customerEmail.includes(searchValue) ||
        productName.includes(searchValue) ||
        comment.includes(searchValue);

      const matchesRating =
        ratingFilter === "All Ratings" ||
        review.rating === Number(ratingFilter);

      return matchesSearch && matchesRating;
    });
  }, [reviews, search, ratingFilter]);

  // =====================================================
  // STATISTICS
  // =====================================================

  const totalReviews = reviews.length;

  const averageRating =
    totalReviews > 0
      ? reviews.reduce(
          (sum, review) => sum + review.rating,
          0
        ) / totalReviews
      : 0;

  const ratingCounts = {
    5: reviews.filter((review) => review.rating === 5)
      .length,

    4: reviews.filter((review) => review.rating === 4)
      .length,

    3: reviews.filter((review) => review.rating === 3)
      .length,

    2: reviews.filter((review) => review.rating === 2)
      .length,

    1: reviews.filter((review) => review.rating === 1)
      .length,
  };

  const positiveReviews =
    ratingCounts[4] + ratingCounts[5];

  const positivePercentage =
    totalReviews > 0
      ? Math.round(
          (positiveReviews / totalReviews) * 100
        )
      : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map(
    (rating) => {
      const count =
        ratingCounts[
          rating as keyof typeof ratingCounts
        ];

      const percentage =
        totalReviews > 0
          ? Math.round((count / totalReviews) * 100)
          : 0;

      return {
        rating,
        count,
        percentage,
      };
    }
  );

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-slate-50/60">
        <div className="space-y-7">

          {/* =====================================================
              HEADER
          ===================================================== */}

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
                Manage customer ratings and product reviews.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-2xl border border-emerald-100 bg-white px-4 py-3 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
                <MessageSquare className="h-5 w-5 text-emerald-600" />
              </div>

              <div>
                <p className="text-xs text-slate-500">
                  Total Reviews
                </p>

                <p className="text-lg font-bold text-slate-900">
                  {totalReviews}
                </p>
              </div>
            </div>
          </div>

          {/* =====================================================
              ERROR
          ===================================================== */}

          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* =====================================================
              STATISTICS
          ===================================================== */}

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">

            {/* Average Rating */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    Average Rating
                  </p>

                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-3xl font-bold text-slate-900">
                      {averageRating.toFixed(1)}
                    </span>

                    <RatingStars
                      rating={Math.round(averageRating)}
                    />
                  </div>

                  <p className="mt-2 text-xs text-emerald-600">
                    Based on {totalReviews} reviews
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50">
                  <Star className="h-6 w-6 fill-amber-400 text-amber-400" />
                </div>
              </div>
            </div>

            {/* Positive Reviews */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    Positive Reviews
                  </p>

                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {positivePercentage}%
                  </p>

                  <p className="mt-2 text-xs text-emerald-600">
                    4★ and 5★ ratings
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50">
                  <Star className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
            </div>

            {/* Total */}

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">
                    Reviews Available
                  </p>

                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {reviews.length}
                  </p>

                  <p className="mt-2 text-xs text-slate-500">
                    Loaded from database
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50">
                  <MessageSquare className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>
          </div>

          {/* =====================================================
              RATING OVERVIEW
          ===================================================== */}

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-6">
              <h2 className="text-lg font-bold text-slate-900">
                Rating Overview
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Actual customer rating distribution.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-5">

              {ratingDistribution.map((item) => (
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
                      style={{
                        width: `${item.percentage}%`,
                      }}
                    />
                  </div>

                  <p className="mt-2 text-xs text-slate-500">
                    {item.percentage}% reviews
                  </p>
                </div>
              ))}

            </div>
          </div>

          {/* =====================================================
              REVIEWS TABLE
          ===================================================== */}

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

            {/* Toolbar */}

            <div className="border-b border-slate-200 p-5">

              <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Customer Reviews
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Showing {filteredReviews.length} of{" "}
                    {reviews.length} reviews.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">

                  {/* Search */}

                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                    <input
                      value={search}
                      onChange={(e) =>
                        setSearch(e.target.value)
                      }
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

                      <option value="5">
                        5 Stars
                      </option>

                      <option value="4">
                        4 Stars
                      </option>

                      <option value="3">
                        3 Stars
                      </option>

                      <option value="2">
                        2 Stars
                      </option>

                      <option value="1">
                        1 Star
                      </option>
                    </select>

                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  </div>

                </div>
              </div>
            </div>

            {/* =====================================================
                LOADING
            ===================================================== */}

            {loading && (
              <div className="px-6 py-20 text-center">
                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-500" />

                <p className="mt-4 text-sm text-slate-500">
                  Loading reviews...
                </p>
              </div>
            )}

            {/* =====================================================
                DESKTOP TABLE
            ===================================================== */}

            {!loading && (
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

                        {/* Customer */}

                        <td className="px-6 py-5">

                          <div className="flex items-center gap-3">

                            {review.user?.image ? (
                              <img
                                src={review.user.image}
                                alt={
                                  review.user.name ??
                                  "Customer"
                                }
                                className="h-10 w-10 rounded-full object-cover"
                              />
                            ) : (
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-green-700 text-xs font-bold text-white">
                                {getInitials(
                                  review.user?.name
                                )}
                              </div>
                            )}

                            <div>
                              <p className="font-semibold text-slate-800">
                                {review.user?.name ??
                                  "Customer"}
                              </p>

                              <p className="mt-0.5 text-xs text-slate-400">
                                {formatDate(
                                  review.createdAt
                                )}
                              </p>
                            </div>

                          </div>

                        </td>

                        {/* Product */}

                        <td className="px-6 py-5">
                          <p className="max-w-[200px] truncate text-sm font-semibold text-slate-700">
                            {review.product?.name ??
                              "Product"}
                          </p>
                        </td>

                        {/* Rating */}

                        <td className="px-6 py-5">
                          <RatingStars
                            rating={review.rating}
                          />

                          <p className="mt-1 text-xs text-slate-400">
                            {review.rating}.0 / 5
                          </p>
                        </td>

                        {/* Review */}

                        <td className="max-w-[350px] px-6 py-5">

                          <p className="line-clamp-3 text-sm leading-6 text-slate-500">
                            {review.comment ||
                              "No comment provided."}
                          </p>

                        </td>

                        {/* Actions */}

                        <td className="px-6 py-5">

                          <div className="flex items-center justify-end gap-2">

                            <button
                              onClick={() =>
                                setSelectedReview(
                                  review
                                )
                              }
                              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-600"
                              title="View review"
                            >
                              <Eye className="h-4 w-4" />
                            </button>

                            <button
                              onClick={() =>
                                handleDelete(
                                  review.id
                                )
                              }
                              disabled={
                                deletingId ===
                                review.id
                              }
                              className="flex h-9 w-9 items-center justify-center rounded-xl border border-red-200 bg-red-50 text-red-500 transition hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                              title="Delete review"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>

                          </div>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>
              </div>
            )}

            {/* =====================================================
                MOBILE
            ===================================================== */}

            {!loading && (
              <div className="divide-y divide-slate-100 md:hidden">

                {filteredReviews.map((review) => (

                  <div
                    key={review.id}
                    className="space-y-4 p-5"
                  >

                    <div className="flex items-start justify-between gap-3">

                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-xs font-bold text-white">
                          {getInitials(
                            review.user?.name
                          )}
                        </div>

                        <div>
                          <p className="font-semibold text-slate-800">
                            {review.user?.name ??
                              "Customer"}
                          </p>

                          <p className="text-xs text-slate-400">
                            {formatDate(
                              review.createdAt
                            )}
                          </p>
                        </div>

                      </div>

                      <RatingStars
                        rating={review.rating}
                      />

                    </div>

                    <div>

                      <p className="text-sm font-semibold text-slate-800">
                        {review.product?.name ??
                          "Product"}
                      </p>

                      <p className="mt-3 text-sm leading-6 text-slate-500">
                        {review.comment ||
                          "No comment provided."}
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

                      <button
                        onClick={() =>
                          handleDelete(review.id)
                        }
                        disabled={
                          deletingId === review.id
                        }
                        className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500 disabled:opacity-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>

                    </div>

                  </div>

                ))}

              </div>
            )}

            {/* =====================================================
                EMPTY
            ===================================================== */}

            {!loading &&
              filteredReviews.length === 0 && (
                <div className="px-6 py-16 text-center">

                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
                    <Search className="h-6 w-6 text-slate-400" />
                  </div>

                  <h3 className="mt-4 font-semibold text-slate-800">
                    No reviews found
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Try changing your search or rating
                    filter.
                  </p>

                </div>
              )}
          </div>
        </div>

        {/* =====================================================
            REVIEW DETAILS MODAL
        ===================================================== */}

        {selectedReview && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm"
            onClick={() => setSelectedReview(null)}
          >

            <div
              className="w-full max-w-2xl rounded-3xl border border-white/30 bg-white p-7 shadow-2xl"
              onClick={(e) =>
                e.stopPropagation()
              }
            >

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                    Review Details
                  </p>

                  <h2 className="mt-1 text-2xl font-bold text-slate-900">
                    Customer Review
                  </h2>
                </div>

                <button
                  onClick={() =>
                    setSelectedReview(null)
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition hover:bg-slate-200"
                >
                  <X className="h-4 w-4" />
                </button>

              </div>

              <div className="mt-6 rounded-2xl bg-slate-50 p-5">

                <div className="flex items-center gap-3">

                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-green-700 font-bold text-white">
                    {getInitials(
                      selectedReview.user?.name
                    )}
                  </div>

                  <div>
                    <p className="font-bold text-slate-800">
                      {selectedReview.user?.name ??
                        "Customer"}
                    </p>

                    <p className="text-sm text-slate-500">
                      {selectedReview.user?.email ??
                        "No email"}
                    </p>
                  </div>

                </div>

                <div className="mt-5">
                  <RatingStars
                    rating={selectedReview.rating}
                  />
                </div>

                <p className="mt-3 text-sm font-semibold text-slate-800">
                  {selectedReview.product?.name}
                </p>

                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {selectedReview.comment ||
                    "No comment provided."}
                </p>

                <p className="mt-4 text-xs text-slate-400">
                  Submitted on{" "}
                  {formatDate(
                    selectedReview.createdAt
                  )}
                </p>

              </div>

              <div className="mt-6 flex items-center justify-between">

                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Filter className="h-4 w-4" />
                  Rating: {selectedReview.rating}/5
                </div>

                <button
                  onClick={() =>
                    handleDelete(
                      selectedReview.id
                    )
                  }
                  disabled={
                    deletingId ===
                    selectedReview.id
                  }
                  className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-100 disabled:opacity-50"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Review
                </button>

              </div>

            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}