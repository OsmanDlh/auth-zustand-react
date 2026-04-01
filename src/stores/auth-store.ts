import Cookies from 'js-cookie'
import { create } from 'zustand'

import { queryClient } from '@/lib/query-client'
import type { AuthUser, LoginResponse } from '@/types/auth.type'

type AuthState = {
  token: string | null
  user: AuthUser | null
  setSession: (token: string, user: AuthUser) => void
  setUser: (user: AuthUser) => void
  logout: () => void
}

const readStoredToken = (): string | null => {
  return Cookies.get('access_token') ?? null
}

const loginResponseToUser = (data: LoginResponse): AuthUser => ({
  id: data.id,
  email: data.email,
  firstName: data.firstName,
  lastName: data.lastName,
  username: data.username,
  image: data.image,
})

const useAuthStore = create<AuthState>((set) => ({
  token: readStoredToken(),
  user: null,

  setSession: (token, user) => {
    Cookies.set('access_token', token, { expires: 7 })
    set({ token, user })
  },

  setUser: (user) => set({ user }),

  logout: () => {
    Cookies.remove('access_token')
    queryClient.clear()
    set({ token: null, user: null })
  },
}))

export { loginResponseToUser, useAuthStore }
