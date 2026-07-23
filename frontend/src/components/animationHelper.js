import React, { useState, useEffect, useRef } from 'react';

/**
 * Custom hook to trigger scroll reveals on elements.
 * Returns a ref to attach to the target element.
 */
export const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.classList.add('reveal-element');

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add('revealed');
        observer.unobserve(el);
      }
    }, { threshold });

    observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [threshold]);

  return ref;
};

/**
 * ScrollReveal Wrapper Component for easy JSX usage.
 */
export const ScrollReveal = ({ children, className = '', threshold = 0.15 }) => {
  const revealRef = useScrollReveal(threshold);
  return (
    <div ref={revealRef} className={className}>
      {children}
    </div>
  );
};

/**
 * Count up animation hook for statistics.
 */
export const useCountUp = (endValue, duration = 2000, triggerRef) => {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = triggerRef?.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true;
        
        let start = 0;
        const end = parseInt(endValue);
        if (isNaN(end)) {
          setCount(endValue); // Fallback for strings
          return;
        }

        const totalSteps = 60;
        const stepTime = Math.max(duration / totalSteps, 16);
        const increment = end / totalSteps;

        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            setCount(end);
            clearInterval(timer);
          } else {
            setCount(Math.ceil(start));
          }
        }, stepTime);

        observer.unobserve(element);
      }
    }, { threshold: 0.1 });

    observer.observe(element);
    return () => {
      if (element) observer.unobserve(element);
    };
  }, [endValue, duration, triggerRef]);

  return count;
};

/**
 * Custom hook to add magnetic hover pull to buttons/elements.
 */
export const useMagnetic = (pullFactor = 0.25) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    element.classList.add('btn-magnetic');

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = element.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const deltaX = clientX - centerX;
      const deltaY = clientY - centerY;

      // Distance check: only pull if cursor is close
      const distance = Math.hypot(deltaX, deltaY);
      const activeRadius = Math.max(width, height) * 1.5;

      if (distance < activeRadius) {
        element.style.transform = `translate(${deltaX * pullFactor}px, ${deltaY * pullFactor}px)`;
      } else {
        element.style.transform = 'translate(0px, 0px)';
      }
    };

    const handleMouseLeave = () => {
      element.style.transform = 'translate(0px, 0px)';
    };

    window.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (element) {
        element.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [pullFactor]);

  return ref;
};

/**
 * Page transition wrapper that fades entry.
 */
export const PageTransition = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={`transition-all duration-700 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
      {children}
    </div>
  );
};

/**
 * Parallax hook to shift an element's position based on window scroll.
 */
export const useParallax = (speed = 0.1) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      el.style.transform = `translateY(${scrollY * speed}px)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return ref;
};
