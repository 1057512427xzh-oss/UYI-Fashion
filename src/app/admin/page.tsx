import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminTable } from "@/components/admin/AdminTable";
import { LogoutButton } from "@/components/admin/LogoutButton";
import { SetupError } from "@/components/SetupError";
import { hasAdminSession } from "@/lib/auth";
import { getSetupError } from "@/lib/env";
import { listSurveyResponses } from "@/lib/supabase";
import type { SurveyResponse } from "@/lib/types";

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function AdminPage({ searchParams }: PageProps) {
  if (!(await hasAdminSession())) redirect("/admin/login");

  const setupError = getSetupError();
  if (setupError) return <SetupError message={setupError} />;

  const params = (await searchParams) ?? {};
  const filters = {
    search: first(params.search) ?? "",
    businessModel: first(params.businessModel) ?? "",
    from: first(params.from) ?? "",
    to: first(params.to) ?? ""
  };

  let responses: SurveyResponse[] = [];
  let total = 0;
  let dataError = "";

  try {
    const [allResponses, filteredResponses] = await Promise.all([listSurveyResponses(), listSurveyResponses(filters)]);
    total = allResponses.length;
    responses = filteredResponses;
  } catch (error) {
    dataError = error instanceof Error ? error.message : "读取数据失败。";
  }

  return (
    <main className="min-h-screen px-4 py-6 sm:py-10">
      <div className="mx-auto max-w-7xl space-y-5">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-brand">管理后台</p>
            <h1 className="mt-1 text-3xl font-bold text-ink">问卷提交结果</h1>
            <p className="mt-2 text-sm text-muted">共收到 {total} 份问卷，当前显示 {responses.length} 份。</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/api/admin/export" className="btn-primary">
              导出全部 CSV
            </Link>
            <LogoutButton />
          </div>
        </header>

        <form className="card grid gap-3 p-4 md:grid-cols-[1.2fr_1fr_1fr_1fr_auto]">
          <input className="field" name="search" placeholder="搜索企业名称或联系人" defaultValue={filters.search} />
          <select className="field" name="businessModel" defaultValue={filters.businessModel}>
            <option value="">全部业务模式</option>
            {["批发", "零售", "电商销售", "线下门店销售", "给其他品牌代工或供货", "海外采购", "海外销售", "其他"].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <input className="field" type="date" name="from" defaultValue={filters.from} aria-label="开始日期" />
          <input className="field" type="date" name="to" defaultValue={filters.to} aria-label="结束日期" />
          <button className="btn-primary" type="submit">
            筛选
          </button>
        </form>

        {dataError ? <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{dataError}</div> : <AdminTable responses={responses} />}
      </div>
    </main>
  );
}
