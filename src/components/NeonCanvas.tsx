import { useEffect, useRef } from 'react';

interface Particle {
  x: number; y: number; r: number; speed: number;
  color: string; phase: number;
}

interface Laser {
  x: number; color: string; speed: number; phase: number; width: number;
}

interface Jelly {
  x: number; y: number; size: number; color: string;
  speed: number; phase: number;
}

interface Coral {
  x: number; height: number; width: number; color: string; branches: number;
}

interface SeaPlant {
  x: number; height: number; color: string; phase: number;
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
    }
    resize();
    window.addEventListener('resize', resize);

    const particles: Particle[] = Array.from({ length: 80 }, () => ({
      x: Math.random() * 2000, y: Math.random() * 2000,
      r: 1 + Math.random() * 3, speed: 0.1 + Math.random() * 0.4,
      color: ['0,240,255', '255,45,170', '94,94,255', '168,85,247'][Math.floor(Math.random() * 4)],
      phase: Math.random() * Math.PI * 2,
    }));

    const lasers: Laser[] = Array.from({ length: 8 }, (_, i) => ({
      x: w * 0.1 + i * w * 0.11,
      color: ['0,240,255', '255,45,170', '94,94,255', '168,85,247', '0,240,255', '255,45,170', '12,250,202', '168,85,247'][i],
      speed: 0.3 + Math.random() * 0.4,
      phase: Math.random() * Math.PI * 2,
      width: 1 + Math.random() * 1.5,
    }));

    const jellies: Jelly[] = Array.from({ length: 5 }, (_, i) => ({
      x: w * 0.1 + Math.random() * w * 0.8,
      y: h * 0.2 + Math.random() * h * 0.6,
      size: 12 + Math.random() * 20,
      color: ['255,105,180', '0,229,255', '168,85,247', '34,211,238', '233,121,249'][i],
      speed: 0.3 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2,
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

      // Laser beams
      lasers.forEach(l => {
        const angle = Math.sin(t * 0.0008 * l.speed + l.phase) * 0.25;
        ctx.save();
        ctx.translate(l.x, h + 20);
        ctx.rotate(-Math.PI / 2 + angle);
        const opacity = 0.06 + Math.sin(t * 0.003 + l.phase) * 0.03;
        ctx.fillStyle = `rgba(${l.color},${opacity})`;
        ctx.fillRect(-l.width, 0, l.width * 2, h);
        ctx.fillStyle = `rgba(${l.color},${opacity * 0.3})`;
        ctx.fillRect(-l.width * 6, 0, l.width * 12, h);
        ctx.restore();
      });

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

      // Jellyfish
      jellies.forEach(j => {
        const jx = j.x + Math.sin(t * 0.0005 + j.phase) * 30;
        const jy = j.y + Math.sin(t * 0.0008 * j.speed + j.phase) * 20;
        const pulse = 1 + Math.sin(t * 0.003 * j.speed) * 0.12;

        const glow = ctx.createRadialGradient(jx, jy, 0, jx, jy, j.size * 2.5);
        glow.addColorStop(0, `rgba(${j.color},0.08)`);
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.fillRect(jx - j.size * 3, jy - j.size * 3, j.size * 6, j.size * 6);

        ctx.beginPath();
        ctx.ellipse(jx, jy, j.size * pulse * 0.9, j.size * pulse * 0.6, 0, Math.PI, 0);
        ctx.fillStyle = `rgba(${j.color},0.2)`;
        ctx.fill();
        ctx.strokeStyle = `rgba(${j.color},0.3)`;
        ctx.lineWidth = 1;
        ctx.stroke();

        for (let i = 0; i < 5; i++) {
          const tx = jx - j.size * 0.4 + i * j.size * 0.2;
          const sw = Math.sin(t * 0.003 + i + j.phase) * 4;
          ctx.beginPath();
          ctx.moveTo(tx, jy + j.size * 0.15);
          ctx.quadraticCurveTo(tx + sw, jy + j.size * 0.7, tx + sw * 1.5, jy + j.size * 1.1 + i * 2);
          ctx.strokeStyle = `rgba(${j.color},0.12)`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      });

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
