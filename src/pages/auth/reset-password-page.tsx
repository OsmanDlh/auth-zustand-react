import { HiOutlineMail } from 'react-icons/hi'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { buttonVariants } from '@/components/ui/button-variants'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

const ResetPasswordPage = () => {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="bg-primary/10 mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
          <HiOutlineMail className="text-primary h-6 w-6" />
        </div>
        <CardTitle>Recuperar contraseña</CardTitle>
        <CardDescription>
          Introduce el correo asociado a tu cuenta. Te enviaremos un enlace para restablecer la
          contraseña.
        </CardDescription>
      </CardHeader>
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="reset-email">Correo electrónico</Label>
            <Input
              id="reset-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="tu@correo.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reset-username">Usuario</Label>
            <Input
              id="reset-username"
              name="username"
              type="text"
              autoComplete="username"
              placeholder="Nombre de usuario"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button type="submit" className="w-full">
            Enviar enlace
          </Button>
          <Link
            to="/auth"
            replace
            className={cn(buttonVariants({ variant: 'link', className: 'text-sm' }))}
          >
            Volver al inicio de sesión
          </Link>
        </CardFooter>
      </form>
    </Card>
  )
}

export default ResetPasswordPage
