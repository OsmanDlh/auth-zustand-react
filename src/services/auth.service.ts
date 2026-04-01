import type { UseMutationResult, UseQueryResult } from '@tanstack/react-query'
import { useMutation, useQuery } from '@tanstack/react-query'

import apiClient from '@/lib/api-client'
import { loginResponseToUser, useAuthStore } from '@/stores/auth-store'
import type {
  AuthUser,
  LoginRequest,
  LoginResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from '@/types/auth.type'

const MOCK_DELAY = 1500

const mockDelay = <T>(data: T): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(data), MOCK_DELAY))

const authKeys = {
  all: ['auth'] as const,
  me: () => [...authKeys.all, 'me'] as const,
}

const useGetMe = (): UseQueryResult<AuthUser> => {
  const hasToken = useAuthStore((s) => !!s.token)

  return useQuery({
    queryKey: authKeys.me(),
    queryFn: async (): Promise<AuthUser> => {
      const response = await apiClient.get<AuthUser>('/auth/me')
      return response.data
    },
    enabled: hasToken,
    retry: false,
  })
}

const useLogin = (): UseMutationResult<LoginResponse, Error, LoginRequest> => {
  return useMutation({
    mutationFn: async (data: LoginRequest): Promise<LoginResponse> => {
      const response = await apiClient.post<LoginResponse>('/auth/login', {
        username: data.username,
        password: data.password,
      })
      return response.data
    },
    onSuccess: (data) => {
      useAuthStore.getState().setSession(data.accessToken, loginResponseToUser(data))
    },
  })
}

const useResetPassword = (): UseMutationResult<
  ResetPasswordResponse,
  Error,
  ResetPasswordRequest
> => {
  return useMutation({
    mutationFn: async (data: ResetPasswordRequest): Promise<ResetPasswordResponse> => {
      return mockDelay({
        message: `Se ha enviado un enlace de recuperación a ${data.email}`,
      })
    },
  })
}

export { authKeys, useGetMe, useLogin, useResetPassword }
