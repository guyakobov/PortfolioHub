import { AnimatePresence, motion } from 'motion/react';
import { ArrowRight, Box, Code2, Github, Linkedin, Mail, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import SphereHero from './components/ui/geometric-sphere';
import { ProjectCard } from './components/ProjectCard';
import { NeuralNetwork } from './components/NeuralNetwork';
import { projects } from './data';
import heroCubeVisual from './assets/hero-cube-visual.png';

const projectById = new Map(projects.map((project) => [project.id, project]));
const projectGroups = [
  {
    title: 'Websites',
    description: 'Public web platforms and content products.',
    ids: ['aiverse', 'tech-knowledge-share', 'dream-wedding-demo'],
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

type DesignVersion = 'current' | 'main';

function BootSequence({ onComplete }: { onComplete: () => void }) {
  const logs = [
    'INIT KERNEL........ OK',
    'MOUNTING VFS....... OK',
    'LOADING MODULES.... OK',
    'ESTABLISHING LINK.. OK',
    'DECRYPTING CORE.... OK',
    'SYSTEM ONLINE ======>',
  ];
  const timestamps = ['6.8163', '5.4038', '5.7270', '9.7315', '0.9538', '4.6360'];
  const [currentLog, setCurrentLog] = useState(0);

  useEffect(() => {
    if (currentLog < logs.length) {
      const timer = setTimeout(() => setCurrentLog((value) => value + 1), 170);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(onComplete, 650);
    return () => clearTimeout(timer);
  }, [currentLog, logs.length, onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 flex flex-col justify-end overflow-hidden bg-[#030014] p-8 font-mono text-cyan-500 sm:p-12 md:p-24"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_4px]" />
      <div className="relative z-10 flex w-full max-w-4xl flex-col gap-2">
        {logs.slice(0, currentLog + 1).map((log, index) => (
          <motion.div
            key={log}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="whitespace-nowrap text-sm sm:text-base md:text-xl"
          >
            <span className="mr-4 text-cyan-800">{`[ ${timestamps[index]} ]`}</span>
            <span className="text-cyan-400">{log}</span>
          </motion.div>
        ))}
        {currentLog < logs.length && (
          <motion.div
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="mt-2 h-5 w-3 bg-cyan-400 sm:h-6 sm:w-4"
          />
        )}
      </div>
    </motion.div>
  );
}

function Navbar() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-30 rounded-b-xl border-b border-white/10 bg-[#0d0d18]/35 backdrop-blur-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-4 md:px-6 lg:px-8">
        <a href="#" className="flex items-center gap-3 text-white">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-white text-sm font-bold text-black">GY</div>
          <span className="font-display text-sm font-semibold">GY Studio</span>
        </a>
        <div className="hidden items-center gap-6 md:flex">
          <a href="#" className="text-sm text-gray-300 transition hover:text-white">Home</a>
          <a href="#work" className="text-sm text-gray-300 transition hover:text-white">Directory</a>
          <a href="#library" className="text-sm text-gray-300 transition hover:text-white">Library</a>
          <a href="#contact" className="text-sm text-gray-300 transition hover:text-white">Resources</a>
        </div>
        <div className="flex items-center gap-3">
          <a href="https://github.com/guyakobov" target="_blank" rel="noreferrer" className="hidden text-gray-300 transition hover:text-white sm:block" aria-label="GitHub">
            <Github className="h-5 w-5" />
          </a>
          <a href="https://www.linkedin.com/in/guy-yakobov-471051129/" target="_blank" rel="noreferrer" className="hidden text-gray-300 transition hover:text-white sm:block" aria-label="LinkedIn">
            <Linkedin className="h-5 w-5" />
          </a>
          <a href="#contact" className="rounded-full border border-white px-5 py-2 text-sm text-white transition hover:bg-white hover:text-black">
            Let's Talk!
          </a>
        </div>
      </div>
    </nav>
  );
}

function WorkSection() {
  return (
    <section id="work" className="container relative z-10 mx-auto px-4 py-24 text-white md:px-6 lg:px-8">
      <div className="mb-20">
        <div>
          <div className="flex items-center gap-6">
            <p className="font-mono text-2xl font-bold uppercase tracking-[0.28em] text-cyan-300">Directory</p>
            <span className="h-px w-28 bg-cyan-400/45" />
          </div>
          <h2 className="mt-8 font-display text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">Selected Projects</h2>
        </div>
      </div>

      <div className="space-y-14">
        {projectGroups.map((group) => (
          <section key={group.title}>
            <div className="mb-9 border-l border-cyan-400/70 pl-8">
              <h3 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">{group.title}</h3>
              <p className="mt-8 max-w-2xl text-2xl leading-9 text-gray-400">{group.description}</p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {group.projects.map((project) => (
                <div key={project.id} className="h-full">
                  <ProjectCard project={project} index={projects.findIndex((item) => item.id === project.id)} />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}

function LibrarySection() {
  return (
    <section id="library" className="container relative z-10 mx-auto px-4 pb-24 text-white md:px-6 lg:px-8">
      <div className="grid gap-5 md:grid-cols-3">
        {[
          ['4+', 'Projects', 'Public and private systems packaged for review.'],
          ['8+', 'Technologies', 'React, automation, data, AI, mobile, and deployment.'],
          ['10+', 'Years of Building', 'Hands-on product and system delivery.'],
        ].map(([value, title, body]) => (
          <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-md">
            <div className="font-display text-4xl font-bold">{value}</div>
            <h3 className="mt-4 font-display text-xl font-semibold">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-gray-400">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="container relative z-10 mx-auto px-4 pb-24 text-white md:px-6 lg:px-8">
      <div className="rounded-3xl border border-white/10 bg-white/[0.04] px-6 py-16 text-center backdrop-blur-md">
        <h2 className="font-display text-4xl font-bold">Let&apos;s Build Something Useful</h2>
        <p className="mx-auto mt-5 max-w-xl text-gray-300">
          Looking to collaborate on a product, automation, data, or AI system? My communication channels are open.
        </p>
        <div className="mt-8 flex justify-center">
          <a href="mailto:hello@example.com" className="inline-flex items-center gap-3 rounded-2xl bg-white px-8 py-3.5 font-semibold text-black transition hover:scale-105">
            <Mail className="h-5 w-5 text-cyan-500" />
            Establish Link
          </a>
        </div>
      </div>
    </section>
  );
}

function DesignTabs({
  active,
  onChange,
}: {
  active: DesignVersion;
  onChange: (version: DesignVersion) => void;
}) {
  return (
    <div className="fixed left-1/2 top-4 z-40 -translate-x-1/2 rounded-full border border-white/10 bg-[#050816]/75 p-1 shadow-[0_0_24px_rgba(34,211,238,0.12)] backdrop-blur-md">
      {[
        ['current', 'Current'],
        ['main', 'Main'],
      ].map(([value, label]) => (
        <button
          key={value}
          type="button"
          onClick={() => onChange(value as DesignVersion)}
          className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
            active === value ? 'bg-cyan-300 text-[#030712]' : 'text-white/65 hover:text-white'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function MainHero() {
  return (
    <section className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 pb-24 pt-28 text-left sm:px-6 lg:grid-cols-[0.7fr_1.3fr] lg:px-8">
      <div>
        <div className="mb-7 flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-violet-400 shadow-[0_0_18px_rgba(167,139,250,0.75)]" />
          </span>
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-white/55">
            Welcome to GY Studio
          </span>
        </div>

        <h1 className="mb-6 max-w-2xl font-display text-[clamp(2.75rem,12vw,4.5rem)] font-extrabold leading-[0.98] tracking-tight text-white">
          <span className="block">Turning Vision</span>
          <span className="relative mt-2 block">
            <span>Into </span>
            <span className="relative bg-gradient-to-r from-violet-400 via-fuchsia-300 to-violet-300 bg-clip-text text-transparent drop-shadow-[0_0_22px_rgba(167,139,250,0.35)]">
              Products
            </span>
          </span>
        </h1>

        <p className="max-w-md text-base leading-relaxed text-white/65 sm:text-lg">
          A curated collection of products, systems, and ideas brought to life.
        </p>

        <div className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          <a
            href="#work"
            className="group inline-flex items-center gap-3 rounded-full border border-violet-300/50 bg-violet-500 px-8 py-4 text-sm font-semibold text-white shadow-[0_0_28px_rgba(139,92,246,0.45)] transition-all hover:-translate-y-1 hover:bg-violet-400"
          >
            Explore Work
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <div className="flex items-center gap-4">
            <a href="https://github.com/guyakobov" target="_blank" rel="noreferrer" className="grid h-12 w-12 place-items-center rounded-full bg-white text-[#030014] transition hover:scale-110">
              <Github className="h-6 w-6" />
            </a>
            <a href="https://www.linkedin.com/in/guy-yakobov-471051129/" target="_blank" rel="noreferrer" className="grid h-12 w-12 place-items-center rounded-full bg-[#0a66c2] text-white transition hover:scale-110">
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
        </div>

        <div className="mt-12 grid max-w-[620px] grid-cols-3 text-white">
          {[
            [Box, '5+', 'Projects'],
            [Code2, '8+', 'Technologies'],
            [Users, '10+', 'Years of Building'],
          ].map(([Icon, value, label], index) => (
            <div key={label as string} className={`flex justify-center px-2 ${index < 2 ? 'border-r border-white/10' : ''}`}>
              <div className="flex items-center gap-3">
                <Icon className="h-6 w-6 text-white/70" />
                <div>
                  <div className="text-2xl font-bold text-white">{value as string}</div>
                  <div className="text-xs leading-tight text-white/55">{label as string}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <motion.div
        className="relative hidden min-h-[520px] overflow-visible sm:block"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="pointer-events-none absolute inset-x-10 bottom-10 top-16 rounded-full bg-purple-700/20 blur-[90px]" />
        <motion.img
          src={heroCubeVisual}
          alt="AI, data engineering, automation, and product systems visual"
          className="absolute left-0 top-[-180px] w-full max-w-none opacity-95 [clip-path:inset(0_3%_0_3%)]"
          animate={{ scale: [1.01, 1.04, 1.01], filter: ['brightness(1)', 'brightness(1.1)', 'brightness(1)'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}

function MainWorkSection() {
  return (
    <section id="work" className="container relative z-10 mx-auto px-4 pb-24 text-white md:px-6 lg:px-8">
      <div className="mb-16">
        <div className="flex items-center gap-3">
          <span className="font-mono text-sm uppercase tracking-widest text-cyan-400">Directory</span>
          <span className="h-px w-12 bg-cyan-500/30" />
        </div>
        <h2 className="mt-2 font-display text-4xl font-bold tracking-tight text-white">Selected Projects</h2>
      </div>

      <div className="space-y-16">
        {projectGroups.map((group) => (
          <section key={group.title}>
            <div className="mb-6 border-l border-cyan-400/30 pl-4">
              <h3 className="font-display text-2xl font-bold tracking-tight text-white">{group.title}</h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-indigo-200/70">{group.description}</p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {group.projects.map((project) => (
                <div key={project.id} className="h-full">
                  <ProjectCard project={project} index={projects.findIndex((item) => item.id === project.id)} />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}

export default function App() {
  const [bootComplete, setBootComplete] = useState(false);
  const [designVersion, setDesignVersion] = useState<DesignVersion>('current');

  return (
    <>
      <AnimatePresence>
        {!bootComplete && <BootSequence onComplete={() => setBootComplete(true)} />}
      </AnimatePresence>

      <div className={`relative min-h-screen bg-[#030712] ${!bootComplete ? 'h-screen overflow-hidden' : ''}`}>
        {bootComplete && (
          <>
            <div className="pointer-events-none fixed inset-0 z-0 opacity-100 mix-blend-screen">
              <NeuralNetwork />
            </div>
            <DesignTabs active={designVersion} onChange={setDesignVersion} />
            {designVersion === 'current' ? (
              <>
                <div className="relative z-10">
                  <SphereHero />
                </div>
                <div className="relative z-10 bg-transparent">
                  <WorkSection />
                  <LibrarySection />
                  <ContactSection />
                </div>
              </>
            ) : (
              <div className="relative z-10 bg-transparent">
                <MainHero />
                <MainWorkSection />
                <ContactSection />
              </div>
            )}
            <footer className="relative z-10 pb-10 text-center font-mono text-sm text-cyan-500/40">
              SYS.LOG // {new Date().getFullYear()} // ALL SYSTEMS NOMINAL
            </footer>
          </>
        )}
      </div>
    </>
  );
}
