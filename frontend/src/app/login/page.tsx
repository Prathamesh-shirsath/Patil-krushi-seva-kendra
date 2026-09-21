import { Suspense } from "react";
import PhoneLogin from "@/components/auth/PhoneLogin";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F3]">
      <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-10">
        <Suspense
          fallback={
            <div className="h-7 w-7 animate-spin rounded-full border-2 border-green-700 border-t-transparent" />
          }
        >
          <PhoneLogin />
        </Suspense>
      </div>
    </main>
  );
}