import { questionnaireSections, questionById } from "@/lib/questionnaire";
import { formatAnswerValue, getPainRatingRows, isEmptyAnswer } from "@/lib/answers";
import type { AnswerValue, SurveyResponse } from "@/lib/types";

function AnswerBlock({ value }: { value: AnswerValue }) {
  if (Array.isArray(value)) {
    if (value.length === 0) return <p className="text-muted">未填写</p>;
    return (
      <div className="flex flex-wrap gap-2">
        {value.map((item) => (
          <span key={item} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-ink">
            {item}
          </span>
        ))}
      </div>
    );
  }

  if (isEmptyAnswer(value)) return <p className="text-muted">未填写</p>;
  return <p className="whitespace-pre-wrap leading-6 text-ink">{String(value)}</p>;
}

export function ResponseDetail({ response }: { response: SurveyResponse }) {
  const answers = response.answers ?? {};
  const painRows = getPainRatingRows(response);

  return (
    <div className="space-y-5">
      <section className="card p-5">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xs text-muted">企业名称</p>
            <p className="mt-1 font-semibold text-ink">{response.company_name || "未填写"}</p>
          </div>
          <div>
            <p className="text-xs text-muted">联系人</p>
            <p className="mt-1 font-semibold text-ink">{response.contact_name || "未填写"}</p>
          </div>
          <div>
            <p className="text-xs text-muted">电话/邮箱</p>
            <p className="mt-1 font-semibold text-ink">{[response.contact_phone, response.contact_email].filter(Boolean).join(" / ") || "未填写"}</p>
          </div>
          <div>
            <p className="text-xs text-muted">状态</p>
            <p className="mt-1 font-semibold text-ink">{response.status || "new"}</p>
          </div>
        </div>
      </section>

      {painRows.length ? (
        <section className="card p-5">
          <h2 className="text-lg font-bold text-ink">痛点严重程度</h2>
          <div className="mt-4 overflow-x-auto rounded-lg border border-line">
            <table className="min-w-full divide-y divide-line text-sm">
              <thead className="bg-surface">
                <tr>
                  <th className="px-3 py-3 text-left font-semibold">痛点</th>
                  <th className="px-3 py-3 text-left font-semibold">分数</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line bg-white">
                {painRows.map((row) => (
                  <tr key={row.label}>
                    <td className="px-3 py-3">{row.label}</td>
                    <td className="px-3 py-3 font-semibold text-brand">{row.value ?? "未填写"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : null}

      {questionnaireSections.map((section) => (
        <section key={section.id} className="card p-5">
          <h2 className="text-lg font-bold text-ink">{section.title}</h2>
          <div className="mt-4 divide-y divide-line">
            {section.questions.map((question) => {
              const value = answers[question.id];
              const resolvedQuestion = questionById.get(question.id);
              return (
                <div key={question.id} className="grid gap-2 py-4 md:grid-cols-[280px_1fr]">
                  <div>
                    <p className="text-sm font-semibold text-ink">{question.label}</p>
                    {question.description ? <p className="mt-1 text-xs leading-5 text-muted">{question.description}</p> : null}
                  </div>
                  {question.type === "table" ? <p className="whitespace-pre-wrap leading-6 text-ink">{formatAnswerValue(resolvedQuestion, value)}</p> : <AnswerBlock value={value} />}
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
