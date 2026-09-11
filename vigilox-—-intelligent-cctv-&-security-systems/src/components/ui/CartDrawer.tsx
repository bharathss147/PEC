import React from 'react';
import { X, ArrowRight, ShieldCheck, CheckCircle2, Trash2 } from 'lucide-react';
import { CameraConfiguration } from '../../types';
import { COLOR_OPTIONS, GRIP_OPTIONS, CAMERA_BASE_PRICE } from '../../data/cameraData';
import { LENSES_DATA } from '../../data/lensesData';

interface CartItem {
  id: string;
  config: CameraConfiguration;
  price: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onCheckout,
}) => {
  if (!isOpen) return null;

  const total = items.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md glass-panel border-l border-white/10 p-6 flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00f0ff]" />
                <h2 className="text-sm font-mono tracking-widest uppercase text-white font-semibold">
                  YOUR PRODUCTION RIG ({items.length})
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-md text-white/50 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Item List */}
            <div className="mt-6 space-y-4 max-h-[60vh] overflow-y-auto pr-1">
              {items.length === 0 ? (
                <div className="py-16 text-center text-white/40 font-mono text-xs">
                  <p>NO CONFIGURATION IN RIG</p>
                  <p className="mt-2 text-[10px] text-white/30">
                    Use the 3D Configurator to build your custom camera package.
                  </p>
                </div>
              ) : (
                items.map((item) => {
                  const colorObj = COLOR_OPTIONS.find((c) => c.id === item.config.bodyColor);
                  const gripObj = GRIP_OPTIONS.find((g) => g.id === item.config.grip);
                  const lensObj = LENSES_DATA.find((l) => l.id === item.config.lens);

                  return (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl bg-black/40 border border-white/5 flex flex-col gap-2 relative group"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] font-mono tracking-widest text-[#00f0ff] uppercase">
                            LUMORA I MIRRORLESS
                          </span>
                          <h4 className="text-base font-bold text-white font-display">
                            {lensObj?.name || 'Standard Prime Package'}
                          </h4>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-white/30 hover:text-red-400 transition-colors p-1"
                          title="Remove build"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <div className="text-xs font-mono text-white/60 space-y-0.5 mt-1">
                        <div className="flex justify-between">
                          <span>Chassis:</span>
                          <span className="text-white/80">{colorObj?.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Ergonomic Grip:</span>
                          <span className="text-white/80">{gripObj?.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Primary Optics:</span>
                          <span className="text-white/80">{lensObj?.focalLength}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-white/5 mt-2">
                        <span className="text-[11px] font-mono text-white/40">CONFIG PRICE</span>
                        <span className="text-sm font-mono font-bold text-[#00f0ff]">
                          ${item.price.toLocaleString()} USD
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Footer & Checkout */}
          {items.length > 0 && (
            <div className="pt-4 border-t border-white/10 space-y-4">
              <div className="flex items-baseline justify-between font-mono">
                <span className="text-xs text-white/50">SUBTOTAL</span>
                <span className="text-2xl font-bold text-white font-display">
                  ${total.toLocaleString()}{' '}
                  <span className="text-xs font-mono text-white/40 font-normal">USD</span>
                </span>
              </div>

              <div className="flex items-center gap-2 text-[10px] font-mono text-white/50">
                <ShieldCheck size={14} className="text-[#00f0ff]" />
                <span>Includes 3-Year Lumora Global Cinema Care & Calibration</span>
              </div>

              <button
                onClick={onCheckout}
                className="w-full py-3.5 px-4 rounded-xl bg-[#00f0ff] hover:bg-[#38bdf8] text-black font-mono font-bold text-xs tracking-widest transition-all duration-300 shadow-[0_0_25px_rgba(0,240,255,0.4)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>COMMISSION THIS RIG</span>
                <ArrowRight size={15} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
