'use client'

import ImagePreviewer from '@/components/common/ImagePreviewer'
import { Button } from '@/components/ui/button'
import DnDUpload from '@/components/ui/dnd-upload'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import usePush from '@/hooks/usePush'
import { useAddCompanyInfoMutation } from '@/redux/features/companiesApi'
import { rtkErrorMesage } from '@/utils/error/errorMessage'
import { getCookie } from 'cookies-next'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function AddCompanyInfoForm({ t }) {
  const userData = getCookie('userData')
  const userDataParsed = userData && JSON.parse(userData)
  const push = usePush()
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm()

  useEffect(() => {
    setValue('web_url', 'https://')
    setValue('email', userDataParsed?.email)
  }, [userDataParsed, setValue])

  const logoVal = watch('logo')
  const darkLogoVal = watch('logo_dark')

  const [addInfo, { isSuccess, isLoading, isError, error }] = useAddCompanyInfoMutation()

  const onSubmit = data => addInfo(data)

  useEffect(() => {
    if (isSuccess) {
      toast.success(t.success)
      push('/subscribe')
    }

    if (isError) toast.error(rtkErrorMesage(error))
  }, [isSuccess, isError, error, t, push])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='bg-background rounded-2xl p-6 mt-5 flex flex-col w-full'>
      <div className='gap-y-5 flex flex-col md:flex-row gap-x-6'>
        {logoVal ? (
          <ImagePreviewer imgSrc={logoVal} onClick={() => setValue('logo', '')} aspect='square' className='max-w-sm' />
        ) : (
          <DnDUpload label={t.companyLogo} accept='image/*' className='w-full max-w-sm' cb={e => setValue('logo', e)} />
        )}

        {darkLogoVal ? (
          <ImagePreviewer
            imgSrc={darkLogoVal}
            onClick={() => setValue('logo_dark', '')}
            aspect='square'
            className='max-w-sm'
          />
        ) : (
          <DnDUpload
            label={t.companyLogoDark}
            accept='image/*'
            className='w-full max-w-sm'
            cb={e => setValue('logo_dark', e)}
          />
        )}
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 mt-6'>
        <Input
          name='email'
          register={register}
          errors={errors}
          type='email'
          label={t.email}
          placeholder={t.email}
          required
          showLabel
        />
        <Input
          name='name'
          register={register}
          errors={errors}
          label={t.companyName}
          placeholder={t.companyName}
          required
          showLabel
        />
        <Input
          type='url'
          name='web_url'
          register={register}
          errors={errors}
          label={t.companyWebsite}
          placeholder={t.companyWebsite}
          required
          showLabel
        />
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-4'>
        <Textarea
          name='description'
          register={register}
          errors={errors}
          label={t.companyDescription}
          placeholder={t.companyDescription}
          required
          showLabel
          rows={5}
        />
        <Textarea
          name='address'
          register={register}
          errors={errors}
          label={t.companyAddress}
          placeholder={t.companyAddress}
          required
          showLabel
        />
      </div>

      <Button type='submit' variant='black' className='w-full max-w-sm' isLoading={isLoading}>
        {t.save}
      </Button>
    </form>
  )
}
