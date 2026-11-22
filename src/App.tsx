import { useCallback, useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ValuePropositionSection } from './components/ValuePropositionSection';
import { ServicesSection } from './components/ServicesSection';
import { PortfolioSection } from './components/PortfolioSection';
import { PricingSection } from './components/PricingSection';
import { WhyUsAndProcessSection } from './components/WhyUsAndProcessSection';
import { AboutAndFaqSection } from './components/AboutAndFaqSection';
import { ContactPrefill, ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

const OBSERVED_SECTIONS = ['home', 'services', 'work', 'pricing', 'about', 'contact'];

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [contactPrefill, setContactPrefill] = useState<ContactPrefill>({ version: 0 });

  useEffect(() => {
    const elements = OBSERVED_SECTIONS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el)
    );

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0 && visible[0].target.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: '-25% 0px -55% 0px',
        threshold: [0.1, 0.25, 0.5],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollToContactWithPrefill = useCallback(
    (next: Omit<ContactPrefill, 'version'>) => {
      setContactPrefill((prev) => ({
        ...next,
        version: prev.version + 1,
      }));
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    },
    []
  );

  const handleSelectService = useCallback(
    (websiteType: string) => {
      scrollToContactWithPrefill({ websiteType });
    },
    [scrollToContactWithPrefill]
  );

  const handleSelectProjectInquiry = useCallback(
    (websiteType: string, note: string) => {
      scrollToContactWithPrefill({ websiteType, note });
    },
    [scrollToContactWithPrefill]
  );

  const handleSelectPackage = useCallback(
    (budget: string, packageName: string) => {
      scrollToContactWithPrefill({
        budget,
        note: `I would like to request details and a quote for the ${packageName} option.`,
      });
    },
    [scrollToContactWithPrefill]
  );

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#191919] flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-2 focus:bg-[#30251D] focus:text-[#FAF9F6] focus:rounded-md focus:text-sm"
      >
        Skip to main content
      </a>

      <Navbar activeSection={activeSection} />

      <main id="main-content" className="flex-1">
        <HeroSection />
        <ValuePropositionSection />
        <ServicesSection onSelectServiceForInquiry={handleSelectService} />
        <PortfolioSection onSelectProjectInquiry={handleSelectProjectInquiry} />
        <PricingSection onSelectPackage={handleSelectPackage} />
        <WhyUsAndProcessSection />
        <AboutAndFaqSection />
        <ContactSection prefill={contactPrefill} />
      </main>

      <Footer onSelectService={handleSelectService} />
    </div>
  );
}
