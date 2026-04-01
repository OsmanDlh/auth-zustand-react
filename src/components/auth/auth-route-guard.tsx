import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { useAuthStore } from '@/stores/auth-store'
import { getPostAuthRedirectPath } from '@/utils/auth-navigation'

type AuthRouteGuardProps = {
  variant: 'guest' | 'protected'
  children: ReactNode
}

const AuthRouteGuard = ({ variant, children }: AuthRouteGuardProps) => {
  const token = useAuthStore((s) => s.token)
  const location = useLocation()

  if (variant === 'protected' && !token) {
    return <Navigate to="/auth" state={{ from: location }} replace />
  }

  if (variant === 'guest' && token) {
    return <Navigate to={getPostAuthRedirectPath(location.state)} replace />
  }

  return children
}

export default AuthRouteGuard
