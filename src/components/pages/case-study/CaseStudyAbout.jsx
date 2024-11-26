import TagLine from '@/components/common/TagLine'
import Typography from '@/components/ui/typography'

export default function CaseStudyAbout({ t }) {
  return (
    <section className='bg-dark-gray py-20 md:py-32'>
      <div className='container flex-col lg:flex-row flex gap-x-10 gap-y-5'>
        <div className='w-full lg:w-4/6'>
          <TagLine variant='light'>{t.tag}</TagLine>
          <Typography
            variant='h2'
            className='text-white pt-8 pb-6 leading-loose text-2xl md:text-3xl lg:text-5xl max-w-full'
          >
            {t.firstSection.title}
          </Typography>
          <Typography variant='description' className='text-text-tartiary text-lg sm:text-xl max-w-full'>
            {t.firstSection.description}
          </Typography>
        </div>

        <div className='w-full lg:w-2/6'>
          <div className='h-6 w-full hidden lg:block' />
          <Typography
            variant='h2'
            className='text-white pt-8 pb-6 leading-loose text-2xl md:text-3xl lg:text-5xl max-w-full'
          >
            {t.secondSection.title}
          </Typography>
          <ul>
            {t.secondSection.listItems.map(item => (
              <li key={item} className='text-text-tartiary text-lg sm:text-xl font-medium'>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
