import desc3Img1 from '@/assets/images/pages/homepage/descriptions/desc3-1.png'
import desc3Img2 from '@/assets/images/pages/homepage/descriptions/desc3-2.png'
import desc3Img3 from '@/assets/images/pages/homepage/descriptions/desc3-3.png'
import desc3Img4 from '@/assets/images/pages/homepage/descriptions/desc3-4.png'
import { Img } from '@/components/ui/img'
import Typography from '@/components/ui/typography'

export default function Description3({ t }) {
  return (
    <section className='pb-32 container flex flex-col min-[850px]:flex-row items-center justify-center gap-x-10 xl:gap-x-20 gap-y-10'>
      <div className='w-full min-[850px]:w-3/5'>
        <div className='max-w-[500px] flex gap-x-5 mx-auto min-[850px]:ml-auto'>
          <div className='flex flex-col gap-y-5 -translate-y-3 w-1/2'>
            <Img src={desc3Img1} alt='description1' className='rounded-lg aspect-square object-cover' sizes='20vw' />
            <Img src={desc3Img2} alt='description1' className='rounded-lg aspect-[4/5] object-cover' sizes='20vw' />
          </div>
          <div className='flex flex-col gap-y-5 translate-y-3 w-1/2'>
            <Img src={desc3Img3} alt='description1' className='rounded-lg aspect-[4/5] object-cover' sizes='20vw' />
            <Img src={desc3Img4} alt='description1' className='rounded-lg aspect-square object-cover' sizes='20vw' />
          </div>
        </div>
      </div>
      <div className='w-full min-[850px]:w-2/5'>
        <Typography
          variant='h2'
          className='text-balance leading-loose pb-9 text-2xl md:text-3xl lg:text-5xl max-w-full sm:max-w-[75%]'
        >
          {t.title}
        </Typography>
        {t.listItems ? (
          <ul className='space-y-3 pl-5'>
            {t.listItems.map((item, index) => (
              <li key={index} className='text-lg text-text-dark list-disc list-item text-balance'>
                {item}
              </li>
            ))}
          </ul>
        ) : null}
        {t.description ? <p className='text-lg text-text-dark text-balance'>{t.description}</p> : null}
      </div>
    </section>
  )
}
