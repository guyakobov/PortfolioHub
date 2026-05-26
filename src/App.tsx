import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Box, Code2, Github, Linkedin, Mail, ArrowRight, ArrowUp, Users, Volume2, VolumeX } from 'lucide-react';
import { projects } from './data';
import { ProjectCard } from './components/ProjectCard';
import { NeuralNetwork } from './components/NeuralNetwork';
import { toggleMute, isMuted } from './utils/audio';
import { useState, useEffect } from 'react';
import heroCubeVisual from './assets/hero-cube-visual.png';

const projectById = new Map(projects.map((project) => [project.id, project]));
const projectGroups = [
  {
    title: 'Websites',
    description: 'Public web platforms and content products.',
    ids: ['aiverse', 'tech-knowledge-share'],
  },
  {
    title: 'Mobile Applications',
    description: 'Mobile-first products and community applications.',
    ids: ['mama-link'],
  },
  {
    title: 'Private Enterprise Work',
    description: 'Selected client work shown with limited public detail.',
    ids: ['real-estate-crm-search'],
  },
].map((group) => ({
  ...group,
  projects: group.ids
    .map((id) => projectById.get(id))
    .filter((project): project is NonNullable<ReturnType<typeof projectById.get>> => Boolean(project)),
}));

function BootSequence({ onComplete }: { onComplete: () => void }) {
  const logs = [
    "INIT KERNEL........ OK",
    "MOUNTING VFS....... OK",
    "LOADING MODULES.... OK",
    "ESTABLISHING LINK.. OK",
    "DECRYPTING CORE.... OK",
    "SYSTEM ONLINE ======>"
  ];
  
  const [currentLog, setCurrentLog] = useState(0);
  const [timestamps] = useState(() => Array.from({length: 6}, () => (Math.random() * 10).toFixed(4)));

  useEffect(() => {
    if (currentLog < logs.length) {
      const timer = setTimeout(() => {
        setCurrentLog(c => c + 1);
      }, Math.random() * 200 + 150);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        onComplete();
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [currentLog, onComplete, logs.length]);

  return (
    <motion.div 
      exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col justify-end p-8 sm:p-12 md:p-24 bg-[#030014] font-mono text-cyan-500 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />
      <div className="w-full max-w-4xl flex flex-col gap-2 relative z-10">
        {logs.slice(0, currentLog + 1).map((log, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-sm sm:text-base md:text-xl whitespace-nowrap"
          >
            <span className="text-cyan-800 mr-4">{`[ ${timestamps[i]} ]`}</span>
            <span className="text-cyan-400">{log}</span>
          </motion.div>
        ))}
        {currentLog < logs.length && (
          <motion.div
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="w-3 h-5 sm:w-4 sm:h-6 bg-cyan-400 mt-2"
          />
        )}
      </div>
    </motion.div>
  );
}

function MobileHeroVisual() {
  return (
    <div className="relative mt-8 h-64 overflow-hidden sm:hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(167,139,250,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(167,139,250,0.08)_1px,transparent_1px)] bg-[size:34px_34px] opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_15%,transparent_82%)]" />
      <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/25 blur-[70px]" />
      <svg viewBox="0 0 360 250" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="mobileCubeLine" x1="70" y1="42" x2="290" y2="208">
            <stop stopColor="#8b5cf6" stopOpacity="0.15" />
            <stop offset="0.5" stopColor="#c084fc" stopOpacity="0.9" />
            <stop offset="1" stopColor="#8b5cf6" stopOpacity="0.15" />
          </linearGradient>
          <radialGradient id="mobileCubeGlow" cx="50%" cy="45%" r="60%">
            <stop stopColor="#f5d0fe" stopOpacity="0.95" />
            <stop offset="1" stopColor="#7c3aed" stopOpacity="0.08" />
          </radialGradient>
        </defs>

        <ellipse cx="180" cy="135" rx="112" ry="60" stroke="#c084fc" strokeOpacity="0.24" />
        <ellipse cx="180" cy="135" rx="88" ry="47" stroke="#c084fc" strokeOpacity="0.32" />
        <path d="M65 70 L128 95" stroke="url(#mobileCubeLine)" />
        <path d="M295 70 L232 95" stroke="url(#mobileCubeLine)" />
        <path d="M75 200 L132 170" stroke="url(#mobileCubeLine)" />
        <path d="M285 200 L228 170" stroke="url(#mobileCubeLine)" />

        <polygon points="180,70 245,118 180,166 115,118" stroke="#c084fc" strokeOpacity="0.7" fill="#7c3aed" fillOpacity="0.11" />
        <polygon points="180,94 220,123 180,154 140,123" stroke="#f3e8ff" strokeOpacity="0.9" fill="url(#mobileCubeGlow)" fillOpacity="0.55" />
        <path d="M180 70 V94" stroke="#c084fc" strokeOpacity="0.5" />
        <path d="M115 118 L140 123" stroke="#c084fc" strokeOpacity="0.35" />
        <path d="M245 118 L220 123" stroke="#c084fc" strokeOpacity="0.35" />
        <path d="M180 166 V154" stroke="#c084fc" strokeOpacity="0.5" />

        {[82, 130, 230, 278].map((x, index) => (
          <circle key={x} cx={x} cy={index < 2 ? 92 : 178} r="3" fill="#f5d0fe" />
        ))}
        <circle cx="180" cy="123" r="6" fill="#f5d0fe" />
        <circle cx="180" cy="123" r="32" fill="#a855f7" fillOpacity="0.18" />
      </svg>

      <div className="absolute left-1 top-5 text-[10px] font-semibold text-white/85">
        AI / ML
        <div className="text-[9px] font-normal text-white/45">Intelligence Layer</div>
      </div>
      <div className="absolute right-1 top-5 text-right text-[10px] font-semibold text-white/85">
        Data
        <div className="text-[9px] font-normal text-white/45">Pipelines</div>
      </div>
      <div className="absolute bottom-5 left-2 text-[10px] font-semibold text-white/85">
        Automation
        <div className="text-[9px] font-normal text-white/45">Workflows</div>
      </div>
      <div className="absolute bottom-5 right-2 text-right text-[10px] font-semibold text-white/85">
        Products
        <div className="text-[9px] font-normal text-white/45">Real Impact</div>
      </div>
    </div>
  );
}

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [bootComplete, setBootComplete] = useState(false);
  const [audioMuted, setAudioMuted] = useState(isMuted());
  
  const handleToggleMute = () => {
    setAudioMuted(toggleMute());
  };
  
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 2000], [0, 400]);
  const y2 = useTransform(scrollY, [0, 2000], [0, -300]);
  const bgGridY = useTransform(scrollY, [0, 2000], [0, 150]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <AnimatePresence>
        {!bootComplete && <BootSequence onComplete={() => setBootComplete(true)} />}
      </AnimatePresence>

      <div className={`min-h-screen font-sans selection:bg-cyan-500/30 selection:text-cyan-100 relative bg-[#030014] overflow-hidden text-indigo-100 container-transition ${!bootComplete ? 'h-screen overflow-hidden' : ''}`}>
        
        {/* Audio Toggle Button */}
        <AnimatePresence>
          {bootComplete && (
            <motion.button
              initial={{ opacity: 0, y: -20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              onClick={handleToggleMute}
              className="fixed top-6 right-6 z-50 flex h-10 w-10 sm:top-8 sm:right-8 items-center justify-center bg-cyan-950/40 backdrop-blur-md border border-cyan-500/30 text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.1)] hover:shadow-[0_0_15px_rgba(34,211,238,0.3)] transition-all hover:bg-cyan-900/60 hover:text-cyan-300 hover:border-cyan-400 active:scale-95 rounded-full"
              aria-label={audioMuted ? "Unmute sounds" : "Mute sounds"}
            >
              {audioMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </motion.button>
          )}
        </AnimatePresence>

        {/* Background glow effects */}
        <AnimatePresence>
          {bootComplete && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="pointer-events-none fixed inset-0 z-0"
            >
              <motion.div 
                style={{ y: y1 }}
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute top-[-20%] left-[-10%] h-[700px] w-[700px] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.15)_0%,transparent_70%)] blur-[80px]" 
              />
              <motion.div 
                style={{ y: y2 }}
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-[20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(217,70,239,0.1)_0%,transparent_70%)] blur-[80px]" 
              />
              {/* Animated Grid Lines */}
              <motion.div 
                style={{ y: bgGridY }}
                className="absolute inset-[-50%] bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_10%,transparent_100%)] pointer-events-none" 
              />
              <NeuralNetwork />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {bootComplete && (
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2,
                    delayChildren: 0.4
                  }
                }
              }}
              className="relative z-10 mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-32 lg:px-8"
            >
              
              {/* Hero Section */}
              <motion.section 
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
                }}
                className="mb-32 grid items-center gap-10 text-left lg:grid-cols-[0.7fr_1.3fr]"
              >
          <div>
          <div className="mb-7 flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75"></span>
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-violet-400 shadow-[0_0_18px_rgba(167,139,250,0.75)]"></span>
              </span>
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-white/55">
              Welcome to GY Studio
            </span>
            </div>
          
              <h1 className="mb-6 max-w-2xl font-display text-[clamp(2.75rem,12vw,3.5rem)] font-extrabold leading-[0.98] tracking-tight text-white sm:text-7xl lg:text-6xl xl:text-7xl">
            <span className="block sm:whitespace-nowrap">Turning Vision</span>
            <span className="relative mt-2 block sm:whitespace-nowrap">
              <span>Into </span>
              <span className="absolute -inset-2 bg-gradient-to-r from-violet-500 via-fuchsia-400 to-violet-300 blur-2xl opacity-35"></span>
              <span className="relative bg-gradient-to-r from-violet-400 via-fuchsia-300 to-violet-300 bg-clip-text text-transparent drop-shadow-[0_0_22px_rgba(167,139,250,0.35)]">Products</span>
            </span>
          </h1>
          
          <p className="max-w-md text-base leading-relaxed text-white/65 sm:text-lg">
            A curated collection of products, systems, and ideas brought to life.
          </p>

          <div className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <a
              href="#work"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-violet-300/50 bg-violet-500 px-8 py-4 text-sm font-semibold text-white shadow-[0_0_28px_rgba(139,92,246,0.45)] transition-all hover:-translate-y-1 hover:bg-violet-400 hover:shadow-[0_0_36px_rgba(167,139,250,0.6)]"
            >
              <span className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-white/0 via-white/20 to-white/0 transition-transform duration-700 ease-in-out group-hover:translate-x-[100%]" />
              Explore Work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <div className="flex items-center gap-4">
              <a href="https://github.com/guyakobov" target="_blank" rel="noreferrer" className="grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-white text-[#030014] shadow-[0_0_18px_rgba(255,255,255,0.18)] transition-all hover:scale-110 hover:bg-cyan-200 hover:shadow-[0_0_24px_rgba(34,211,238,0.45)]">
                <span className="sr-only">GitHub</span>
                <Github className="h-6 w-6" />
              </a>
              <a href="https://www.linkedin.com/in/guy-yakobov-471051129/" target="_blank" rel="noreferrer" className="grid h-12 w-12 place-items-center rounded-full border border-cyan-300/40 bg-[#0a66c2] text-white shadow-[0_0_18px_rgba(10,102,194,0.35)] transition-all hover:scale-110 hover:bg-[#0b7ee8] hover:shadow-[0_0_24px_rgba(10,126,232,0.55)]">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div className="mt-10 grid w-full max-w-[620px] grid-cols-3 gap-0 text-white sm:mt-12">
            <div data-stat="projects" className="flex min-w-0 justify-center border-r border-white/10 px-2">
              <div className="flex items-center gap-2 sm:gap-3">
                <Box className="h-5 w-5 flex-none text-white/70 sm:h-7 sm:w-7" />
                <div className="min-w-0">
                  <div className="text-xl font-bold text-white sm:text-2xl">4+</div>
                  <div className="text-[11px] text-white/55 sm:text-xs">Projects</div>
                </div>
              </div>
            </div>
            <div data-stat="technologies" className="flex min-w-0 justify-center border-r border-white/10 px-2">
              <div className="flex items-center gap-2 sm:gap-3">
                <Code2 className="h-5 w-5 flex-none text-white/70 sm:h-7 sm:w-7" />
                <div className="min-w-0">
                  <div className="text-xl font-bold text-white sm:text-2xl">8+</div>
                  <div className="text-[11px] text-white/55 sm:text-xs">Technologies</div>
                </div>
              </div>
            </div>
            <div data-stat="years" className="flex min-w-0 justify-center px-2">
              <div className="flex items-center gap-2 sm:gap-3">
                <Users className="h-5 w-5 flex-none text-white/70 sm:h-7 sm:w-7" />
                <div className="min-w-0">
                  <div className="text-xl font-bold text-white sm:text-2xl">10+</div>
                  <div className="text-[11px] leading-tight text-white/55 sm:text-xs">Years of Building</div>
                </div>
              </div>
            </div>
          </div>
          </div>

          <MobileHeroVisual />

          <motion.div
            className="relative mt-8 hidden min-h-[400px] overflow-visible sm:block lg:mt-0 lg:min-h-[520px]"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.div
              className="absolute inset-0 overflow-visible mix-blend-screen sm:inset-[-18px]"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="pointer-events-none absolute inset-x-10 bottom-10 top-16 rounded-full bg-purple-700/20 blur-[90px]" />
              <motion.img
                src={heroCubeVisual}
                alt="AI, data engineering, automation, and product systems visual"
                className="absolute left-1/2 top-[-40px] w-[120%] max-w-none -translate-x-1/2 opacity-90 [mask-image:radial-gradient(ellipse_at_center,black_36%,rgba(0,0,0,0.82)_58%,transparent_80%)] [mask-repeat:no-repeat] [mask-size:100%_100%] sm:left-0 sm:top-[-140px] sm:w-full sm:translate-x-0 lg:top-[-180px]"
                animate={{ scale: [1.01, 1.04, 1.01], filter: ['brightness(1)', 'brightness(1.1)', 'brightness(1)'] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_38%,rgba(3,0,20,0.22)_68%,rgba(3,0,20,0)_100%)]" />
            </motion.div>
          </motion.div>
        </motion.section>

              {/* Work Section */}
              <motion.section 
                id="work" 
                className="mb-32 scroll-mt-24 relative"
                variants={{
                  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
                  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } }
                }}
              >
                <div className="absolute left-0 top-0 h-full w-[1px] bg-gradient-to-b from-cyan-500/50 via-fuchsia-500/20 to-transparent hidden lg:block -ml-8" />
                
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-6 relative"
                >
            <div className="flex items-center gap-4 hidden lg:flex absolute left-[-39px] top-4">
              <div className="w-4 h-[1px] bg-cyan-500/50" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono text-sm tracking-widest text-cyan-400 uppercase">Directory</span>
                <span className="h-[1px] w-12 bg-cyan-500/30"></span>
              </div>
              <h2 className="font-display text-4xl font-bold tracking-tight text-white drop-shadow-sm">Selected Projects</h2>
            </div>
          </motion.div>

          <div className="space-y-16">
            {projectGroups.map((group) => (
              <section key={group.title} aria-labelledby={`${group.title.toLowerCase().replace(/\s+/g, '-')}-heading`}>
                <div className="mb-6 flex flex-col gap-2 border-l border-cyan-400/30 pl-4">
                  <h3 id={`${group.title.toLowerCase().replace(/\s+/g, '-')}-heading`} className="font-display text-2xl font-bold tracking-tight text-white">
                    {group.title}
                  </h3>
                  <p className="max-w-2xl text-sm leading-relaxed text-indigo-200/70">
                    {group.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {group.projects.map((project) => (
                    <ProjectCard key={project.id} project={project} index={projects.findIndex((item) => item.id === project.id)} />
                  ))}
                </div>
              </section>
            ))}
          </div>
              </motion.section>

              {/* Contact Section */}
              <motion.section 
                id="contact" 
                className="py-24 border-t border-cyan-500/10 relative"
                variants={{
                  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
                  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } }
                }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
                 <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mx-auto max-w-2xl text-center"
                >
            <h2 className="font-mono text-sm font-semibold tracking-[0.3em] text-fuchsia-400 uppercase mb-4">Transmission</h2>
            <h3 className="font-display text-4xl font-bold tracking-tight text-white drop-shadow-sm">Initiate Contact</h3>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-indigo-300/80 font-light">
              Looking to collaborate on something extraordinary? My communication channels are open for new transmissions.
            </p>
            <div className="mt-10 flex justify-center">
              <a
                href="mailto:hello@example.com"
                className="group relative inline-flex items-center gap-3 bg-fuchsia-500/10 border border-fuchsia-400/30 px-8 py-4 text-sm font-mono tracking-widest uppercase text-fuchsia-200 shadow-[0_0_15px_rgba(217,70,239,0.15)] hover:bg-fuchsia-500/20 hover:border-fuchsia-400/80 hover:shadow-[0_0_30px_rgba(217,70,239,0.3)] hover:-translate-y-1 transition-all"
              >
                <span className="absolute w-[2px] h-[10px] bg-fuchsia-400 top-0 left-0" />
                <span className="absolute w-[10px] h-[2px] bg-fuchsia-400 top-0 left-0" />
                <span className="absolute w-[2px] h-[10px] bg-fuchsia-400 bottom-0 right-0" />
                <span className="absolute w-[10px] h-[2px] bg-fuchsia-400 bottom-0 right-0" />
                <Mail className="h-4 w-4" />
                Establish Link
              </a>
                 </div>
               </motion.div>
             </motion.section>

             {/* Footer */}
             <motion.footer 
               className="mt-16 text-center text-sm font-mono text-cyan-500/40 pb-8"
               variants={{
                 hidden: { opacity: 0 },
                 visible: { opacity: 1, transition: { duration: 0.8 } }
               }}
             >
                <p>SYS.LOG // {new Date().getFullYear()} // ALL SYSTEMS NOMINAL</p>
             </motion.footer>
             
           </motion.div>
         )}
       </AnimatePresence>

       {/* Scroll to Top Button */}
       <AnimatePresence>
         {showScrollTop && bootComplete && (
           <motion.button
             initial={{ opacity: 0, y: 20, scale: 0.8 }}
             animate={{ opacity: 1, y: 0, scale: 1 }}
             exit={{ opacity: 0, y: 20, scale: 0.8 }}
             transition={{ duration: 0.3 }}
             onClick={scrollToTop}
             className="fixed bottom-8 right-8 z-50 hidden h-12 w-12 items-center justify-center bg-cyan-950/80 backdrop-blur-md border border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.15)] hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all hover:bg-cyan-900 hover:text-cyan-300 hover:border-cyan-400 active:scale-95 sm:bottom-12 sm:right-12 sm:flex"
             aria-label="Scroll to top"
           >
             <ArrowUp className="h-5 w-5" />
             </motion.button>
           )}
         </AnimatePresence>
       </div>
    </>
   );
 }
