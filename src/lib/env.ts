export function getSetupError(): string | null {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return "缺少 NEXT_PUBLIC_SUPABASE_URL 环境变量。";
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) return "缺少 SUPABASE_SERVICE_ROLE_KEY 环境变量。";
  return null;
}

export function requireAdminPassword(): string {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    throw new Error("缺少 ADMIN_PASSWORD 环境变量。");
  }
  return password;
}
