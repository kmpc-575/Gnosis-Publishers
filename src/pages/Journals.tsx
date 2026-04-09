import React, { useEffect, useState } from 'react';
import { ShoppingCart, Search, CheckSquare, History, Globe, Share2 } from 'lucide-react';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabase';
import { ContentItem } from '../types';

const Journals: React.FC = () => {
  const [journals, setJournals] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJournals = async () => {
      const { data, error } = await supabase
        .from('content_items')
        .select('*')
        .eq('type', 'journal')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching journals:', error);
      } else {
        setJournals(data || []);
      }
      setLoading(false);
    };

    fetchJournals();
  }, []);

  return (
    <div className="bg-surface min-h-screen">
      {/* Hero / Title Section */}
      <header className="pt-20 pb-16 px-8 text-center max-w-5xl mx-auto">
        <span className="text-secondary font-semibold tracking-[0.2em] uppercase text-xs mb-4 block">Archive of Intelligence</span>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-8xl font-serif italic text-primary leading-tight mb-6"
        >
          Buy Journal Publications
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-on-surface-variant text-lg max-w-2xl mx-auto leading-relaxed"
        >
          Access peer-reviewed excellence across diverse scholarly domains. Our collection represents the pinnacle of contemporary research and academic rigor.
        </motion.p>
      </header>

      {/* Department-wise Journals Section */}
      <section className="px-8 pb-24 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <h2 className="text-4xl font-serif text-on-surface">Curated by Department</h2>
          <div className="h-px flex-grow mx-8 bg-outline-variant/30 mb-3"></div>
          <span className="text-sm font-sans text-outline uppercase tracking-widest">Selected Volumes</span>
        </div>

        {loading ? (
          <div className="text-center py-20">Loading journals...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {journals.map((journal, index) => (
              <motion.div 
                key={journal.id}
                whileHover={{ scale: 1.01 }}
                className={`${index % 3 === 0 ? 'md:col-span-8' : 'md:col-span-4'} group relative overflow-hidden rounded-xl bg-surface-container-lowest transition-all hover:ring-1 hover:ring-primary/20 border border-outline-variant/10`}
              >
                <div className="p-8 flex flex-col justify-between h-full">
                  <div>
                    <span className="bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded-full text-xs font-bold uppercase mb-3 inline-block">{journal.category}</span>
                    <h3 className="text-3xl font-serif text-on-surface mb-2">{journal.title}</h3>
                    <p className="text-on-surface-variant text-sm max-w-md mb-6">{journal.description}</p>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-2xl font-serif text-primary">{journal.price}</span>
                    <button className="bg-primary text-on-primary px-8 py-3 rounded-full font-bold text-sm hover:bg-primary-container transition-all active:scale-95">Purchase Now</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Custom Journal Topics Section */}
      <section className="bg-surface-container-low py-24 px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <span className="text-primary font-bold text-xs uppercase tracking-widest mb-4 block">Bespoke Knowledge</span>
            <h2 className="text-5xl font-serif text-on-surface leading-tight mb-8">Can't find a specific focus? Curate your Custom Journal.</h2>
            <p className="text-on-surface-variant text-lg leading-relaxed mb-10">
              Gnosis Publishers offers a unique service for academic institutions and industry leaders to compile custom journal topics tailored to specific research agendas.
            </p>
            <ul className="space-y-6 mb-12">
              <li className="flex items-start gap-4">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <CheckSquare className="text-primary" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-on-surface">Selective Indexing</h4>
                  <p className="text-sm text-on-surface-variant">Hand-pick papers from our massive repository across 40+ disciplines.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <History className="text-primary" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-on-surface">Premium Embossing</h4>
                  <p className="text-sm text-on-surface-variant">Custom cover design and physical binding with institutional logos.</p>
                </div>
              </li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-primary text-on-primary px-10 py-4 rounded-full font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all">Start Custom Order</button>
              <button className="border border-outline/30 text-on-surface px-10 py-4 rounded-full font-bold hover:bg-surface-container-high transition-all">View Pricing Guide</button>
            </div>
          </div>
          <div className="lg:w-1/2 relative">
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-12 -right-12 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
            <div className="relative bg-surface-container-lowest p-8 rounded-2xl shadow-xl shadow-on-surface/5 border border-outline-variant/20">
              <div className="space-y-4">
                <div className="h-12 bg-surface-container rounded flex items-center px-4 justify-between">
                  <span className="text-xs text-outline font-bold">TOPIC SEARCH</span>
                  <Search size={16} className="text-outline" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-24 bg-tertiary/10 rounded-xl flex items-center justify-center border border-tertiary/20">
                    <span className="text-tertiary text-xs font-bold text-center">Renewable<br/>Energy</span>
                  </div>
                  <div className="h-24 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                    <span className="text-primary text-xs font-bold text-center">Artificial<br/>Ethics</span>
                  </div>
                  <div className="h-24 bg-secondary/10 rounded-xl flex items-center justify-center border border-secondary/20">
                    <span className="text-secondary text-xs font-bold text-center">Post-Human<br/>Linguistics</span>
                  </div>
                  <div className="h-24 bg-outline/5 rounded-xl flex items-center justify-center border border-outline/20">
                    <span className="text-outline text-xs font-bold text-center">Add Topic +</span>
                  </div>
                </div>
                <div className="pt-6 border-t border-outline-variant/20">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold">Estimated Cost</span>
                    <span className="text-xl font-serif text-primary">$210.00</span>
                  </div>
                  <p className="text-[10px] text-outline italic leading-tight">Price includes curation fee, DOI generation, and digital archive hosting for 24 months.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter / Contact CTA */}
      <section className="py-24 px-8 text-center max-w-4xl mx-auto">
        <h3 className="text-4xl font-serif text-on-surface mb-6">Stay informed on the next release.</h3>
        <p className="text-on-surface-variant mb-10">Get monthly updates on recently indexed journals and exclusive early access pricing.</p>
        <div className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto">
          <input className="flex-grow px-6 py-4 bg-surface-container-low border-none rounded-full focus:ring-1 focus:ring-primary/20 text-sm" placeholder="gnosispublishers26@gmail.com" type="email"/>
          <button className="bg-primary text-on-primary px-8 py-4 rounded-full font-bold text-sm">Subscribe</button>
        </div>
      </section>
    </div>
  );
};

export default Journals;
