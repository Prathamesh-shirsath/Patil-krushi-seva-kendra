import PhoneLogin from "@/components/auth/PhoneLogin";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F3]">
      <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-10">
        <PhoneLogin />
      </div>
    </main>
  );
} 