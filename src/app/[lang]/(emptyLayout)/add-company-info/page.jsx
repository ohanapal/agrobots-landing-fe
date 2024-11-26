import logo from '@/assets/images/ui/logo.png'
import AddCompanyInfoForm from '@/components/pages/add-company-info/AddCompanyInfoForm'
import { Img } from '@/components/ui/img'
import LLink from '@/components/ui/llink'
import Typography from '@/components/ui/typography'
import { getCompanyInfoDict } from '@/utils/i18n/get-dictionary'

export const metadata = {
  title: 'Add Company Info | Argobot'
}

export default async function AddCompanyInfo({ params: { lang } }) {
  const dict = await getCompanyInfoDict(lang)
  const t = dict.companyInfo
  return (
    <div className='bg-primary-foreground'>
      <div className='container py-20'>
        <LLink href='/'>
          <Img src={logo} alt='Argobot' className='w-32 h-auto mb-5' />
        </LLink>
        <Typography variant='h2' className='font-medium'>
          {t.title}
        </Typography>
        <p className='text-balance font-medium text-lg text-text-tartiary mt-1 max-w-xl'>{t.description}</p>
        <AddCompanyInfoForm t={t.form} />
      </div>
    </div>
  )
}
