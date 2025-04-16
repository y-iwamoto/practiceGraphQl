import { FieldError, FieldValues, Path, RegisterOptions, UseFormRegister } from "react-hook-form"
import styles from "./FormInput.module.css"


type FormInputType = 'text' | 'number' | 'email' | 'password' | 'date' | 'checkbox' | 'radio' | 'select' | 'textarea'

interface FormInputProps<TFormValues extends FieldValues> {
  label: string;
  name: Path<TFormValues>;
  register: UseFormRegister<TFormValues>;
  type: FormInputType;
  error?: FieldError;
  placeholder: string
  registerOptions?: RegisterOptions<TFormValues, Path<TFormValues>>;
}

export const FormInput = <TFormValues extends FieldValues>({
  label,
  name,
  register,
  type = 'text',
  error,
  placeholder,
  registerOptions
}: FormInputProps<TFormValues>
) => {
  return (
    <>
      <div className={styles.inputWrapper}>
        <label htmlFor={name}>{label}</label>
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          {...register(name, registerOptions)}
        />
      </div>
      {error && <p id={`${name}-error`} className={styles.errorMessage}>{error.message}</p>}
    </>
  )
}
