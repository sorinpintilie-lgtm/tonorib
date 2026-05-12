'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Returns a ref and a boolean `isVisible` that becomes true once the element
 * enters the viewport. Disconnects after first trigger so it never fires twice.
 */
export function useIntersectionObserver<T extends Element>(
  threshold = 0.12
) {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}
