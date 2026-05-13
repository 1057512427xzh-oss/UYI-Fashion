export function SetupError({ message }: { message: string }) {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <section className="card max-w-xl p-6">
        <p className="text-sm font-semibold text-red-600">配置未完成</p>
        <h1 className="mt-2 text-2xl font-bold text-ink">需要先配置 Supabase 环境变量</h1>
        <p className="mt-3 text-sm leading-6 text-muted">{message}</p>
        <p className="mt-4 rounded-lg bg-surface p-3 text-sm text-ink">
          请参考 <span className="font-semibold">.env.example</span> 设置 NEXT_PUBLIC_SUPABASE_URL、SUPABASE_SERVICE_ROLE_KEY 和 ADMIN_PASSWORD。
        </p>
      </section>
    </main>
  );
}
