import { questionnaireSections, type Question } from "@/lib/questionnaire";
import type { Answers, AnswerValue, SurveyResponse } from "@/lib/types";

export function isEmptyAnswer(value: AnswerValue): boolean {
  if (value === undefined || value === null) return true;
  if (typeof value === "string") return value.trim() === "";
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === "object") return Object.values(value).every((item) => !item);
  return false;
}

export function getQuestionLabel(questionId: string): string {
  for (const section of questionnaireSections) {
    const question = section.questions.find((item) => item.id === questionId);
    if (question) return question.label;
  }
  return questionId;
}

export function validateSurveyAnswers(answers: Answers): string[] {
  const errors: string[] = [];
  const requiredQuestions = questionnaireSections.flatMap((section) => section.questions).filter((question) => question.required);

  requiredQuestions.forEach((question) => {
    if (isEmptyAnswer(answers[question.id])) {
      errors.push(`请填写：${question.label}`);
    }
  });

  if (isEmptyAnswer(answers.contact_phone) && isEmptyAnswer(answers.contact_email)) {
    errors.push("请至少填写联系电话或联系邮箱。");
  }

  return errors;
}

export function extractSurveyColumns(answers: Answers) {
  const topPainPoints = ["top_pain_point_1", "top_pain_point_2", "top_pain_point_3"]
    .map((key) => String(answers[key] ?? "").trim())
    .filter(Boolean);

  const businessModel = Array.isArray(answers.business_model) ? answers.business_model : [];

  return {
    company_name: String(answers.company_name ?? "").trim(),
    contact_name: String(answers.contact_name ?? "").trim(),
    contact_phone: String(answers.contact_phone ?? "").trim(),
    contact_email: String(answers.contact_email ?? "").trim(),
    business_type: String(answers.business_type ?? "").trim(),
    business_model: businessModel,
    employee_count: String(answers.employee_count ?? "").trim(),
    sku_count: String(answers.sku_count ?? "").trim(),
    monthly_order_count: String(answers.monthly_order_count ?? "").trim(),
    top_pain_points: topPainPoints
  };
}

export function formatAnswerValue(question: Question | undefined, value: AnswerValue): string {
  if (isEmptyAnswer(value)) return "未填写";
  if (Array.isArray(value)) return value.join("、");
  if (value && typeof value === "object") {
    if (question?.type === "table") {
      return Object.entries(value)
        .filter(([, answer]) => answer)
        .map(([rowId, answer]) => {
          const row = question.rows?.find((item) => item.id === rowId);
          return `${row?.label ?? rowId}: ${answer}`;
        })
        .join("；");
    }
    return JSON.stringify(value);
  }
  return String(value);
}

export function getPainRatingRows(response: SurveyResponse) {
  const answers = response.answers ?? {};
  const painSection = questionnaireSections.find((section) => section.id === "section_25");

  return (
    painSection?.questions.map((question) => ({
      label: question.label,
      value: answers[question.id] ? Number(answers[question.id]) : null
    })) ?? []
  );
}
