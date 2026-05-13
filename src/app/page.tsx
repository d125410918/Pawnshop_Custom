import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ApplicationForm from '@/components/ApplicationForm';
import ProcessSection from '@/components/ProcessSection';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <ApplicationForm />
      <ProcessSection />
      <FAQ />
      <Footer />
    </div>
  );
}
