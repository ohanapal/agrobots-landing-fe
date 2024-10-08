import first1 from '@/assets/images/pages/homepage/cta2/first1.png'
import first2 from '@/assets/images/pages/homepage/cta2/first2.png'
import first3 from '@/assets/images/pages/homepage/cta2/first3.png'
import second1 from '@/assets/images/pages/homepage/cta2/second1.png'
import second2 from '@/assets/images/pages/homepage/cta2/second2.png'
import second3 from '@/assets/images/pages/homepage/cta2/second3.png'
import third1 from '@/assets/images/pages/homepage/cta2/third1.png'
import third2 from '@/assets/images/pages/homepage/cta2/third2.png'
import third3 from '@/assets/images/pages/homepage/cta2/third3.png'
import third4 from '@/assets/images/pages/homepage/cta2/third4.png'
import { Button } from '@/components/ui/button'
import { Img } from '@/components/ui/img'
import Typography from '@/components/ui/typography'

export default function CTA2({ t }) {
  return (
    <section className='bg-primary-foreground py-20'>
      <div className='container flex flex-col lg:flex-row items-center justify-normal lg:justify-between gap-x-10 gap-y-10'>
        <div className='w-full lg:w-1/2 flex flex-col order-2 lg:order-1'>
          <Typography variant='h3' className='max-w-full sm:max-w-[75%]'>
            {t.title}
          </Typography>
          <Typography variant='description' className='py-6'>
            {t.description}
          </Typography>
          <div className='flex items-center gap-x-5'>
            <Button>{t.cta}</Button>
            <Button variant='outline'>{t.cta2}</Button>
          </div>
        </div>
        <div className='w-full lg:w-1/2 max-w-[500px] order-1 lg:order-2 flex flex-col gap-y-3 sm:gap-y-5'>
          <div className='flex items-center gap-x-3 sm:gap-x-5 w-full'>
            <div className='w-1/4 flex items-center justify-center rounded-lg p-3 sm:p-5 bg-primary-extra-light border border-primary-light-border'>
              <Img src={first1} alt='first1' className='h-6 sm:h-12 w-auto' sizes='20vw' />
            </div>
            <div className='w-1/4 flex items-center justify-center rounded-lg p-3 sm:p-5 bg-primary-extra-light border border-primary-light-border'>
              <Img src={first2} alt='first1' className='h-6 sm:h-12 w-auto' sizes='20vw' />
            </div>
            <div className='w-1/2 flex items-center justify-center rounded-lg p-3 sm:p-5 bg-primary-extra-light border border-primary-light-border'>
              <Img src={first3} alt='first1' className='h-6 sm:h-12 w-auto' sizes='20vw' />
            </div>
          </div>

          <div className='flex items-center gap-x-3 sm:gap-x-5 w-full'>
            <div className='w-1/4 flex items-center justify-center rounded-lg p-3 sm:p-5 bg-primary-extra-light border border-primary-light-border'>
              <Img src={second1} alt='first1' className='h-6 sm:h-12 w-auto' sizes='20vw' />
            </div>
            <div className='w-1/2 flex items-center justify-center rounded-lg p-3 sm:p-5 bg-primary-extra-light border border-primary-light-border'>
              <Img src={second2} alt='first1' className='h-6 sm:h-12 w-auto' sizes='20vw' />
            </div>
            <div className='w-1/4 flex items-center justify-center rounded-lg p-3 sm:p-5 bg-primary-extra-light border border-primary-light-border'>
              <Img src={second3} alt='first1' className='h-6 sm:h-12 w-auto' sizes='20vw' />
            </div>
          </div>

          <div className='flex items-center gap-x-3 sm:gap-x-5 w-full'>
            <div className='w-1/4 flex items-center justify-center rounded-lg p-3 sm:p-5 bg-primary-extra-light border border-primary-light-border'>
              <Img src={third1} alt='first1' className='h-6 sm:h-12 w-auto' sizes='20vw' />
            </div>
            <div className='w-1/4 flex items-center justify-center rounded-lg p-3 sm:p-5 bg-primary-extra-light border border-primary-light-border'>
              <Img src={third2} alt='first1' className='h-6 sm:h-12 w-auto' sizes='20vw' />
            </div>
            <div className='w-1/4 flex items-center justify-center rounded-lg p-3 sm:p-5 bg-primary-extra-light border border-primary-light-border'>
              <Img src={third3} alt='first1' className='h-6 sm:h-12 w-auto' sizes='20vw' />
            </div>
            <div className='w-1/4 flex items-center justify-center rounded-lg p-3 sm:p-5 bg-primary-extra-light border border-primary-light-border'>
              <Img src={third4} alt='first1' className='h-6 sm:h-12 w-auto' sizes='20vw' />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
