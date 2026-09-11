import React from 'react';

interface ParadiseEliteLogoProps {
  variant?: 'primary' | 'horizontal' | 'monogram' | 'compact';
  theme?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ParadiseEliteLogo: React.FC<ParadiseEliteLogoProps> = ({
  variant = 'horizontal',
  theme = 'dark',
  size = 'md',
  className = '',
}) => {
  const isLight = theme === 'light';

  // Palette definitions according to official brand guidelines:
  // Primary Navy: #07162C, Rich Gold: #C5A059, Luminous Gold: #DFBF7A, Dark Gold: #9B7832
  const goldPrimary = '#C5A059';
  const goldAccent = '#DFBF7A';
  const goldDeep = '#8F6E28';
  const textMain = isLight ? '#07162C' : '#FFFFFF';
  const textSub = isLight ? '#475569' : '#C5A059';

  // Sizes
  const iconSizeMap = {
    sm: 28,
    md: 38,
    lg: 52,
  };
  const iconSize = iconSizeMap[size];

  // SVG Monogram: Architectural Shield with Interlocking P & E Construction Pillars
  const Emblem = () => (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300 group-hover:scale-105"
      aria-hidden="true"
    >
      <defs>
        {/* Rich Metallic Architectural Gold Gradient */}
        <linearGradient id="peGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={goldAccent} />
          <stop offset="50%" stopColor={goldPrimary} />
          <stop offset="100%" stopColor={goldDeep} />
        </linearGradient>
        {/* Navy Facet Gradient for depth */}
        <linearGradient id="peNavyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0E2A4A" />
          <stop offset="100%" stopColor="#07162C" />
        </linearGradient>
      </defs>

      {/* Outer Hexagonal Architectural Boundary Shield */}
      <polygon
        points="50,4 92,26 92,74 50,96 8,74 8,26"
        fill={isLight ? '#F1F5F9' : '#0A1728'}
        stroke="url(#peGoldGrad)"
        strokeWidth="2.5"
      />

      {/* Internal Geometry: Architectural Pillar 'P' & 'E' Intersect */}
      {/* Left Vertical Foundation Pillar */}
      <path
        d="M26 24 H37 V76 H26 Z"
        fill="url(#peGoldGrad)"
      />

      {/* Upper Arch / Construction Span representing 'P' Header */}
      <path
        d="M37 24 H62 C73 24 80 30 80 40 C80 50 73 56 62 56 H37 V45 H60 C64 45 68 43 68 40 C68 37 64 35 60 35 H37 Z"
        fill="url(#peGoldGrad)"
      />

      {/* Lower Structural Crossbeam representing 'E' Foundation */}
      <path
        d="M37 65 H72 V76 H37 Z"
        fill="url(#peGoldGrad)"
      />

      {/* Central Keystone / Golden Security Triangle Node */}
      <polygon
        points="50,14 55,24 45,24"
        fill={goldAccent}
      />
      <circle cx="50" cy="50" r="3.5" fill={goldAccent} />
    </svg>
  );

  if (variant === 'monogram') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`} title="Paradise Elite Construction Pte. Ltd.">
        <Emblem />
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center gap-2.5 ${className}`}>
        <Emblem />
        <div className="flex flex-col">
          <span
            className="font-display font-extrabold tracking-wider leading-none text-sm"
            style={{ color: textMain }}
          >
            PARADISE ELITE
          </span>
          <span
            className="text-[8px] font-mono tracking-widest uppercase mt-0.5"
            style={{ color: textSub }}
          >
            CONSTRUCTION • SECURITY
          </span>
        </div>
      </div>
    );
  }

  if (variant === 'primary') {
    return (
      <div className={`flex flex-col items-center text-center gap-2.5 ${className}`}>
        <Emblem />
        <div className="flex flex-col items-center">
          <span
            className="font-display font-black tracking-widest text-lg sm:text-xl leading-tight"
            style={{ color: textMain }}
          >
            PARADISE ELITE
          </span>
          <span
            className="text-[10px] font-mono tracking-[0.25em] uppercase font-bold mt-0.5"
            style={{ color: textSub }}
          >
            CONSTRUCTION PTE. LTD.
          </span>
          <div className="flex items-center gap-2 mt-1.5 opacity-80">
            <span className="h-[1px] w-5 bg-[#C5A059]" />
            <span className="text-[9px] font-mono tracking-widest text-[#94A3B8] uppercase">
              SINGAPORE
            </span>
            <span className="h-[1px] w-5 bg-[#C5A059]" />
          </div>
        </div>
      </div>
    );
  }

  // Default: Horizontal Master Lockup
  return (
    <div className={`inline-flex items-center gap-3 group ${className}`}>
      <Emblem />
      <div className="flex flex-col">
        <span
          className="font-display font-extrabold tracking-wider text-base sm:text-lg leading-none"
          style={{ color: textMain }}
        >
          PARADISE ELITE
        </span>
        <span
          className="text-[9px] sm:text-[10px] font-mono tracking-[0.2em] uppercase font-semibold mt-1"
          style={{ color: textSub }}
        >
          CONSTRUCTION PTE. LTD.
        </span>
      </div>
    </div>
  );
};
