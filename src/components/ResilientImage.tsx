import { useState } from 'react';
import { Monitor } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  fallbackTitle: string;
  fallbackSubtitle?: string;
  className?: string;
  containerClassName?: string;
  loading?: 'eager' | 'lazy';
}

export function ResilientImage({
  src,
  alt,
  fallbackTitle,
  fallbackSubtitle,
  className = 'w-full h-full object-cover',
  containerClassName = '',
  loading = 'lazy',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-[#E9E1D6] text-[#30251D] p-8 text-center ${containerClassName}`}
      >
        <div className="w-11 h-11 rounded-full border border-[#30251D]/20 flex items-center justify-center mb-3 bg-[#FAF9F6]">
          <Monitor className="w-5 h-5 text-[#594333]" strokeWidth={1.5} aria-hidden="true" />
        </div>
        <p className="font-serif text-lg text-[#30251D]">{fallbackTitle}</p>
        {fallbackSubtitle && (
          <p className="text-xs text-[#5C5650] mt-1">{fallbackSubtitle}</p>
        )}
      </div>
    );
  }

  return (
    <div className={`overflow-hidden bg-[#E9E1D6]/60 ${containerClassName}`}>
      <img
        src={src}
        alt={alt}
        loading={loading}
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        className={className}
      />
    </div>
  );
}
