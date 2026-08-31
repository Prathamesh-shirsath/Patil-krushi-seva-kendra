"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AdminGuardProps {
  children: React.ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/admin-auth/me",
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (!response.ok) {
          router.replace("/login");
          return;
        }

        const data = await response.json();

        if (!data.success || data.user?.role !== "ADMIN") {
          router.replace("/login");
          return;
        }

        setChecking(false);
      } catch (error) {
        console.error("Admin authentication error:", error);
        router.replace("/login");
      }
    };

    checkAdmin();
  }, [router]);

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-sm text-gray-500">
          Checking authentication...
        </div>
      </div>
    );
  }

  return <>{children}</>;
}