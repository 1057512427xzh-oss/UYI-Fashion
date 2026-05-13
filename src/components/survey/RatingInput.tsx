import { ratingOptions } from "@/lib/questionnaire";

export function RatingInput({ value, onChange }: { value: number | ""; onChange: (value: number) => void }) {
  return (
    <div className="grid grid-cols-5 gap-2">
      {ratingOptions.map((score) => (
        <button
          key={score}
          type="button"
          className={`min-h-11 rounded-lg border px-2 text-sm font-semibold transition ${
            value === score ? "border-brand bg-blue-50 text-brand" : "border-line bg-white text-ink hover:border-slate-300"
          }`}
          onClick={() => onChange(score)}
        >
          {score}
        </button>
      ))}
    </div>
  );
}
