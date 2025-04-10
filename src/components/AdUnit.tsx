import React, { useEffect, useRef } from 'react';

interface AdUnitProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  responsive?: boolean;
  className?: string;
}

const AdUnit: React.FC<AdUnitProps> = ({ slot, format = 'auto', responsive = true, className = '' }) => {
  const adRef = useRef<HTMLDivElement>(null);
  const isContentLoaded = useRef(false);

  useEffect(() => {
    // Only load ads when there's actual content
    const checkContent = () => {
      if (adRef.current && !isContentLoaded.current) {
        const nearbyContent = adRef.current.closest('article, section, main');
        if (nearbyContent && nearbyContent.textContent && nearbyContent.textContent.length > 500) {
          isContentLoaded.current = true;
          try {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          } catch (error) {
            console.error('Error loading AdSense ad:', error);
          }
        }
      }
    };

    // Check initially and after content might have loaded
    checkContent();
    const observer = new MutationObserver(checkContent);
    
    if (adRef.current) {
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={adRef} className={`ad-container my-4 ${className}`}>
      <div className="text-xs text-gray-500 mb-1">Advertisement</div>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', minHeight: '280px', background: 'transparent' }}
        data-ad-client="ca-pub-9774323877072715"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
        data-adtest="on"
      />
    </div>
  );
};

export default AdUnit;