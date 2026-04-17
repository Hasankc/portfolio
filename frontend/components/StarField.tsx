'use client';

import { useEffect, useRef } from 'react';

export function StarField() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const container = ref.current;
    container.innerHTML = '';
    const count = 80;
    for (let i = 0; i < count; i++) {
      const star = document.createElement('div');
      const size = Math.random() * 2 + 0.5;
      star.className = 'star';
      star.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        --duration: ${Math.random() * 4 + 2}s;
        --delay: ${Math.random() * 4}s;
        opacity: ${Math.random() * 0.5 + 0.1};
      `;
      container.appendChild(star);
    }
  }, []);

  return <div ref={ref} className="starfield" aria-hidden="true" />;
}
