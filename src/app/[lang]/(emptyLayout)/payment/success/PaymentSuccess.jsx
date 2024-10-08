'use client'

import Typography from '@/components/ui/typography'
import usePush from '@/hooks/usePush'
import { logoutActions } from '@/utils/auth/logoutActions'
import { Check, Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export default function PaymentSuccess() {
  const push = usePush()
  const dispatch = useDispatch()
  const { refresh } = useRouter()

  useEffect(() => {
    logoutActions(dispatch, refresh)

    setTimeout(() => {
      push('/login')
    }, 3500)
  }, [dispatch, refresh, push])

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
