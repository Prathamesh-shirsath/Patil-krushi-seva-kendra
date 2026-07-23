"use client";

export default function WishlistSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-40 rounded-xl bg-gray-200"></div>
      <div className="h-40 rounded-xl bg-gray-200"></div>
      <div className="h-40 rounded-xl bg-gray-200"></div>
    </div>
  );
}