import React, { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { CameraModel } from '../3d/CameraModel';
import { StudioEnvironment } from '../3d/StudioEnvironment';
import { Sliders, RefreshCw, Cpu, Disc, Zap, Thermometer, Shield } from 'lucide-react';

export const ExplodedSection: React.FC = () => {
  const [explosion, setExplosion] = useState(0.65); // 0 to 1
  const [autoCycle, setAutoCycle] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Auto animation cycle if enabled
  useEffect(() => {
    if (!autoCycle) return;
    let direction = 1;
    const interval = setInterval(() => {
      setExplosion((prev) => {
        let next = prev + 0.008 * direction;
        if (next >= 1) {
          next = 1;
          direction = -1;
        } else if (next <= 0) {
          next = 0;
          direction = 1;
        }
        return next;
      });
    }, 16);
    return () => clearInterval(interval);
  }, [autoCycle]);

  // Synchronize with scroll when within section
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // If the section is in view, calculate scroll progress through the section
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        const totalDist = windowHeight + rect.height;
        const currentDist = windowHeight - rect.top;
        const progress = Math.max(0, Math.min(1, currentDist / totalDist));
        // Parabolic curve so it explodes in middle and reconstructs as you leave
        const explodeFactor = Math.sin(progress * Math.PI);
        if (!autoCycle) {
          setExplosion(explodeFactor);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [autoCycle]);

  const components = [
    { name: 'TOP APEX & DIALS', icon: Disc, offset: 'Y +1.4m', spec: 'Aviation Knurling Dials' },
    { name: 'OPTICAL BARREL', icon: Disc, offset: 'Z +2.2m', spec: '14 Multi-Coated Elements' },
    { name: '45.7MP SENSOR', icon: Cpu, offset: 'Z +0.7m', spec: 'Dual-Gain Stacked Silicon' },
    { name: 'QUANTUM PROCESSOR', icon: Cpu, offset: 'Z -0.7m', spec: 'Hexa-Core 4nm Engine' },
    { name: 'GRAPHENE CHAMBER', icon: Thermometer, offset: 'X -1.5m', spec: '35W Active Heat Pipe' },
    { name: 'SOLID-STATE CELL', icon: Zap, offset: 'Y -1.4m', spec: '28.5Wh Low-Temp Rated' },
    { name: 'MAGNESIUM CHASSIS', icon: Shield, offset: 'Origin', spec: '74 Weather Gaskets' },
  ];

  return (
    <section
      ref={sectionRef}
      id="exploded"
      className="relative w-full min-h-screen py-24 bg-[#050608] flex flex-col justify-between border-t border-white/5 overflow-hidden"
    >
      {/* Background Section Header */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-xs font-mono tracking-widest text-[#00f0ff] uppercase">
            INTERNAL STRUCTURAL KINEMATICS
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold font-display text-white tracking-tight mt-1">
            ANATOMY OF SUPREMACY.
          </h2>
          <p className="text-sm font-mono text-white/50 max-w-lg mt-2">
            CNC-milled monocoque housing separating into isolated acoustic, optical, and thermal sub-assemblies.
          </p>
        </div>

        {/* Interactive Scrubbing Slider & Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-4 glass-panel p-3 rounded-2xl border border-white/10">
          <div className="flex items-center gap-3">
            <Sliders size={16} className="text-[#00f0ff]" />
            <span className="text-xs font-mono text-white/80 whitespace-nowrap">
              EXPLOSION: {Math.round(explosion * 100)}%
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={explosion}
            onChange={(e) => {
              setAutoCycle(false);
              setExplosion(parseFloat(e.target.value));
            }}
            className="w-36 md:w-48 accent-[#00f0ff] cursor-pointer"
            aria-label="Deconstruction explosion slider"
          />

          <button
            onClick={() => setAutoCycle(!autoCycle)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer ${
              autoCycle
                ? 'bg-[#00f0ff] text-black font-bold'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <RefreshCw size={13} className={autoCycle ? 'animate-spin' : ''} />
            <span>{autoCycle ? 'AUTOPLAY ON' : 'AUTO CYCLE'}</span>
          </button>
        </div>
      </div>

      {/* 3D Exploded Stage */}
      <div
        className="relative w-full h-[65vh] md:h-[72vh] my-4 cursor-grab active:cursor-grabbing"
        data-cursor="explore"
      >
        <Canvas
          camera={{ position: [3.4, 1.4, 4.0], fov: 42 }}
          shadows
          dpr={[1, 2]}
          gl={{ antialias: true }}
        >
          <StudioEnvironment intensity={1.2} rimColor="#00f0ff" floorShadow={true} />

          <group position={[0, -0.1, 0]} rotation={[0.1, 0.4, 0]}>
            <CameraModel
              bodyColor="obsidian"
              grip="standard"
              lens="50mm"
              explodedOffset={explosion}
              floating={true}
            />
          </group>
        </Canvas>

        {/* Dynamic HUD Labels in 2D overlay when exploded */}
        {explosion > 0.25 && (
          <div className="absolute inset-0 pointer-events-none max-w-7xl mx-auto px-6 flex flex-col justify-center">
            <div className="hidden lg:grid grid-cols-2 gap-y-12 pointer-events-none">
              <div className="space-y-6">
                {components.slice(0, 4).map((c, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 max-w-xs animate-in fade-in slide-in-from-left duration-300"
                    style={{ opacity: Math.min(explosion * 1.5, 1) }}
                  >
                    <c.icon size={16} className="text-[#00f0ff]" />
                    <div>
                      <div className="text-[10px] font-mono text-[#00f0ff] uppercase">{c.offset}</div>
                      <div className="text-xs font-mono font-bold text-white">{c.name}</div>
                      <div className="text-[10px] font-mono text-white/40">{c.spec}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-6 flex flex-col items-end">
                {components.slice(4).map((c, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 max-w-xs text-right animate-in fade-in slide-in-from-right duration-300"
                    style={{ opacity: Math.min(explosion * 1.5, 1) }}
                  >
                    <div>
                      <div className="text-[10px] font-mono text-[#00f0ff] uppercase">{c.offset}</div>
                      <div className="text-xs font-mono font-bold text-white">{c.name}</div>
                      <div className="text-[10px] font-mono text-white/40">{c.spec}</div>
                    </div>
                    <c.icon size={16} className="text-[#00f0ff]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Technical Bar */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex items-center justify-between text-[11px] font-mono text-white/40 pt-4 border-t border-white/5">
        <span>KINETIC TOLERANCE: ±0.002mm</span>
        <span className="text-[#00f0ff]">FULL ASYMMETRICAL DECONSTRUCTION ACTIVE</span>
      </div>
    </section>
  );
};
