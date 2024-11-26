'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import LLink from '@/components/ui/llink'
import Typography from '@/components/ui/typography'
import { useSignupMutation } from '@/redux/features/authApi'
import { rtkErrorMesage } from '@/utils/error/errorMessage'
import { MailCheck } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function SignupForm({ t }) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors }
  } = useForm()

  const passwordVal = watch('password')

  const [signup, { isLoading, isSuccess, isError, error }] = useSignupMutation()

  const [showEmailSendComp, setshowEmailSendComp] = useState(false)

  const onSubmit = data => {
    if (!data.checked) return toast.error(t.agreeToTerms)
    if (passwordVal.length < 8) return toast.error('Password must be of 8 characters long!')

    const allData = {
      name: `${data.firstName} ${data.lastName}`,
      email: data.email.trim().toLowerCase(),
      password: data.password
    }

    signup(allData)
  }

  useEffect(() => {
    if (isSuccess) {
      reset()
      setshowEmailSendComp(true)
      toast.success(t.checkEmail)
    }
    if (isError) toast.error(rtkErrorMesage(error))
  }, [isSuccess, isError, error, reset, t])

  if (showEmailSendComp)
    return (
      <div className='flex items-center justify-center mt-10'>
        <div className='flex flex-col items-center justify-center'>
          <MailCheck size={72} strokeWidth={1} className='text-emerald-500' />
          <Typography variant='h3' className='font-medium text-center mt-5'>
            {t.title}
          </Typography>
          <p className='font-medium text-text-tartiary text-lg text-balance mt-5 max-w-md'>{t.description}</p>
        </div>
      </div>
    )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-sm'>
      <div className='flex flex-col min-[500px]:flex-row gap-x-3 mt-4'>
        <Input
          name='firstName'
          placeholder={t.firstName}
          label={t.firstName}
          register={register}
          errors={errors}
          showLabel
          required
          labelClassName='text-left'
        />
        <Input
          name='lastName'
          placeholder={t.lastName}
          label={t.lastName}
          register={register}
          errors={errors}
          showLabel
          required
          labelClassName='text-left'
        />
      </div>

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

      {passwordVal && passwordVal.length < 8 ? (
        <p className='text-xs font-medium text-destructive self-start text-left mb-5'>
          Password must contain at least 8 characters
        </p>
      ) : null}

      <div className='flex items-center gap-x-2'>
        <Checkbox id='terms-check' onCheckedChange={e => setValue('checked', e)} />
        <Label className='text-text-tartiary' htmlFor='terms-check'>
          {t.agreeTo}
          <a href='#' className='font-medium text-text-secondary ml-2'>
            {t.terms}
          </a>
        </Label>
      </div>

      <Button variant='black' type='submit' className='w-full mt-5' isLoading={isLoading}>
        {t.register}
      </Button>

      <div className='flex flex-wrap items-center justify-center gap-x-1 mt-5'>
        <p className='text-text-tartiary text-sm'>{t.alreadyHaveAccount}</p>
        <LLink href='/login' className='font-medium text-text'>
          <Button variant='link' className='font-medium underline px-1 text-text-secondary hover:text-sky-600'>
            {t.login}
          </Button>
        </LLink>
      </div>
    </form>
  )
}
