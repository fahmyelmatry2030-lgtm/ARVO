import SEO from '../components/SEO'
import Hero from '../components/Hero'
import FeaturedProducts from '../components/FeaturedProducts'
import Layout from '../components/Layout'
import Features from '../components/Features'
import SpecialOffers from '../components/SpecialOffers'
import Testimonials from '../components/Testimonials'
import Newsletter from '../components/Newsletter'
import BrandStory from '../components/BrandStory'

export default function Home() {
  return (
    <Layout>
      <SEO
        title="الرئيسية"
        description="متجر ملابس عصري يقدم أحدث التصاميم بجودة عالية وأسعار منافسة. تسوق الآن من تشكيلتنا الواسعة."
      />

      <div className="bg-white">
        <Hero />
        <BrandStory />
        <FeaturedProducts />
        <SpecialOffers />
        <Features />
        <Testimonials />
        <Newsletter />
      </div>
    </Layout>
  )
}
