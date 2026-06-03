import { AnimatePresence, motion } from 'motion/react';
import { Mail } from 'lucide-react';
import { useEffect, useState } from 'react';
import SphereHero from './components/ui/geometric-sphere';
import { ProjectCard } from './components/ProjectCard';
import { NeuralNetwork } from './components/NeuralNetwork';
import { projects } from './data';

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
          <a href="mailto:guyakobov@gmail.com" className="inline-flex items-center gap-3 rounded-2xl bg-white px-8 py-3.5 font-semibold text-black transition hover:scale-105">
            <Mail className="h-5 w-5 text-cyan-500" />
            Establish Link
          </a>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [bootComplete, setBootComplete] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!bootComplete && <BootSequence onComplete={() => setBootComplete(true)} />}
      </AnimatePresence>

      <div className={`relative min-h-screen overflow-x-hidden bg-[#030712] ${!bootComplete ? 'h-screen overflow-hidden' : ''}`}>
        {bootComplete && (
          <>
            <div className="pointer-events-none fixed inset-0 z-0 opacity-100 mix-blend-screen">
              <NeuralNetwork />
            </div>
            <div className="relative z-10">
              <SphereHero />
            </div>
            <div className="relative z-10 bg-transparent">
              <WorkSection />
              <LibrarySection />
              <ContactSection />
            </div>
            <footer className="relative z-10 pb-10 text-center font-mono text-sm text-cyan-500/40">
              SYS.LOG // {new Date().getFullYear()} // ALL SYSTEMS NOMINAL
            </footer>
          </>
        )}
      </div>
    </>
  );
}
