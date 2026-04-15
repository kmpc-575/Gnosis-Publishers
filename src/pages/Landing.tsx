import React, { useState, useEffect } from 'react';
import { BadgeCheck, Zap, CreditCard, ArrowRight, BookOpen, Gavel, Book, Layout as LayoutIcon, Library } from 'lucide-react';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabase';
import { LOGO_URL } from '../constants';

const Landing: React.FC = () => {
  const [marqueeText, setMarqueeText] = useState('Recent: Deep Learning Paper Published • Blockchain Patent Filed • Quantum Physics Journal Volume 10');

  useEffect(() => {
    const fetchSettings = async () => {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('key', 'marquee_text')
        .single();
      
      if (data) {
        setMarqueeText(data.value);
      }
    };
    fetchSettings();
  }, []);

  return (
    <div className="bg-surface">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex flex-col justify-center items-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-50/50 to-surface pointer-events-none"></div>
        <div className="max-w-5xl w-full text-center relative z-10 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center mb-4"
          >
            <img 
              src={LOGO_URL} 
              alt="Gnosis Logo" 
              className="h-32 md:h-48 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-serif text-7xl md:text-9xl text-primary leading-tight tracking-tighter"
          >
            Gnosis Publishers
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-sm md:text-base text-secondary font-bold uppercase tracking-[0.2em]"
          >
            We stand towards your success
          </motion.p>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-on-surface-variant max-w-2xl mx-auto italic"
          >
            Your Trusted Source for Academic Excellence
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex justify-center gap-6 pt-4"
          >
            <button className="px-8 py-4 bg-primary text-on-primary rounded-full font-bold text-lg shadow-2xl hover:scale-105 transition-transform">
              Explore Archive
            </button>
          </motion.div>
        </div>
      </section>

      {/* Marquee News */}
      <div className="bg-primary-container text-on-primary-container py-3 border-y border-outline-variant/10 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex gap-12 font-sans text-sm uppercase tracking-[0.2em] font-semibold px-6">
              {marqueeText.split('•').map((text, idx) => (
                <React.Fragment key={idx}>
                  <span>{text.trim()}</span>
                  {idx < marqueeText.split('•').length - 1 && (
                    <span className="text-on-primary-container/40">•</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Highlights Section */}
      <section className="py-24 px-8 bg-surface-container-low">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex items-start gap-6 group">
            <div className="w-14 h-14 rounded-xl bg-tertiary-container flex items-center justify-center text-on-tertiary shrink-0 shadow-sm">
              <BadgeCheck size={28} />
            </div>
            <div>
              <h3 className="font-serif text-2xl text-on-surface mb-2">Verified Content</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                Rigorous double-blind peer reviews ensuring only the most precise scholarly contributions reach our repository.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-6 group">
            <div className="w-14 h-14 rounded-xl bg-primary-container flex items-center justify-center text-on-primary-container shrink-0 shadow-sm">
              <Zap size={28} />
            </div>
            <div>
              <h3 className="font-serif text-2xl text-on-surface mb-2">Fast Delivery</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                Instant digital access and prioritized manuscript processing for rapid knowledge dissemination.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-6 group">
            <div className="w-14 h-14 rounded-xl bg-secondary-container flex items-center justify-center text-on-secondary-container shrink-0 shadow-sm">
              <CreditCard size={28} />
            </div>
            <div>
              <h3 className="font-serif text-2xl text-on-surface mb-2">Affordable Pricing</h3>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                Democratizing access to high-tier research with scalable institutional and individual licensing models.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Cards Grid */}
      <section className="py-32 px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
            <span className="text-primary font-bold tracking-widest uppercase text-xs mb-4 block">Our Services</span>
            <h2 className="font-serif text-5xl text-on-surface">Precision in Scholarly Assets</h2>
          </div>
          <p className="text-on-surface-variant max-w-sm">
            Browse our meticulously curated categories ranging from raw industrial patents to theoretical academic journals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Large Feature Card */}
          <div className="md:col-span-8 bg-surface-container-lowest rounded-xl p-8 flex flex-col justify-between min-h-[400px] group overflow-hidden relative border border-outline-variant/10">
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none flex items-center justify-center p-12">
              <img 
                className="object-contain w-full h-full grayscale opacity-20" 
                src={LOGO_URL} 
                alt="Gnosis Logo Pattern"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="relative z-10">
              <span className="text-tertiary font-bold text-xs uppercase tracking-widest mb-2 block">Premium Catalog</span>
              <h3 className="font-serif text-4xl text-on-surface mb-6">Paper Publication</h3>
              <p className="text-on-surface-variant max-w-sm mb-8">
                Access ground-breaking whitepapers and peer-reviewed research papers across technology, medicine, and the humanities.
              </p>
            </div>
            <div className="flex items-center justify-between relative z-10">
              <span className="text-primary font-bold text-2xl italic font-serif">
                ₹19,900 <span className="text-xs text-on-surface-variant not-italic font-sans">starting</span>
              </span>
              <button className="px-6 py-3 bg-on-surface text-surface rounded-full font-bold text-sm hover:bg-primary transition-colors flex items-center gap-2">
                View & Buy <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Smaller Grid Cards */}
          <div className="md:col-span-4 bg-surface-container-lowest rounded-xl p-8 border border-outline-variant/10 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center text-primary mb-6">
                <BookOpen size={24} />
              </div>
              <h3 className="font-serif text-2xl text-on-surface mb-3">Journal</h3>
              <p className="text-on-surface-variant text-sm mb-6">
                Subscription-based access to thematic volumes and historical archives.
              </p>
            </div>
            <button className="w-full py-3 bg-surface-container-high text-primary rounded-full font-bold text-sm hover:bg-primary hover:text-on-primary transition-all">
              View & Buy
            </button>
          </div>

          <div className="md:col-span-4 bg-surface-container-lowest rounded-xl p-8 border border-outline-variant/10 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center text-secondary mb-6">
                <Gavel size={24} />
              </div>
              <h3 className="font-serif text-2xl text-on-surface mb-3">Patent</h3>
              <p className="text-on-surface-variant text-sm mb-6">
                Intellectual property documentation and licensing frameworks.
              </p>
            </div>
            <button className="w-full py-3 bg-surface-container-high text-primary rounded-full font-bold text-sm hover:bg-primary hover:text-on-primary transition-all">
              View & Buy
            </button>
          </div>

          <div className="md:col-span-4 bg-surface-container-lowest rounded-xl p-8 border border-outline-variant/10 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 bg-stone-100 rounded-lg flex items-center justify-center text-on-surface-variant mb-6">
                <Book size={24} />
              </div>
              <h3 className="font-serif text-2xl text-on-surface mb-3">Book</h3>
              <p className="text-on-surface-variant text-sm mb-6">
                Complete academic monographs and specialized textbooks.
              </p>
            </div>
            <button className="w-full py-3 bg-surface-container-high text-primary rounded-full font-bold text-sm hover:bg-primary hover:text-on-primary transition-all">
              View & Buy
            </button>
          </div>

          <div className="md:col-span-4 bg-surface-container-lowest rounded-xl p-8 border border-outline-variant/10 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center text-primary-container mb-6">
                <LayoutIcon size={24} />
              </div>
              <h3 className="font-serif text-2xl text-on-surface mb-3">Project</h3>
              <p className="text-on-surface-variant text-sm mb-6">
                Collaborative research datasets and open-source project files.
              </p>
            </div>
            <button className="w-full py-3 bg-surface-container-high text-primary rounded-full font-bold text-sm hover:bg-primary hover:text-on-primary transition-all">
              View & Buy
            </button>
          </div>
        </div>
      </section>

      {/* Promotional/Editorial Section */}
      <section className="py-32 bg-stone-900 text-stone-100 relative overflow-hidden">
        <div className="absolute left-0 top-0 w-full h-full opacity-5 pointer-events-none flex items-center justify-center">
          <img 
            className="w-1/2 h-1/2 object-contain grayscale invert opacity-20" 
            src={LOGO_URL} 
            alt="Gnosis Logo Large"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="max-w-7xl mx-auto px-8 relative z-10 flex flex-col md:flex-row items-center gap-20">
          <div className="flex-1">
            <h2 className="font-serif text-6xl md:text-7xl mb-8 italic">The Curator of Human Knowledge</h2>
            <p className="text-stone-400 text-xl leading-relaxed mb-12">
              At Gnosis, we believe research is an art form. Our platform serves as a digital gallery for the most profound discoveries of our time.
            </p>
            <div className="grid grid-cols-2 gap-12 border-t border-stone-800 pt-12">
              <div>
                <span className="block text-4xl font-serif text-emerald-400 mb-2">1.2M+</span>
                <span className="text-xs uppercase tracking-widest text-stone-500">Citations cataloged</span>
              </div>
              <div>
                <span className="block text-4xl font-serif text-emerald-400 mb-2">45k</span>
                <span className="text-xs uppercase tracking-widest text-stone-500">Active contributors</span>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 aspect-[3/4] bg-stone-800 rounded-xl overflow-hidden shadow-2xl relative group flex items-center justify-center p-12">
            <img 
              className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 grayscale invert opacity-40" 
              src={LOGO_URL} 
              alt="Feature Logo"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent"></div>
            <div className="absolute bottom-8 left-8">
              <span className="bg-emerald-500 text-stone-950 text-[10px] font-bold px-2 py-1 rounded mb-4 inline-block uppercase">Feature</span>
              <h4 className="font-serif text-2xl text-white">Ethical AI in Scholarly Publishing</h4>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
