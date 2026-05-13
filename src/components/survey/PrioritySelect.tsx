import { priorityOptions } from "@/lib/questionnaire";

export function PrioritySelect({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return (
    <select className="field" value={value} onChange={(event) => onChange(event.target.value)}>
      <option value="">请选择优先级</option>
      {priorityOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
