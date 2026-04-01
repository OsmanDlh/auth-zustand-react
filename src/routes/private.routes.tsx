import type { RouteObject } from 'react-router-dom'

import AuthRouteGuard from '@/components/auth/auth-route-guard'
import PrivateLayout from '@/components/layouts/private-layout'
import DashboardPage from '@/pages/dashboard/dashboard-page'

const privateRoutes: RouteObject[] = [
  {
    path: '/dashboard',
    element: (
      <AuthRouteGuard variant="protected">
        <PrivateLayout />
      </AuthRouteGuard>
    ),
    children: [{ index: true, element: <DashboardPage /> }],
  },
]

export default privateRoutes
