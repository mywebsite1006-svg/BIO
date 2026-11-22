import { siteConfig } from '../config/siteConfig';

export function ValuePropositionSection() {
  const { valueProposition } = siteConfig;

  return (
    <section
      aria-labelledby="value-prop-heading"
      className="bg-[#FFFFFF] border-y border-[#E4DCD1] py-20 lg:py-28"
    >
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Narrative Column */}
          <div className="lg:col-span-5">
            <p className="text-[13px] font-medium text-[#594333] mb-4">
              {valueProposition.kicker}
            </p>
            <h2
              id="value-prop-heading"
              className="font-serif text-[2rem] sm:text-[2.5rem] lg:text-[2.75rem] leading-[1.12] text-[#191919] mb-6"
            >
              {valueProposition.headline}
            </h2>
            <p className="text-[15.5px] sm:text-[16px] leading-[1.7] text-[#5C5650]">
              {valueProposition.lead}
            </p>
          </div>

          {/* Right Editorial Pillar Index */}
          <div className="lg:col-span-7 divide-y divide-[#E4DCD1] border-t border-b border-[#E4DCD1]">
            {valueProposition.pillars.map((pillar) => (
              <div
                key={pillar.number}
                className="py-7 sm:py-8 grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 items-baseline"
              >
                <div className="sm:col-span-2">
                  <span className="text-[13px] font-medium text-[#77716B] tabular-nums">
                    {pillar.number}
                  </span>
                </div>
                <div className="sm:col-span-10">
                  <h3 className="font-serif text-[1.4rem] sm:text-[1.55rem] text-[#191919] mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-[15px] leading-[1.68] text-[#5C5650] max-w-[54ch]">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
