const getPostAuthRedirectPath = (state: unknown): string => {
  if (!state || typeof state !== 'object' || !('from' in state)) {
    return '/dashboard'
  }
  const raw = (state as { from?: { pathname?: string; search?: string; hash?: string } }).from
  if (!raw?.pathname) {
    return '/dashboard'
  }
  return `${raw.pathname}${raw.search ?? ''}${raw.hash ?? ''}`
}

export { getPostAuthRedirectPath }
