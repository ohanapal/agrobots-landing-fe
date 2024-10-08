import Footer from '@/components/common/Footer'
import Navbar from '@/components/common/Navbar'
import { getCommonDict } from '@/utils/i18n/get-dictionary'

export default async function Layout({ children, params: { lang } }) {
  const t = await getCommonDict(lang)
  return (
    <>
      <Navbar t={t.header} />
      <main className='mt-20'>{children}</main>
      <Footer t={t.footer} />
    </>
  )
}
