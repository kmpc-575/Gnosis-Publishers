import React, { useEffect, useState } from 'react';
import { ShieldCheck, ArrowRight, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabase';
import { ContentItem } from '../types';

const Patents: React.FC = () => {
  const [patents, setPatents] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatents = async () => {
      const { data, error } = await supabase
        .from('content_items')
        .select('*')
        .eq('type', 'patent')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching patents:', error);
      } else {
        setPatents(data || []);
      }
      setLoading(false);
    };

    fetchPatents();
  }, []);

  return (
    <div className="bg-surface min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="z-10">
            <span className="text-secondary font-bold uppercase tracking-widest text-xs mb-4 block">Intellectual Property Rights</span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-serif font-light leading-[1.1] text-on-surface mb-8"
            >
              Patent <span className="italic text-primary">Services</span>.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-on-surface-variant max-w-lg mb-10 leading-relaxed"
            >
              Secure your scientific legacy. From pre-filed innovative architectures to custom international filing strategies, Gnosis provides the editorial precision your inventions deserve.
            </motion.p>
            <div className="flex gap-4">
              <button className="bg-gradient-to-r from-primary to-primary-container text-on-primary px-8 py-4 rounded-full font-bold shadow-xl shadow-primary/10 hover:shadow-primary/20 transition-all">
                Browse Ready-Made
              </button>
              <button className="text-primary font-bold px-8 py-4 border-b-2 border-surface-tint/20 hover:border-surface-tint transition-all">
                View Pricing
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-primary/5 rounded-[4rem] rotate-3 -z-10 translate-x-4"></div>
            <img 
              alt="Patent Hero" 
              className="w-full h-[500px] object-cover rounded-[3rem] shadow-2xl grayscale hover:grayscale-0 transition-all duration-700" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHELZ4LM7YH06a_4QoYGjZvZrfCDI039lBWeOM3OHveZ2lTquLQ8W11OGSmi5eEep9DbAkO3w7okZUkadqiQdqDuxJTaIUZ_ArmHeg0J8hmUyc_o7mQjTvdKbSJ3D04LD89v8srWsoq6DFPYNEgZuhadBzR4slRJwMhUUKz9cdfBy9Tv7NT4LJp-ZFEsfEhy53qQIRwG-0VPOriMTFLAdMiuW_cBEqn4BgWXrs9TCQlIzlKtq0Febs0FqSFHGcjbHe8NgUTdd3050x"
            />
          </div>
        </div>
      </section>

      {/* Ready-Made Patents */}
      <section className="bg-surface-container-low py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-serif mb-4">Ready-made project patents</h2>
              <p className="text-on-surface-variant">Validated, pre-vetted patent packages available for immediate acquisition. Every listing includes comprehensive technical documentation and legal transfer frameworks.</p>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-20">Loading patents...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {patents.map((patent, index) => (
                <div 
                  key={patent.id}
                  className={`${index % 3 === 0 ? 'md:col-span-8' : 'md:col-span-4'} group bg-surface-container-lowest p-8 rounded-xl flex flex-col justify-between transition-all hover:bg-white border border-outline-variant/10`}
                >
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <span className="bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded text-xs font-bold tracking-widest uppercase">{patent.category}</span>
                      <span className="text-stone-400 font-mono text-sm tracking-tighter">PAT-{patent.id.slice(0, 4)}</span>
                    </div>
                    <h3 className="text-3xl font-serif mb-4 group-hover:text-primary transition-colors italic">{patent.title}</h3>
                    <p className="text-on-surface-variant mb-8 line-clamp-2">{patent.description}</p>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex gap-4 items-center">
                      <div className="text-2xl font-serif text-on-surface">{patent.price}</div>
                    </div>
                    <button className="bg-primary text-white px-8 py-3 rounded-full flex items-center gap-2 group/btn">
                      <span className="text-sm font-bold">Buy Patent</span>
                      <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Custom Patent Services */}
      <section className="py-24 px-8 bg-surface">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-serif mb-6 text-on-surface">Custom patent services</h2>
            <p className="text-on-surface-variant max-w-xl mx-auto italic">Bespoke intellectual property development, from initial prior-art research to full global application filing and ethical auditing.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* Tiers */}
            <div className="bg-surface-container-low p-8 rounded-xl border border-outline-variant/20 hover:scale-[1.02] transition-transform duration-300">
              <div className="mb-8">
                <h4 className="text-sm font-bold tracking-[0.2em] text-on-surface-variant uppercase mb-2">Research Phase</h4>
                <div className="text-4xl font-serif text-primary mb-4">$2,500</div>
                <p className="text-xs text-on-surface-variant leading-relaxed">Ideal for validating novelty before heavy investment.</p>
              </div>
              <ul className="space-y-4 mb-10 text-sm">
                <li className="flex items-center gap-3">
                  <CheckCircle size={18} className="text-primary" />
                  <span>Global Prior-Art Search</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle size={18} className="text-primary" />
                  <span>Novelty Assessment Report</span>
                </li>
              </ul>
              <button className="w-full py-3 rounded-full border border-primary text-primary font-bold text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-all">Begin Inquiry</button>
            </div>

            <div className="bg-surface-container-lowest p-8 rounded-2xl ring-2 ring-primary relative shadow-2xl shadow-primary/5 -translate-y-4">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-on-primary px-4 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase">Most Professional</div>
              <div className="mb-8">
                <h4 className="text-sm font-bold tracking-[0.2em] text-on-surface-variant uppercase mb-2">Full Filing</h4>
                <div className="text-4xl font-serif text-primary mb-4">$8,500</div>
                <p className="text-xs text-on-surface-variant leading-relaxed">Comprehensive representation from draft to submission.</p>
              </div>
              <ul className="space-y-4 mb-10 text-sm">
                <li className="flex items-center gap-3">
                  <CheckCircle size={18} className="text-primary" />
                  <span>Drafting by Subject Experts</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle size={18} className="text-primary" />
                  <span>Technical Illustrations</span>
                </li>
              </ul>
              <button className="w-full py-4 rounded-full bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold text-xs uppercase tracking-widest shadow-lg shadow-primary/20">Secure Service</button>
            </div>

            <div className="bg-surface-container-low p-8 rounded-xl border border-outline-variant/20 hover:scale-[1.02] transition-transform duration-300">
              <div className="mb-8">
                <h4 className="text-sm font-bold tracking-[0.2em] text-on-surface-variant uppercase mb-2">Global Portfolio</h4>
                <div className="text-4xl font-serif text-primary mb-4">Custom</div>
                <p className="text-xs text-on-surface-variant leading-relaxed">Multi-jurisdictional strategy for international entities.</p>
              </div>
              <ul className="space-y-4 mb-10 text-sm">
                <li className="flex items-center gap-3">
                  <CheckCircle size={18} className="text-primary" />
                  <span>PCT International Filing</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle size={18} className="text-primary" />
                  <span>Language Translations</span>
                </li>
              </ul>
              <button className="w-full py-3 rounded-full border border-primary text-primary font-bold text-xs uppercase tracking-widest hover:bg-primary hover:text-white transition-all">Contact Board</button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-12 bg-emerald-900 text-white">
        <div className="max-w-7xl mx-auto px-8 flex flex-wrap items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <ShieldCheck size={40} className="text-primary-fixed opacity-50" />
            <div>
              <div className="font-serif italic text-lg tracking-wide">Secured via Academic Escrow</div>
              <p className="text-xs text-primary-fixed/60">Encrypted IP transfer and blockchain-verified ownership logs.</p>
            </div>
          </div>
          <div className="flex gap-12 opacity-40 grayscale brightness-200">
            <span className="font-bold text-lg">USPTO</span>
            <span className="font-bold text-lg">WIPO</span>
            <span className="font-bold text-lg">EPO</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Patents;
