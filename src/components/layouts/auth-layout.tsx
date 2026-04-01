import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4">
      <Outlet />
    </div>
  )
}

export default AuthLayout
