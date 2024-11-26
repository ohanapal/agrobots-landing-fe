import closingQuote from '@/assets/images/pages/homepage/testimonials/closing-quote.png'
import openingQuote from '@/assets/images/pages/homepage/testimonials/opening-quote.png'
import { Img } from '@/components/ui/img'
import Typography from '@/components/ui/typography'

export default function Testimonial({ testimonial }) {
  return (
    <div className='flex flex-col md:flex-row items-center justify-between px-10 md:px-20 gap-x-5 gap-y-8'>
      <div className='w-full md:w-1/2 flex items-center gap-x-3'>
        <Img
          src={testimonial.img}
          alt='Person 1'
          className='w-16 sm:w-[88px] aspect-square object-cover overflow-hidden rounded-full'
        />
        <div className='space-y-1 sm:space-y-2'>
          <Typography variant='h6'>{testimonial.name}</Typography>
          <Typography variant='description' className='text-base sm:text-lg'>
            {testimonial.designation}
          </Typography>
        </div>
      </div>

      <div className='w-full md:w-1/2 p-3 relative'>
        <Img src={openingQuote} alt='Opening quote' className='absolute top-0 left-0 w-16 sm:w-24 h-auto' />
        <Img src={closingQuote} alt='Opening quote' className='absolute bottom-0 right-0 w-16 sm:w-24 h-auto' />
        <p className='text-text font-semibold text-base sm:text-lg md:text-2xl relative'>{testimonial.testimonial}</p>
      </div>
    </div>
  )
}
