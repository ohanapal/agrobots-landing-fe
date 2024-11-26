import heroImg from '@/assets/images/pages/homepage/header/hero.png'
import logo1 from '@/assets/images/pages/homepage/header/logo1.png'
import logo2 from '@/assets/images/pages/homepage/header/logo2.png'
import logo3 from '@/assets/images/pages/homepage/header/logo3.png'
import logo4 from '@/assets/images/pages/homepage/header/logo4.png'
import patternImg from '@/assets/images/pages/homepage/header/pattern.png'
import TagLine from '@/components/common/TagLine'
import { Button } from '@/components/ui/button'
import { Img } from '@/components/ui/img'
import LLink from '@/components/ui/llink'
import Typography from '@/components/ui/typography'
import { cn } from '@/lib/utils'

export default function Hero({ t }) {
  return (
    <section className='bg-primary-foreground -mt-20 py-20 md:py-0'>
      <div className='pl-5 sm:pl-8 md:pl-12 lg:pl-20 xl:pl-32 flex flex-col md:flex-row items-center justify-normal md:justify-between gap-x-5 xl:gap-x-10 gap-y-12 min-h-dvh'>
        <div className='w-full md:w-1/2 order-2 md:order-1 pr-5 md:pr-0'>
          <TagLine>{t.headerTag}</TagLine>
          <Typography variant='h1' className='text-balance leading-loose pt-8 pb-9 xl:text-6xl'>
            {t.title}
          </Typography>
          <Typography variant='description' className='max-w-full sm:max-w-[75%]'>
            {t.description}
          </Typography>
          <div className={cn('flex items-center gap-x-4 pt-6 pb-10', { 'flex-col gap-y-3 items-start': t.cta2 })}>
            <div className='flex flex-wrap items-center gap-x-4'>
              <LLink href='/signup'>
                <Button>{t.cta}</Button>
              </LLink>
              {t.cta2 ? <Button variant='outline'>{t.cta2}</Button> : null}
            </div>
            <p className='text-text-secondary font-medium text-lg'>{t.creditCardText}</p>
          </div>

          <div className='space-y-2.5'>
            <p className='text-sm font-medium text-text-tartiary'>{t.brandsTitle}</p>
            <div className='flex flex-wrap items-center gap-x-5 gap-y-4'>
              <Img src={logo1} sizes='120px' alt='logo1' className='w-[102px] h-auto' />
              <Img src={logo2} sizes='120px' alt='logo2' className='w-[102px] h-auto' />
              <Img src={logo3} sizes='120px' alt='logo3' className='w-[102px] h-auto' />
              <Img src={logo4} sizes='120px' alt='logo4' className='w-[102px] h-auto' />
            </div>
          </div>
        </div>
        <div className='w-full max-w-full sm:max-w-[75%] mt-10 md:mt-0 md:w-1/2 order-1 md:order-2 relative'>
          <Img
            src={patternImg}
            alt='pattern'
            sizes='312px'
            className='w-auto h-1/2 absolute top-1/2 left-0 -translate-y-1/2 z-[1]'
          />
          <Img src={heroImg} alt='hero' sizes='100vw' className='w-full h-auto inset-0 z-[3] relative' />
        </div>
      </div>
    </section>
  )
}
