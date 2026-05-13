import { createClient } from "@supabase/supabase-js";
import { getSetupError } from "@/lib/env";
import type { SurveyResponse } from "@/lib/types";

function formatSupabaseError(error: unknown): Error {
  if (error instanceof Error) return error;
  if (error && typeof error === "object") {
    const record = error as Record<string, unknown>;
    const message = [record.message, record.details, record.hint, record.code].filter(Boolean).join(" | ");
    return new Error(message || JSON.stringify(error));
  }
  return new Error(String(error));
}

function getSupabaseUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL!.replace(/\/rest\/v1\/?$/, "").replace(/\/$/, "");
}

export function getSupabaseAdmin() {
  const setupError = getSetupError();
  if (setupError) {
    throw new Error(setupError);
  }

  return createClient(getSupabaseUrl(), process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}

export type ResponseFilters = {
  search?: string;
  businessModel?: string;
  from?: string;
  to?: string;
};

export async function insertSurveyResponse(payload: Omit<SurveyResponse, "id" | "created_at" | "updated_at" | "status">) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("survey_responses")
    .insert({
      ...payload,
      status: "new"
    })
    .select("id")
    .single();

  if (error) throw formatSupabaseError(error);
  return data as { id: string };
}

export async function listSurveyResponses(filters: ResponseFilters = {}) {
  const supabase = getSupabaseAdmin();
  let query = supabase.from("survey_responses").select("*").order("created_at", { ascending: false });

  if (filters.search) {
    const term = filters.search.replaceAll("%", "").trim();
    if (term) query = query.or(`company_name.ilike.%${term}%,contact_name.ilike.%${term}%`);
  }

  if (filters.businessModel) {
    query = query.contains("business_model", [filters.businessModel]);
  }

  if (filters.from) {
    query = query.gte("created_at", `${filters.from}T00:00:00.000Z`);
  }

  if (filters.to) {
    query = query.lte("created_at", `${filters.to}T23:59:59.999Z`);
  }

  const { data, error } = await query;
  if (error) throw formatSupabaseError(error);
  return (data ?? []) as SurveyResponse[];
}

export async function getSurveyResponse(id: string) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from("survey_responses").select("*").eq("id", id).single();

  if (error) throw formatSupabaseError(error);
  return data as SurveyResponse;
}
