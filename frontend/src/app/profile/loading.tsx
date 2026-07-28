import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <main className="container mx-auto px-4 py-8">
            <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
                {/* Sidebar Skeleton */}
                <Card className="h-fit p-4">
                    <Skeleton className="mb-6 h-6 w-32" />

                    <div className="space-y-3">
                        <Skeleton className="h-10 w-full rounded-md" />
                        <Skeleton className="h-10 w-full rounded-md" />
                        <Skeleton className="h-10 w-full rounded-md" />
                        <Skeleton className="h-10 w-full rounded-md" />
                        <Skeleton className="mt-6 h-10 w-full rounded-md" />
                    </div>
                </Card>

                {/* Content Skeleton */}
                <Card className="p-6">
                    <Skeleton className="mb-3 h-8 w-56" />
                    <Skeleton className="mb-8 h-4 w-80" />

                    <div className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <Skeleton className="mb-2 h-4 w-24" />
                                <Skeleton className="h-10 w-full" />
                            </div>

                            <div>
                                <Skeleton className="mb-2 h-4 w-24" />
                                <Skeleton className="h-10 w-full" />
                            </div>

                            <div>
                                <Skeleton className="mb-2 h-4 w-24" />
                                <Skeleton className="h-10 w-full" />
                            </div>

                            <div>
                                <Skeleton className="mb-2 h-4 w-24" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                        </div>

                        <Skeleton className="h-10 w-40 rounded-md" />
                    </div>
                </Card>
            </div>
        </main>
    );
}