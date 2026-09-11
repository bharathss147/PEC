import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [cursorState, setCursorState] = useState<'default' | 'pointer' | 'explore'>('default');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if touch device - if touch, skip custom cursor
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!visible) setVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const closestExplore = target.closest('[data-cursor="explore"]');
      const closestButton = target.closest('button, a, input, [role="button"], [data-cursor="pointer"]');

      if (closestExplore) {
        setCursorState('explore');
      } else if (closestButton) {
        setCursorState('pointer');
      } else {
        setCursorState('default');
      }
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 z-[9999] transition-transform duration-75 ease-out will-change-transform"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
      }}
    >
      {cursorState === 'default' && (
        <div className="-translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white/80 border border-[#00f0ff]/50 shadow-[0_0_8px_#00f0ff] transition-all duration-150" />
      )}

      {cursorState === 'pointer' && (
        <div className="-translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-[#00f0ff] bg-[#00f0ff]/10 backdrop-blur-[1px] transition-all duration-200" />
      )}

      {cursorState === 'explore' && (
        <div className="-translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-16 h-16 rounded-full border border-[#00f0ff]/80 bg-black/60 backdrop-blur-md transition-all duration-300 shadow-[0_0_20px_rgba(0,240,255,0.3)]">
          <span className="text-[9px] font-mono tracking-widest text-[#00f0ff] uppercase font-bold">
            DRAG
          </span>
        </div>
      )}
    </div>
  );
};
