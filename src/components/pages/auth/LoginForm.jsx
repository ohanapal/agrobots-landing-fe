'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import LLink from '@/components/ui/llink'
import usePush from '@/hooks/usePush'
import { useLoginMutation } from '@/redux/features/authApi'
import { calculateTokenExpiration } from '@/utils/auth/calculateTokenExpiration'
import { getDashboardUrl } from '@/utils/auth/getDashboardUrl'
import { rtkErrorMesage } from '@/utils/error/errorMessage'
import { setCookie } from 'cookies-next'
import { redirect, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function LoginForm({ t }) {
  const params = useSearchParams()
  const email = params.get('email')

  const push = usePush()
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors }
  } = useForm()

  useEffect(() => {
    if (params.has('email')) setValue('email', email)
  }, [email, params, setValue])

  const [login, { isLoading, isSuccess, isError, error, data }] = useLoginMutation()

  const onSubmit = data => {
    const allData = {
      email: data.email.trim().toLowerCase(),
      password: data.password,
      type: 'email'
    }

    login(allData)
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success(t.loginSuccess)

      const {
        user: { accessToken, refreshToken, ...userData }
      } = data

      if (watch('rememberMe')) {
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
        redirect(getDashboardUrl(watch('rememberMe')))
      }
    }
    if (isError) toast.error(rtkErrorMesage(error))
  }, [isSuccess, isError, error, reset, data, push, t, watch])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-sm'>
      <Input
        type='email'
        name='email'
        placeholder={t.emailAddress}
        label={t.email}
        register={register}
        errors={errors}
        showLabel
        required
        labelClassName='text-left'
      />
      <Input
        type='password'
        name='password'
        placeholder='********'
        label={t.password}
        register={register}
        errors={errors}
        showLabel
        required
        labelClassName='text-left'
      />

      <div className='flex flex-wrap items-center justify-between w-full gap-3'>
        <div className='flex items-center gap-x-2'>
          <Checkbox id='remember-me' onCheckedChange={e => setValue('rememberMe', e)} />
          <Label className='text-text' htmlFor='remember-me'>
            {t.rememberMe}
          </Label>
        </div>
        <LLink href='/forgot-password' className='font-medium text-text'>
          <Button variant='link' className='font-medium px-1 text-text-secondary hover:text-sky-600'>
            {t.forgotPassword}
          </Button>
        </LLink>
      </div>

      <Button variant='black' type='submit' className='w-full mt-5' isLoading={isLoading}>
        {t.loginButton}
      </Button>

      <div className='flex flex-wrap items-center justify-center gap-x-1 mt-5'>
        <p className='text-text-tartiary text-sm'>{t.dontHaveAccount}</p>
        <LLink href='/signup' className='font-medium text-text'>
          <Button variant='link' className='font-medium underline px-1 text-text-secondary hover:text-sky-600'>
            {t.signup}
          </Button>
        </LLink>
      </div>
    </form>
  )
}
