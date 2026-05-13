import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, verifyAdminToken } from "@/lib/auth";
import { getSetupError } from "@/lib/env";
import { getSurveyResponse } from "@/lib/supabase";

type Context = {
  params: Promise<{ id: string }>;
};

export async function GET(request: NextRequest, context: Context) {
  if (!verifyAdminToken(request.cookies.get(ADMIN_COOKIE_NAME)?.value)) {
    return NextResponse.json({ error: "未登录或登录已过期。" }, { status: 401 });
  }

  const setupError = getSetupError();
  if (setupError) return NextResponse.json({ error: setupError }, { status: 500 });

  const { id } = await context.params;
  const response = await getSurveyResponse(id);
  return NextResponse.json({ response });
}
