import type { QuestionOption } from "@/lib/questionnaire";

type Props = {
  options: QuestionOption[];
  value: string[];
  onChange: (value: string[]) => void;
};

export function CheckboxGroup({ options, value, onChange }: Props) {
  function toggle(option: string) {
    onChange(value.includes(option) ? value.filter((item) => item !== option) : [...value, option]);
  }

  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {options.map((option) => (
        <label key={option.value} className="flex min-h-11 cursor-pointer items-center gap-2 rounded-lg border border-line bg-white px-3 py-2 text-sm hover:border-slate-300">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-slate-300 text-brand focus:ring-brand"
            checked={value.includes(option.value)}
            onChange={() => toggle(option.value)}
          />
          <span>{option.label}</span>
        </label>
      ))}
    </div>
  );
}
