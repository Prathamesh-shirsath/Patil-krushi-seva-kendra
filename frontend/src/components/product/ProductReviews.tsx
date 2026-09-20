"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/i18n/useLanguage";

type Review = {
  id: string;
  productId: string;
  rating: number;
  comment?: string | null;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    name?: string | null;
    image?: string | null;
  };
};

type ProductReviewsProps = {
  productId: string;
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

export default function ProductReviews({
  productId,
}: ProductReviewsProps) {
  const { t } = useLanguage();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/reviews/${productId}`,
        {
          cache: "no-store",
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message || t.reviews.errorFetch
        );
      }

      setReviews(result?.data ?? []);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : t.reviews.errorFetch
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 0;

    const total = reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );

    return total / reviews.length;
  }, [reviews]);

  const ratingCounts = useMemo(() => {
    return [5, 4, 3, 2, 1].map((star) => ({
      star,
      count: reviews.filter(
        (review) => review.rating === star
      ).length,
    }));
  }, [reviews]);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setMessage("");
    setError("");

    if (rating < 1 || rating > 5) {
      setError(t.reviews.errorSelectRating);
      return;
    }

    if (!comment.trim()) {
      setError(t.reviews.errorWriteReview);
      return;
    }

    try {
      setSubmitting(true);

      const response = await fetch(
        `${API_URL}/reviews`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            productId,
            rating,
            comment: comment.trim(),
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message || t.reviews.errorSubmit
        );
      }

      setMessage(t.reviews.successMessage);
      setRating(0);
      setComment("");

      await fetchReviews();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : t.reviews.errorSubmit
      );
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <section className="mt-12 border-t border-slate-200 pt-10 sm:mt-16 sm:pt-14">
      {/* HEADER */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
            {t.reviews.customerFeedback}
          </span>

          <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
            {t.reviews.title}
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            {t.reviews.subtitle}
          </p>
        </div>

        <span className="text-sm text-slate-500">
          {reviews.length} {reviews.length === 1 ? t.reviews.reviewSingle : t.reviews.reviewPlural}
        </span>
      </div>

      {/* RATING + FORM */}
      <div className="mt-8 grid min-w-0 gap-6 lg:grid-cols-3">
        {/* OVERALL RATING */}
        <div className="min-w-0 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <h3 className="text-lg font-bold text-slate-950">
            {t.reviews.overallRating}
          </h3>

          <div className="mt-5 flex items-center gap-4">
            <div>
              <div className="text-5xl font-bold tracking-tight text-slate-950">
                {averageRating.toFixed(1)}
              </div>

              <div className="mt-1 text-sm text-slate-500">
                {t.reviews.outOf5}
              </div>
            </div>

            <div>
              <div className="text-xl tracking-[2px] text-yellow-500">
                {Array.from({ length: 5 }, (_, index) =>
                  index < Math.round(averageRating)
                    ? "★"
                    : "☆"
                ).join("")}
              </div>

              <p className="mt-1 text-xs text-slate-500">
                {reviews.length} {t.reviews.ratings}
              </p>
            </div>
          </div>

          {/* RATING BREAKDOWN */}
          <div className="mt-7 space-y-3">
            {ratingCounts.map(
              ({ star, count }) => {
                const percentage =
                  reviews.length > 0
                    ? (count / reviews.length) * 100
                    : 0;

                return (
                  <div
                    key={star}
                    className="flex items-center gap-2 text-xs sm:gap-3 sm:text-sm"
                  >
                    <span className="w-7 shrink-0 text-slate-600">
                      {star} ★
                    </span>

                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-green-600"
                        style={{
                          width: `${percentage}%`,
                        }}
                      />
                    </div>

                    <span className="w-8 shrink-0 text-right text-slate-500">
                      {count}
                    </span>
                  </div>
                );
              }
            )}
          </div>

          <div className="mt-7 flex items-center gap-3 rounded-2xl bg-green-50 p-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700">
              ✓
            </div>

            <div>
              <p className="text-sm font-semibold text-green-800">
                {t.reviews.verifiedReviewsTitle}
              </p>

              <p className="text-xs text-green-700">
                {t.reviews.verifiedReviewsDesc}
              </p>
            </div>
          </div>
        </div>

        {/* WRITE REVIEW */}
        <div className="min-w-0 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7 lg:col-span-2">
          <div>
            <h3 className="text-lg font-bold text-slate-950 sm:text-xl">
              {t.reviews.writeReview}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {t.reviews.writeReviewDesc}
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-6"
          >
            {/* RATING */}
            <div>
              <label className="text-sm font-semibold text-slate-700">
                {t.reviews.yourRating}
              </label>

              <div className="mt-2 flex gap-1 text-3xl sm:text-4xl">
                {[1, 2, 3, 4, 5].map(
                  (star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() =>
                        setRating(star)
                      }
                      className={`transition hover:scale-110 ${
                        star <= rating
                          ? "text-yellow-400"
                          : "text-slate-300"
                      }`}
                      aria-label={`Rate ${star} stars`}
                    >
                      {star <= rating
                        ? "★"
                        : "☆"}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* COMMENT */}
            <div className="mt-6">
              <label className="text-sm font-semibold text-slate-700">
                {t.reviews.yourReview}
              </label>

              <textarea
                value={comment}
                onChange={(event) =>
                  setComment(event.target.value)
                }
                maxLength={1000}
                placeholder={t.reviews.reviewPlaceholder}
                className="
                  mt-2
                  min-h-[130px]
                  w-full
                  resize-y
                  rounded-2xl
                  border
                  border-slate-200
                  bg-slate-50
                  p-4
                  text-sm
                  text-slate-900
                  outline-none
                  transition
                  placeholder:text-slate-400
                  focus:border-green-600
                  focus:bg-white
                  focus:ring-4
                  focus:ring-green-100
                "
              />

              <div className="mt-1 text-right text-xs text-slate-400">
                {comment.length}/1000
              </div>
            </div>

            {/* ERROR */}
            {error && (
              <div className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* SUCCESS */}
            {message && (
              <div className="mt-4 rounded-xl bg-green-50 px-4 py-3 text-sm text-green-700">
                {message}
              </div>
            )}

            {/* SUBMIT */}
            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs leading-5 text-slate-500">
                {t.reviews.submitHint}
              </p>

              <button
                type="submit"
                disabled={submitting}
                className="
                  h-11
                  w-full
                  rounded-xl
                  bg-green-700
                  px-6
                  font-semibold
                  text-white
                  transition
                  hover:bg-green-800
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                  sm:w-auto
                "
              >
                {submitting
                  ? t.reviews.submittingButton
                  : t.reviews.submitButton}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* REVIEW LIST */}
      <div className="mt-12">
        <div className="border-b border-slate-200 pb-5">
          <h3 className="text-xl font-bold text-slate-950">
            {t.reviews.title}
            <span className="ml-2 text-sm font-normal text-slate-500">
              ({reviews.length})
            </span>
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            {t.reviews.latestFeedback}
          </p>
        </div>

        {loading ? (
          <div className="mt-6 rounded-2xl border border-slate-200 p-6 text-center text-sm text-slate-500">
            {t.reviews.loading}
          </div>
        ) : reviews.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-slate-300 p-8 text-center">
            <p className="font-semibold text-slate-700">
              {t.reviews.emptyTitle}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              {t.reviews.emptyMessage}
            </p>
          </div>
        ) : (
          <div className="mt-6 space-y-4">
            {reviews.map((review) => {
              const name =
                review.user?.name?.trim() ||
                t.reviews.defaultCustomerName;

              const initials = name
                .split(" ")
                .map((part) => part[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();

              return (
                <article
                  key={review.id}
                  className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6"
                >
                  <div className="flex gap-4">
                    {review.user?.image ? (
                      <img
                        src={review.user.image}
                        alt={name}
                        className="h-11 w-11 shrink-0 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-100 font-bold text-green-700">
                        {initials}
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-slate-900">
                        {name}
                      </h4>

                      <div className="mt-1 flex flex-wrap items-center gap-2">
                        <span className="text-sm tracking-wide text-yellow-500">
                          {Array.from(
                            { length: 5 },
                            (_, index) =>
                              index < review.rating
                                ? "★"
                                : "☆"
                          ).join("")}
                        </span>

                        <span className="text-xs text-slate-400">
                          {review.rating}.0 •{" "}
                          {formatDate(
                            review.createdAt
                          )}
                        </span>
                      </div>

                      {review.comment && (
                        <p className="mt-4 text-sm leading-6 text-slate-600">
                          {review.comment}
                        </p>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
