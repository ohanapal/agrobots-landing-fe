'use client'

import { Button } from '@/components/ui/button'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import LLink from '@/components/ui/llink'
import usePush from '@/hooks/usePush'
import { useForgotOTPVerifyMutation } from '@/redux/features/authApi'
import { rtkErrorMesage } from '@/utils/error/errorMessage'
import { REGEXP_ONLY_DIGITS } from 'input-otp'
import { PencilLine } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

export default function ForgotVerifyForm({ t }) {
  const push = usePush()
  const params = useSearchParams()
  const email = params.has('email') && params.get('email')
  const [otp, setOtp] = useState('')

  const [verifyForgotOTP, { isSuccess, isError, error, isLoading, data }] = useForgotOTPVerifyMutation()

  useEffect(() => {
    if (isSuccess) {
      toast.success(t.otpVerifiedSuccess)
      push(`/forgot-password/reset-password?id=${data.user}`)
    }

    if (isError) toast.error(rtkErrorMesage(error))
  }, [isSuccess, isError, error])

  return (
    <div>
      <div className='flex flex-wrap items-center gap-2 mb-10'>
        <p className='font-medium text-text-secondary'>{email}</p>
        <LLink href='/forgot-password' className='text-text-tartiary'>
          <PencilLine className='size-5' />
        </LLink>
      </div>

      <InputOTP pattern={REGEXP_ONLY_DIGITS} value={otp} onChange={value => setOtp(value)} maxLength={4}>
        <InputOTPGroup className='gap-2'>
          <InputOTPSlot index={0} className='!rounded-2xl border border-gray-500 shadow-sm p-7 text-3xl' />
          <InputOTPSlot index={1} className='!rounded-2xl border border-gray-500 shadow-sm p-7 text-3xl' />
          <InputOTPSlot index={2} className='!rounded-2xl border border-gray-500 shadow-sm p-7 text-3xl' />
          <InputOTPSlot index={3} className='!rounded-2xl border border-gray-500 shadow-sm p-7 text-3xl' />
        </InputOTPGroup>
      </InputOTP>

      <Button
        className='w-full max-w-sm mt-5'
        variant='black'
        isLoading={isLoading}
        onClick={() => verifyForgotOTP({ email, code: otp })}
      >
        {t.verifyButton}
      </Button>
    </div>
  )
}
