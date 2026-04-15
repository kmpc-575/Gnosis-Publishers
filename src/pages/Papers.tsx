import React, { useEffect, useState } from 'react';
import { ShoppingCart, Edit3, BookOpen, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabase';
import { ContentItem } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { PaymentService } from '../services/PaymentService';
import { useNavigate } from 'react-router-dom';

const Papers: React.FC = () => {
  const { user, userProfile, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [papers, setPapers] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const handleBuy = async (paper: ContentItem) => {
    if (!user) {
      if (window.confirm('Please sign in to purchase. Sign in now?')) {
        signInWithGoogle();
      }
      return;
    }

    if (!userProfile?.mobile) {
      if (window.confirm('Please complete your profile with a mobile number before purchasing. Go to profile setup?')) {
        navigate('/profile-setup');
      }
      return;
    }

    try {
      setProcessingId(paper.id);
      const amount = PaymentService.parsePrice(paper.price);
      
      if (amount <= 0) {
        alert('Invalid price for this item.');
        return;
      }

      await PaymentService.initiatePayment({
        amount,
        customerId: user.id,
        customerEmail: user.email || '',
        customerPhone: userProfile.mobile,
        orderNote: `Purchase: ${paper.title}`,
        orderId: `papr_${paper.id.slice(0, 8)}_${Date.now()}`
      });
    } catch (error: any) {
      console.error('Payment error:', error);
      alert(error.message || 'Payment failed to initiate. Please try again.');
    } finally {
      setProcessingId(null);
    }
  };

  useEffect(() => {
    const fetchPapers = async () => {
      const { data, error } = await supabase
        .from('content_items')
        .select('*')
        .eq('type', 'paper')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching papers:', error);
      } else {
        setPapers(data || []);
      }
      setLoading(false);
    };

    fetchPapers();
  }, []);

  return (
    <div className="bg-surface min-h-screen">
      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        {/* Hero Section */}
        <header className="mb-20 text-center md:text-left">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-serif text-4xl sm:text-5xl md:text-7xl text-primary font-light leading-tight mb-6"
          >
            Buy Research <span className="italic">Papers</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl text-on-surface-variant text-base sm:text-lg leading-relaxed mx-auto md:mx-0"
          >
            Access a curated repository of high-impact scholarly manuscripts vetted by our global academic board. Accelerate your research with peer-reviewed foundational papers across diverse engineering and scientific disciplines.
          </motion.p>
        </header>

        {/* Department Grid Section */}
        <section className="mb-24">
          <div className="flex items-center justify-between mb-12">
            <h2 className="font-serif text-3xl italic text-on-surface">Department-wise Repository</h2>
            <div className="flex gap-2">
              <span className="bg-surface-container-low px-4 py-2 rounded-lg text-sm font-semibold text-primary">All Disciplines</span>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-20">Loading papers...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {papers.map((paper, index) => (
                <motion.div 
                  key={paper.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-surface-container-lowest rounded-xl p-8 transition-all hover:translate-y-[-4px] border border-outline-variant/10"
                >
                  <div className="flex justify-between items-start mb-6">
                    <span className="bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded text-xs font-bold tracking-wider uppercase">
                      {paper.category}
                    </span>
                    <span className="font-serif text-2xl text-primary">{paper.price}</span>
                  </div>
                  <h3 className="font-serif text-xl mb-4 text-on-surface">{paper.title}</h3>
                  <p className="text-on-surface-variant text-sm mb-8 leading-relaxed">{paper.description}</p>
                  <button 
                    onClick={() => handleBuy(paper)}
                    disabled={processingId === paper.id}
                    className="w-full bg-surface-container-highest text-primary font-bold py-3 rounded-full hover:bg-primary hover:text-on-primary transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {processingId === paper.id ? (
                      <Loader2 className="animate-spin" size={16} />
                    ) : (
                      <>Buy Now <ShoppingCart size={16} /></>
                    )}
                  </button>
                </motion.div>
              ))}

              {/* View All Grid Cell */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-primary/5 rounded-xl border-2 border-dashed border-primary/20 flex flex-col items-center justify-center p-8 text-center group cursor-pointer"
              >
                <div className="w-16 h-16 rounded-full bg-primary-container flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                  <BookOpen className="text-on-primary-container" size={32} />
                </div>
                <h3 className="font-serif text-xl text-primary mb-2">Browse All Papers</h3>
                <p className="text-on-surface-variant text-xs">Search by author, DOI, or keyword.</p>
              </motion.div>
            </div>
          )}
        </section>

        {/* Custom Topic Section */}
        <section className="bg-surface-container-low rounded-xl overflow-hidden relative border-t-4 border-secondary">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 sm:p-10 md:p-16">
              <span className="text-secondary font-bold tracking-widest text-xs uppercase mb-4 block">Premium Service</span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-on-surface mb-6 leading-tight">
                Need a Custom <span className="italic">Research Paper?</span>
              </h2>
              <p className="text-on-surface-variant mb-10 leading-relaxed text-sm sm:text-base">
                Our board of PhD researchers provides bespoke literature reviews, theoretical frameworks, and experimental design manuscripts tailored to your specific academic requirements. 
              </p>
              <form 
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const domain = formData.get('domain');
                  const topic = formData.get('topic');
                  window.location.href = `mailto:gnosispublishers26@gmail.com?subject=Custom Research Paper Request&body=Research Domain: ${domain}%0D%0AProposed Topic: ${topic}`;
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-on-surface-variant uppercase ml-1">Research Domain</label>
                    <input 
                      name="domain"
                      className="w-full bg-surface-container-lowest border-none rounded-md px-4 py-3 text-sm focus:ring-1 focus:ring-primary/20" 
                      placeholder="e.g. Nanotechnology" 
                      type="text"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-on-surface-variant uppercase ml-1">Proposed Topic</label>
                    <input 
                      name="topic"
                      className="w-full bg-surface-container-lowest border-none rounded-md px-4 py-3 text-sm focus:ring-1 focus:ring-primary/20" 
                      placeholder="The role of carbon nanotubes..." 
                      type="text"
                      required
                    />
                  </div>
                </div>
                <button className="w-full sm:w-auto bg-primary text-on-primary px-8 sm:px-10 py-3 sm:py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3" type="submit">
                  Request Custom Paper <Edit3 size={20} />
                </button>
              </form>
            </div>
            <div className="relative hidden lg:block overflow-hidden flex items-center justify-center p-12 bg-surface-container-high">
              <img 
                className="w-full h-full object-contain" 
                src="/GP.ico" 
                alt="Custom Paper Logo"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-primary/5 mix-blend-multiply"></div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Papers;
