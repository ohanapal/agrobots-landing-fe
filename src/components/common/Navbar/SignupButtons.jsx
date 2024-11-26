'use client'

import { Button } from '@/components/ui/button'
import LLink from '@/components/ui/llink'
import { cn } from '@/lib/utils'
import { getCookie } from 'cookies-next'

export default function SignupButtons({ t, className }) {
  const userData = getCookie('userData')
  const userDataParsed = userData && JSON.parse(userData)
  return (
    <div className={cn('flex flex-col items-center justify-center lg:flex-row gap-y-3 gap-x-6', className)}>
      {userData ? (
        <p className='text-sm font-medium'>Hello {userDataParsed?.name}</p>
      ) : (
        <>
          <LLink href='/login' className='text-text-secondary font-medium'>
            {t.login}
          </LLink>
          <LLink href='/signup'>
            <Button>{t.signup}</Button>
          </LLink>
        </>
      )}
    </div>
  )
}
