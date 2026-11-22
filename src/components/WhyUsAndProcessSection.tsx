import { siteConfig } from '../config/siteConfig';

export function WhyUsAndProcessSection() {
  const { whyUs, process } = siteConfig;

  return (
    <>
      {/* Section 7: Why Build It Once (Deep Espresso Editorial Band) */}
      <section
        aria-labelledby="why-us-heading"
        className="bg-[#30251D] text-[#FAF9F6] py-20 lg:py-28"
      >
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <p className="text-[13px] font-medium text-[#E9E1D6] tracking-[0.015em] mb-4">
                {whyUs.kicker}
              </p>
              <h2
                id="why-us-heading"
                className="font-serif text-[2rem] sm:text-[2.6rem] leading-[1.12] text-[#FAF9F6] mb-6"
              >
                {whyUs.headline}
              </h2>
              <p className="text-[15.5px] sm:text-[16.5px] leading-[1.72] text-[#E9E1D6]/90 tracking-[0.005em]">
                {whyUs.philosophy}
              </p>
            </div>

            <div className="lg:col-span-7 divide-y divide-[#FAF9F6]/15 border-t border-b border-[#FAF9F6]/15">
              {whyUs.points.map((point, index) => (
                <div
                  key={point.title}
                  className="py-6 sm:py-7 grid grid-cols-1 sm:grid-cols-12 gap-2.5 sm:gap-6 items-baseline"
                >
                  <div className="sm:col-span-2">
                    <span className="text-[13px] font-medium text-[#E9E1D6]/70 tabular-nums">
                      0{index + 1}
                    </span>
                  </div>
                  <div className="sm:col-span-10">
                    <h3 className="font-serif text-[1.35rem] text-[#FAF9F6] mb-1.5">
                      {point.title}
                    </h3>
                    <p className="text-[14.5px] leading-[1.68] text-[#E9E1D6]/85 tracking-[0.005em]">
                      {point.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Our Process */}
      <section
        aria-labelledby="process-heading"
        className="bg-[#FAF9F6] py-20 lg:py-28 border-b border-[#E4DCD1]"
      >
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
          <div className="max-w-2xl mb-14 lg:mb-16">
            <p className="text-[13px] font-medium text-[#594333] mb-3.5">
              {process.kicker}
            </p>
            <h2
              id="process-heading"
              className="font-serif text-[2rem] sm:text-[2.6rem] leading-[1.12] text-[#191919]"
            >
              {process.headline}
            </h2>
          </div>

          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-7">
            {process.steps.map((step) => (
              <li
                key={step.number}
                className="pt-6 border-t border-[#30251D]/25 flex flex-col"
              >
                <span className="font-serif text-[2rem] leading-none text-[#594333] tabular-nums mb-5">
                  {step.number}
                </span>
                <h3 className="font-serif text-[1.45rem] text-[#191919] mb-2.5">
                  {step.title}
                </h3>
                <p className="text-[15px] leading-[1.68] text-[#5C5650]">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
