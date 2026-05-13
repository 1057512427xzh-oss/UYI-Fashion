export type AnswerValue = string | number | string[] | Record<string, string> | null | undefined;
export type Answers = Record<string, AnswerValue>;

export type SurveyResponse = {
  id: string;
  company_name: string | null;
  contact_name: string | null;
  contact_phone: string | null;
  contact_email: string | null;
  business_type: string | null;
  business_model: string[] | null;
  employee_count: string | null;
  sku_count: string | null;
  monthly_order_count: string | null;
  top_pain_points: string[] | null;
  answers: Answers | null;
  status: string | null;
  created_at: string;
  updated_at: string | null;
};
