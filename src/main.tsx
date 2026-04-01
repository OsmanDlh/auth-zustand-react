import '@/styles/main.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import AppProvider from '@/providers/app-provider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider />
  </StrictMode>,
)
