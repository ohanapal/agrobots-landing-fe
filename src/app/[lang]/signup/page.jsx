import bg from '@/assets/images/pages/auth/signup-hero.png'
import logo from '@/assets/images/ui/logo.png'
import SignupForm from '@/components/pages/auth/SignupForm'
import { Img } from '@/components/ui/img'
import LLink from '@/components/ui/llink'
import Typography from '@/components/ui/typography'
import { getAuthDict } from '@/utils/i18n/get-dictionary'

export const metadata = {
  title: 'Signup | Argobots'
}

export default async function SignupPage({ params: { lang } }) {
  const dict = await getAuthDict(lang)
  const t = dict.signup
  return (
    <main className='flex h-screen items-center bg-primary-foreground'>
      <div className='hidden lg:block w-1/2 h-screen p-6'>
        <Img src={bg} alt='Argobots signup' className='w-full h-full object-cover rounded-lg' />
      </div>
      <div className='w-full lg:w-1/2 flex flex-col items-center justify-center text-center text-balance px-5 lg:p-6'>
        <LLink href='/' className='mb-5'>
          <Img src={logo} alt='Argobots' className='w-32 h-auto' />
        </LLink>
        <Typography variant='h3' className='font-medium'>
          {t.title}
        </Typography>
        <p className='text-text-tartiary mt-2 mb-8'>{t.description}</p>
        <SignupForm t={t.form} />
      </div>
    </main>
  )
}
