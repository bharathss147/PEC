import { DeviceCapabilities, DeviceQualityTier } from '../types/vigilox';

class QualityManager {
  private static instance: QualityManager;
  private capabilities: DeviceCapabilities;
  private listeners: ((caps: DeviceCapabilities) => void)[] = [];
  private frameCount = 0;
  private lastTime = performance.now();
  private lowFpsCount = 0;
  private fps = 60;
  private isMonitoring = false;

  private constructor() {
    this.capabilities = this.detectCapabilities();
    this.setupListeners();
  }

  public static getInstance(): QualityManager {
    if (!QualityManager.instance) {
      QualityManager.instance = new QualityManager();
    }
    return QualityManager.instance;
  }

  private detectCapabilities(): DeviceCapabilities {
    if (typeof window === 'undefined') {
      return {
        tier: 'medium',
        pixelRatio: 1,
        isMobile: false,
        isTouch: false,
        hasWebGPU: false,
        hasWebGL2: true,
        reducedMotion: false,
        maxTextureSize: 4096,
      };
    }

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    ) || window.innerWidth < 768;

    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // WebGL / WebGPU detection
    let hasWebGL2 = false;
    let maxTextureSize = 2048;
    let rendererString = '';

    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
      if (gl) {
        hasWebGL2 = !!canvas.getContext('webgl2');
        maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE) || 2048;
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
        if (debugInfo) {
          rendererString = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || '';
        }
      }
    } catch {
      hasWebGL2 = false;
    }

    const hasWebGPU = typeof navigator !== 'undefined' && 'gpu' in navigator;

    // Determine initial tier
    let tier: DeviceQualityTier = 'high';

    const isAppleMSeriesOrDedicatedGPU =
      /Apple M|NVIDIA|GeForce|Radeon|RTX|GTX/i.test(rendererString);
    const isMaliOrAdrenoBudget =
      /Adreno 3|Adreno 4|Adreno 5|Mali-G5|Mali-400|PowerVR/i.test(rendererString);

    const memory = (navigator as any).deviceMemory || 4;
    const cores = navigator.hardwareConcurrency || 4;

    if (reducedMotion) {
      tier = 'low';
    } else if (isMobile) {
      if (memory <= 3 || cores <= 4 || isMaliOrAdrenoBudget) {
        tier = 'very-low';
      } else {
        tier = 'low';
      }
    } else if (isAppleMSeriesOrDedicatedGPU && memory >= 8 && cores >= 6) {
      tier = 'high';
    } else if (memory >= 4 && cores >= 4) {
      tier = 'medium';
    } else {
      tier = 'low';
    }

    // Adaptive pixel ratio calculation
    const rawDPR = window.devicePixelRatio || 1;
    let pixelRatio = 1;

    switch (tier) {
      case 'high':
        pixelRatio = Math.min(rawDPR, 1.75);
        break;
      case 'medium':
        pixelRatio = Math.min(rawDPR, 1.25);
        break;
      case 'low':
        pixelRatio = Math.min(rawDPR, 1.0);
        break;
      case 'very-low':
        pixelRatio = 0.85;
        break;
    }

    return {
      tier,
      pixelRatio,
      isMobile,
      isTouch,
      hasWebGPU,
      hasWebGL2,
      reducedMotion,
      maxTextureSize,
    };
  }

  private setupListeners() {
    if (typeof window === 'undefined') return;

    // Listen to prefers-reduced-motion change
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    motionQuery.addEventListener('change', (e) => {
      this.capabilities.reducedMotion = e.matches;
      if (e.matches) {
        this.capabilities.tier = 'low';
        this.capabilities.pixelRatio = 1;
      }
      this.notifyListeners();
    });

    // Start passive FPS monitor
    this.startFpsMonitor();
  }

  private startFpsMonitor() {
    if (this.isMonitoring || typeof window === 'undefined') return;
    this.isMonitoring = true;

    const checkFps = (time: number) => {
      this.frameCount++;
      const delta = time - this.lastTime;

      if (delta >= 1000) {
        this.fps = (this.frameCount * 1000) / delta;
        this.frameCount = 0;
        this.lastTime = time;

        // If FPS is below 28 sustained for 3 samples, downgrade tier
        if (this.fps < 28) {
          this.lowFpsCount++;
          if (this.lowFpsCount >= 3) {
            this.downgradeQuality();
            this.lowFpsCount = 0;
          }
        } else {
          this.lowFpsCount = Math.max(0, this.lowFpsCount - 1);
        }
      }

      requestAnimationFrame(checkFps);
    };

    requestAnimationFrame(checkFps);
  }

  private downgradeQuality() {
    let changed = false;
    if (this.capabilities.tier === 'high') {
      this.capabilities.tier = 'medium';
      this.capabilities.pixelRatio = 1.25;
      changed = true;
    } else if (this.capabilities.tier === 'medium') {
      this.capabilities.tier = 'low';
      this.capabilities.pixelRatio = 1.0;
      changed = true;
    } else if (this.capabilities.tier === 'low') {
      this.capabilities.tier = 'very-low';
      this.capabilities.pixelRatio = 0.85;
      changed = true;
    }

    if (changed) {
      console.info(`[VIGILOX QualityManager] Adaptive downgrade to ${this.capabilities.tier} for optimal framerate.`);
      this.notifyListeners();
    }
  }

  public getCapabilities(): DeviceCapabilities {
    return { ...this.capabilities };
  }

  public getFps(): number {
    return Math.round(this.fps);
  }

  public subscribe(listener: (caps: DeviceCapabilities) => void): () => void {
    this.listeners.push(listener);
    listener(this.capabilities);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notifyListeners() {
    for (const listener of this.listeners) {
      listener(this.capabilities);
    }
  }
}

export const qualityManager = QualityManager.getInstance();
