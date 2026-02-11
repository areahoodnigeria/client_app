import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProps {
  children: React.ReactNode;
}

const SmoothScroll = ({ children }: SmoothScrollProps) => {
  const scrollRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    scrollRef.current = lenis;

    // Connect Lenis to ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Synchronize GSAP with Lenis
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Handle scroll to top on refresh
    window.scrollTo(0, 0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(() => {});
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
