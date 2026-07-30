"use client";

export default function CartSkeleton() {
    return (
        <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, index) => (
                <div
                    key={index}
                    className="animate-pulse rounded-xl border p-4"
                >
                    <div className="flex gap-4">
                        <div className="h-24 w-24 rounded-lg bg-gray-200" />

                        <div className="flex-1 space-y-3">
                            <div className="h-4 w-2/3 rounded bg-gray-200" />
                            <div className="h-4 w-1/3 rounded bg-gray-200" />
                            <div className="h-4 w-24 rounded bg-gray-200" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}