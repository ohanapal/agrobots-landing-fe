import { getCookie } from 'cookies-next'

export const getUserId = () => {
  const userData = getCookie('userData')
  const user = userData && JSON.parse(userData)
  return user?._id
}
