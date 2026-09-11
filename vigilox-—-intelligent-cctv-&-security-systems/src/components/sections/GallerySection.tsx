import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { SpatialGallery3D } from '../3d/SpatialGallery3D';
import { GalleryModal } from '../ui/GalleryModal';
import { GALLERY_ITEMS } from '../../data/galleryData';
import { GalleryItem } from '../../types';
import { Camera, Image as ImageIcon, Sparkles, Filter, Maximize2 } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const categories = ['ALL', 'PORTRAIT', 'STREET', 'LANDSCAPE', 'CINEMA', 'ARCHITECTURE'];

  const filteredItems =
    selectedCategory === 'ALL'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <section
      id="gallery"
      className="relative w-full min-h-screen py-24 bg-[#050608] flex flex-col justify-between border-t border-white/5 overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none" />

      {/* Top Header & Category Filter Buttons */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#00f0ff]" />
            <span className="text-xs font-mono tracking-widest text-[#00f0ff] uppercase">
              3D SPATIAL PHOTOGRAPHY EXHIBIT
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold font-display text-white tracking-tight">
            IMAGING IN THREE DIMENSIONS.
          </h2>
          <p className="text-sm font-mono text-white/50 max-w-lg mt-2">
            Captured exclusively on LUMORA I prototypes across extreme planetary locations and lighting extremes.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-300 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#00f0ff] text-black font-bold shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                  : 'bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3D WebGL Spatial Gallery Canvas */}
      <div
        className="relative w-full h-[60vh] md:h-[68vh] my-4 cursor-grab active:cursor-grabbing"
        data-cursor="explore"
      >
        <Canvas
          camera={{ position: [0, 0, 7.5], fov: 45 }}
          shadows
          dpr={[1, 2]}
          gl={{ antialias: true }}
        >
          <SpatialGallery3D
            items={filteredItems}
            onSelectItem={(item) => setActiveItem(item)}
            activeCategory={selectedCategory}
          />
        </Canvas>

        {/* Floating Instruction Banner */}
        <div className="absolute top-4 left-6 pointer-events-none text-[11px] font-mono text-white/50 bg-black/60 px-3 py-1.5 rounded-lg backdrop-blur-md border border-white/10">
          <span>PARALLAX DRIFT ACTIVE — CLICK ANY 3D PLANE FOR 16-BIT EXIF TELEMETRY</span>
        </div>
      </div>

      {/* Bottom Photographic Strip Thumbnails */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="flex items-center justify-between pb-3 text-xs font-mono text-white/50 border-b border-white/5">
          <span>CURATED ARCHIVE ({filteredItems.length} CAPTURES)</span>
          <span className="text-[#00f0ff]">UNCOMPRESSED RAW REPRODUCTIONS</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mt-4">
          {filteredItems.slice(0, 5).map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group relative rounded-xl overflow-hidden aspect-[16/10] bg-black/60 border border-white/10 hover:border-[#00f0ff] transition-all duration-300 text-left cursor-pointer"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-2.5 flex flex-col justify-end">
                <span className="text-[9px] font-mono text-[#00f0ff] uppercase">{item.category}</span>
                <span className="text-xs font-medium text-white font-sans truncate">{item.title}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* EXIF Inspection Modal */}
      <GalleryModal item={activeItem} onClose={() => setActiveItem(null)} />
    </section>
  );
};
