'use client'

import { getDashboardUrl } from '@/utils/auth/getDashboardUrl'
import { getCookie } from 'cookies-next'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'

export default function RedirectToDashboard() {
  useEffect(() => {
    const accessToken = getCookie('accessToken')
    if (accessToken) {
      redirect(getDashboardUrl(true))
    }
  }, [])

  return <></>
}
