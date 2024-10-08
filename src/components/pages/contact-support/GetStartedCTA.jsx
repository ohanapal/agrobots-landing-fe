import heroImg from '@/assets/images/pages/benifits/getStartedCta/hero.png'
import leftPattern from '@/assets/images/pages/benifits/getStartedCta/left-pattern.png'
import rightPattern from '@/assets/images/pages/benifits/getStartedCta/right-pattern.png'
import { Button } from '@/components/ui/button'
import { Img } from '@/components/ui/img'
import Typography from '@/components/ui/typography'
import { cn } from '@/lib/utils'

export default function GetStartedCTA({ t, className }) {
  return (
    <section className={cn('py-10 md:py-20 overflow-hidden', className)}>
      <div className='container flex flex-col md:flex-row items-center justify-normal md:justify-between gap-x-5 xl:gap-x-10 gap-y-12'>
        <div className='w-full md:w-1/2 order-2 md:order-1 pr-5 md:pr-0'>
          <Typography
            variant='h1'
            className='text-balance leading-loose pt-8 pb-9 xl:text-6xl max-w-full sm:max-w-[75%]'
          >
            {t.title}
          </Typography>
          <Typography variant='description' className='max-w-full sm:max-w-[75%]'>
            {t.description}
          </Typography>
          <div className={cn('flex flex-wrap items-center gap-x-4 gap-y-3 pt-6 pb-10')}>
            <Button>{t.cta}</Button>
            <Button variant='outline'>{t.cta2}</Button>
          </div>
        </div>
        <div className='w-full max-w-full sm:max-w-[75%] mt-10 md:mt-0 md:w-1/2 order-1 md:order-2 relative'>
          <Img
            src={leftPattern}
            alt='pattern'
            sizes='150px'
            className='w-20 md:w-36 absolute -bottom-5 md:-bottom-10 -left-5 md:-left-10 z-[1]'
          />
          <Img src={heroImg} alt='hero' sizes='100vw' className='w-full h-auto inset-0 z-[3] relative' />
          <Img
            src={rightPattern}
            alt='pattern'
            sizes='150px'
            className='w-20 md:w-32 absolute -top-5 md:-top-10 -right-5 md:-right-10 z-[3]'
          />
        </div>
      </div>
    </section>
  )
}
