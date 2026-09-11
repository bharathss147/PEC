import React, { useEffect, useState } from 'react';

export const SecurityReticleCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only activate on pointer devices (not mobile touch screens)
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.tagName === 'INPUT' ||
          target.closest('button') ||
          target.closest('a') ||
          target.getAttribute('role') === 'button')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-50 transition-transform duration-75 ease-out -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      {/* Central Micro Dot */}
      <div
        className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
          isHovering ? 'bg-[#00f0ff] scale-150 shadow-[0_0_10px_#00f0ff]' : 'bg-white/80'
        }`}
      />

      {/* Outer Tactical Crosshair Brackets */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-[#00f0ff]/50 rounded-full transition-all duration-300 ${
          isHovering
            ? 'w-10 h-10 border-[#00f0ff] shadow-[0_0_12px_rgba(0,240,255,0.4)] scale-110'
            : 'w-6 h-6 border-white/20'
        }`}
      />
    </div>
  );
};
