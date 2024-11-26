'use client'

import { loginActions } from '@/components/pages/auth/auth.helpers'
import Typography from '@/components/ui/typography'
import { API_URL } from '@/configs'
import usePush from '@/hooks/usePush'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import { Check, Loader } from 'lucide-react'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'

export default function PaymentSuccess() {
  const push = usePush()

  useEffect(() => {
    //logoutActions(dispatch, refresh)
    // eslint-disable-next-line no-extra-semi
    ;(async () => {
      const refreshToken = getCookie('refreshToken')
      if (!refreshToken) push('/login')
      const refreshResult = await axios.post(`${API_URL}/auth/login`, { type: 'refresh', refreshToken })
      loginActions(refreshResult?.data?.user, push, redirect, true)
    })()
  }, [push])

  return (
    <div className='bg-primary-foreground h-screen flex items-center justify-center px-5'>
      <div className='bg-background py-5 sm:py-6 px-5 sm:px-8 rounded-xl shadow-lg flex flex-col items-center justify-center'>
        <div className='bg-emerald-600 rounded-full p-2'>
          <Check size={80} className='text-white' />
        </div>

        <div className='text-center text-balance space-y-3 mt-6'>
          <Typography variant='h3' className='text-center'>
            Payment Successful!
          </Typography>
          <p className='text-text-secondary font-medium my-2'>Thank you for completing your secure online payment.</p>
          <p className='text-text-tartiary font-medium text-lg flex justify-center items-center gap-x-3 text-center text-balance'>
            Redirecting to the login page soon <Loader className='size-5 animate-spin ' />
          </p>
        </div>
      </div>
    </div>
  )
}
