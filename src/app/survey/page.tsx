import { SetupError } from "@/components/SetupError";
import { SurveyClient } from "@/components/survey/SurveyClient";
import { getSetupError } from "@/lib/env";

export const dynamic = "force-dynamic";

export default function SurveyPage() {
  const setupError = getSetupError();
  if (setupError) return <SetupError message={setupError} />;

  return <SurveyClient />;
}
