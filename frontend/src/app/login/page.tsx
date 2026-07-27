import PhoneLogin from "@/components/auth/PhoneLogin";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-10">
        <PhoneLogin />
      </div>
    </main>
  );
}