import Footer from '@/components/Footer';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';

const LandingPage = () => {
  return (
    <section className="min-h-screen bg-green-50">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
      </main>
      <Footer />
    </section>
  );
};

export default LandingPage;
