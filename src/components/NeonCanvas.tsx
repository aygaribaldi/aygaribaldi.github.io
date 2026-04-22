import { useEffect, useRef } from 'react';

interface Particle {
  x: number; y: number; r: number; speed: number;
  color: string; phase: number;
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

interface FishSchool {
  x: number; y: number; count: number; spacing: number;
  speed: number; color: string; phase: number; dir: number;
}

interface Turtle {
  x: number; y: number; size: number; color: string;
  speed: number; phase: number; dir: number;
}

interface MantaRay {
  x: number; y: number; size: number; color: string;
  speed: number; phase: number; dir: number;
}

interface Seahorse {
  x: number; y: number; size: number; color: string; phase: number;
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

    const fishSchools: FishSchool[] = Array.from({ length: 4 }, () => {
      const dir = Math.random() > 0.5 ? 1 : -1;
      return {
        x: Math.random() * w, y: h * 0.15 + Math.random() * h * 0.55,
        count: 5 + Math.floor(Math.random() * 6), spacing: 12 + Math.random() * 8,
        speed: 0.3 + Math.random() * 0.4, dir,
        color: ['0,229,255', '168,85,247', '34,211,238', '255,105,180'][Math.floor(Math.random() * 4)],
        phase: Math.random() * Math.PI * 2,
      };
    });

    const turtles: Turtle[] = Array.from({ length: 2 }, () => {
      const dir = Math.random() > 0.5 ? 1 : -1;
      return {
        x: dir === 1 ? -60 : w + 60,
        y: h * 0.2 + Math.random() * h * 0.4,
        size: 18 + Math.random() * 10, speed: 0.15 + Math.random() * 0.15, dir,
        color: ['46,204,113', '26,188,156'][Math.floor(Math.random() * 2)],
        phase: Math.random() * Math.PI * 2,
      };
    });

    const mantaRays: MantaRay[] = [{
      x: Math.random() * w, y: h * 0.25 + Math.random() * h * 0.3,
      size: 30 + Math.random() * 15, speed: 0.2 + Math.random() * 0.1,
      dir: Math.random() > 0.5 ? 1 : -1,
      color: '94,94,255', phase: Math.random() * Math.PI * 2,
    }];

    const seahorses: Seahorse[] = Array.from({ length: 3 }, () => ({
      x: Math.random() * w, y: h * 0.5 + Math.random() * h * 0.35,
      size: 8 + Math.random() * 6,
      color: ['255,183,77', '233,121,249', '0,229,255'][Math.floor(Math.random() * 3)],
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
          const sz = 5;
          ctx.save();
          ctx.translate(fx, fy);
          if (s.dir === -1) ctx.scale(-1, 1);
          ctx.fillStyle = `rgba(${s.color},0.18)`;
          ctx.beginPath();
          ctx.ellipse(0, 0, sz, sz * 0.4, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.beginPath();
          ctx.moveTo(-sz, 0);
          ctx.lineTo(-sz - 3, -2.5);
          ctx.lineTo(-sz - 3, 2.5);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        }
      });

      // Sea turtles
      turtles.forEach(tu => {
        tu.x += tu.speed * tu.dir;
        if (tu.dir === 1 && tu.x > w + 80) tu.x = -80;
        if (tu.dir === -1 && tu.x < -80) tu.x = w + 80;
        const ty = tu.y + Math.sin(t * 0.001 + tu.phase) * 15;
        const flipper = Math.sin(t * 0.002 + tu.phase) * 0.3;
        const s = tu.size;
        ctx.save();
        ctx.translate(tu.x, ty);
        if (tu.dir === -1) ctx.scale(-1, 1);
        const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, s * 2);
        glow.addColorStop(0, `rgba(${tu.color},0.06)`);
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.fillRect(-s * 2, -s * 2, s * 4, s * 4);
        ctx.fillStyle = `rgba(${tu.color},0.15)`;
        ctx.beginPath();
        ctx.ellipse(0, 0, s, s * 0.65, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = `rgba(${tu.color},0.25)`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = `rgba(${tu.color},0.12)`;
        ctx.beginPath();
        ctx.ellipse(s * 0.9, 0, s * 0.3, s * 0.2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.save();
        ctx.translate(-s * 0.6, -s * 0.5);
        ctx.rotate(flipper);
        ctx.beginPath();
        ctx.ellipse(0, -s * 0.3, s * 0.15, s * 0.5, -0.3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${tu.color},0.12)`;
        ctx.fill();
        ctx.restore();
        ctx.save();
        ctx.translate(-s * 0.6, s * 0.5);
        ctx.rotate(-flipper);
        ctx.beginPath();
        ctx.ellipse(0, s * 0.3, s * 0.15, s * 0.5, 0.3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${tu.color},0.12)`;
        ctx.fill();
        ctx.restore();
        ctx.restore();
      });

      // Manta ray
      mantaRays.forEach(m => {
        m.x += m.speed * m.dir;
        if (m.dir === 1 && m.x > w + 120) m.x = -120;
        if (m.dir === -1 && m.x < -120) m.x = w + 120;
        const my = m.y + Math.sin(t * 0.0008 + m.phase) * 20;
        const wingFlap = Math.sin(t * 0.002 + m.phase) * 0.15;
        const s = m.size;
        ctx.save();
        ctx.translate(m.x, my);
        if (m.dir === -1) ctx.scale(-1, 1);
        const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, s * 3);
        glow.addColorStop(0, `rgba(${m.color},0.05)`);
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.fillRect(-s * 3, -s * 3, s * 6, s * 6);
        ctx.fillStyle = `rgba(${m.color},0.14)`;
        ctx.beginPath();
        ctx.ellipse(0, 0, s * 0.5, s * 0.25, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.save();
        ctx.translate(-s * 0.2, 0);
        ctx.rotate(wingFlap);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(-s * 0.5, -s * 0.8, -s * 1.2, -s * 0.1);
        ctx.quadraticCurveTo(-s * 0.5, s * 0.15, 0, 0);
        ctx.fillStyle = `rgba(${m.color},0.1)`;
        ctx.fill();
        ctx.restore();
        ctx.save();
        ctx.translate(-s * 0.2, 0);
        ctx.rotate(-wingFlap);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(-s * 0.5, s * 0.8, -s * 1.2, s * 0.1);
        ctx.quadraticCurveTo(-s * 0.5, -s * 0.15, 0, 0);
        ctx.fillStyle = `rgba(${m.color},0.1)`;
        ctx.fill();
        ctx.restore();
        ctx.beginPath();
        ctx.moveTo(-s * 0.5, 0);
        const tailSway = Math.sin(t * 0.003 + m.phase) * 5;
        ctx.quadraticCurveTo(-s * 0.9, tailSway, -s * 1.3, tailSway * 1.5);
        ctx.strokeStyle = `rgba(${m.color},0.12)`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();
      });

      // Seahorses
      seahorses.forEach(sh => {
        const sx = sh.x + Math.sin(t * 0.0006 + sh.phase) * 12;
        const sy = sh.y + Math.sin(t * 0.001 + sh.phase) * 8;
        const s = sh.size;
        ctx.save();
        ctx.translate(sx, sy);
        const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, s * 2);
        glow.addColorStop(0, `rgba(${sh.color},0.06)`);
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.fillRect(-s * 2, -s * 2, s * 4, s * 4);
        ctx.fillStyle = `rgba(${sh.color},0.18)`;
        ctx.beginPath();
        ctx.ellipse(0, -s * 0.3, s * 0.35, s * 0.5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(0, -s * 0.9, s * 0.25, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(s * 0.2, -s * 0.9);
        ctx.lineTo(s * 0.5, -s * 1.1);
        ctx.strokeStyle = `rgba(${sh.color},0.15)`;
        ctx.lineWidth = 1;
        ctx.stroke();
        const curlPhase = Math.sin(t * 0.002 + sh.phase) * 3;
        ctx.beginPath();
        ctx.moveTo(0, s * 0.15);
        ctx.bezierCurveTo(
          -s * 0.1, s * 0.5,
          -s * 0.3, s * 0.8 + curlPhase,
          -s * 0.15, s * 1.1 + curlPhase,
        );
        ctx.strokeStyle = `rgba(${sh.color},0.14)`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();
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
