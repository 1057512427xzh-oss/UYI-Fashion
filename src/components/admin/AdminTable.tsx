import Link from "next/link";
import type { SurveyResponse } from "@/lib/types";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
}

export function AdminTable({ responses }: { responses: SurveyResponse[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-line bg-white">
      <table className="min-w-[980px] w-full divide-y divide-line text-sm">
        <thead className="bg-surface">
          <tr>
            {["企业名称", "业务类型", "联系人", "电话/邮箱", "提交日期", "Top 3 痛点", "状态", "操作"].map((header) => (
              <th key={header} className="px-4 py-3 text-left font-semibold text-ink">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {responses.length === 0 ? (
            <tr>
              <td colSpan={8} className="px-4 py-8 text-center text-muted">
                暂无符合条件的提交。
              </td>
            </tr>
          ) : (
            responses.map((response) => (
              <tr key={response.id} className="align-top">
                <td className="px-4 py-3 font-semibold text-ink">{response.company_name || "未填写"}</td>
                <td className="px-4 py-3 text-muted">{response.business_type || "未填写"}</td>
                <td className="px-4 py-3 text-muted">{response.contact_name || "未填写"}</td>
                <td className="px-4 py-3 text-muted">
                  {[response.contact_phone, response.contact_email].filter(Boolean).join(" / ") || "未填写"}
                </td>
                <td className="px-4 py-3 text-muted">{formatDate(response.created_at)}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {(response.top_pain_points?.length ? response.top_pain_points : ["未填写"]).map((item) => (
                      <span key={item} className="rounded-full bg-slate-100 px-2 py-1 text-xs text-ink">
                        {item}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-brand">{response.status || "new"}</span>
                </td>
                <td className="px-4 py-3">
                  <Link className="font-semibold text-brand hover:text-blue-700" href={`/admin/responses/${response.id}`}>
                    查看详情
                  </Link>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
