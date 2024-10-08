import { getCookie } from 'cookies-next'

export function getDashboardUrl(rememberMe) {
  return `${process.env.NEXT_PUBLIC_DASHBOARD_URL}/check-token?token=${getCookie(
    'refreshToken'
  )}&rememberMe=${rememberMe}`
}
