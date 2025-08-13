import { useFormContext } from "react-hook-form";
export default function SelectField({ name, label, options }: { name: string; label: string; options: string[] }) {
  const { register, formState: { errors } } = useFormContext();
  const fieldError = errors as any;
  return (
    <div className="flex flex-col gap-1">
      <label className="font-medium">{label}</label>
      <select {...register(name)} className="border rounded px-2 py-1">
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      {fieldError?.[name] && <span className="text-red-500 text-sm">{fieldError[name]?.message}</span>}
    </div>
  );
}
