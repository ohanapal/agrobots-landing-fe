/* eslint-disable import/no-unresolved */
import 'server-only'

const getDict = dict => async lang => dict[lang]?.() ?? dict.en()

const commonDict = {
  en: () => import('./../../dictionaries/common/en.json').then(m => m.default),
  ar: () => import('./../../dictionaries/common/ar.json').then(m => m.default)
}

const homepageDict = {
  en: () => import('./../../dictionaries/pages/homepage/en.json').then(m => m.default),
  ar: () => import('./../../dictionaries/pages/homepage/ar.json').then(m => m.default)
}

const aiChatbotDict = {
  en: () => import('./../../dictionaries/pages/ai-chatbot/en.json').then(m => m.default),
  ar: () => import('./../../dictionaries/pages/ai-chatbot/ar.json').then(m => m.default)
}

const contactSupportDict = {
  en: () => import('./../../dictionaries/pages/contact-support/en.json').then(m => m.default),
  ar: () => import('./../../dictionaries/pages/contact-support/ar.json').then(m => m.default)
}

const inboundSalesDict = {
  en: () => import('./../../dictionaries/pages/inbound-sales/en.json').then(m => m.default),
  ar: () => import('./../../dictionaries/pages/inbound-sales/ar.json').then(m => m.default)
}

const benifitsDict = {
  en: () => import('./../../dictionaries/pages/benifits/en.json').then(m => m.default),
  ar: () => import('./../../dictionaries/pages/benifits/ar.json').then(m => m.default)
}

const pricingDict = {
  en: () => import('./../../dictionaries/pages/pricing/en.json').then(m => m.default),
  ar: () => import('./../../dictionaries/pages/pricing/ar.json').then(m => m.default)
}

const caseStudyDict = {
  en: () => import('./../../dictionaries/pages/case-study/en.json').then(m => m.default),
  ar: () => import('./../../dictionaries/pages/case-study/ar.json').then(m => m.default)
}

const authDict = {
  en: () => import('./../../dictionaries/pages/auth/en.json').then(m => m.default),
  ar: () => import('./../../dictionaries/pages/auth/ar.json').then(m => m.default)
}

const companyInfoDict = {
  en: () => import('./../../dictionaries/pages/company-info/en.json').then(m => m.default),
  ar: () => import('./../../dictionaries/pages/company-info/ar.json').then(m => m.default)
}

const subscribeDict = {
  en: () => import('./../../dictionaries/pages/subscribe/en.json').then(m => m.default),
  ar: () => import('./../../dictionaries/pages/subscribe/ar.json').then(m => m.default)
}

export const getCommonDict = getDict(commonDict)
export const getHomepageDict = getDict(homepageDict)
export const getAiChatbotDict = getDict(aiChatbotDict)
export const getContactSupportDict = getDict(contactSupportDict)
export const getInboundSalesDict = getDict(inboundSalesDict)
export const getBenifitsDict = getDict(benifitsDict)
export const getPricingDict = getDict(pricingDict)
export const getCaseStudyDict = getDict(caseStudyDict)
export const getAuthDict = getDict(authDict)
export const getCompanyInfoDict = getDict(companyInfoDict)
export const getSubscribeDict = getDict(subscribeDict)
