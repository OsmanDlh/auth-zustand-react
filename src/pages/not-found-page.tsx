import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

const NotFoundPage = () => {
  const navigate = useNavigate()

  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="bg-destructive/10 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
            <HiOutlineExclamationCircle className="text-destructive h-8 w-8" />
          </div>
          <CardTitle className="text-6xl font-bold">404</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            La página que buscas no existe o aún no ha sido creada.
          </p>
        </CardContent>
        <CardFooter className="justify-center">
          <Button variant="outline" onClick={() => void navigate('/auth')}>
            Volver al inicio
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default NotFoundPage
