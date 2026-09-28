import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from 'react';

/** Apparition progressive au scroll. Sans IntersectionObserver ou avec « réduire les animations » : visible d'emblée. */
export function Reveal({
  children,
  delay = 0,
  as: As = 'div',
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  as?: ElementType;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(() => typeof window === 'undefined' || !('IntersectionObserver' in window));

  useEffect(() => {
    if (visible || !ref.current) return;
    const el = ref.current;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [visible]);

  return (
    <As ref={ref} className={`reveal ${className}`} data-visible={visible} style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}>
      {children}
    </As>
  );
}

/** true quand l'utilisateur a demandé de réduire les animations. */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false,
  );
  useEffect(() => {
    if (!window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setReduced(mq.matches);
    mq.addEventListener?.('change', on);
    return () => mq.removeEventListener?.('change', on);
  }, []);
  return reduced;
}
