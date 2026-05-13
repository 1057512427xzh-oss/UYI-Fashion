import Link from "next/link";
import { redirect } from "next/navigation";
import { ResponseDetail } from "@/components/admin/ResponseDetail";
import { SetupError } from "@/components/SetupError";
import { hasAdminSession } from "@/lib/auth";
import { getSetupError } from "@/lib/env";
import { getSurveyResponse } from "@/lib/supabase";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminResponseDetailPage({ params }: PageProps) {
  if (!(await hasAdminSession())) redirect("/admin/login");

  const setupError = getSetupError();
  if (setupError) return <SetupError message={setupError} />;

  const { id } = await params;
  const response = await getSurveyResponse(id);

  return (
    <main className="min-h-screen px-4 py-6 sm:py-10">
      <div className="mx-auto max-w-6xl space-y-5">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Link href="/admin" className="text-sm font-semibold text-brand hover:text-blue-700">
              返回后台
            </Link>
            <h1 className="mt-2 text-3xl font-bold text-ink">{response.company_name || "问卷详情"}</h1>
            <p className="mt-2 text-sm text-muted">提交时间：{new Date(response.created_at).toLocaleString("zh-CN")}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link className="btn-secondary" href={`/api/admin/responses/${response.id}/export?format=json`}>
              导出 JSON
            </Link>
            <Link className="btn-primary" href={`/api/admin/responses/${response.id}/export?format=csv`}>
              导出 CSV
            </Link>
          </div>
        </header>
        <ResponseDetail response={response} />
      </div>
    </main>
  );
}
