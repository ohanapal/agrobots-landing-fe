import BenifitsFeatures from '@/components/pages/benifits/BenifitsFeatures'
import GetStartedCTA from '@/components/pages/contact-support/GetStartedCTA'
import { Hero, Testimonials } from '@/components/pages/homepage'
import { getBenifitsDict, getHomepageDict } from '@/utils/i18n/get-dictionary'

export const metadata = {
  title: 'Benifits | Argobot'
}

export default async function BenifitsPage({ params: { lang } }) {
  const t = await getBenifitsDict(lang)
  const homeT = await getHomepageDict(lang)
  return (
    <main>
      <Hero t={t.hero} />
      <BenifitsFeatures t={t.features} />
      <Testimonials t={homeT.testimonials} showTitle={false} className='bg-primary-foreground' />
      <GetStartedCTA t={t.getStartedCTA} />
    </main>
  )
}
