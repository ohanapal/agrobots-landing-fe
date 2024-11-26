import TagLine from '@/components/common/TagLine'
import Typography from '@/components/ui/typography'

export default function Results({ t }) {
  return (
    <section className='container py-20'>
      <div className='flex flex-col items-center justify-center text-center text-balance'>
        <TagLine variant='light'>{t.tag}</TagLine>
        <Typography variant='h2' className='pt-8 pb-6 leading-loose text-2xl md:text-3xl lg:text-5xl max-w-full'>
          {t.title}
        </Typography>
        <p className='text-text-tartiary max-w-[75%] font-medium text-lg md:text-xl'>{t.description}</p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10'>
        {t.results.map(result => (
          <div key={result.id} className='flex flex-col items-center justify-center gap-5 text-center'>
            <Typography variant='h2' className='leading-loose text-2xl md:text-3xl lg:text-5xl max-w-full'>
              {result.title}
            </Typography>
            <p className='text-text-tartiary font-medium text-lg md:text-xl'>{result.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
