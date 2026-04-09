import React, { useEffect, useState } from 'react';
import { Terminal, Cpu, Microscope, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabase';
import { ContentItem } from '../types';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('content_items')
        .select('*')
        .eq('type', 'project')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching projects:', error);
      } else {
        setProjects(data || []);
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  const getIcon = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('software')) return <Terminal className="text-primary" size={24} />;
    if (cat.includes('hardware')) return <Cpu className="text-primary" size={24} />;
    return <Microscope className="text-primary" size={24} />;
  };

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
          </div>

          {loading ? (
            <div className="text-center py-20">Loading projects...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div 
                  key={project.id}
                  whileHover={{ y: -4 }}
                  className="bg-surface-container-lowest rounded-xl p-6 transition-all border border-outline-variant/10 flex flex-col"
                >
                  <div className="flex items-center gap-3 pb-4 border-b border-outline-variant/20 mb-6">
                    {getIcon(project.category)}
                    <span className="text-xs font-bold uppercase tracking-widest text-primary">{project.category}</span>
                  </div>
                  <div className="aspect-video w-full rounded-lg bg-surface-container mb-4 overflow-hidden">
                    <img 
                      className="w-full h-full object-cover" 
                      src={project.image_url || "https://picsum.photos/seed/project/400/300"} 
                      alt={project.title} 
                    />
                  </div>
                  <h4 className="text-lg font-bold mb-2">{project.title}</h4>
                  <p className="text-sm text-on-surface-variant mb-6 line-clamp-2">{project.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xl font-serif font-bold text-primary">{project.price}</span>
                    <button className="bg-surface-container-highest text-primary font-semibold px-4 py-2 rounded-lg hover:bg-primary hover:text-on-primary transition-all text-sm">Buy Project</button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
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
              <a href="mailto:gnosispublishers26@gmail.com?subject=Custom Project Consultation" className="bg-surface text-primary font-bold px-8 py-4 rounded-full hover:bg-primary-container hover:text-on-primary transition-all flex items-center gap-3 w-fit">
                Schedule Consultation
                <ArrowRight size={20} />
              </a>
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
