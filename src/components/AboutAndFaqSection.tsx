import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export function AboutAndFaqSection() {
  const { about, faqs } = siteConfig;
  const [openFaqId, setOpenFaqId] = useState<string | null>(faqs[0]?.id ?? null);

  const toggleFaq = (id: string) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <>
      {/* Section 9: About Us */}
      <section
        id="about"
        aria-labelledby="about-heading"
        className="bg-[#FFFFFF] py-20 lg:py-28 border-b border-[#E4DCD1]"
      >
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <p className="text-[13px] font-medium text-[#594333] mb-4">
                {about.kicker}
              </p>
              <h2
                id="about-heading"
                className="font-serif text-[2rem] sm:text-[2.65rem] leading-[1.12] text-[#191919] mb-6"
              >
                {about.headline}
              </h2>
              <p className="font-serif italic text-[1.25rem] leading-[1.5] text-[#594333]">
                &ldquo;{siteConfig.brand.tagline}&rdquo;
              </p>
            </div>

            <div className="lg:col-span-7">
              <div className="space-y-5 text-[16px] sm:text-[17px] leading-[1.75] text-[#191919]/85 max-w-[62ch]">
                {about.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <dl className="mt-10 pt-8 border-t border-[#E4DCD1] grid grid-cols-1 sm:grid-cols-3 gap-6">
                {about.facts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="text-[12.5px] font-medium text-[#77716B] mb-1.5">
                      {fact.label}
                    </dt>
                    <dd className="text-[14.5px] font-medium text-[#191919] leading-[1.5]">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Section 10: FAQ Section */}
      <section
        id="faq"
        aria-labelledby="faq-heading"
        className="bg-[#FAF9F6] py-20 lg:py-28 border-b border-[#E4DCD1]"
      >
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-4 lg:sticky lg:top-28">
              <p className="text-[13px] font-medium text-[#594333] mb-3.5">
                Common Questions
              </p>
              <h2
                id="faq-heading"
                className="font-serif text-[2rem] sm:text-[2.45rem] leading-[1.14] text-[#191919] mb-4"
              >
                Straightforward answers before we begin.
              </h2>
              <p className="text-[15px] leading-[1.68] text-[#5C5650]">
                Have a question that isn&apos;t listed here? Reach out directly below and we will be happy to walk you through it.
              </p>
            </div>

            <div className="lg:col-span-8 divide-y divide-[#E4DCD1] border-t border-b border-[#E4DCD1]">
              {faqs.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div key={faq.id}>
                    <h3 className="font-sans">
                      <button
                        type="button"
                        onClick={() => toggleFaq(faq.id)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-panel-${faq.id}`}
                        id={`faq-trigger-${faq.id}`}
                        className="w-full py-6 text-left flex items-center justify-between gap-6 cursor-pointer group"
                      >
                        <span className="font-serif text-[1.25rem] sm:text-[1.35rem] leading-[1.3] text-[#191919] group-hover:text-[#594333] transition-colors">
                          {faq.question}
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-[#594333] shrink-0 transition-transform duration-200 ${
                            isOpen ? 'rotate-180' : 'rotate-0'
                          }`}
                          strokeWidth={1.75}
                          aria-hidden="true"
                        />
                      </button>
                    </h3>

                    <div
                      id={`faq-panel-${faq.id}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${faq.id}`}
                      hidden={!isOpen}
                      className="pb-6 pr-8"
                    >
                      <p className="text-[15px] leading-[1.72] text-[#5C5650] max-w-[66ch]">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
