"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });
      const result = (await response.json()) as { success?: boolean; error?: string };
      if (!response.ok || !result.success) throw new Error(result.error || "登录失败。");
      router.push("/admin");
      router.refresh();
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "登录失败。");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="card w-full max-w-md space-y-5 p-6">
      <div>
        <p className="text-sm font-semibold text-brand">管理员登录</p>
        <h1 className="mt-2 text-2xl font-bold text-ink">查看问卷提交结果</h1>
        <p className="mt-2 text-sm leading-6 text-muted">请输入管理员密码。密码只在服务端校验，不会暴露到前端代码。</p>
      </div>
      <div>
        <label className="mb-2 block text-sm font-semibold text-ink" htmlFor="password">
          管理员密码
        </label>
        <input id="password" className="field" type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" />
      </div>
      {error ? <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}
      <button className="btn-primary w-full" disabled={loading}>
        {loading ? "登录中..." : "登录"}
      </button>
    </form>
  );
}
