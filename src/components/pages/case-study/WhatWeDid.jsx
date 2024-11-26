import hero from '@/assets/images/pages/case-study/what-we-did-hero.png'
import TagLine from '@/components/common/TagLine'
import { Img } from '@/components/ui/img'
import Typography from '@/components/ui/typography'
import { LineChartIcon, MessagesSquare, PencilLine, Users } from 'lucide-react'
import Feature from '../homepage/Features/Feature'

export default function WhatWeDid({ t }) {
  const cardsSection1 = t.cards.slice(0, 2)
  const cardsSection2 = t.cards.slice(2)
  const featureIcons = [MessagesSquare, LineChartIcon, Users, PencilLine]
  return (
    <section className='py-32 bg-primary-foreground'>
      <div className='container'>
        <div className='flex flex-col items-center justify-center text-center text-balance'>
          <TagLine variant='light'>{t.tag}</TagLine>
          <Typography variant='h2' className='pt-8 pb-6 leading-loose text-2xl md:text-3xl lg:text-5xl max-w-full'>
            {t.title}
          </Typography>
          <p className='text-text-tartiary max-w-full font-medium text-lg md:text-xl'>{t.description}</p>
        </div>

        <div className='flex flex-col lg:flex-row gap-x-4 gap-y-10 items-center mt-10'>
          <div className='w-full lg:w-1/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-y-10 order-2 lg:order-1'>
            {cardsSection1.map(feature => (
              <Feature key={feature.id} feature={feature} index={feature.id - 1} featureIcons={featureIcons} />
            ))}
          </div>

          <div className='w-full lg:w-1/3 max-w-96 order-1 lg:order-2'>
            <Img src={hero} alt='What we did' className='w-full h-auto' />
          </div>

          <div className='w-full lg:w-1/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-y-10 order-3'>
            {cardsSection2.map(feature => (
              <Feature key={feature.id} feature={feature} index={feature.id - 1} featureIcons={featureIcons} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
