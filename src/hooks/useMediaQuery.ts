'use client';

import { useEffect, useState } from 'react';

interface MediaQueryProps {
  minWidth: number;
  maxWidth?: number;
}

export function useMediaQuery({
  minWidth,
  maxWidth = 999999,
}: MediaQueryProps) {
  const [isMedia, setIsMedia] = useState(checkMediaSize(minWidth, maxWidth));

  useEffect(() => {
    const handleIsDesktop = () => {
      if (maxWidth < minWidth) {
        throw new Error('useMediaQuery Error: maxWidth < minWidth');
      }
      setIsMedia(checkMediaSize(minWidth, maxWidth));
    };

    window.addEventListener('resize', () => {
      handleIsDesktop();
    });

    handleIsDesktop();

    return () => {
      window.removeEventListener('resize', () => handleIsDesktop());
    };
  }, [maxWidth, minWidth]);

  return isMedia;
}

function checkMediaSize(minWidth: number, maxWidth: number) {
  return window.innerWidth >= minWidth && window.innerWidth <= maxWidth;
}
