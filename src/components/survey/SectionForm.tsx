"use client";

import { QuestionRenderer } from "@/components/survey/QuestionRenderer";
import type { Section } from "@/lib/questionnaire";
import type { Answers, AnswerValue } from "@/lib/types";

type Props = {
  section: Section;
  answers: Answers;
  errors: Record<string, string>;
  onAnswer: (id: string, value: AnswerValue) => void;
};

export function SectionForm({ section, answers, errors, onAnswer }: Props) {
  return (
    <section className="card p-4 sm:p-6">
      <div className="border-b border-line pb-4">
        <p className="text-sm font-semibold text-brand">{section.id.replace("section_", "第 ")} 部分</p>
        <h2 className="mt-1 text-xl font-bold text-ink">{section.title}</h2>
        {section.description ? <p className="mt-2 text-sm leading-6 text-muted">{section.description}</p> : null}
      </div>
      <div className="mt-6 space-y-6">
        {section.questions.map((question) => (
          <QuestionRenderer key={question.id} question={question} value={answers[question.id]} error={errors[question.id]} onChange={(value) => onAnswer(question.id, value)} />
        ))}
      </div>
    </section>
  );
}
