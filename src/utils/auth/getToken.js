import { getCookie } from 'cookies-next'

export const getToken = () => {
  const accessToken = getCookie('accessToken')
  return accessToken
}
