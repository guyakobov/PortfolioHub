import { motion } from 'motion/react';
import { ExternalLink, LockIcon, Cpu } from 'lucide-react';
import { Project } from '../types';
import { playHoverSound } from '../utils/audio';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const handleMouseEnter = () => {
    playHoverSound();
  };

  return (
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
            <img
              src={project.imageUrl}
              alt={project.title}
              className="h-full w-full object-cover transition-all duration-700 ease-out grayscale-[40%] opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
              loading="lazy"
            />
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
            
            {!project.isPrivate && project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 text-cyan-500/50 hover:text-cyan-300 hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] transition-all"
                aria-label={`Visit ${project.title}`}
              >
                <ExternalLink className="h-5 w-5" />
              </a>
            )}
          </div>

          <p className="mb-6 flex-1 text-sm leading-relaxed text-indigo-200/80 font-light">
            {project.description}
          </p>

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
  );
}
