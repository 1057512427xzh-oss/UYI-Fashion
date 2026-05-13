"use client";

import { CheckboxGroup } from "@/components/survey/CheckboxGroup";
import { PrioritySelect } from "@/components/survey/PrioritySelect";
import { RatingInput } from "@/components/survey/RatingInput";
import type { Question } from "@/lib/questionnaire";
import type { AnswerValue } from "@/lib/types";

type Props = {
  question: Question;
  value: AnswerValue;
  error?: string;
  onChange: (value: AnswerValue) => void;
};

export function QuestionRenderer({ question, value, error, onChange }: Props) {
  const id = `question-${question.id}`;
  const stringValue = typeof value === "string" || typeof value === "number" ? String(value) : "";

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-semibold text-ink">
        {question.label}
        {question.required ? <span className="ml-1 text-red-500">*</span> : null}
      </label>
      {question.description ? <p className="text-sm leading-6 text-muted">{question.description}</p> : null}

      {question.type === "text" || question.type === "number" ? (
        <input id={id} className="field" type={question.type === "number" ? "number" : "text"} value={stringValue} onChange={(event) => onChange(event.target.value)} />
      ) : null}

      {question.type === "textarea" ? <textarea id={id} className="field min-h-28 resize-y" value={stringValue} onChange={(event) => onChange(event.target.value)} /> : null}

      {question.type === "select" || question.type === "priority" ? (
        <PrioritySelect value={stringValue} onChange={onChange} />
      ) : null}

      {question.type === "radio" ? (
        <div className="flex flex-wrap gap-2">
          {(question.options ?? []).map((option) => (
            <label key={option.value} className="flex min-h-11 cursor-pointer items-center gap-2 rounded-lg border border-line bg-white px-3 py-2 text-sm hover:border-slate-300">
              <input type="radio" name={question.id} checked={value === option.value} onChange={() => onChange(option.value)} />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      ) : null}

      {question.type === "checkbox" ? (
        <CheckboxGroup options={question.options ?? []} value={Array.isArray(value) ? value : []} onChange={onChange} />
      ) : null}

      {question.type === "rating" ? <RatingInput value={typeof value === "number" ? value : value ? Number(value) : ""} onChange={onChange} /> : null}

      {question.type === "table" ? (
        <div className="overflow-x-auto rounded-lg border border-line">
          <table className="min-w-full divide-y divide-line text-sm">
            <thead className="bg-surface">
              <tr>
                <th className="px-3 py-3 text-left font-semibold text-ink">模块</th>
                <th className="px-3 py-3 text-left font-semibold text-ink">优先级</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line bg-white">
              {(question.rows ?? []).map((row) => {
                const tableValue = typeof value === "object" && !Array.isArray(value) && value ? value : {};
                return (
                  <tr key={row.id}>
                    <td className="whitespace-nowrap px-3 py-3 text-ink">{row.label}</td>
                    <td className="min-w-44 px-3 py-3">
                      <PrioritySelect
                        value={String(tableValue[row.id] ?? "")}
                        onChange={(nextValue) => {
                          onChange({ ...tableValue, [row.id]: nextValue });
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : null}

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
