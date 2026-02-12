import React, { useEffect, useRef, useState } from 'react';

// --- Falling Petals Component ---
const Petals: React.FC = () => {
  const [petals, setPetals] = useState<Array<{ id: number; left: number; duration: number; delay: number; type: string; size: number }>>([]);

  useEffect(() => {
    // Generate static petals initially
    const newPetals = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // %
      duration: 10 + Math.random() * 10, // seconds
      delay: Math.random() * 10, // seconds
      type: Math.random() > 0.5 ? '🌸' : '🌼', // Peach or Apricot
      size: 1 + Math.random(), // rem
    }));
    setPetals(newPetals);
  }, []);

  return (
    <>
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="petal"
          style={{
            left: `${petal.left}vw`,
            fontSize: `${petal.size}rem`,
            animationDuration: `${petal.duration}s, ${3 + Math.random() * 2}s`,
            animationDelay: `-${petal.delay}s, 0s`, // Negative delay to start mid-animation
          }}
        >
          {petal.type}
        </div>
      ))}
    </>
  );
};

// --- Fireworks Component (Canvas) ---
class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  
  constructor(x: number, y: number, color: string) {
    this.x = x;
    this.y = y;
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 3 + 1;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.alpha = 1;
    this.color = color;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.vy += 0.05; // gravity
    this.alpha -= 0.015; // fade out
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

class Rocket {
    x: number;
    y: number;
    vy: number;
    color: string;
    exploded: boolean;
    targetY: number;

    constructor(canvasHeight: number, canvasWidth: number) {
        this.x = Math.random() * canvasWidth;
        this.y = canvasHeight;
        this.vy = -(Math.random() * 5 + 10);
        this.color = `hsl(${Math.random() * 60 + 330}, 100%, 50%)`; // Red/Pink/Gold range
        this.exploded = false;
        this.targetY = canvasHeight * 0.2 + Math.random() * (canvasHeight * 0.5);
    }

    update() {
        this.y += this.vy;
        this.vy += 0.15; // gravity
        if (this.vy >= 0 || this.y <= this.targetY) {
            this.exploded = true;
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fill();
    }
}

const Fireworks: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let rockets: Rocket[] = [];
    let particles: Particle[] = [];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', resize);

    const loop = () => {
        // Clear with trails
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Not strictly transparent to leave trails, but since bg is complex, we might just clearRect if we want clean
        // Since the app has a background, let's just clearRect for clean look on top of app UI
        ctx.clearRect(0, 0, width, height);

        // Randomly launch rockets
        if (Math.random() < 0.02) { // 2% chance per frame
            rockets.push(new Rocket(height, width));
        }

        // Update Rockets
        for (let i = rockets.length - 1; i >= 0; i--) {
            const r = rockets[i];
            r.update();
            r.draw(ctx);

            if (r.exploded) {
                // Create explosion particles
                for (let j = 0; j < 40; j++) {
                    particles.push(new Particle(r.x, r.y, r.color));
                }
                rockets.splice(i, 1);
            }
        }

        // Update Particles
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.update();
            p.draw(ctx);
            if (p.alpha <= 0) {
                particles.splice(i, 1);
            }
        }

        requestAnimationFrame(loop);
    };

    const animationId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
};

export const Effects: React.FC = () => {
    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            <Petals />
            <Fireworks />
        </div>
    );
};
