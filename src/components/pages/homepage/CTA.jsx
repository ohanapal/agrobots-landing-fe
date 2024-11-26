import dotsImage from '@/assets/images/pages/homepage/cta/dots.png'
import TagLine from '@/components/common/TagLine'
import { Button } from '@/components/ui/button'
import { Img } from '@/components/ui/img'
import Typography from '@/components/ui/typography'

export default function CTA({ t }) {
  return (
    <section className='w-full py-32 bg-primary-foreground overflow-hidden'>
      <div className='container flex flex-col items-center justify-center'>
        <TagLine className='uppercase'>{t.tag}</TagLine>
        <Typography
          variant='h2'
          className='text-balance text-center pt-10 pb-8 leading-loose text-2xl md:text-3xl lg:text-5xl max-w-full sm:max-w-[75%]'
        >
          {t.title}
        </Typography>
        <p className='text-text-tartiary text-center max-w-full sm:max-w-[75%] font-medium text-lg'>{t.description}</p>
        <Button className='my-10'>{t.cta}</Button>
        <div className='rounded-2xl max-w-[950px] w-full aspect-video relative'>
          <Img src={dotsImage} alt='dots' className='absolute -right-12 -bottom-8 w-36 h-auto z-0' />
          <iframe
            src='https://www.youtube.com/embed/xI1vU5AR-vE?si=iLSSY7iTk6Fc7f3O'
            title='YouTube video player'
            frameborder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            referrerpolicy='strict-origin-when-cross-origin'
            allowfullscreen
            className='w-full h-full rounded-2xl z-10 relative'
          ></iframe>
        </div>
      </div>
    </section>
  )
}
