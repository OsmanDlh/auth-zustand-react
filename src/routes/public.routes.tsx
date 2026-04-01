import type { RouteObject } from 'react-router-dom'

import AuthRouteGuard from '@/components/auth/auth-route-guard'
import AuthLayout from '@/components/layouts/auth-layout'
import LoginPage from '@/pages/auth/login-page'
import ResetPasswordPage from '@/pages/auth/reset-password-page'

const publicRoutes: RouteObject[] = [
  {
    path: '/auth',
    element: (
      <AuthRouteGuard variant="guest">
        <AuthLayout />
      </AuthRouteGuard>
    ),
    children: [
      { index: true, element: <LoginPage /> },
      { path: 'reset-password', element: <ResetPasswordPage /> },
    ],
  },
]

export default publicRoutes
