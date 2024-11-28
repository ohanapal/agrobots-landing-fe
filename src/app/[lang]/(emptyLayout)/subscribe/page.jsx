export const dynamic = 'force-dynamic'

import logo from '@/assets/images/ui/logo.png'
import PricingPlans from '@/components/pages/subscribe/PricingPlans'
import { Img } from '@/components/ui/img'
import LLink from '@/components/ui/llink'
import Typography from '@/components/ui/typography'
import { getSubscribeDict } from '@/utils/i18n/get-dictionary'

export const metadata = {
  title: 'Subscribe | Argobots'
}

export default async function Subscribe({ params: { lang } }) {
  const t = await getSubscribeDict(lang)
  return (
    <main className='container'>
      <div className='flex items-center justify-center mt-10 mb-5'>
        <LLink href='/'>
          <Img src={logo} alt='Argobots' className='w-32 h-auto' />
        </LLink>
      </div>
      <Typography
        variant='h2'
        className='text-balance text-center pb-5 leading-loose text-2xl md:text-3xl lg:text-5xl max-w-full'
      >
        {t.title}
      </Typography>
      <p className='text-text-tartiary text-center max-w-full font-medium text-lg'>{t.description}</p>
      {/* <div className='flex items-center justify-center mt-5'>
        <LLink href='/pricing'>
          <Button size='lg'>{t.comparePlans}</Button>
        </LLink>
      </div> */}

      <PricingPlans />
    </main>
  )
}
