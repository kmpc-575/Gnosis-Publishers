import React from 'react';
import { Terminal, Cpu, Microscope, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

const Projects: React.FC = () => {
  return (
    <div className="bg-surface min-h-screen">
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero / Title Section */}
        <header className="mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-7xl font-serif italic text-on-surface mb-4 leading-tight"
          >
            Buy Projects
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl text-xl text-on-surface-variant"
          >
            Access peer-reviewed project blueprints, source code, and comprehensive research documentation. Verified technical solutions for academic and industrial excellence.
          </motion.p>
        </header>

        {/* Ready-made Projects Section */}
        <section className="mb-32">
          <div className="flex items-baseline justify-between mb-12">
            <h2 className="text-4xl font-serif text-on-surface">Ready-made projects</h2>
            <div className="flex gap-4">
              <span className="px-4 py-1 rounded-full bg-tertiary-container text-on-tertiary-container text-xs font-semibold uppercase tracking-widest">New Releases</span>
            </div>
          </div>

          {/* Categories Tonal Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Category: Software */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-outline-variant/20">
                <Terminal className="text-primary" size={24} />
                <h3 className="text-2xl font-serif italic">Software</h3>
              </div>
              {/* Project Card */}
              <motion.div whileHover={{ y: -4 }} className="bg-surface-container-lowest rounded-xl p-6 transition-all border border-outline-variant/10">
                <div className="aspect-video w-full rounded-lg bg-surface-container mb-4 overflow-hidden">
                  <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZwQ_tA2mA0r_AIg9fllqsMy2a1xUmQ3dSKq_PsgazAJH1h-mPqKYK5ei8f0Tl5EKL26T9Jw0_OT5XcER4zMNXHC8JYRpakHvDy6-lraff4aly1TavikcGoy59MMQWHYg02z4IX7qicUooXVeP1oH8rTeKsXs5nnktXZEfFmVsgol-68Jw4R0GETbxwUDNdT02789-5DKdeaoDV8fqFZlOSrM_fiyE3iZXf3IfbLBhq5q9hNJKNKyqLTSpd6ewuKA-ovIxxNR4YdEF" alt="Software Project" />
                </div>
                <h4 className="text-lg font-bold mb-2">Neural Network Optimizer</h4>
                <p className="text-sm text-on-surface-variant mb-6 line-clamp-2">High-performance training module for distributed deep learning architectures.</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xl font-serif font-bold text-primary">$299.00</span>
                  <button className="bg-surface-container-highest text-primary font-semibold px-4 py-2 rounded-lg hover:bg-primary hover:text-on-primary transition-all text-sm">Buy Project</button>
                </div>
              </motion.div>
              <motion.div whileHover={{ y: -4 }} className="bg-surface-container-lowest rounded-xl p-6 transition-all border border-outline-variant/10">
                <h4 className="text-lg font-bold mb-2">Blockchain Consensus API</h4>
                <p className="text-sm text-on-surface-variant mb-6 line-clamp-2">Scalable node orchestration layer for private Ethereum implementations.</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xl font-serif font-bold text-primary">$450.00</span>
                  <button className="bg-surface-container-highest text-primary font-semibold px-4 py-2 rounded-lg hover:bg-primary hover:text-on-primary transition-all text-sm">Buy Project</button>
                </div>
              </motion.div>
            </div>

            {/* Category: Hardware */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-outline-variant/20">
                <Cpu className="text-primary" size={24} />
                <h3 className="text-2xl font-serif italic">Hardware</h3>
              </div>
              <motion.div whileHover={{ y: -4 }} className="bg-surface-container-lowest rounded-xl p-6 transition-all border border-outline-variant/10">
                <div className="aspect-video w-full rounded-lg bg-surface-container mb-4 overflow-hidden">
                  <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAi7PBgtTjGhh_BHwRvxMdozzN1hRO8QqAnNQrbswxWllkM6plCR9CCIaOykrncx1CuOCzA1Btrq3SecYnvF72RqNP-4mfsk1sTwtTeQkhftLB_GYWRt3drrK-tIoLr2MDjgc-HfsWvncQuh0MtuYAqgKZyRJ7920DbObnv4dBxUChXZRw5lRkR9YDdZDQI-dxoQTjhZZ5lZdLdUVryX8U78WiEgSR8I3G0BM_CDGxJazSS6iSjqBxCV1x3O2vDrffybZbxzuIsyhtm" alt="Hardware Project" />
                </div>
                <h4 className="text-lg font-bold mb-2">IoT Sensor Array V4</h4>
                <p className="text-sm text-on-surface-variant mb-6 line-clamp-2">Complete PCB schematics and firmware for environmental monitoring networks.</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xl font-serif font-bold text-primary">$890.00</span>
                  <button className="bg-surface-container-highest text-primary font-semibold px-4 py-2 rounded-lg hover:bg-primary hover:text-on-primary transition-all text-sm">Buy Project</button>
                </div>
              </motion.div>
              <motion.div whileHover={{ y: -4 }} className="bg-surface-container-lowest rounded-xl p-6 transition-all border border-outline-variant/10">
                <h4 className="text-lg font-bold mb-2">Autonomous Rover Kit</h4>
                <p className="text-sm text-on-surface-variant mb-6 line-clamp-2">Lidar integration plans and motor control logic for research-grade robotics.</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xl font-serif font-bold text-primary">$1,200.00</span>
                  <button className="bg-surface-container-highest text-primary font-semibold px-4 py-2 rounded-lg hover:bg-primary hover:text-on-primary transition-all text-sm">Buy Project</button>
                </div>
              </motion.div>
            </div>

            {/* Category: Research */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-outline-variant/20">
                <Microscope className="text-primary" size={24} />
                <h3 className="text-2xl font-serif italic">Research</h3>
              </div>
              <motion.div whileHover={{ y: -4 }} className="bg-surface-container-lowest rounded-xl p-6 transition-all border border-outline-variant/10">
                <div className="aspect-video w-full rounded-lg bg-surface-container mb-4 overflow-hidden">
                  <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbtOOOs63dRwTaiYeE4oMhF2OTZYf8-yyCH2Ao5bglRIa9tSdTOfp2TGe3q6sUrAZingNDuajJLcEk9h6i_n5xZ5Yk1Jr5NPminGF7XIv2qXWo6lGYrjb3U9jkvudMwLnb6tfS5dyQTwoDkYoCsAsNR3EAIqnRJcwWI_GA6_CENrWCU5kCcjpJHWfW6XTqXID9suD2V-KIpcTje5cdDqliRJ0uezUQcjejq70YGBY1agMkKp9kZZYpcN44R8N3vAQ2Ik3AL3dqTCUP" alt="Research Project" />
                </div>
                <h4 className="text-lg font-bold mb-2">Quantum Simulation Data</h4>
                <p className="text-sm text-on-surface-variant mb-6 line-clamp-2">Comprehensive dataset and analysis reports for superconducting qubits.</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xl font-serif font-bold text-primary">$550.00</span>
                  <button className="bg-surface-container-highest text-primary font-semibold px-4 py-2 rounded-lg hover:bg-primary hover:text-on-primary transition-all text-sm">Buy Project</button>
                </div>
              </motion.div>
              <motion.div whileHover={{ y: -4 }} className="bg-surface-container-lowest rounded-xl p-6 transition-all border border-outline-variant/10">
                <h4 className="text-lg font-bold mb-2">Urban Bio-Stability Study</h4>
                <p className="text-sm text-on-surface-variant mb-6 line-clamp-2">Methodological framework for assessing ecosystem health in metropolis environments.</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xl font-serif font-bold text-primary">$325.00</span>
                  <button className="bg-surface-container-highest text-primary font-semibold px-4 py-2 rounded-lg hover:bg-primary hover:text-on-primary transition-all text-sm">Buy Project</button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Custom Solutions Section */}
        <section className="bg-primary rounded-3xl overflow-hidden relative p-12 md:p-20 text-on-primary">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-container via-transparent to-transparent pointer-events-none"></div>
          <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-serif italic mb-6 leading-tight">Custom project solutions</h2>
              <p className="text-lg opacity-90 mb-10 leading-relaxed">Looking for a specialized architecture or a niche research implementation? Our Academic Board provides bespoke consultation services to tailor projects to your exact specifications.</p>
              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-on-primary" size={20} />
                  <span className="font-semibold">Tailored Technical Specification</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-on-primary" size={20} />
                  <span className="font-semibold">PhD-Level Consultation</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="text-on-primary" size={20} />
                  <span className="font-semibold">Full IP Ownership Rights</span>
                </li>
              </ul>
              <button className="bg-surface text-primary font-bold px-8 py-4 rounded-full hover:bg-primary-container hover:text-on-primary transition-all flex items-center gap-3">
                Schedule Consultation
                <ArrowRight size={20} />
              </button>
            </div>
            <div className="bg-surface-container-lowest/10 backdrop-blur-md rounded-2xl p-8 border border-white/10">
              <div className="mb-8">
                <span className="text-xs font-bold uppercase tracking-widest text-on-primary/60 mb-2 block">Premium Tier</span>
                <h3 className="text-3xl font-serif mb-4">Consultation service</h3>
                <p className="text-sm opacity-80">Ideal for corporate R&D teams and post-graduate researchers needing high-fidelity implementations.</p>
              </div>
              <div className="space-y-6">
                <div className="flex items-center justify-between py-4 border-b border-white/10">
                  <span>Initial Assessment</span>
                  <span className="font-bold">Complimentary</span>
                </div>
                <div className="flex items-center justify-between py-4 border-b border-white/10">
                  <span>Technical Drafting</span>
                  <span className="font-bold">From $2,500</span>
                </div>
                <div className="flex items-center justify-between py-4">
                  <span>Full Implementation</span>
                  <span className="italic">Custom Quote</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Projects;
