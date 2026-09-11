import { useState, useEffect } from 'react';
import { qualityManager } from '../utils/qualityManager';
import { DeviceCapabilities } from '../types/vigilox';

export function useQuality(): DeviceCapabilities & { fps: number } {
  const [caps, setCaps] = useState<DeviceCapabilities>(() => qualityManager.getCapabilities());
  const [fps, setFps] = useState<number>(() => qualityManager.getFps());

  useEffect(() => {
    const unsubscribe = qualityManager.subscribe((newCaps) => {
      setCaps(newCaps);
    });

    const fpsInterval = setInterval(() => {
      setFps(qualityManager.getFps());
    }, 1000);

    return () => {
      unsubscribe();
      clearInterval(fpsInterval);
    };
  }, []);

  return {
    ...caps,
    fps,
  };
}
