import * as THREE from 'three';

// Generates a procedural knurling texture for lens rings and dials
export function createKnurlingTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, 128, 128);

    ctx.fillStyle = '#ffffff';
    for (let x = 0; x < 128; x += 8) {
      ctx.fillRect(x, 0, 4, 128);
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(16, 1);
  return texture;
}

// Generates a fine leatherette / vulcanite bump texture for the camera grip
export function createLeatherTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#808080';
    ctx.fillRect(0, 0, 256, 256);
    
    // Fine stippled noise
    const imgData = ctx.getImageData(0, 0, 256, 256);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
      const v = 128 + (Math.random() - 0.5) * 60;
      data[i] = v;
      data[i + 1] = v;
      data[i + 2] = v;
    }
    ctx.putImageData(imgData, 0, 0);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(8, 8);
  return texture;
}

// Generates a microscopic CMOS sensor pixel grid texture with Bayer filter iridescence
export function createSensorTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#08121a';
    ctx.fillRect(0, 0, 512, 512);

    const size = 16;
    for (let x = 0; x < 512; x += size) {
      for (let y = 0; y < 512; y += size) {
        const isGreen = (x / size + y / size) % 2 === 0;
        const isBlue = !isGreen && (x / size) % 2 === 0;
        
        ctx.fillStyle = isGreen ? '#0a3028' : isBlue ? '#081e3a' : '#2a0e14';
        ctx.fillRect(x + 1, y + 1, size - 2, size - 2);

        // Micro-lens dome highlight
        ctx.fillStyle = 'rgba(0, 240, 255, 0.15)';
        ctx.fillRect(x + 4, y + 4, size - 8, size - 8);
      }
    }

    // Gold circuit border bus
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 4;
    ctx.strokeRect(2, 2, 508, 508);
  }
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// Generates an LCD camera screen live-view UI overlay texture
export function createScreenTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 340;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    // Dark live view simulation
    ctx.fillStyle = '#0d1117';
    ctx.fillRect(0, 0, 512, 340);

    // Grid rule of thirds
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(170, 0); ctx.lineTo(170, 340);
    ctx.moveTo(341, 0); ctx.lineTo(341, 340);
    ctx.moveTo(0, 113); ctx.lineTo(512, 113);
    ctx.moveTo(0, 226); ctx.lineTo(512, 226);
    ctx.stroke();

    // Central focus brackets
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 2;
    ctx.strokeRect(230, 145, 52, 50);

    // Telemetry text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 14px monospace';
    ctx.fillText('8K RAW 60P', 20, 30);
    ctx.fillText('LOG 10-BIT', 130, 30);

    ctx.fillStyle = '#00f0ff';
    ctx.fillText('● REC 00:24:18', 380, 30);

    ctx.fillStyle = '#ffffff';
    ctx.font = '13px monospace';
    ctx.fillText('1/250', 30, 315);
    ctx.fillText('F1.2', 120, 315);
    ctx.fillText('ISO 100', 210, 315);
    ctx.fillText('±0.0', 310, 315);
    ctx.fillText('AF-C [EYE]', 400, 315);

    // Audio meters
    ctx.fillStyle = '#10b981';
    ctx.fillRect(20, 50, 80, 4);
    ctx.fillRect(20, 58, 72, 4);
  }
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// Generates VIGILOX Security OSD HUD texture for live surveillance viewports
export function createCctvHudTexture(camName = 'VIGILOX-CAM-01'): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#05080c';
    ctx.fillRect(0, 0, 512, 512);

    // Scan lines
    ctx.fillStyle = 'rgba(0, 240, 255, 0.03)';
    for (let y = 0; y < 512; y += 4) {
      ctx.fillRect(0, y, 512, 1);
    }

    // Outer corner target brackets
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 3;
    const cornerSize = 28;
    const margin = 20;

    // Top-left
    ctx.beginPath();
    ctx.moveTo(margin, margin + cornerSize); ctx.lineTo(margin, margin); ctx.lineTo(margin + cornerSize, margin);
    ctx.stroke();

    // Top-right
    ctx.beginPath();
    ctx.moveTo(512 - margin - cornerSize, margin); ctx.lineTo(512 - margin, margin); ctx.lineTo(512 - margin, margin + cornerSize);
    ctx.stroke();

    // Bottom-left
    ctx.beginPath();
    ctx.moveTo(margin, 512 - margin - cornerSize); ctx.lineTo(margin, 512 - margin); ctx.lineTo(margin + cornerSize, 512 - margin);
    ctx.stroke();

    // Bottom-right
    ctx.beginPath();
    ctx.moveTo(512 - margin - cornerSize, 512 - margin); ctx.lineTo(512 - margin, 512 - margin); ctx.lineTo(512 - margin, 512 - margin - cornerSize);
    ctx.stroke();

    // Center crosshair
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.6)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(256 - 20, 256); ctx.lineTo(256 + 20, 256);
    ctx.moveTo(256, 256 - 20); ctx.lineTo(256, 256 + 20);
    ctx.stroke();

    // Compass ring
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.2)';
    ctx.beginPath();
    ctx.arc(256, 256, 80, 0, Math.PI * 2);
    ctx.stroke();

    // OSD Header
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px monospace';
    ctx.fillText(`LIVE [${camName}]`, margin + 12, margin + 24);

    ctx.fillStyle = '#00f0ff';
    ctx.font = '12px monospace';
    ctx.fillText('4K HDR | 60FPS | AES-256 ENCRYPTED', margin + 12, margin + 44);

    // Active AI Tracking Box
    ctx.strokeStyle = '#00f0ff';
    ctx.lineWidth = 2;
    ctx.strokeRect(180, 160, 150, 180);
    ctx.fillStyle = 'rgba(0, 240, 255, 0.15)';
    ctx.fillRect(180, 160, 150, 180);

    ctx.fillStyle = '#00f0ff';
    ctx.font = '11px monospace';
    ctx.fillText('AI: HUMAN_DETECT [99.4%]', 184, 152);
    ctx.fillText('TRAJECTORY: EAST BOUND', 184, 355);

    // Footer stats
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = '12px monospace';
    ctx.fillText('AZ: 184.2° | ELEV: -12.4° | ZOOM: 4.2X', margin + 12, 512 - margin - 10);
  }
  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

