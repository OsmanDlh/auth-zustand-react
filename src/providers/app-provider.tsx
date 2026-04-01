import { Toaster } from 'react-hot-toast'
import { RouterProvider } from 'react-router-dom'

import QueryProvider from '@/providers/query-provider'
import appRouter from '@/routes/app-routes'

const AppProvider = () => {
  return (
    <QueryProvider>
      <RouterProvider router={appRouter} />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
          },
        }}
      />
    </QueryProvider>
  )
}

export default AppProvider
