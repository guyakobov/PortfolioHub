import { useEffect, useRef } from 'react';

export function NeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let particleCount = 60;
    let animationFrameId: number;
    let lastFrameTime = 0;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const targetFps = prefersReducedMotion ? 12 : isCoarsePointer ? 24 : 45;
    const frameInterval = 1000 / targetFps;

    const mouse = {
      x: null as number | null,
      y: null as number | null,
      radius: isCoarsePointer ? 0 : 200,
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handleMouseLeave);

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, isCoarsePointer ? 1 : 1.25);
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particleCount = isCoarsePointer ? 34 : Math.min(64, Math.max(44, Math.floor((width * height) / 18000)));
      init();
    };

    window.addEventListener('resize', resizeCanvas);

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;

      constructor() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.speedY = (Math.random() - 0.5) * 0.8;
      }

      update(delta: number) {
        const width = window.innerWidth;
        const height = window.innerHeight;
        if (this.x > width || this.x < 0) this.speedX = -this.speedX;
        if (this.y > height || this.y < 0) this.speedY = -this.speedY;

        this.x += this.speedX * delta;
        this.y += this.speedY * delta;

        if (mouse.x != null && mouse.y != null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius) {
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouse.radius - distance) / mouse.radius;
            // Particles move slightly towards the cursor
            this.x += forceDirectionX * force * 0.5;
            this.y += forceDirectionY * force * 0.5;
          }
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(34, 211, 238, 0.4)';
        ctx.fill();
      }
    }

    function init() {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    }

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      if (!ctx || !canvas) return;

      const now = performance.now();
      const elapsed = now - lastFrameTime;
      if (elapsed < frameInterval) return;
      const delta = Math.min(elapsed / 16.67, 2);
      lastFrameTime = now - (elapsed % frameInterval);

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.globalCompositeOperation = 'lighter';

      for (let i = 0; i < particles.length; i++) {
        particles[i].update(delta);
        particles[i].draw();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distanceSq = dx * dx + dy * dy;

          if (distanceSq < 10000) {
            const distance = Math.sqrt(distanceSq);
            ctx.beginPath();
            ctx.strokeStyle = `rgba(34, 211, 238, ${(1 - distance / 100) * 0.2})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            ctx.closePath();
          }
        }

        // Connection with mouse
        if (mouse.x != null && mouse.y != null) {
          const dx = particles[i].x - mouse.x;
          const dy = particles[i].y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(217, 70, 239, ${(1 - distance / 150) * 0.5})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
            ctx.closePath();
          }
        }
      }
    }

    resizeCanvas();
    animate();

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handleMouseLeave);
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />;
}
