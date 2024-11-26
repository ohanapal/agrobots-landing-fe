'use client'

import { calculateTokenExpiration } from '@/utils/auth/calculateTokenExpiration'
import { getDashboardUrl } from '@/utils/auth/getDashboardUrl'
import { setCookie } from 'cookies-next'

export const loginActions = (user, push, redirect, rememberMe) => {
  const { accessToken, refreshToken, ...userData } = user
  if (rememberMe) {
    setCookie('refreshToken', refreshToken, { maxAge: calculateTokenExpiration(refreshToken) })
    setCookie('accessToken', accessToken, { maxAge: calculateTokenExpiration(accessToken) })
    setCookie('userData', JSON.stringify(userData), {
      maxAge: calculateTokenExpiration(refreshToken)
    })
  } else {
    setCookie('refreshToken', refreshToken)
    setCookie('accessToken', accessToken)
    setCookie('userData', JSON.stringify(userData))
  }

  const { has_company, company_id, active_subscription, type } = { ...userData }

  if (type === 'company-admin' && active_subscription) {
    push(`/subscribe?package_id=${active_subscription}`)
  } else if (type === 'company-admin' && !has_company && !company_id) {
    push('/add-company-info')
  } else {
    try {
      redirect(getDashboardUrl(rememberMe))
    } catch (error) {
      window.location.href = getDashboardUrl(rememberMe)
    }
  }
}
