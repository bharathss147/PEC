import React, { useEffect, useState, useRef } from 'react';

interface MetricItem {
  id: string;
  targetValue: number | string;
  suffix?: string;
  prefix?: string;
  isNumeric: boolean;
  label: string;
  sublabel: string;
}

export const PerformanceMetrics: React.FC = () => {
  const [inView, setInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.25 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full py-24 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-white/10 mb-16">
          <div>
            <span className="text-xs font-mono tracking-widest text-[#00f0ff] uppercase">
              BENCHMARK EXTREMES
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold font-display text-white tracking-tight mt-1">
              ENGINEERED FOR SUPREMACY.
            </h2>
          </div>
          <p className="text-sm font-mono text-white/50 max-w-md mt-4 md:mt-0">
            Every specification calibrated beyond optical limits to give filmmakers and photographers unprecedented creative authority.
          </p>
        </div>

        {/* Dynamic Metric Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
          {/* Metric 1 */}
          <AnimatedStatCard
            value={45.7}
            suffix=" MP"
            decimals={1}
            inView={inView}
            label="FULL-FRAME SENSOR"
            sublabel="Stacked BSI CMOS"
          />

          {/* Metric 2 */}
          <div className="flex flex-col p-6 rounded-2xl bg-black/40 border border-white/5 hover:border-[#00f0ff]/30 transition-all duration-300">
            <span className="text-4xl md:text-5xl font-black font-display text-white tracking-tight">
              8K
            </span>
            <span className="text-xs font-mono font-bold text-[#00f0ff] tracking-wider mt-1">
              RAW UNCOMPRESSED
            </span>
            <span className="text-[11px] font-mono text-white/40 mt-3 pt-3 border-t border-white/5">
              12-Bit Cinema DNG
            </span>
          </div>

          {/* Metric 3 */}
          <AnimatedStatCard
            value={15}
            suffix=" FPS"
            inView={inView}
            label="MECHANICAL SHUTTER"
            sublabel="Zero Distort Shutter"
          />

          {/* Metric 4 */}
          <AnimatedStatCard
            value={120}
            suffix=" FPS"
            inView={inView}
            label="HIGH SPEED 4K / 8K"
            sublabel="Cinematic Slow-Mo"
          />

          {/* Metric 5 */}
          <div className="flex flex-col p-6 rounded-2xl bg-black/40 border border-white/5 hover:border-[#00f0ff]/30 transition-all duration-300">
            <span className="text-4xl md:text-5xl font-black font-display text-white tracking-tight">
              5-AXIS
            </span>
            <span className="text-xs font-mono font-bold text-[#00f0ff] tracking-wider mt-1">
              IBIS MAGNETIC LEV
            </span>
            <span className="text-[11px] font-mono text-white/40 mt-3 pt-3 border-t border-white/5">
              8.5 Stops Compensation
            </span>
          </div>

          {/* Metric 6 */}
          <div className="flex flex-col p-6 rounded-2xl bg-black/40 border border-white/5 hover:border-[#00f0ff]/30 transition-all duration-300">
            <div className="text-2xl md:text-3xl font-black font-display text-white tracking-tight">
              64–51.2K
            </div>
            <span className="text-xs font-mono font-bold text-[#00f0ff] tracking-wider mt-1">
              DUAL NATIVE ISO
            </span>
            <span className="text-[11px] font-mono text-white/40 mt-3 pt-3 border-t border-white/5">
              Zero Noise Low Lights
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

interface AnimatedStatCardProps {
  value: number;
  suffix?: string;
  decimals?: number;
  inView: boolean;
  label: string;
  sublabel: string;
}

const AnimatedStatCard: React.FC<AnimatedStatCardProps> = ({
  value,
  suffix = '',
  decimals = 0,
  inView,
  label,
  sublabel,
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const duration = 1400; // ms
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quartic
      const ease = 1 - Math.pow(1 - progress, 4);

      const current = start + (value - start) * ease;
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, value]);

  return (
    <div className="flex flex-col p-6 rounded-2xl bg-black/40 border border-white/5 hover:border-[#00f0ff]/30 transition-all duration-300">
      <span className="text-4xl md:text-5xl font-black font-display text-white tracking-tight">
        {decimals > 0 ? displayValue.toFixed(decimals) : Math.round(displayValue)}
        <span className="text-xl md:text-2xl text-[#00f0ff]">{suffix}</span>
      </span>
      <span className="text-xs font-mono font-bold text-[#00f0ff] tracking-wider mt-1">
        {label}
      </span>
      <span className="text-[11px] font-mono text-white/40 mt-3 pt-3 border-t border-white/5">
        {sublabel}
      </span>
    </div>
  );
};
