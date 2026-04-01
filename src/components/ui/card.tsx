import type { HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'

const Card = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        'border-border bg-card text-card-foreground rounded-xl border shadow-sm',
        className,
      )}
      {...props}
    />
  )
}

const CardHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
}

const CardTitle = ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h3
      className={cn('text-2xl leading-none font-semibold tracking-tight', className)}
      {...props}
    />
  )
}

const CardDescription = ({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) => {
  return <p className={cn('text-muted-foreground text-sm', className)} {...props} />
}

const CardContent = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn('p-6 pt-0', className)} {...props} />
}

const CardFooter = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return <div className={cn('flex items-center p-6 pt-0', className)} {...props} />
}

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle }
