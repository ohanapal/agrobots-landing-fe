import TagLine from '@/components/common/TagLine'
import Typography from '@/components/ui/typography'
import Marquee from './Marquee'

export default function Clients({ t }) {
  return (
    <section className='container flex flex-col text-center items-center justify-center pt-32'>
      <TagLine variant='light' className='uppercase'>
        {t.tag}
      </TagLine>
      <Typography
        variant='h2'
        className='text-balance leading-loose pt-8 pb-9 text-2xl md:text-3xl lg:text-5xl max-w-full sm:max-w-[75%]'
      >
        {t.title}
      </Typography>
      <Typography variant='description' className='max-w-full sm:max-w-[75%]'>
        {t.description}
      </Typography>

      {/* <div className='grid grid-cols-2 md:grid-cols-4 w-full gap-4 md:gap-8 lg:gap-10 pt-10'>
        <Img src={logo1} alt='logo1' className='p-6 sm:p-5 md:p-10 bg-primary-foreground' sizes='400px' />
        <Img src={logo2} alt='logo2' className='p-6 sm:p-5 md:p-10 bg-primary-foreground' sizes='400px' />
        <Img src={logo3} alt='logo3' className='p-6 sm:p-5 md:p-10 bg-primary-foreground' sizes='400px' />
        <Img src={logo4} alt='logo4' className='p-6 sm:p-5 md:p-10 bg-primary-foreground' sizes='400px' />
      </div> */}
      <Marquee />
    </section>
  )
}
