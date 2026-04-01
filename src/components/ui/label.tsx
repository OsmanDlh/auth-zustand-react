import type { LabelHTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

const Label = ({ className, ...props }: LabelHTMLAttributes<HTMLLabelElement>) => {
  return (
    <label
      className={cn(
        'text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className,
      )}
      {...props}
    />
  )
}

export { Label }
