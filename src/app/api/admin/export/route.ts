import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, verifyAdminToken } from "@/lib/auth";
import { responsesToCsv } from "@/lib/csv";
import { getSetupError } from "@/lib/env";
import { listSurveyResponses } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  if (!verifyAdminToken(request.cookies.get(ADMIN_COOKIE_NAME)?.value)) {
    return NextResponse.json({ error: "未登录或登录已过期。" }, { status: 401 });
  }

  const setupError = getSetupError();
  if (setupError) return NextResponse.json({ error: setupError }, { status: 500 });

  const responses = await listSurveyResponses();
  const csv = `\uFEFF${responsesToCsv(responses)}`;

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="survey-responses.csv"`
    }
  });
}
