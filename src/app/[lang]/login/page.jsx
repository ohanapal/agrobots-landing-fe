export const dynamic = 'force-dynamic'

import bg from '@/assets/images/pages/auth/signup-hero.png'
import LoginForm from '@/components/pages/auth/LoginForm'
import { Img } from '@/components/ui/img'
import Typography from '@/components/ui/typography'
import { getAuthDict } from '@/utils/i18n/get-dictionary'

export const metadata = {
  title: 'Login | Argobots'
}

export default async function LoginPage({ params: { lang } }) {
  const dict = await getAuthDict(lang)
  const t = dict.login

  return (
    <main className='flex h-screen items-center bg-primary-foreground'>
      <div className='hidden lg:block w-1/2 h-screen p-6'>
        <Img src={bg} alt='Argobots signup' className='w-full h-full object-cover rounded-lg' />
      </div>
      <div className='w-full lg:w-1/2 flex flex-col items-center justify-center text-center text-balance px-5 lg:p-6'>
        <Typography variant='h3' className='font-medium'>
          {t.welcomeBackTitle}
        </Typography>
        <p className='text-text-tartiary mt-2 mb-8'>{t.welcomeBackDescription}</p>
        <LoginForm t={t.form} />
      </div>
    </main>
  )
}
