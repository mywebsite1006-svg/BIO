import { FormEvent, useEffect, useState } from 'react';
import {
  AlertCircle,
  Check,
  Copy,
  Mail,
  MapPin,
  MessageCircle,
  Send,
} from 'lucide-react';
import { buildWhatsAppHref, siteConfig } from '../config/siteConfig';

export interface ContactPrefill {
  websiteType?: string;
  budget?: string;
  note?: string;
  version: number;
}

interface ContactSectionProps {
  prefill: ContactPrefill;
}

interface FormValues {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  websiteType: string;
  budget: string;
  description: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

const INITIAL_FORM: FormValues = {
  name: '',
  businessName: '',
  email: '',
  phone: '',
  websiteType: siteConfig.contactFormOptions.websiteTypes[0],
  budget: siteConfig.contactFormOptions.budgetRanges[1],
  description: '',
};

function validateForm(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.name.trim() || values.name.trim().length < 2) {
    errors.name = 'Please enter your name.';
  }

  if (!values.businessName.trim()) {
    errors.businessName = 'Please enter your business or project name.';
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!values.email.trim()) {
    errors.email = 'Please enter your email address.';
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  const phoneDigits = values.phone.replace(/[^\d]/g, '');
  if (!values.phone.trim()) {
    errors.phone = 'Please enter your phone or WhatsApp number.';
  } else if (phoneDigits.length < 10 || phoneDigits.length > 15) {
    errors.phone = 'Please enter a valid 10-digit phone number.';
  }

  if (!values.websiteType) {
    errors.websiteType = 'Please choose a website type.';
  }

  if (!values.budget) {
    errors.budget = 'Please select an approximate budget or package.';
  }

  if (!values.description.trim() || values.description.trim().length < 15) {
    errors.description =
      'Please share a short note about your business and what you need (at least 15 characters).';
  }

  return errors;
}

export function ContactSection({ prefill }: ContactSectionProps) {
  const [values, setValues] = useState<FormValues>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMode, setSubmitMode] = useState<'idle' | 'prepared' | 'sent' | 'error'>('idle');
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedSnapshot, setSubmittedSnapshot] = useState<FormValues | null>(null);
  const [copiedSummary, setCopiedSummary] = useState(false);
  const [showWhatsAppNotice, setShowWhatsAppNotice] = useState(false);

  useEffect(() => {
    if (prefill.version === 0) return;
    setValues((prev) => ({
      ...prev,
      websiteType: prefill.websiteType || prev.websiteType,
      budget: prefill.budget || prev.budget,
      description: prefill.note ? prefill.note : prev.description,
    }));
    setSubmitMode('idle');
    setSubmitError(null);
  }, [prefill]);

  const handleFieldChange = (field: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const formatInquiryText = (data: FormValues) => {
    return [
      `New Website Inquiry — ${siteConfig.brand.name}`,
      `Name: ${data.name}`,
      `Business: ${data.businessName}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      `Website Type: ${data.websiteType}`,
      `Approximate Budget: ${data.budget}`,
      `Project Details: ${data.description}`,
    ].join('\n');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);

    const validationErrors = validateForm(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const endpoint = siteConfig.contact.formEndpoint;

    if (endpoint) {
      setIsSubmitting(true);
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          throw new Error('Submission could not be completed by the configured endpoint.');
        }

        setSubmittedSnapshot(values);
        setSubmitMode('sent');
        setValues(INITIAL_FORM);
      } catch {
        setSubmitMode('error');
        setSubmitError(
          'We could not reach the configured form endpoint right now. You can copy your inquiry summary below or email us directly.'
        );
      } finally {
        setIsSubmitting(false);
      }
      return;
    }

    // No backend endpoint configured yet — validate & present transparent prepared state
    setSubmittedSnapshot(values);
    setSubmitMode('prepared');
  };

  const handleCopySummary = async () => {
    if (!submittedSnapshot) return;
    try {
      await navigator.clipboard.writeText(formatInquiryText(submittedSnapshot));
      setCopiedSummary(true);
      setTimeout(() => setCopiedSummary(false), 2500);
    } catch {
      setCopiedSummary(false);
    }
  };

  const handleResetForm = () => {
    setValues(INITIAL_FORM);
    setErrors({});
    setSubmitMode('idle');
    setSubmittedSnapshot(null);
    setSubmitError(null);
  };

  const whatsappHref = buildWhatsAppHref(
    submittedSnapshot
      ? formatInquiryText(submittedSnapshot)
      : siteConfig.contact.whatsappDefaultMessage
  );

  const mailtoSubject = encodeURIComponent(
    submittedSnapshot
      ? `Website Inquiry: ${submittedSnapshot.businessName}`
      : 'Website Inquiry — Build It Once'
  );
  const mailtoBody = encodeURIComponent(
    submittedSnapshot
      ? formatInquiryText(submittedSnapshot)
      : 'Hello Build It Once,\n\nI would like to discuss a website for my business.'
  );
  const mailtoHref = `mailto:${siteConfig.contact.email}?subject=${mailtoSubject}&body=${mailtoBody}`;

  const inputBaseClass =
    'w-full bg-[#FAF9F6] border rounded-md px-3.5 py-2.5 text-[15px] text-[#191919] placeholder:text-[#77716B]/80 transition-colors focus:outline-none focus:border-[#30251D] focus:bg-[#FFFFFF]';

  return (
    <section id="contact" aria-labelledby="contact-heading" className="bg-[#FFFFFF] py-20 lg:py-28">
      <div className="max-w-[1200px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Studio Details Column */}
          <div className="lg:col-span-5">
            <p className="text-[13px] font-medium text-[#594333] mb-3.5">Contact</p>
            <h2
              id="contact-heading"
              className="font-serif text-[2.1rem] sm:text-[2.75rem] leading-[1.1] text-[#191919] mb-5"
            >
              Let&apos;s build something good.
            </h2>
            <p className="text-[15.5px] sm:text-[16px] leading-[1.7] text-[#5C5650] mb-9">
              Have a business idea or need a website? Tell us what you&apos;re looking for. We&apos;ll help you find the right solution for your business and budget.
            </p>

            {/* Direct Contact Actions */}
            <div className="space-y-3.5 mb-9">
              {whatsappHref ? (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-[14.5px] font-medium bg-[#30251D] text-[#FAF9F6] rounded-md hover:bg-[#594333] transition-colors whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                  <span>Chat on WhatsApp</span>
                </a>
              ) : (
                <div>
                  <button
                    type="button"
                    onClick={() => setShowWhatsAppNotice((prev) => !prev)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-[14.5px] font-medium bg-[#30251D] text-[#FAF9F6] rounded-md hover:bg-[#594333] transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <MessageCircle className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                    <span>Chat on WhatsApp</span>
                  </button>
                  {showWhatsAppNotice && (
                    <p className="mt-2.5 text-[13px] leading-[1.6] text-[#5C5650] bg-[#FAF9F6] border border-[#E4DCD1] rounded-md p-3.5">
                      WhatsApp integration is ready. Add your live studio phone number to{' '}
                      <code className="text-[#30251D] font-medium">
                        contact.whatsappNumber
                      </code>{' '}
                      in{' '}
                      <code className="text-[#30251D] font-medium">
                        src/config/siteConfig.ts
                      </code>{' '}
                      to activate direct click-to-chat links.
                    </p>
                  )}
                </div>
              )}

              <div>
                <a
                  href={mailtoHref}
                  className="inline-flex items-center gap-2.5 text-[14.5px] font-medium text-[#30251D] hover:text-[#594333] transition-colors py-1"
                >
                  <Mail className="w-4 h-4 text-[#594333]" strokeWidth={1.75} aria-hidden="true" />
                  <span>{siteConfig.contact.email}</span>
                </a>
              </div>
            </div>

            {/* Studio Metadata Block */}
            <dl className="pt-7 border-t border-[#E4DCD1] space-y-5 text-[14.5px]">
              <div>
                <dt className="text-[12.5px] font-medium text-[#77716B] mb-1">Location</dt>
                <dd className="flex items-center gap-2 text-[#191919] font-medium">
                  <MapPin className="w-4 h-4 text-[#594333] shrink-0" strokeWidth={1.75} aria-hidden="true" />
                  <span>{siteConfig.contact.officeLocation}</span>
                </dd>
              </div>

              <div>
                <dt className="text-[12.5px] font-medium text-[#77716B] mb-1">
                  Phone / WhatsApp
                </dt>
                <dd className="text-[#191919] tabular-nums">{siteConfig.contact.phoneDisplay}</dd>
              </div>

              <div>
                <dt className="text-[12.5px] font-medium text-[#77716B] mb-1">Studio Hours</dt>
                <dd className="text-[#5C5650]">{siteConfig.contact.officeHours}</dd>
              </div>
            </dl>

            {siteConfig.contact.isPlaceholder && (
              <p className="mt-7 text-[12.5px] leading-[1.6] text-[#77716B] pt-5 border-t border-[#E4DCD1]/70">
                Contact details above are clearly marked editable placeholders. Update them from a single file:{' '}
                <span className="text-[#594333] font-medium">src/config/siteConfig.ts</span>.
              </p>
            )}
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7 bg-[#FAF9F6] border border-[#E4DCD1] rounded-xl p-6 sm:p-9">
            {submitMode === 'prepared' || submitMode === 'sent' ? (
              <div role="status" aria-live="polite" className="space-y-6">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-[#30251D] text-[#FAF9F6] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-4 h-4" strokeWidth={2.25} aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-serif text-[1.65rem] text-[#191919] leading-tight">
                      {submitMode === 'sent'
                        ? 'Thank you — your inquiry has been sent.'
                        : 'Your inquiry has been validated and prepared.'}
                    </h3>
                    <p className="text-[14.5px] leading-[1.65] text-[#5C5650] mt-2">
                      {submitMode === 'sent'
                        ? 'We have received your project details and will get back to you promptly.'
                        : 'No backend form endpoint is connected yet, so nothing was transmitted to a server. You can copy your structured brief below or open it in your email app—and when ready for production, add a form endpoint in src/config/siteConfig.ts.'}
                    </p>
                  </div>
                </div>

                {submittedSnapshot && (
                  <div className="bg-[#FFFFFF] border border-[#E4DCD1] rounded-lg p-5 space-y-2.5 text-[14px]">
                    <p className="text-[12.5px] font-medium text-[#594333] mb-2">
                      Captured Inquiry Summary
                    </p>
                    <p>
                      <span className="text-[#77716B]">Name:</span>{' '}
                      <span className="text-[#191919] font-medium">{submittedSnapshot.name}</span>
                    </p>
                    <p>
                      <span className="text-[#77716B]">Business:</span>{' '}
                      <span className="text-[#191919] font-medium">
                        {submittedSnapshot.businessName}
                      </span>
                    </p>
                    <p>
                      <span className="text-[#77716B]">Contact:</span>{' '}
                      <span className="text-[#191919]">
                        {submittedSnapshot.email} · {submittedSnapshot.phone}
                      </span>
                    </p>
                    <p>
                      <span className="text-[#77716B]">Scope:</span>{' '}
                      <span className="text-[#191919]">
                        {submittedSnapshot.websiteType} · {submittedSnapshot.budget}
                      </span>
                    </p>
                    <p className="pt-2 border-t border-[#E4DCD1]/70 text-[#5C5650] leading-[1.6]">
                      {submittedSnapshot.description}
                    </p>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleCopySummary}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-[14px] font-medium bg-[#30251D] text-[#FAF9F6] rounded-md hover:bg-[#594333] transition-colors cursor-pointer"
                  >
                    {copiedSummary ? (
                      <>
                        <Check className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
                        <span>Summary Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                        <span>Copy Inquiry Summary</span>
                      </>
                    )}
                  </button>

                  <a
                    href={mailtoHref}
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-[14px] font-medium border border-[#30251D]/25 text-[#191919] rounded-md hover:border-[#30251D] transition-colors"
                  >
                    <Mail className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                    <span>Open Email Draft</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="px-4 py-2.5 text-[14px] font-medium text-[#5C5650] hover:text-[#191919] transition-colors cursor-pointer"
                  >
                    Start Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="mb-2">
                  <h3 className="font-serif text-[1.6rem] text-[#191919]">
                    Tell us about your project
                  </h3>
                  <p className="text-[14px] text-[#5C5650] mt-1">
                    Share a few details below and we will help recommend the right scope.
                  </p>
                </div>

                {submitError && (
                  <div
                    role="alert"
                    className="flex items-start gap-2.5 p-4 rounded-md bg-[#FFFFFF] border border-[#8C2D19]/40 text-[#8C2D19] text-[13.5px]"
                  >
                    <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" aria-hidden="true" />
                    <span>{submitError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-[13.5px] font-medium text-[#191919] mb-1.5"
                    >
                      Your name <span className="text-[#594333]">*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={values.name}
                      onChange={(e) => handleFieldChange('name', e.target.value)}
                      placeholder="e.g. Arun Nair"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby={errors.name ? 'contact-name-error' : undefined}
                      className={`${inputBaseClass} ${
                        errors.name ? 'border-[#8C2D19]' : 'border-[#D8CFC3]'
                      }`}
                    />
                    {errors.name && (
                      <p
                        id="contact-name-error"
                        className="mt-1.5 flex items-center gap-1.5 text-[12.5px] text-[#8C2D19]"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Business Name */}
                  <div>
                    <label
                      htmlFor="contact-business"
                      className="block text-[13.5px] font-medium text-[#191919] mb-1.5"
                    >
                      Business name <span className="text-[#594333]">*</span>
                    </label>
                    <input
                      id="contact-business"
                      name="businessName"
                      type="text"
                      autoComplete="organization"
                      value={values.businessName}
                      onChange={(e) => handleFieldChange('businessName', e.target.value)}
                      placeholder="e.g. Malabar Spice Kitchen"
                      aria-invalid={Boolean(errors.businessName)}
                      aria-describedby={errors.businessName ? 'contact-business-error' : undefined}
                      className={`${inputBaseClass} ${
                        errors.businessName ? 'border-[#8C2D19]' : 'border-[#D8CFC3]'
                      }`}
                    />
                    {errors.businessName && (
                      <p
                        id="contact-business-error"
                        className="mt-1.5 flex items-center gap-1.5 text-[12.5px] text-[#8C2D19]"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.businessName}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Email */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-[13.5px] font-medium text-[#191919] mb-1.5"
                    >
                      Email address <span className="text-[#594333]">*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={values.email}
                      onChange={(e) => handleFieldChange('email', e.target.value)}
                      placeholder="name@business.com"
                      aria-invalid={Boolean(errors.email)}
                      aria-describedby={errors.email ? 'contact-email-error' : undefined}
                      className={`${inputBaseClass} ${
                        errors.email ? 'border-[#8C2D19]' : 'border-[#D8CFC3]'
                      }`}
                    />
                    {errors.email && (
                      <p
                        id="contact-email-error"
                        className="mt-1.5 flex items-center gap-1.5 text-[12.5px] text-[#8C2D19]"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-[13.5px] font-medium text-[#191919] mb-1.5"
                    >
                      Phone number <span className="text-[#594333]">*</span>
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={values.phone}
                      onChange={(e) => handleFieldChange('phone', e.target.value)}
                      placeholder="+91 98XXX XXXXX"
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
                      className={`${inputBaseClass} ${
                        errors.phone ? 'border-[#8C2D19]' : 'border-[#D8CFC3]'
                      }`}
                    />
                    {errors.phone && (
                      <p
                        id="contact-phone-error"
                        className="mt-1.5 flex items-center gap-1.5 text-[12.5px] text-[#8C2D19]"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Website Type */}
                  <div>
                    <label
                      htmlFor="contact-type"
                      className="block text-[13.5px] font-medium text-[#191919] mb-1.5"
                    >
                      Type of website
                    </label>
                    <select
                      id="contact-type"
                      name="websiteType"
                      value={values.websiteType}
                      onChange={(e) => handleFieldChange('websiteType', e.target.value)}
                      className={`${inputBaseClass} border-[#D8CFC3]`}
                    >
                      {siteConfig.contactFormOptions.websiteTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Approximate Budget */}
                  <div>
                    <label
                      htmlFor="contact-budget"
                      className="block text-[13.5px] font-medium text-[#191919] mb-1.5"
                    >
                      Approximate budget / package
                    </label>
                    <select
                      id="contact-budget"
                      name="budget"
                      value={values.budget}
                      onChange={(e) => handleFieldChange('budget', e.target.value)}
                      className={`${inputBaseClass} border-[#D8CFC3]`}
                    >
                      {siteConfig.contactFormOptions.budgetRanges.map((range) => (
                        <option key={range} value={range}>
                          {range}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Project Description */}
                <div>
                  <label
                    htmlFor="contact-description"
                    className="block text-[13.5px] font-medium text-[#191919] mb-1.5"
                  >
                    Project description <span className="text-[#594333]">*</span>
                  </label>
                  <textarea
                    id="contact-description"
                    name="description"
                    rows={4}
                    value={values.description}
                    onChange={(e) => handleFieldChange('description', e.target.value)}
                    placeholder="Tell us briefly about your business, what you want your website to achieve, and any timeline you have in mind."
                    aria-invalid={Boolean(errors.description)}
                    aria-describedby={errors.description ? 'contact-description-error' : undefined}
                    className={`${inputBaseClass} resize-y ${
                      errors.description ? 'border-[#8C2D19]' : 'border-[#D8CFC3]'
                    }`}
                  />
                  {errors.description && (
                    <p
                      id="contact-description-error"
                      className="mt-1.5 flex items-center gap-1.5 text-[12.5px] text-[#8C2D19]"
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>{errors.description}</span>
                    </p>
                  )}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-[15px] font-medium bg-[#30251D] text-[#FAF9F6] rounded-md hover:bg-[#594333] disabled:opacity-60 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <Send className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                    <span>{isSubmitting ? 'Sending...' : 'Send Project Inquiry'}</span>
                  </button>

                  {!siteConfig.contact.formEndpoint && (
                    <p className="text-[12.5px] leading-[1.5] text-[#77716B] max-w-xs">
                      Ready for backend connection via{' '}
                      <span className="text-[#594333]">contact.formEndpoint</span> in{' '}
                      <span className="text-[#594333]">siteConfig.ts</span>.
                    </p>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
