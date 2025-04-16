import Hero from './components/Hero';
import FeaturesSteps from './components/FeaturesSteps';
import OfferPlans from './components/OfferPlans';
import SocialCall from './components/SocialCall';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturesSteps />
      <OfferPlans />
      <SocialCall />
      <Footer />
    </main>
  );
}