import { ArrowRight, Check } from 'lucide-react';
import { PricingPackage, siteConfig } from '../config/siteConfig';

interface PricingSectionProps {
  onSelectPackage: (budgetOptionValue: string, packageName: string) => void;
}

export function PricingSection({ onSelectPackage }: PricingSectionProps) {
  const { pricing } = siteConfig;

  return (
    <section id="pricing" aria-labelledby="pricing-heading" className="bg-[#FAF9F6] py-20 lg:py-28">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="max-w-2xl mb-14 lg:mb-16">
          <p className="text-[13px] font-medium text-[#594333] mb-3.5">
            {pricing.kicker}
          </p>
          <h2
            id="pricing-heading"
            className="font-serif text-[2rem] sm:text-[2.65rem] leading-[1.12] text-[#191919] mb-5"
          >
            {pricing.headline}
          </h2>
          <p className="text-[15.5px] sm:text-[16px] leading-[1.7] text-[#5C5650]">
            {pricing.lead}
          </p>
        </div>

        {/* Pricing Packages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {pricing.packages.map((pkg: PricingPackage) => {
            const isHighlighted = Boolean(pkg.highlighted);
            return (
              <article
                key={pkg.id}
                className={`rounded-xl p-7 sm:p-8 flex flex-col justify-between transition-colors ${
                  isHighlighted
                    ? 'bg-[#30251D] text-[#FAF9F6] border border-[#30251D]'
                    : 'bg-[#FFFFFF] text-[#191919] border border-[#E4DCD1]'
                }`}
              >
                <div>
                  <div className="flex items-baseline justify-between gap-3 mb-2">
                    <h3
                      className={`font-serif text-[1.75rem] leading-tight ${
                        isHighlighted ? 'text-[#FAF9F6]' : 'text-[#191919]'
                      }`}
                    >
                      {pkg.name}
                    </h3>
                    {isHighlighted && (
                      <span className="text-[12.5px] font-medium text-[#E9E1D6] whitespace-nowrap">
                        Recommended
                      </span>
                    )}
                  </div>

                  <p
                    className={`text-[14.5px] leading-[1.6] mb-7 ${
                      isHighlighted ? 'text-[#E9E1D6]/90' : 'text-[#5C5650]'
                    }`}
                  >
                    {pkg.tagline}
                  </p>

                  {/* Configurable INR Placeholder Price */}
                  <div
                    className={`pb-7 mb-7 border-b ${
                      isHighlighted ? 'border-[#FAF9F6]/15' : 'border-[#E4DCD1]'
                    }`}
                  >
                    <div
                      className={`font-serif text-[2.25rem] leading-none tracking-tight tabular-nums ${
                        isHighlighted ? 'text-[#FAF9F6]' : 'text-[#191919]'
                      }`}
                    >
                      {pkg.pricePlaceholder}
                    </div>
                    <p
                      className={`text-[12.5px] mt-2.5 ${
                        isHighlighted ? 'text-[#E9E1D6]/75' : 'text-[#77716B]'
                      }`}
                    >
                      {pkg.priceNote}
                    </p>
                  </div>

                  {/* Deliverables List */}
                  <ul className="space-y-3.5 mb-9">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-[14.5px] leading-[1.55]">
                        <Check
                          className={`w-4 h-4 mt-0.5 shrink-0 ${
                            isHighlighted ? 'text-[#E9E1D6]' : 'text-[#594333]'
                          }`}
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                        <span
                          className={
                            isHighlighted ? 'text-[#FAF9F6]/95' : 'text-[#191919]'
                          }
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectPackage(pkg.budgetOptionValue, pkg.name)}
                  className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-[14.5px] font-medium rounded-md transition-colors duration-200 cursor-pointer whitespace-nowrap ${
                    isHighlighted
                      ? 'bg-[#FAF9F6] text-[#30251D] hover:bg-[#E9E1D6]'
                      : 'bg-[#30251D] text-[#FAF9F6] hover:bg-[#594333]'
                  }`}
                >
                  <span>{pkg.ctaLabel}</span>
                  <ArrowRight className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                </button>
              </article>
            );
          })}
        </div>

        {/* Custom Quote Band & Transparent Pricing Disclaimer */}
        <div className="mt-10 bg-[#FFFFFF] border border-[#E4DCD1] rounded-xl p-7 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h3 className="font-serif text-[1.45rem] text-[#191919] mb-2">
              Need something tailored to your exact requirements?
            </h3>
            <p className="text-[14.5px] leading-[1.68] text-[#5C5650]">
              {pricing.disclaimer}
            </p>
          </div>
          <button
            type="button"
            onClick={() =>
              onSelectPackage(
                'Not sure yet — request custom quote',
                'Custom Quote'
              )
            }
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-[14.5px] font-medium border border-[#30251D] text-[#30251D] rounded-md hover:bg-[#30251D] hover:text-[#FAF9F6] transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Get a Custom Quote</span>
            <ArrowRight className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
