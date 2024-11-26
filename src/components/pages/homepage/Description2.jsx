import desc2Img from '@/assets/images/pages/homepage/descriptions/desc2.png'
import { Img } from '@/components/ui/img'
import Typography from '@/components/ui/typography'

export default function Description2({ t }) {
  return (
    <section className='py-20 container flex flex-col min-[850px]:flex-row items-center justify-center gap-x-10 xl:gap-x-20 gap-y-10'>
      <div className='w-full min-[850px]:w-3/5 order-2 min-[850px]:order-1'>
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
      <div className='w-full min-[850px]:w-2/5 order-1 min-[850px]:order-2'>
        <Img src={desc2Img} alt='description1' className='max-w-[85%] mx-auto min-[850px]:mx-0' sizes='100vw' />
      </div>
    </section>
  )
}
