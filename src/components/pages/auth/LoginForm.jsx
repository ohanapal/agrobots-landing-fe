'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import LLink from '@/components/ui/llink'
import usePush from '@/hooks/usePush'
import { useLoginMutation } from '@/redux/features/authApi'
import { rtkErrorMesage } from '@/utils/error/errorMessage'
import { redirect, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { loginActions } from './auth.helpers'

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

  const rememberMe = watch('rememberMe')

  useEffect(() => {
    if (isSuccess) {
      toast.success(t.loginSuccess)
      loginActions(data?.user, push, redirect, rememberMe)
    }

    if (isError) toast.error(rtkErrorMesage(error))
  }, [isSuccess, isError, error, reset, data, push, t, watch, rememberMe])

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
