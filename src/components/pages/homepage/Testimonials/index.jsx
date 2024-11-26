'use client'

import person1 from '@/assets/images/pages/homepage/testimonials/person1.png'
import TagLine from '@/components/common/TagLine'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import Typography from '@/components/ui/typography'
import Testimonial from './Testimonial'

const testimonialsData = [
  {
    id: 1,
    img: person1,
    name: 'John Doe',
    designation: 'CEO at Company',
    testimonial:
      'Implementing Argobot AI Chatbot has transformed our customer engagement. Our lead conversion rates have significantly improved.'
  },
  {
    id: 2,
    img: person1,
    name: 'Jane Smith',
    designation: 'CTO at Company',
    testimonial:
      'Using Argobot AI Chatbot has greatly improved our customer support efficiency. Our response time has been reduced significantly.'
  },
  {
    id: 3,
    img: person1,
    name: 'Mike Johnson',
    designation: 'COO at Company',
    testimonial:
      'Argobot AI Chatbot has revolutionized our sales process. We have seen a significant increase in conversions and revenue.'
  },
  {
    id: 4,
    img: person1,
    name: 'Sarah Williams',
    designation: 'Marketing Manager',
    testimonial:
      'The Argobot AI Chatbot has been a game-changer for our marketing campaigns. It has helped us reach a wider audience and generate more leads.'
  }
]

export default function Testimonials({ t, showTitle = true, className }) {
  return (
    <section className={className}>
      <div className='w-full min-[1400px]:max-w-[1400px] px-0 md:px-8 py-20 mx-auto'>
        {showTitle ? (
          <div className='flex flex-col items-center justify-center text-center text-balance'>
            <TagLine variant='light' className='uppercase'>
              {t.tag}
            </TagLine>
            <Typography
              variant='h2'
              className='text-balance leading-loose pt-6 pb-5 text-2xl md:text-3xl lg:text-5xl max-w-full sm:max-w-[75%]'
            >
              {t.title}
            </Typography>
            <Typography variant='description' className='max-w-full sm:max-w-[75%]'>
              {t.description}
            </Typography>
          </div>
        ) : null}

        <Carousel className='mt-10' opts={{ loop: true }}>
          <CarouselContent>
            {testimonialsData?.map(testimonial => (
              <CarouselItem key={testimonial.id}>
                <Testimonial testimonial={testimonial} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious variant='ghost' className='ml-14' />
          <CarouselNext variant='ghost' className='mr-14' />
        </Carousel>
      </div>
    </section>
  )
}
