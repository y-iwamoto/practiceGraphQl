import { FieldError, FieldValues, Path, RegisterOptions, UseFormRegister } from "react-hook-form";
import styles from "./FormSelect.module.css";
interface Option {
  value: string;
  label: string;
}

interface FormSelectProps<TFormValues extends FieldValues> {
  label: string;
  name: Path<TFormValues>;
  register: UseFormRegister<TFormValues>;
  options: Option[];
  error?: FieldError;
  placeholder: string;
  registerOptions?: RegisterOptions<TFormValues, Path<TFormValues>>;
}

export const FormSelect = <TFormValues extends FieldValues>({
  label,
  name,
  register,
  options,
  error,
  placeholder,
  registerOptions
}: FormSelectProps<TFormValues>
) => {
  return (
    <>
      <div className={styles.inputWrapper}>
        <label htmlFor={name}>{label}</label>
        <select {...register(name, registerOptions)} id={name}>
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {error && <p className={styles.errorMessage}>{error.message}</p>}
    </>)
}