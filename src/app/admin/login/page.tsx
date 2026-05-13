import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/LoginForm";
import { hasAdminSession } from "@/lib/auth";

export default async function AdminLoginPage() {
  if (await hasAdminSession()) redirect("/admin");

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <LoginForm />
    </main>
  );
}
