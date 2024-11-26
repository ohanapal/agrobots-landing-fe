import bottomLeftImg from '@/assets/images/pages/homepage/newsletter/bottom-left.png'
import bottomRightImg from '@/assets/images/pages/homepage/newsletter/bottom-right.png'
import topLeftImg from '@/assets/images/pages/homepage/newsletter/top-left.png'
import topRightImg from '@/assets/images/pages/homepage/newsletter/top-right.png'
import { Button } from '@/components/ui/button'
import { Img } from '@/components/ui/img'
import { Input } from '@/components/ui/input'
import Typography from '@/components/ui/typography'

export default function NewsLetter({ t }) {
  return (
    <section className='pb-32 pt-10 bg-dark-gray'>
      <div className='container'>
        <div className='flex flex-col items-center text-center justify-center py-16 sm:py-20 md:py-24 xl:py-28 px-8 sm:px-12 md:px-12 lg:px-14 xl:px-16 rounded-2xl bg-primary-foreground relative overflow-hidden z-10'>
          <Typography
            variant='h2'
            className='text-balance leading-loose text-2xl md:text-3xl lg:text-5xl max-w-full sm:max-w-[75%]'
          >
            {t.title}
          </Typography>
          <Typography variant='description' className='max-w-full sm:max-w-[75%] pt-4 pb-6'>
            {t.description}
          </Typography>

          <div className='flex flex-col gap-y-2'>
            <div className='flex flex-col sm:flex-row items-center gap-x-3 md:gap-x-5 gap-y-3'>
              <Input placeholder={t.placeholder} containerClassName='w-full md:w-96' />
              <Button className='w-full sm:w-auto mb-1'>{t.cta}</Button>
            </div>
            <div className='flex flex-wrap items-center gap-x-1 text-left self-start text-xs font-medium'>
              <p className='text-text-secondary'>{t.privacy}</p>
              <a href='#' className='text-violet-700'>
                {t.privacyCta}
              </a>
            </div>
          </div>

          <Img src={topLeftImg} alt='top-left' className='absolute w-14 sm:w-20 md:w-32 h-auto top-0 left-0 z-0' />
          <Img
            src={topRightImg}
            alt='top-right'
            className='absolute w-16 sm:w-24 md:w-36 h-auto top-3 md:top-5 right-3 md:right-5 z-0'
          />
          <Img
            src={bottomLeftImg}
            alt='bottom-left'
            className='absolute w-16 sm:w-24 md:w-36 h-auto bottom-3 md:bottom-5 left-3 md:left-5 z-0'
          />
          <Img
            src={bottomRightImg}
            alt='bottom-right'
            className='absolute w-14 sm:w-20 md:w-32 h-auto bottom-0 right-0 z-0'
          />
        </div>
      </div>
    </section>
  )
}
