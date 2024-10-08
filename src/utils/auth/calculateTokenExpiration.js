import { jwtDecode } from 'jwt-decode'

/**
 * Calculate the token expiration so that token can be saved in cookies with a expiry time
 */
export const calculateTokenExpiration = token => {
  const tokenData = jwtDecode(token)

  const issuedAt = new Date(tokenData?.iat)
  const expiredAt = new Date(tokenData?.exp)

  const timeDifference = expiredAt.getTime() - issuedAt.getTime()
  return timeDifference
}
