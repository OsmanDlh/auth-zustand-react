import type { ReactNode } from 'react'
import type { FieldValues, SubmitHandler, UseFormProps, UseFormReturn } from 'react-hook-form'
import { FormProvider, useForm } from 'react-hook-form'

type FormProps<TFormValues extends FieldValues> = {
  id?: string
  className?: string
  onSubmit?: SubmitHandler<TFormValues>
  children: ReactNode
  useFormProps?: UseFormProps<TFormValues>
  formMethods?: UseFormReturn<TFormValues>
}

type FormWithFormMethodsProps<TFormValues extends FieldValues> = {
  id?: string
  className?: string
  onSubmit?: SubmitHandler<TFormValues>
  children: ReactNode
  useFormProps?: UseFormProps<TFormValues>
  formMethods: UseFormReturn<TFormValues>
}

type FormComponentProps<TFormValues extends FieldValues> =
  | FormProps<TFormValues>
  | FormWithFormMethodsProps<TFormValues>

const Form = <TFormValues extends FieldValues = FieldValues>({
  id,
  onSubmit,
  children,
  className,
  formMethods,
  useFormProps,
}: FormComponentProps<TFormValues>): React.ReactElement => {
  const defaultMethods = useForm<TFormValues>(useFormProps ?? {})
  const methods = formMethods ?? defaultMethods

  return (
    <FormProvider {...methods}>
      <form
        id={id}
        className={className}
        onSubmit={
          onSubmit !== undefined ? (e) => void methods.handleSubmit(onSubmit)(e) : undefined
        }
      >
        {children}
      </form>
    </FormProvider>
  )
}

export type { FormComponentProps, FormProps, FormWithFormMethodsProps }

export default Form
