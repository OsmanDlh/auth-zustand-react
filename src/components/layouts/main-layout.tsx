import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className="bg-background min-h-screen">
      <Outlet />
    </div>
  )
}

export default MainLayout
