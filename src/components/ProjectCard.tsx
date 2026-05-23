import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'motion/react';
import { ExternalLink, LockIcon, Cpu, X, Maximize2, ArrowUpRight } from 'lucide-react';
import { Project } from '../types';
import { playHoverSound } from '../utils/audio';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [isImageOpen, setIsImageOpen] = useState(false);

  useEffect(() => {
    if (!isImageOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsImageOpen(false);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isImageOpen]);

  const handleMouseEnter = () => {
    playHoverSound();
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, delay: Math.min(index * 0.1, 0.5), ease: "easeOut" }}
        className="perspective-[1000px] h-full"
      >
        <div
          onMouseEnter={handleMouseEnter}
          className="group relative flex flex-col h-full overflow-hidden bg-[#06041a] border border-white/5 hover:border-cyan-400/40 rounded-xl transition-colors duration-500"
        >
          {/* Sci-fi corner brackets */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-[1px] border-l-[1px] border-cyan-400/0 group-hover:border-cyan-400/60 transition-all duration-500 z-20 pointer-events-none rounded-tl-xl" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-[1px] border-r-[1px] border-fuchsia-400/0 group-hover:border-fuchsia-400/60 transition-all duration-500 z-20 pointer-events-none rounded-tr-xl" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-[1px] border-r-[1px] border-cyan-400/0 group-hover:border-cyan-400/60 transition-all duration-500 z-20 pointer-events-none rounded-br-xl" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-[1px] border-l-[1px] border-fuchsia-400/0 group-hover:border-fuchsia-400/60 transition-all duration-500 z-20 pointer-events-none rounded-bl-xl" />

          {/* Ambient background glow inside card */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-cyan-500/20 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        <div className="relative aspect-video w-full overflow-hidden bg-[#020108] border-b border-white/5">
          <div className="absolute inset-0 bg-blue-950/40 mix-blend-color z-10 pointer-events-none" />
          {project.imageUrl ? (
            <button
              type="button"
              onClick={() => setIsImageOpen(true)}
              className="block h-full w-full cursor-zoom-in"
              aria-label={`Open larger image for ${project.title}`}
            >
              <img
                src={project.imageUrl}
                alt={project.title}
                className="h-full w-full object-cover transition-all duration-700 ease-out grayscale-[40%] opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                loading="lazy"
              />
              <span className="absolute bottom-4 right-4 z-20 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/45 px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-white/80 opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100">
                <Maximize2 className="h-3 w-3" />
                Expand
              </span>
            </button>
          ) : (
            <div className="flex flex-col gap-2 h-full w-full items-center justify-center font-display text-lg text-cyan-500/30">
              <Cpu className="w-10 h-10 opacity-40" />
              <span>{project.title}</span>
            </div>
          )}
          {/* Subtle scanline overlay to sell the "future" vibe */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020108] via-transparent to-transparent opacity-90 z-10 pointer-events-none" />
        </div>

        <div className="flex flex-1 flex-col p-6 relative z-10">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-400/60">
              <span>// PRJ_{index.toString().padStart(3, '0')}</span>
              <span className="w-8 h-[1px] bg-gradient-to-r from-cyan-500/30 to-transparent" />
            </div>
            
            {project.isPrivate ? (
              <span className="flex items-center gap-1.5 px-2 py-0.5 text-[9px] font-mono uppercase tracking-widest text-fuchsia-300 bg-fuchsia-500/10 border border-fuchsia-500/30 shadow-[0_0_10px_rgba(217,70,239,0.1)] rounded-sm">
                <LockIcon className="h-3 w-3" />
                Classified
              </span>
            ) : null}
          </div>

          <div className="mb-4 flex items-start justify-between gap-4">
            <h3 className="font-display text-2xl font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors drop-shadow-sm">
              {project.title}
            </h3>
            
            {!project.isPrivate && project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 grid h-10 w-10 flex-none place-items-center rounded-full border border-cyan-300/40 bg-cyan-300 text-[#030014] shadow-[0_0_18px_rgba(34,211,238,0.28)] transition-all hover:scale-110 hover:bg-white hover:shadow-[0_0_24px_rgba(34,211,238,0.55)]"
                aria-label={`Visit ${project.title}`}
              >
                <ExternalLink className="h-5 w-5" />
              </a>
            ) : null}
          </div>

          <p className="mb-6 flex-1 text-sm leading-relaxed text-indigo-200/80 font-light">
            {project.description}
          </p>

          {!project.isPrivate && project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-5 inline-flex w-full items-center justify-center gap-3 rounded-lg border border-cyan-300/50 bg-cyan-300 px-4 py-3 text-sm font-bold text-[#030014] shadow-[0_0_20px_rgba(34,211,238,0.25)] transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_0_28px_rgba(34,211,238,0.5)]"
            >
              Visit site
              <ArrowUpRight className="h-4 w-4" />
            </a>
          ) : null}

          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-[10px] font-mono uppercase tracking-widest text-cyan-200 bg-cyan-950/30 border border-cyan-500/20 group-hover:border-cyan-500/40 transition-colors rounded-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      </motion.div>

      {isImageOpen && project.imageUrl
        ? createPortal(
            <div
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#020108]/95 p-4 backdrop-blur-xl sm:p-6"
              role="dialog"
              aria-modal="true"
              aria-label={`${project.title} large image`}
              onClick={() => setIsImageOpen(false)}
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(217,70,239,0.14),transparent_35%)]" />
              <div
                className="relative flex max-h-[92vh] w-full max-w-7xl flex-col overflow-hidden rounded-2xl border border-cyan-400/20 bg-[#06041a] shadow-[0_0_60px_rgba(34,211,238,0.18)]"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-3 sm:px-5">
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-300/70">Image Preview</p>
                    <h2 className="truncate text-base font-semibold text-white sm:text-lg">{project.title}</h2>
                  </div>
                  <button
                    type="button"
                    className="grid h-10 w-10 flex-none place-items-center rounded-full border border-white/15 bg-white/10 text-white transition hover:border-cyan-300/60 hover:bg-cyan-400/15"
                    onClick={() => setIsImageOpen(false)}
                    aria-label="Close image"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="min-h-0 overflow-auto bg-black/30 p-3 sm:p-5">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="mx-auto max-h-[78vh] w-auto max-w-full rounded-lg object-contain"
                  />
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
