import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

interface NavbarProps {
  activeSection: string;
}

export function Navbar({ activeSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-200 ${
        isScrolled
          ? 'bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#E4DCD1]'
          : 'bg-[#FAF9F6] border-b border-transparent'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8 h-16 sm:h-[72px] flex items-center justify-between gap-8">
        {/* Zone 1: Single-element editorial brand wordmark */}
        <a
          href="#home"
          className="font-serif text-[1.45rem] sm:text-[1.6rem] leading-none tracking-tight text-[#191919] hover:text-[#594333] transition-colors whitespace-nowrap shrink-0"
        >
          {siteConfig.brand.wordmark}
        </a>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex items-center gap-7"
        >
          {siteConfig.navigation.map((item) => {
            const sectionId = item.href.replace('#', '');
            const isActive = activeSection === sectionId;
            return (
              <a
                key={item.href}
                href={item.href}
                className={`relative py-1 text-[14px] font-medium transition-colors whitespace-nowrap shrink-0 ${
                  isActive
                    ? 'text-[#191919]'
                    : 'text-[#5C5650] hover:text-[#191919]'
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 right-0 -bottom-0.5 h-[1.5px] bg-[#30251D] transition-transform duration-200 origin-left ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Single primary action CTA + mobile trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-[14px] font-medium bg-[#30251D] text-[#FAF9F6] rounded-md hover:bg-[#594333] transition-colors duration-200 whitespace-nowrap shrink-0"
          >
            Let&apos;s Talk
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-md text-[#191919] hover:bg-[#E9E1D6]/70 transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" strokeWidth={1.75} aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5" strokeWidth={1.75} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="lg:hidden bg-[#FAF9F6] border-b border-[#E4DCD1] px-5 sm:px-8 pt-2 pb-6"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col divide-y divide-[#E4DCD1]/70">
            {siteConfig.navigation.map((item) => {
              const sectionId = item.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={handleLinkClick}
                  className={`py-3.5 text-[16px] font-medium transition-colors flex items-center justify-between ${
                    isActive ? 'text-[#30251D]' : 'text-[#5C5650] hover:text-[#191919]'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="text-xs text-[#594333]">Current</span>
                  )}
                </a>
              );
            })}
          </nav>
          <div className="pt-5">
            <a
              href="#contact"
              onClick={handleLinkClick}
              className="w-full inline-flex items-center justify-center px-5 py-3 text-[15px] font-medium bg-[#30251D] text-[#FAF9F6] rounded-md hover:bg-[#594333] transition-colors"
            >
              Let&apos;s Talk
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
