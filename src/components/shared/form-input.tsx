import { useState } from 'react'
import type { FieldValues, Path } from 'react-hook-form'
import { useFormContext } from 'react-hook-form'
import { HiEye, HiEyeOff } from 'react-icons/hi'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

type FormInputProps<TFormValues extends FieldValues> = {
  name: Path<TFormValues>
  label?: string
  type?: string
  placeholder?: string
  className?: string
}

const FormInput = <TFormValues extends FieldValues>({
  name,
  label,
  type = 'text',
  placeholder,
  className,
}: FormInputProps<TFormValues>) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<TFormValues>()

  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword && showPassword ? 'text' : type
  const error = errors[name]

  return (
    <div className={cn('space-y-2', className)}>
      {label ? <Label htmlFor={name}>{label}</Label> : null}
      <div className="relative">
        <Input
          id={name}
          type={inputType}
          placeholder={placeholder}
          className={cn(error && 'border-destructive focus-visible:ring-destructive')}
          {...register(name)}
        />
        {isPassword ? (
          <button
            type="button"
            className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2"
            onClick={() => setShowPassword((prev) => !prev)}
            tabIndex={-1}
          >
            {showPassword ? <HiEyeOff className="h-4 w-4" /> : <HiEye className="h-4 w-4" />}
          </button>
        ) : null}
      </div>
      {error ? <p className="text-destructive text-xs">{error.message as string}</p> : null}
    </div>
  )
}

export type { FormInputProps }

export default FormInput
