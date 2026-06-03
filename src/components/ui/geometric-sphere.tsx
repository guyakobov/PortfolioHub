import { ArrowRight, Github, Linkedin } from 'lucide-react';
import { useEffect, useMemo, useRef } from 'react';

const CONFIG = {
  primaryColor: '139, 92, 246',
  secondaryColor: '59, 130, 246',
  sphereRotationDuration: '240s',
  gridPanDuration: '180s',
  coreGlowDuration: '25s',
  wireframeOpacity: 0.75,
  wireframeShadowIntensity: 70,
  coreBlur: 200,
  parallaxDepth: 35,
  lerpFactor: 0.08,
  sphereDensity: 10,
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export default function SphereHero() {
  const targetMousePos = useRef({ x: 0, y: 0 });
  const currentMousePos = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);
  const hazeRef = useRef<HTMLDivElement>(null);
  const baseRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    if (prefersReducedMotion || isCoarsePointer) return;

    const animateLerp = () => {
      currentMousePos.current.x = lerp(currentMousePos.current.x, targetMousePos.current.x, CONFIG.lerpFactor);
      currentMousePos.current.y = lerp(currentMousePos.current.y, targetMousePos.current.y, CONFIG.lerpFactor);

      const { x, y } = currentMousePos.current;
      const parallaxDepth = CONFIG.parallaxDepth;
      if (hazeRef.current) {
        hazeRef.current.style.transform = `translate3d(${x * (parallaxDepth / 2)}px, ${y * (parallaxDepth / 2)}px, 0)`;
      }
      if (baseRef.current) {
        baseRef.current.style.transform = `translate3d(${x * parallaxDepth}px, ${y * parallaxDepth}px, 0)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${x * parallaxDepth}px, ${y * parallaxDepth}px, 0)`;
      }
      if (tiltRef.current) {
        tiltRef.current.style.transform = `rotateX(${y * 5}deg) rotateY(${-x * 5}deg)`;
      }

      animationFrameRef.current = requestAnimationFrame(animateLerp);
    };

    animationFrameRef.current = requestAnimationFrame(animateLerp);
    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      targetMousePos.current = {
        x: (event.clientX - centerX) / centerX,
        y: (event.clientY - centerY) / centerY,
      };
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  const sphereRings = useMemo(() => Array.from({ length: CONFIG.sphereDensity }, (_, index) => {
    const step = 90 / (CONFIG.sphereDensity / 2);
    const angle = index * step;
    return (
      <div
        key={`ring-${index}`}
        className="wireframe-line"
        style={{ transform: index % 2 === 0 ? `rotateY(${angle}deg)` : `rotateX(${angle}deg)` }}
        aria-hidden="true"
      />
    );
  }), []);

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-x-clip overflow-y-visible bg-transparent font-sans">
      <div
        ref={hazeRef}
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(${CONFIG.primaryColor}, 0.15) 0%, transparent 50%)`,
          filter: 'blur(150px)',
          opacity: 0.6,
          mixBlendMode: 'screen',
        }}
      />

      <div
        ref={baseRef}
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(at 50% 50%, rgba(${CONFIG.primaryColor}, 0.06) 0%, transparent 72%)`,
        }}
      >
        <div
          className="core-light pointer-events-none absolute left-1/2 top-1/2 rounded-full"
          style={{
            width: '400px',
            height: '400px',
            transform: 'translate(-50%, -50%)',
            backgroundImage: `radial-gradient(circle, rgba(${CONFIG.secondaryColor}, 0.45) 0%, transparent 70%)`,
            filter: `blur(${CONFIG.coreBlur}px)`,
            boxShadow: `0 0 ${CONFIG.coreBlur / 2}px 30px rgba(${CONFIG.secondaryColor}, 0.2), 0 0 ${CONFIG.coreBlur}px 50px rgba(${CONFIG.primaryColor}, 0.15)`,
          }}
        />
      </div>

      <div className="sphere-container pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        <div
          ref={tiltRef}
          className="sphere-tilt h-[min(700px,82vw)] w-[min(700px,82vw)]"
          style={{ transformOrigin: 'center center' }}
        >
          <div
            className="sphere-rotation h-full w-full"
            style={{
              animationDuration: CONFIG.sphereRotationDuration,
            }}
          >
            {sphereRings}
          </div>
        </div>
      </div>

      <div
        ref={glowRef}
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(${CONFIG.primaryColor}, 0.35) 0%, transparent 50%), radial-gradient(circle at 10% 10%, rgba(${CONFIG.secondaryColor}, 0.25) 0%, transparent 30%)`,
          mixBlendMode: 'screen',
          filter: 'blur(100px)',
          opacity: 0.95,
        }}
      />

      <div className="relative z-20 mx-auto max-w-5xl p-8 text-center text-white">
        <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-purple-300/25 bg-white/8 px-5 py-2.5 font-mono text-base font-bold uppercase tracking-[0.22em] text-white shadow-[0_0_30px_rgba(168,85,247,0.28)] backdrop-blur-md sm:text-lg">
          <span className="h-2.5 w-2.5 rounded-full bg-purple-400 shadow-[0_0_18px_rgba(168,85,247,0.9)]" />
          <span>Welcome to GY Studio</span>
        </div>
        <h1 className="hero-title">
          Turning Vision
          <br />
          <span className="hero-gradient">Into Products</span>
        </h1>
        <p className="hero-sub">
          A curated collection of products, systems, and ideas brought to life.
        </p>
        <div className="hero-cta">
          <a className="btn-primary" href="#work">
            Explore Work
            <ArrowRight className="h-4 w-4" />
          </a>
          <a className="btn-ghost" href="#contact">
            Contact
          </a>
        </div>
        <div className="mt-8 flex justify-center gap-4">
          <a className="social-chip" href="https://github.com/guyakobov" target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github className="h-5 w-5" />
          </a>
          <a className="social-chip" href="https://www.linkedin.com/in/guy-yakobov-471051129/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <Linkedin className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
