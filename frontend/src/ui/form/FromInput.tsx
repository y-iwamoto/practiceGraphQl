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
          type={type}
          placeholder={placeholder}
          {...register(name, registerOptions)}
        />
      </div>
      {error && <p className={styles.errorMessage}>{error.message}</p>}
    </>
  )
}
