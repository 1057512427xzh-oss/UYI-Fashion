"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ProgressBar } from "@/components/survey/ProgressBar";
import { SectionForm } from "@/components/survey/SectionForm";
import { questionnaireSections } from "@/lib/questionnaire";
import { isEmptyAnswer, validateSurveyAnswers } from "@/lib/answers";
import type { Answers, AnswerValue } from "@/lib/types";

const STORAGE_KEY = "clothing_trade_survey_draft";

export function SurveyClient() {
  const router = useRouter();
  const [sectionIndex, setSectionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const section = questionnaireSections[sectionIndex];
  const isLastSection = sectionIndex === questionnaireSections.length - 1;

  useEffect(() => {
    const draft = window.localStorage.getItem(STORAGE_KEY);
    if (!draft) return;

    try {
      setAnswers(JSON.parse(draft));
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    setSavedAt(new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" }));
  }, [answers]);

  const answeredCount = useMemo(() => Object.values(answers).filter((value) => !isEmptyAnswer(value)).length, [answers]);

  function updateAnswer(id: string, value: AnswerValue) {
    setAnswers((current) => ({ ...current, [id]: value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[id];
      return next;
    });
    setSubmitError("");
  }

  function validateCurrentSection() {
    const nextErrors: Record<string, string> = {};
    section.questions.forEach((question) => {
      if (question.required && isEmptyAnswer(answers[question.id])) {
        nextErrors[question.id] = "此项为必填项。";
      }
    });

    if (section.id === "section_1" && isEmptyAnswer(answers.contact_phone) && isEmptyAnswer(answers.contact_email)) {
      nextErrors.contact_phone = "联系电话和联系邮箱至少填写一项。";
      nextErrors.contact_email = "联系电话和联系邮箱至少填写一项。";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function goNext() {
    if (!validateCurrentSection()) return;
    setSectionIndex((current) => Math.min(current + 1, questionnaireSections.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goPrev() {
    setErrors({});
    setSectionIndex((current) => Math.max(current - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function submit() {
    const validationErrors = validateSurveyAnswers(answers);
    if (validationErrors.length) {
      setSubmitError(validationErrors.join(" "));
      setSectionIndex(0);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/survey/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers })
      });

      const result = (await response.json()) as { success?: boolean; error?: string };
      if (!response.ok || !result.success) {
        throw new Error(result.error || "提交失败，请稍后重试。");
      }

      window.localStorage.removeItem(STORAGE_KEY);
      router.push("/success");
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "提交失败，请稍后重试。");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen px-4 py-6 sm:py-10">
      <div className="mx-auto max-w-4xl space-y-5">
        <header className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="rounded-full bg-blue-50 px-3 py-1 text-sm font-semibold text-brand">需求调研</p>
            <p className="text-sm text-muted">
              已填写 {answeredCount} 项 · 已自动保存草稿{savedAt ? ` ${savedAt}` : ""}
            </p>
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-normal text-ink sm:text-3xl">小型服装贸易企业管理系统需求调研问卷</h1>
            <p className="mt-3 text-sm leading-6 text-muted">
              本问卷用于了解贵公司在采购、库存、销售、财务、报表、权限和自动化方面的真实需求。除企业和联系人信息外，大多数问题都可以按实际情况选择性填写。
            </p>
          </div>
          <ProgressBar current={sectionIndex + 1} total={questionnaireSections.length} />
        </header>

        {submitError ? <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm leading-6 text-red-700">{submitError}</div> : null}

        <SectionForm section={section} answers={answers} errors={errors} onAnswer={updateAnswer} />

        <div className="card flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
          <button type="button" className="btn-secondary" onClick={goPrev} disabled={sectionIndex === 0 || isSubmitting}>
            上一部分
          </button>
          <div className="text-center text-sm text-muted">
            {sectionIndex + 1} / {questionnaireSections.length}
          </div>
          {isLastSection ? (
            <button type="button" className="btn-primary" onClick={submit} disabled={isSubmitting}>
              {isSubmitting ? "提交中..." : "提交问卷"}
            </button>
          ) : (
            <button type="button" className="btn-primary" onClick={goNext}>
              下一部分
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
