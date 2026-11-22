import { ArrowRight } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { ResilientImage } from './ResilientImage';

export function HeroSection() {
  const { hero } = siteConfig;

  return (
    <section id="home" className="bg-[#FAF9F6] pt-10 pb-16 sm:pt-14 sm:pb-24 lg:pt-20 lg:pb-28">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        {/* Editorial Hero Copy Block */}
        <div className="max-w-3xl">
          <p className="text-[13px] font-medium text-[#594333] tracking-[0.01em] mb-5">
            {hero.kicker}
          </p>

          <h1 className="font-serif text-[2.6rem] sm:text-[3.5rem] lg:text-[4.25rem] leading-[1.06] tracking-[-0.015em] text-[#191919] mb-6">
            {hero.headline}
          </h1>

          <p className="text-[16px] sm:text-[18px] leading-[1.68] text-[#5C5650] max-w-[60ch] mb-9">
            {hero.supportingText}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-[15px] font-medium bg-[#30251D] text-[#FAF9F6] rounded-md hover:bg-[#594333] transition-colors duration-200 whitespace-nowrap shrink-0"
            >
              <span>{hero.primaryCta}</span>
              <ArrowRight className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
            </a>

            <a
              href="#work"
              className="inline-flex items-center justify-center px-7 py-3.5 text-[15px] font-medium text-[#191919] bg-transparent border border-[#30251D]/25 rounded-md hover:border-[#30251D] hover:bg-[#E9E1D6]/45 transition-colors duration-200 whitespace-nowrap shrink-0"
            >
              {hero.secondaryCta}
            </a>
          </div>
        </div>

        {/* Multi-Device Portfolio Visual Composition */}
        <figure className="mt-12 sm:mt-16 lg:mt-20">
          <div className="rounded-xl overflow-hidden border border-[#E4DCD1] bg-[#E9E1D6]/50">
            <ResilientImage
              src={hero.showcaseImage}
              alt={hero.showcaseAlt}
              fallbackTitle="Multi-Device Studio Showcase"
              fallbackSubtitle="Desktop, tablet, and mobile layouts crafted for small businesses"
              loading="eager"
              containerClassName="aspect-[16/9] w-full"
              className="w-full h-full object-cover"
            />
          </div>
          <figcaption className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-[13px] text-[#77716B]">
            <span>
              Responsive across desktop, tablet, and mobile · Hospitality, Retail &amp; Local Services
            </span>
            <span>
              Designed &amp; built in {siteConfig.brand.location}
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
