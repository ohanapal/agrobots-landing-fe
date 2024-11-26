import CaseStudyAbout from '@/components/pages/case-study/CaseStudyAbout'
import CaseStudyHeader from '@/components/pages/case-study/CaseStudyHeader'
import Results from '@/components/pages/case-study/Results'
import WhatWeDid from '@/components/pages/case-study/WhatWeDid'
import GetStartedCTA from '@/components/pages/contact-support/GetStartedCTA'
import { Testimonials } from '@/components/pages/homepage'
import { getCaseStudyDict, getHomepageDict } from '@/utils/i18n/get-dictionary'

export const metadata = {
  title: 'Case Study | Argobot'
}

export default async function CaseStudyPage({ params: { lang } }) {
  const t = await getCaseStudyDict(lang)
  const homeT = await getHomepageDict(lang)
  return (
    <main>
      <CaseStudyHeader t={t.header} />
      <CaseStudyAbout t={t.about} />
      <WhatWeDid t={t.whatWeDid} />
      <Results t={t.results} />
      <GetStartedCTA t={t.getStartedCTA} className='pt-10 pb-20 md:pb-32' />
      <Testimonials t={homeT.testimonials} />
    </main>
  )
}
