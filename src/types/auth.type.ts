type LoginRequest = {
  username: string
  password: string
}

type LoginResponse = {
  accessToken: string
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  image: string
}

type AuthUser = {
  id: number
  email: string
  firstName: string
  lastName: string
  username: string
  image: string
}

type ResetPasswordRequest = {
  email: string
}

type ResetPasswordResponse = {
  message: string
}

export type { AuthUser, LoginRequest, LoginResponse, ResetPasswordRequest, ResetPasswordResponse }
