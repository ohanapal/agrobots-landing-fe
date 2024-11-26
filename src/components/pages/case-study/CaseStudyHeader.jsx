import TagLine from '@/components/common/TagLine'
import Typography from '@/components/ui/typography'

export default function CaseStudyHeader({ t }) {
  return (
    <section className='bg-primary-foreground py-10 md:pt-12 md:pb-32'>
      <div className='container flex flex-col items-center justify-center'>
        <TagLine className='uppercase'>{t.tag}</TagLine>
        <Typography
          variant='h2'
          className='text-balance text-center pt-10 pb-6 leading-loose text-2xl md:text-3xl lg:text-5xl max-w-full'
        >
          {t.title}
        </Typography>
        <p className='text-text-tartiary text-center max-w-full font-medium text-lg pb-10'>{t.description}</p>
        <div className='rounded-2xl max-w-[950px] w-full aspect-video'>
          <iframe
            src='https://www.youtube.com/embed/k85mRPqvMbE?si=Sm5m7JmCudUXNUhE'
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
