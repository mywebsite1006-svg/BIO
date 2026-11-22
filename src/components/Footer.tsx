import { siteConfig } from '../config/siteConfig';

interface FooterProps {
  onSelectService: (websiteType: string) => void;
}

export function Footer({ onSelectService }: FooterProps) {
  const { brand, navigation, services, contact, social } = siteConfig;

  return (
    <footer className="bg-[#FAF9F6] border-t border-[#E4DCD1] pt-16 pb-12">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-[#E4DCD1]">
          {/* Brand Column */}
          <div className="lg:col-span-4 pr-0 lg:pr-6">
            <a
              href="#home"
              className="font-serif text-[1.6rem] leading-none tracking-tight text-[#191919] hover:text-[#594333] transition-colors inline-block mb-4"
            >
              {brand.wordmark}
            </a>
            <p className="text-[14.5px] leading-[1.7] text-[#5C5650] mb-5 max-w-sm">
              {brand.tagline}
            </p>
            <p className="text-[13px] text-[#77716B]">{brand.location}</p>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2">
            <p className="text-[13px] font-semibold text-[#191919] mb-4">Navigation</p>
            <ul className="space-y-2.5 text-[14px]">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-[#5C5650] hover:text-[#191919] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#faq"
                  className="text-[#5C5650] hover:text-[#191919] transition-colors"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Services Links */}
          <div className="lg:col-span-3">
            <p className="text-[13px] font-semibold text-[#191919] mb-4">Services</p>
            <ul className="space-y-2.5 text-[14px]">
              {services.map((service) => (
                <li key={service.id}>
                  <button
                    type="button"
                    onClick={() => onSelectService(service.formTypeValue)}
                    className="text-left text-[#5C5650] hover:text-[#191919] transition-colors cursor-pointer"
                  >
                    {service.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social Placeholders */}
          <div className="lg:col-span-3">
            <p className="text-[13px] font-semibold text-[#191919] mb-4">Get in Touch</p>
            <ul className="space-y-2.5 text-[14px] text-[#5C5650] mb-6">
              <li>{contact.officeLocation}</li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="hover:text-[#191919] transition-colors break-all"
                >
                  {contact.email}
                </a>
              </li>
              <li className="tabular-nums">{contact.phoneDisplay}</li>
            </ul>

            <p className="text-[13px] font-semibold text-[#191919] mb-2.5">Social</p>
            <div className="flex flex-col gap-1.5 text-[14px]">
              <a
                href={social.instagram.url}
                target={social.instagram.isPlaceholder ? undefined : '_blank'}
                rel={social.instagram.isPlaceholder ? undefined : 'noopener noreferrer'}
                className="text-[#5C5650] hover:text-[#191919] transition-colors"
              >
                {social.instagram.label}{' '}
                <span className="text-[12.5px] text-[#77716B]">
                  ({social.instagram.isPlaceholder ? 'Placeholder' : social.instagram.handle})
                </span>
              </a>
              <a
                href={social.facebook.url}
                target={social.facebook.isPlaceholder ? undefined : '_blank'}
                rel={social.facebook.isPlaceholder ? undefined : 'noopener noreferrer'}
                className="text-[#5C5650] hover:text-[#191919] transition-colors"
              >
                {social.facebook.label}{' '}
                <span className="text-[12.5px] text-[#77716B]">
                  ({social.facebook.isPlaceholder ? 'Placeholder' : social.facebook.handle})
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Quiet Copyright Strip */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-[13px] text-[#77716B]">
          <p>
            &copy; {brand.copyrightYear} {brand.name}. All rights reserved.
          </p>
          <p>{brand.serviceArea}</p>
        </div>
      </div>
    </footer>
  );
}
