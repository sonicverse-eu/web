'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { animate, inView, scroll } from 'motion';

export default function MotionProvider() {
  const pathname = usePathname();

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const skipSelector = [
      '.button',
      'button',
      'input',
      'select',
      'textarea',
      '[role="button"]',
      '[data-reveal-skip]',
    ].join(', ');

    // Assign data-reveal + delays to children of [data-reveal-group]
    document.querySelectorAll<HTMLElement>('[data-reveal-group]').forEach((group) => {
      const base = Number(group.getAttribute('data-reveal-delay') || '0');
      Array.from(group.children).forEach((child, i) => {
        const el = child as HTMLElement;
        if (el.matches(skipSelector)) return;
        if (!el.hasAttribute('data-reveal')) el.setAttribute('data-reveal', '');
        if (!el.hasAttribute('data-reveal-delay')) {
          el.setAttribute('data-reveal-delay', (base + i * 0.08).toFixed(2));
        }
      });
    });

    const revealElements = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));

    const stopScroll = scroll((progress: number) => {
      document.documentElement.style.setProperty('--scroll-progress', progress.toFixed(4));
    });

    if (!revealElements.length) return () => stopScroll();

    if (reduceMotion) {
      revealElements.forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.style.filter = 'none';
      });
      return () => stopScroll();
    }

    revealElements.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(18px) scale(0.985)';
      el.style.filter = 'blur(8px)';
    });

    const stopInView = inView(
      '[data-reveal]',
      (element) => {
        const target = element as HTMLElement;
        const delay = Number(target.getAttribute('data-reveal-delay') || '0');
        animate(
          target,
          { opacity: [0, 1], y: [18, 0], scale: [0.985, 1], filter: ['blur(8px)', 'blur(0px)'] },
          { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }
        );
      },
      { margin: '0px 0px -8% 0px' }
    );

    return () => {
      stopScroll();
      stopInView();
    };
  }, [pathname]);

  return null;
}
