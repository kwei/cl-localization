'use client';

import { useCallback, useEffect, useState } from 'react';

interface MediaQueryProps {
  minWidth: number;
  maxWidth?: number;
}

export function useMediaQuery({
  minWidth,
  maxWidth = 999999,
}: MediaQueryProps) {
  const [isMedia, setIsMedia] = useState(checkMediaSize(minWidth, maxWidth));

  const handleIsDesktop = useCallback(() => {
    if (maxWidth < minWidth) {
      throw new Error('useMediaQuery Error: maxWidth < minWidth');
    }
    setIsMedia(checkMediaSize(minWidth, maxWidth));
  }, [maxWidth, minWidth]);

  useEffect(() => {
    window.addEventListener('resize', () => {
      handleIsDesktop();
    });
    handleIsDesktop();
    return () => {
      window.removeEventListener('resize', () => handleIsDesktop());
    };
  }, [handleIsDesktop]);

  return isMedia;
}

function checkMediaSize(minWidth: number, maxWidth: number) {
  return window.innerWidth >= minWidth && window.innerWidth <= maxWidth;
}
