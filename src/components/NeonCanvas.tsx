import { useEffect, useRef } from 'react';
import fishSvg from '../assets/fish.svg';
import jellyfishSvg from '../assets/jellyfish.svg';
import turtleSvg from '../assets/turtle.svg';
import mantaSvg from '../assets/manta.svg';
import seahorseSvg from '../assets/seahorse.svg';

interface Particle {
  x: number; y: number; r: number; speed: number;
  color: string; phase: number;
}

interface Coral {
  x: number; height: number; width: number; color: string; branches: number;
}

interface SeaPlant {
  x: number; height: number; color: string; phase: number;
}

interface Creature {
  x: number; y: number; size: number; color: string;
  speed: number; phase: number; dir: number;
}

interface FishSchool {
  x: number; y: number; count: number; spacing: number;
  speed: number; color: string; phase: number; dir: number;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.src = src;
  });
}

const TINT_SCALE = 4;

function tintImage(
  img: HTMLImageElement,
  color: string,
  w: number,
  h: number,
): HTMLCanvasElement {
  const c = document.createElement('canvas');
  c.width = w * TINT_SCALE;
  c.height = h * TINT_SCALE;
  const cx = c.getContext('2d')!;
  cx.drawImage(img, 0, 0, c.width, c.height);
  cx.globalCompositeOperation = 'source-in';
  cx.fillStyle = color;
  cx.fillRect(0, 0, c.width, c.height);
  return c;
}

const TINT_CACHE = new Map<string, HTMLCanvasElement>();

function getTinted(
  img: HTMLImageElement,
  color: string,
  w: number,
  h: number,
): HTMLCanvasElement {
  const key = `${img.src}:${color}:${w}:${h}`;
  let cached = TINT_CACHE.get(key);
  if (!cached) {
    cached = tintImage(img, color, w, h);
    TINT_CACHE.set(key, cached);
  }
  return cached;
}

export default function NeonCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    let w: number, h: number;
    let animId: number;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      TINT_CACHE.clear();
    }
    resize();
    window.addEventListener('resize', resize);

    let fishImg: HTMLImageElement;
    let jellyImg: HTMLImageElement;
    let turtleImg: HTMLImageElement;
    let mantaImg: HTMLImageElement;
    let seahorseImg: HTMLImageElement;
    let spritesReady = false;

    Promise.all([
      loadImage(fishSvg),
      loadImage(jellyfishSvg),
      loadImage(turtleSvg),
      loadImage(mantaSvg),
      loadImage(seahorseSvg),
    ]).then(([f, j, tu, m, sh]) => {
      fishImg = f;
      jellyImg = j;
      turtleImg = tu;
      mantaImg = m;
      seahorseImg = sh;
      spritesReady = true;
    });

    const particles: Particle[] = Array.from({ length: 80 }, () => ({
      x: Math.random() * 2000, y: Math.random() * 2000,
      r: 1 + Math.random() * 3, speed: 0.1 + Math.random() * 0.4,
      color: ['0,240,255', '255,45,170', '94,94,255', '168,85,247'][Math.floor(Math.random() * 4)],
      phase: Math.random() * Math.PI * 2,
    }));

    const jellies: Creature[] = Array.from({ length: 5 }, (_, i) => ({
      x: w * 0.1 + Math.random() * w * 0.8,
      y: h * 0.2 + Math.random() * h * 0.6,
      size: 28 + Math.random() * 20,
      color: ['255,105,180', '0,229,255', '168,85,247', '34,211,238', '233,121,249'][i],
      speed: 0.3 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2,
      dir: 1,
    }));

    const corals: Coral[] = Array.from({ length: 15 }, () => ({
      x: Math.random() * w,
      height: 30 + Math.random() * 60,
      width: 3 + Math.random() * 5,
      color: ['255,107,107', '232,89,74', '255,138,92', '255,71,87', '200,91,57'][Math.floor(Math.random() * 5)],
      branches: 1 + Math.floor(Math.random() * 3),
    }));

    const seaPlants: SeaPlant[] = Array.from({ length: 10 }, () => ({
      x: Math.random() * w,
      height: 40 + Math.random() * 50,
      color: ['46,204,113', '26,188,156', '0,184,148'][Math.floor(Math.random() * 3)],
      phase: Math.random() * Math.PI * 2,
    }));

    const fishSchools: FishSchool[] = Array.from({ length: 4 }, () => {
      const dir = Math.random() > 0.5 ? 1 : -1;
      return {
        x: Math.random() * w, y: h * 0.15 + Math.random() * h * 0.55,
        count: 5 + Math.floor(Math.random() * 6), spacing: 14 + Math.random() * 8,
        speed: 0.3 + Math.random() * 0.4, dir,
        color: ['0,229,255', '168,85,247', '34,211,238', '255,105,180'][Math.floor(Math.random() * 4)],
        phase: Math.random() * Math.PI * 2,
      };
    });

    const turtles: Creature[] = Array.from({ length: 2 }, () => {
      const dir = Math.random() > 0.5 ? 1 : -1;
      return {
        x: dir === 1 ? -60 : w + 60,
        y: h * 0.2 + Math.random() * h * 0.4,
        size: 50 + Math.random() * 20, speed: 0.15 + Math.random() * 0.15, dir,
        color: ['46,204,113', '26,188,156'][Math.floor(Math.random() * 2)],
        phase: Math.random() * Math.PI * 2,
      };
    });

    const mantaRays: Creature[] = [{
      x: Math.random() * w, y: h * 0.25 + Math.random() * h * 0.3,
      size: 80 + Math.random() * 30, speed: 0.2 + Math.random() * 0.1,
      dir: Math.random() > 0.5 ? 1 : -1,
      color: '94,94,255', phase: Math.random() * Math.PI * 2,
    }];

    const seahorses: Creature[] = Array.from({ length: 3 }, () => ({
      x: Math.random() * w, y: h * 0.5 + Math.random() * h * 0.35,
      size: 30 + Math.random() * 15,
      color: ['255,183,77', '233,121,249', '0,229,255'][Math.floor(Math.random() * 3)],
      speed: 0, phase: Math.random() * Math.PI * 2, dir: 1,
    }));

    function drawSprite(
      img: HTMLImageElement,
      color: string,
      x: number,
      y: number,
      spriteW: number,
      spriteH: number,
      alpha: number,
      flipX?: boolean,
    ) {
      const tinted = getTinted(img, `rgb(${color})`, Math.ceil(spriteW), Math.ceil(spriteH));
      ctx.save();
      ctx.translate(x, y);
      if (flipX) ctx.scale(-1, 1);
      ctx.globalAlpha = alpha;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(tinted, 0, 0, tinted.width, tinted.height, -spriteW / 2, -spriteH / 2, spriteW, spriteH);
      ctx.restore();
    }

    function drawGlow(x: number, y: number, radius: number, color: string, alpha: number) {
      const glow = ctx.createRadialGradient(x, y, 0, x, y, radius);
      glow.addColorStop(0, `rgba(${color},${alpha})`);
      glow.addColorStop(1, 'transparent');
      ctx.fillStyle = glow;
      ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
    }

    function draw(t: number) {
      ctx.clearRect(0, 0, w, h);

      // Subtle grid
      ctx.strokeStyle = 'rgba(0,240,255,0.015)';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 60) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = 0; y < h; y += 60) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }

      // Coral
      corals.forEach(c => {
        const sway = Math.sin(t * 0.001 + c.x) * 2;
        ctx.strokeStyle = `rgba(${c.color},0.2)`;
        ctx.lineWidth = c.width;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(c.x, h);
        ctx.quadraticCurveTo(c.x + sway, h - c.height * 0.6, c.x + sway * 1.5, h - c.height);
        ctx.stroke();
        if (c.branches > 1) {
          ctx.beginPath();
          ctx.moveTo(c.x + sway * 0.8, h - c.height * 0.5);
          ctx.quadraticCurveTo(c.x + sway + 10, h - c.height * 0.7, c.x + sway + 15, h - c.height * 0.85);
          ctx.lineWidth = c.width * 0.6;
          ctx.stroke();
        }
      });

      // Sea plants
      seaPlants.forEach(p => {
        const sway = Math.sin(t * 0.002 + p.phase) * 8;
        ctx.strokeStyle = `rgba(${p.color},0.12)`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(p.x, h);
        ctx.bezierCurveTo(
          p.x + sway * 0.3, h - p.height * 0.3,
          p.x + sway * 0.7, h - p.height * 0.6,
          p.x + sway, h - p.height,
        );
        ctx.stroke();
      });

      if (spritesReady) {
        // Jellyfish
        jellies.forEach(j => {
          const jx = j.x + Math.sin(t * 0.0005 + j.phase) * 30;
          const jy = j.y + Math.sin(t * 0.0008 * j.speed + j.phase) * 20;
          const pulse = 1 + Math.sin(t * 0.003 * j.speed) * 0.08;
          const sw = j.size * pulse * (60 / 80);
          const sh = j.size * pulse;
          drawGlow(jx, jy, j.size * 1.8, j.color, 0.07);
          drawSprite(jellyImg, j.color, jx, jy, sw, sh, 0.22);
        });

        // Fish schools
        fishSchools.forEach(s => {
          s.x += s.speed * s.dir;
          if (s.dir === 1 && s.x > w + 100) s.x = -100;
          if (s.dir === -1 && s.x < -100) s.x = w + 100;
          for (let i = 0; i < s.count; i++) {
            const row = i % 3;
            const col = Math.floor(i / 3);
            const fx = s.x - col * s.spacing * s.dir + Math.sin(t * 0.003 + i + s.phase) * 4;
            const fy = s.y + (row - 1) * s.spacing * 0.7 + Math.sin(t * 0.004 + i * 0.5) * 3;
            const fw = 18;
            const fh = 9;
            drawSprite(fishImg, s.color, fx, fy, fw, fh, 0.2, s.dir === -1);
          }
        });

        // Sea turtles
        turtles.forEach(tu => {
          tu.x += tu.speed * tu.dir;
          if (tu.dir === 1 && tu.x > w + 80) tu.x = -80;
          if (tu.dir === -1 && tu.x < -80) tu.x = w + 80;
          const ty = tu.y + Math.sin(t * 0.001 + tu.phase) * 15;
          const aspect = 80 / 50;
          const sh = tu.size / aspect;
          drawGlow(tu.x, ty, tu.size * 1.2, tu.color, 0.05);
          drawSprite(turtleImg, tu.color, tu.x, ty, tu.size, sh, 0.2, tu.dir === -1);
        });

        // Manta rays
        mantaRays.forEach(m => {
          m.x += m.speed * m.dir;
          if (m.dir === 1 && m.x > w + 120) m.x = -120;
          if (m.dir === -1 && m.x < -120) m.x = w + 120;
          const my = m.y + Math.sin(t * 0.0008 + m.phase) * 20;
          const aspect = 120 / 80;
          const sh = m.size / aspect;
          drawGlow(m.x, my, m.size * 1.0, m.color, 0.04);
          drawSprite(mantaImg, m.color, m.x, my, m.size, sh, 0.18, m.dir === -1);
        });

        // Seahorses
        seahorses.forEach(sh => {
          const sx = sh.x + Math.sin(t * 0.0006 + sh.phase) * 12;
          const sy = sh.y + Math.sin(t * 0.001 + sh.phase) * 8;
          const aspect = 40 / 80;
          const sw = sh.size * aspect;
          drawGlow(sx, sy, sh.size * 0.8, sh.color, 0.05);
          drawSprite(seahorseImg, sh.color, sx, sy, sw, sh.size, 0.22);
        });
      }

      // Bioluminescent particles
      particles.forEach(p => {
        p.y -= p.speed;
        p.x += Math.sin(t * 0.001 + p.phase) * 0.3;
        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3);
        glow.addColorStop(0, `rgba(${p.color},${0.3 + Math.sin(t * 0.003 + p.phase) * 0.15})`);
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.fillRect(p.x - p.r * 3, p.y - p.r * 3, p.r * 6, p.r * 6);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},0.5)`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    }

    animId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas id="neon-scene" ref={canvasRef} />;
}
