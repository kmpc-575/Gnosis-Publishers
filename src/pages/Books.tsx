import React, { useEffect, useState } from 'react';
import { Edit3, BookOpen, Globe, ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabase';
import { ContentItem } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { PaymentService } from '../services/PaymentService';
import { useNavigate } from 'react-router-dom';

const Books: React.FC = () => {
  const { user, userProfile, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [books, setBooks] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const handleBuy = async (book: ContentItem) => {
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
      setProcessingId(book.id);
      const amount = PaymentService.parsePrice(book.price);
      
      if (amount <= 0) {
        alert('Invalid price for this item.');
        return;
      }

      await PaymentService.initiatePayment({
        amount,
        customerId: user.id,
        customerEmail: user.email || '',
        customerPhone: userProfile.mobile,
        orderNote: `Purchase: ${book.title}`,
        orderId: `book_${book.id.slice(0, 8)}_${Date.now()}`
      });
    } catch (error: any) {
      console.error('Payment error:', error);
      alert(error.message || 'Payment failed to initiate. Please try again.');
    } finally {
      setProcessingId(null);
    }
  };

  useEffect(() => {
    const fetchBooks = async () => {
      const { data, error } = await supabase
        .from('content_items')
        .select('*')
        .eq('type', 'book')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching books:', error);
      } else {
        setBooks(data || []);
      }
      setLoading(false);
    };

    fetchBooks();
  }, []);

  return (
    <div className="bg-surface min-h-screen">
      {/* Hero Section */}
      <section className="relative px-8 pt-20 pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="z-10">
            <span className="inline-block px-3 py-1 mb-6 rounded-lg bg-tertiary-container text-on-tertiary-container text-xs font-bold uppercase tracking-widest">Curated Scholarly Works</span>
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-6xl md:text-8xl font-serif italic text-primary leading-tight mb-8"
            >
              Book Services
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-on-surface-variant max-w-lg leading-relaxed"
            >
              Elevating academic discourse through premium publication pathways—from the acquisition of foundational monographs to the bespoke creation of your intellectual legacy.
            </motion.p>
          </div>
          <div className="relative h-[500px] rounded-xl overflow-hidden shadow-2xl flex items-center justify-center p-12 bg-emerald-50">
            <img 
              alt="Elegant library" 
              className="w-full h-full object-contain" 
              src="/GP.ico"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Predefined Topics Section */}
      <section className="py-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <h2 className="text-4xl font-serif text-on-surface mb-4">Academic Textbooks & Monographs</h2>
              <p className="text-on-surface-variant">Essential volumes peer-reviewed by our global academic board.</p>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-20">Loading books...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {books.map((book, index) => (
                <motion.div 
                  key={book.id}
                  whileHover={{ y: -4 }}
                  className="group bg-surface-container-lowest rounded-xl p-6 flex flex-col transition-all border border-outline-variant/10"
                >
                  <div className="aspect-[3/4] mb-6 overflow-hidden rounded-lg bg-stone-200">
                    <img 
                      alt={book.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      src={book.image_url || "https://picsum.photos/seed/book/400/600"}
                    />
                  </div>
                  <h3 className="font-serif text-2xl mb-2 text-on-surface">{book.title}</h3>
                  <p className="text-sm text-on-surface-variant mb-6 flex-grow leading-relaxed">{book.description}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xl font-bold text-primary">{book.price}</span>
                    <button 
                      onClick={() => handleBuy(book)}
                      disabled={processingId === book.id}
                      className="bg-surface-container-highest text-primary px-6 py-2 rounded-full text-sm font-semibold hover:bg-primary hover:text-on-primary transition-all active:scale-95 flex items-center gap-2 disabled:opacity-50"
                    >
                      {processingId === book.id ? (
                        <Loader2 className="animate-spin" size={16} />
                      ) : null}
                      Buy Now
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Custom Book Creation Section */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <span className="text-secondary font-bold text-xs uppercase tracking-widest">Bespoke Publishing</span>
              <h2 className="text-5xl font-serif mt-4 mb-8 leading-tight">Your Expertise, <br/>Our Narrative Precision.</h2>
              <div className="space-y-8">
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <Edit3 className="text-primary" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Academic Ghostwriting</h4>
                    <p className="text-on-surface-variant text-sm leading-relaxed">Collaborate with subject-matter experts to transform your raw data and research notes into a polished, publishable manuscript.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <BookOpen className="text-primary" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Editorial & Peer Design</h4>
                    <p className="text-on-surface-variant text-sm leading-relaxed">End-to-end management including developmental editing, rigorous fact-checking, and layout design reflecting academic prestige.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <Globe className="text-primary" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Global Distribution</h4>
                    <p className="text-on-surface-variant text-sm leading-relaxed">Placement in university libraries, digital repositories, and scholarly networks across six continents.</p>
                  </div>
                </div>
              </div>
              <a href="mailto:gnosispublishers26@gmail.com?subject=Book Publishing Consultation" className="mt-12 block text-center w-fit bg-primary text-on-primary px-8 py-4 rounded-full font-bold tracking-wide active:scale-95 transition-all shadow-lg hover:shadow-primary/20">Consult Our Board</a>
            </div>
            <div className="lg:col-span-7 grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-12">
                <div className="h-64 rounded-xl overflow-hidden bg-surface-container-high flex items-center justify-center p-8">
                  <img alt="Writing process" className="w-full h-full object-contain" src="/GP.ico" referrerPolicy="no-referrer" />
                </div>
                <div className="h-80 rounded-xl overflow-hidden bg-primary shadow-2xl flex flex-col justify-end p-8 text-on-primary">
                  <p className="font-serif italic text-2xl mb-4">"Precision is the soul of scholarship."</p>
                  <span className="text-xs uppercase font-bold tracking-widest opacity-70">Publication Creed</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-80 rounded-xl overflow-hidden bg-surface-container-high flex items-center justify-center p-8">
                  <img alt="Finished book" className="w-full h-full object-contain" src="/GP.ico" referrerPolicy="no-referrer" />
                </div>
                <div className="h-64 rounded-xl overflow-hidden bg-surface-container-high flex items-center justify-center p-8">
                  <img alt="Archive" className="w-full h-full object-contain" src="/GP.ico" referrerPolicy="no-referrer" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-8">
        <div className="max-w-4xl mx-auto rounded-xl bg-emerald-900 p-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-800 rounded-full -mr-32 -mt-32 opacity-50 blur-3xl"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-serif italic mb-6">Ready to initiate your manuscript?</h2>
            <p className="text-emerald-100 mb-10 max-w-xl mx-auto opacity-80">Our editors are ready to evaluate your proposal within 14 business days. Begin your journey toward academic immortality today.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:gnosispublishers26@gmail.com?subject=Manuscript Proposal Submission" className="bg-white text-emerald-900 px-8 py-3 rounded-full font-bold hover:bg-emerald-50 active:scale-95 transition-all">Submit Proposal</a>
              <button className="border border-emerald-500 text-white px-8 py-3 rounded-full font-bold hover:bg-white/10 active:scale-95 transition-all">Download Guide</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Books;
