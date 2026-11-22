import { useEffect, useState } from 'react';
import { ArrowRight, ArrowUpRight, Check, X } from 'lucide-react';
import { ServiceItem, siteConfig } from '../config/siteConfig';

interface ServicesSectionProps {
  onSelectServiceForInquiry: (websiteType: string) => void;
}

export function ServicesSection({ onSelectServiceForInquiry }: ServicesSectionProps) {
  const [activeService, setActiveService] = useState<ServiceItem | null>(null);

  useEffect(() => {
    if (!activeService) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveService(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeService]);

  const handleInquireClick = (service: ServiceItem) => {
    setActiveService(null);
    onSelectServiceForInquiry(service.formTypeValue);
  };

  return (
    <section id="services" aria-labelledby="services-heading" className="bg-[#FAF9F6] py-20 lg:py-28">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14 lg:mb-16">
          <div className="max-w-2xl">
            <p className="text-[13px] font-medium text-[#594333] mb-3.5">Services</p>
            <h2
              id="services-heading"
              className="font-serif text-[2rem] sm:text-[2.6rem] leading-[1.12] text-[#191919]"
            >
              Everything a small business needs online, done well.
            </h2>
          </div>
          <p className="text-[15px] leading-[1.65] text-[#5C5650] max-w-md">
            Whether you are launching your very first website or replacing an outdated one, we keep the process straightforward and transparent.
          </p>
        </div>

        {/* Hairline Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {siteConfig.services.map((service) => (
            <article
              key={service.id}
              className="group bg-[#FFFFFF] border border-[#E4DCD1] rounded-xl p-7 sm:p-8 flex flex-col justify-between transition-colors duration-200 hover:border-[#594333]/50"
            >
              <div>
                <div className="flex items-center justify-between text-[13px] text-[#77716B] mb-5">
                  <span className="tabular-nums font-medium">{service.number}</span>
                  <span>{service.typicalTimeline}</span>
                </div>

                <h3 className="font-serif text-[1.5rem] leading-[1.2] text-[#191919] mb-3.5">
                  {service.title}
                </h3>

                <p className="text-[15px] leading-[1.68] text-[#5C5650]">
                  {service.shortDescription}
                </p>
              </div>

              <div className="mt-7 pt-5 border-t border-[#E4DCD1]/80 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setActiveService(service)}
                  className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#30251D] hover:text-[#594333] transition-colors cursor-pointer py-1"
                >
                  <span>Learn More</span>
                  <ArrowUpRight
                    className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Service Detail Modal */}
      {activeService && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="service-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#191919]/55 backdrop-blur-[2px]"
          onClick={() => setActiveService(null)}
        >
          <div
            className="bg-[#FAF9F6] border border-[#E4DCD1] rounded-xl max-w-xl w-full max-h-[90vh] overflow-y-auto p-7 sm:p-9 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <p className="text-[13px] text-[#594333] font-medium mb-1.5 tabular-nums">
                  Service {activeService.number} · {activeService.typicalTimeline}
                </p>
                <h3
                  id="service-modal-title"
                  className="font-serif text-[1.9rem] leading-[1.15] text-[#191919]"
                >
                  {activeService.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveService(null)}
                aria-label="Close service details"
                className="w-10 h-10 rounded-md inline-flex items-center justify-center text-[#5C5650] hover:text-[#191919] hover:bg-[#E9E1D6]/70 transition-colors shrink-0 cursor-pointer"
              >
                <X className="w-5 h-5" strokeWidth={1.75} aria-hidden="true" />
              </button>
            </div>

            <p className="text-[15.5px] leading-[1.7] text-[#5C5650] mb-6">
              {activeService.overview}
            </p>

            <div className="py-4 border-y border-[#E4DCD1] mb-6">
              <p className="text-[12.5px] font-medium text-[#77716B] mb-1">Ideal for</p>
              <p className="text-[14.5px] text-[#191919]">{activeService.idealFor}</p>
            </div>

            <div className="mb-8">
              <p className="text-[13px] font-medium text-[#594333] mb-3.5">
                What is typically included
              </p>
              <ul className="space-y-2.5">
                {activeService.deliverables.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[14.5px] text-[#191919]">
                    <Check
                      className="w-4 h-4 text-[#594333] mt-0.5 shrink-0"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-[#E4DCD1]">
              <button
                type="button"
                onClick={() => setActiveService(null)}
                className="px-5 py-2.5 text-[14px] font-medium text-[#5C5650] hover:text-[#191919] transition-colors cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => handleInquireClick(activeService)}
                className="inline-flex items-center gap-2 px-6 py-2.5 text-[14px] font-medium bg-[#30251D] text-[#FAF9F6] rounded-md hover:bg-[#594333] transition-colors cursor-pointer"
              >
                <span>Inquire About This Service</span>
                <ArrowRight className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
