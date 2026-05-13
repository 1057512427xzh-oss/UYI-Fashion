import { NextResponse } from "next/server";
import { extractSurveyColumns, validateSurveyAnswers } from "@/lib/answers";
import { getSetupError } from "@/lib/env";
import { insertSurveyResponse } from "@/lib/supabase";
import type { Answers } from "@/lib/types";

export async function POST(request: Request) {
  const setupError = getSetupError();
  if (setupError) return NextResponse.json({ success: false, error: setupError }, { status: 500 });

  try {
    const body = (await request.json()) as { answers?: Answers };
    const answers = body.answers ?? {};
    const validationErrors = validateSurveyAnswers(answers);

    if (validationErrors.length) {
      return NextResponse.json({ success: false, error: validationErrors.join(" ") }, { status: 400 });
    }

    const columns = extractSurveyColumns(answers);
    const result = await insertSurveyResponse({
      ...columns,
      answers
    });

    return NextResponse.json({ success: true, id: result.id });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "提交失败，请稍后重试。" },
      { status: 500 }
    );
  }
}
