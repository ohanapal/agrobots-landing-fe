import logo from '@/assets/images/ui/logo-white.png'
import { NewsLetter } from '../pages/homepage'
import { Img } from '../ui/img'
import LLink from '../ui/llink'

const footerLinks = [
  { id: 1, title: 'Product', href: '/product' },
  { id: 2, title: 'Features', href: '/features' },
  { id: 3, title: 'Prices', href: '/prices' },
  { id: 4, title: 'Resources', href: '/resources' },
  { id: 5, title: 'Career', href: '/career' },
  { id: 6, title: 'Help', href: '/help' },
  { id: 7, title: 'Privacy', href: '/privacy' }
]

export default function Footer({ t }) {
  return (
    <footer className='bg-dark-gray py-32'>
      <NewsLetter t={t.newsLetter} />
      <div className='flex flex-col items-center justify-center gap-y-8'>
        <Img src={logo} alt='Argobot' className='w-48 h-auto' />

        <ul className='container flex flex-wrap justify-center gap-x-5 text-text-secondary font-medium'>
          {footerLinks.map(link => (
            <li key={link.id}>
              <LLink href={link.href}>{link.title}</LLink>
            </li>
          ))}
        </ul>

        <div className='w-full h-0.5 bg-primary my-5' />

        <p className='text-text-secondary font-medium text-center'>
          &copy; Argobot {new Date().getFullYear()}. {t.copyRight}
        </p>
      </div>
    </footer>
  )
}
