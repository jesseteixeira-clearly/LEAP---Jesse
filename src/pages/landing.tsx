
import { Header } from './Header'
import { Hero } from '@/components/cms/Hero'
import { CmsContentProvider } from '@/context/CmsContentProvider'
import { useEffect, useState } from 'react'
import { CMSComponent } from '@/types'
import { Footer } from '@/components/cms/Footer'
import { Features } from '@/components/cms/Features'
import { ContactForm } from '@/components/cms/ContactForm'

export const Landing: React.FC = () => {
  const [cmsComponents, setCmsComponents] = useState<CMSComponent[] | null>(null)

  useEffect(() => {
    const fetchCmsData = async () => {
      const { cmsData } = await import('@/data/cms.data')
      setCmsComponents(cmsData as CMSComponent[])
    }

    fetchCmsData()
  }, [])

  return (
    <>
      {cmsComponents && (
        <CmsContentProvider components={cmsComponents}>
          <Header title="" />
          <Hero />
          <Features />
          <ContactForm />
          <Footer />
        </CmsContentProvider>
      ) || <p>Loading...</p>}
    </>
  )
}

export default Landing
