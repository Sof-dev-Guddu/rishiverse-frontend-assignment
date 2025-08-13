import { useFormContext } from "react-hook-form";

export default function InputField({ name, label, type = "text" }: { name: string; label: string; type?: string }) {
  const { register, formState: { errors } } = useFormContext();
  const fieldError = errors as any;
  return (
    <div className="flex flex-col gap-1">
      <label className="font-medium">{label}</label>
      <input
        type={type}
        {...register(name)}
        className="border rounded px-2 py-1"
      />
      {fieldError?.[name] && <span className="text-red-500 text-sm">{fieldError[name]?.message}</span>}
    </div>
  );
}