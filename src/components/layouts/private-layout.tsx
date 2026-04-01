import { useEffect } from 'react'
import { HiOutlineLogout } from 'react-icons/hi'
import { Outlet } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { useGetMe } from '@/services/auth.service'
import { useAuthStore } from '@/stores/auth-store'

const PrivateLayout = () => {
  const logout = useAuthStore((s) => s.logout)
  const user = useAuthStore((s) => s.user)
  const setUser = useAuthStore((s) => s.setUser)
  const { data: me } = useGetMe()

  useEffect(() => {
    if (me) setUser(me)
  }, [me, setUser])

  const handleLogout = () => {
    logout()
  }

  const displayName = user?.firstName
    ? `${user.firstName} ${user.lastName}`.trim()
    : user?.username ?? 'Usuario'

  return (
    <div className="bg-background min-h-screen">
      <header className="border-border bg-card sticky top-0 z-10 border-b">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          <h1 className="text-foreground text-lg font-semibold">Mi Aplicación</h1>
          <div className="flex items-center gap-3">
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <img src={user?.image} alt={displayName} className="h-8 w-8 rounded-full" />
              <span>{displayName}</span>
            </div>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <HiOutlineLogout className="mr-1 h-4 w-4" />
              Salir
            </Button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl p-4">
        <Outlet />
      </main>
    </div>
  )
}

export default PrivateLayout
