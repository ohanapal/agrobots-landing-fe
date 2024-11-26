import ContactSupportFeatures from '@/components/pages/contact-support/ContactSupportFeatures'
import GetStartedCTA from '@/components/pages/contact-support/GetStartedCTA'
import { Hero, Testimonials } from '@/components/pages/homepage'
import { getContactSupportDict, getHomepageDict } from '@/utils/i18n/get-dictionary'

export const metadata = {
  title: 'Contact Support | Argobot'
}

export default async function ContactSupportPage({ params: { lang } }) {
  const t = await getContactSupportDict(lang)
  const homeT = await getHomepageDict(lang)
  return (
    <main>
      <Hero t={t.hero} />
      <ContactSupportFeatures t={t.features} />
      <GetStartedCTA t={t.getStartedCTA} />
      <Testimonials t={homeT.testimonials} />
    </main>
  )
}
