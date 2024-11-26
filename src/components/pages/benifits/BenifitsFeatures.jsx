import TagLine from '@/components/common/TagLine'
import Typography from '@/components/ui/typography'
import { Grid2x2, LineChartIcon, MessagesSquare, PencilLine, Users } from 'lucide-react'
import Feature from '../homepage/Features/Feature'

export default function BenifitsFeatures({ t }) {
  const featureIcons = [MessagesSquare, LineChartIcon, Users, PencilLine, Grid2x2]
  return (
    <section className='container flex flex-col items-center text-center justify-center pt-32'>
      <TagLine variant='light' className='uppercase'>
        {t.tag}
      </TagLine>
      <Typography
        variant='h2'
        className='text-balance mx-auto leading-loose pt-8 pb-9 text-2xl md:text-3xl lg:text-5xl max-w-full sm:max-w-[75%]'
      >
        {t.title}
      </Typography>
      <Typography variant='description' className='max-w-full sm:max-w-[75%]'>
        {t.description}
      </Typography>

      <section className='flex flex-wrap items-center justify-center py-32 gap-x-5 gap-y-8'>
        {t.features.map((feature, index) => (
          <Feature
            key={feature.id}
            feature={feature}
            index={index}
            featureIcons={featureIcons}
            className='w-full sm:w-[calc(50%-20px)] lg:w-[calc(33%-20px)]'
          />
        ))}
      </section>
    </section>
  )
}
