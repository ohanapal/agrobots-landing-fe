import logo1 from '@/assets/logos/1.png'
import logo10 from '@/assets/logos/10.png'
import logo2 from '@/assets/logos/2.png'
import logo3 from '@/assets/logos/3.png'
import logo4 from '@/assets/logos/4.png'
import logo6 from '@/assets/logos/6.png'
import logo7 from '@/assets/logos/7.png'
import logo8 from '@/assets/logos/8.png'
import Image from 'next/image'

const logos = [
  { src: logo1, alt: 'Logo1' },
  { src: logo2, alt: 'Logo2' },
  { src: logo3, alt: 'Logo3' },
  { src: logo4, alt: 'Logo4' },
  { src: logo6, alt: 'Logo6' },
  { src: logo7, alt: 'Logo7' },
  { src: logo8, alt: 'Logo8' },
  { src: logo10, alt: 'Logo10' }
]

export default function Marquee() {
  return (
    <div className='container mt-5'>
      {/* <p className='text-center text-balance'>Trusted by +20,000 businesses</p> */}
      <div className='space-y-3 my-5'>
        <div className='w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]'>
          <ul className='flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll h-24'>
            {logos.concat(logos).map((logo, index) => (
              <li key={index} className='h-full'>
                <Image src={logo.src} alt={logo.alt} className='h-full w-auto' />
              </li>
            ))}
          </ul>
        </div>

        <div className='w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]'>
          <ul className='flex items-center justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll-inverted h-24'>
            {logos.concat(logos).map((logo, index) => (
              <li key={index} className='h-full'>
                <Image src={logo.src} alt={logo.alt} className='h-full w-auto' />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
