import { questionnaireSections } from "@/lib/questionnaire";
import { formatAnswerValue } from "@/lib/answers";
import type { SurveyResponse } from "@/lib/types";

function escapeCsv(value: unknown): string {
  const text = value === null || value === undefined ? "" : String(value);
  return `"${text.replaceAll('"', '""')}"`;
}

export function responsesToCsv(responses: SurveyResponse[]): string {
  const dynamicQuestions = questionnaireSections.flatMap((section) =>
    section.questions.map((question) => ({
      id: question.id,
      header: `${section.title} - ${question.label}`,
      question
    }))
  );

  const headers = [
    "提交ID",
    "企业名称",
    "业务类型",
    "业务模式",
    "联系人",
    "电话",
    "邮箱",
    "员工数",
    "SKU数",
    "月订单量",
    "前三痛点",
    "状态",
    "提交时间",
    ...dynamicQuestions.map((item) => item.header)
  ];

  const rows = responses.map((response) => {
    const answers = response.answers ?? {};
    return [
      response.id,
      response.company_name,
      response.business_type,
      response.business_model?.join("、"),
      response.contact_name,
      response.contact_phone,
      response.contact_email,
      response.employee_count,
      response.sku_count,
      response.monthly_order_count,
      response.top_pain_points?.join("、"),
      response.status,
      response.created_at,
      ...dynamicQuestions.map((item) => formatAnswerValue(item.question, answers[item.id]))
    ];
  });

  return [headers, ...rows].map((row) => row.map(escapeCsv).join(",")).join("\n");
}

export function responseToJson(response: SurveyResponse): string {
  return JSON.stringify(response, null, 2);
}
