export const dynamic = 'force-dynamic'

import bg from '@/assets/images/pages/auth/signup-hero.png'
import SignupVerifyForm from '@/components/pages/auth/SignupVerifyForm'
import { Img } from '@/components/ui/img'
import Typography from '@/components/ui/typography'
import { getAuthDict } from '@/utils/i18n/get-dictionary'

export const metadata = {
  title: 'Signup Verify | Argobot'
}

export default async function SignupVerifyPage({ params: { lang } }) {
  const dict = await getAuthDict(lang)
  const t = dict.signupVerify

  return (
    <main className='flex h-screen items-center bg-primary-foreground'>
      <div className='hidden lg:block w-1/2 h-screen p-6'>
        <Img src={bg} alt='Argobot signup' className='w-full h-full object-cover rounded-lg' />
      </div>
      <div className='w-full lg:w-1/2 flex flex-col items-center justify-center text-center text-balance px-5 lg:p-6'>
        <Typography variant='h3' className='font-medium'>
          {t.verifyEmailTitle}
        </Typography>
        <p className='text-text-tartiary mt-2 mb-8'>{t.verifyEmailDescription}</p>
        <SignupVerifyForm t={t} />
      </div>
    </main>
  )
}
