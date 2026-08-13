import { useParams, Navigate } from 'react-router-dom'
import { getProductBySlug } from '../../data/products'
import ProductHero from '../../components/product/ProductHero'
import ProductNotes from '../../components/product/ProductNotes'
import PromoBanners from '../../components/product/PromoBanners'
import ProductAccordion from '../../components/product/ProductAccordion'
import VisualFeatures from '../../components/product/VisualFeatures'
import UsageGuide from '../../components/product/UsageGuide'
import WhyUs from '../../components/product/WhyUs'
import OurCollectionSection from '../../components/landing/OurCollectionSection'
import ConcentrationGuide from '../../components/product/ConcentrationGuide'
import FaqSection from '../../components/landing/FaqSection'
import CustomerReviews from '../../components/product/CustomerReviews'

export default function Product() {
  const { id } = useParams();
  const product = getProductBySlug(id);

  if (!product) {
    return <Navigate to="/shop-all" replace />;
  }

  return (
    <main className="min-h-screen bg-white">
      <ProductHero product={product} />
      <ProductNotes product={product} />
      <PromoBanners />
      {/* <ProductAccordion />
      <VisualFeatures />
      <UsageGuide /> */}
      {/* <WhyUs /> */}
      <OurCollectionSection />
      <ConcentrationGuide />
      <FaqSection />
      <CustomerReviews />
    </main>
  )
}
