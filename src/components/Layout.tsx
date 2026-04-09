import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Mail, Share2, LogOut, Settings, UserCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, userProfile, isAdmin, signOut, loading } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    if (!loading && user && !isAdmin && !userProfile && location.pathname !== '/profile-setup') {
      navigate('/profile-setup');
    }
  }, [user, userProfile, isAdmin, loading, location.pathname, navigate]);

  const navLinks = [
    { name: 'Papers', path: '/papers' },
    { name: 'Journals', path: '/journals' },
    { name: 'Patents', path: '/patents' },
    { name: 'Books', path: '/books' },
    { name: 'Projects', path: '/projects' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* TopNavBar */}
      <header className="bg-emerald-50/80 backdrop-blur-xl sticky top-0 z-50 transition-all duration-300 border-b border-outline-variant/10">
        <nav className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-12">
            <Link to="/" className="text-2xl font-serif italic text-emerald-900">
              Gnosis Publishers
            </Link>
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-semibold tracking-wide transition-colors hover:text-emerald-800 ${
                    location.pathname === link.path
                      ? 'text-emerald-900 border-b-2 border-emerald-800 pb-1'
                      : 'text-stone-600'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              {isAdmin && (
                <Link
                  to="/admin"
                  className={`flex items-center gap-2 text-sm font-bold tracking-wide transition-colors hover:text-emerald-800 ${
                    location.pathname === '/admin'
                      ? 'text-emerald-900 border-b-2 border-emerald-800 pb-1'
                      : 'text-stone-600'
                  }`}
                >
                  <Settings size={16} /> Dashboard
                </Link>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-xs font-semibold text-stone-500 hidden lg:block">{user.email}</span>
                <Link 
                  to="/profile-setup"
                  className="p-2 text-stone-600 hover:bg-stone-100 rounded-full transition-all"
                  title="Profile"
                >
                  <UserCircle size={18} />
                </Link>
                <button 
                  onClick={signOut}
                  className="p-2 text-stone-600 hover:bg-stone-100 rounded-full transition-all"
                  title="Sign Out"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <>
                <button 
                  onClick={() => setIsAuthModalOpen(true)}
                  className="px-5 py-2 text-sm font-bold text-emerald-900 hover:bg-emerald-100/50 rounded-full transition-all active:scale-95"
                >
                  Login
                </button>
                <button 
                  onClick={() => setIsAuthModalOpen(true)}
                  className="px-6 py-2 text-sm font-bold bg-gradient-to-r from-primary to-primary-container text-on-primary rounded-full shadow-lg hover:shadow-xl transition-all active:scale-95"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </nav>
      </header>

      <main className="flex-grow">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {children}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-stone-100 border-t border-outline-variant/10 mt-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-12 py-16 max-w-7xl mx-auto">
          <div className="md:col-span-1">
            <span className="text-xl font-serif text-emerald-900 mb-4 block">
              Gnosis Publishers
            </span>
            <p className="text-xs text-stone-500 leading-relaxed mb-6">
              © 2024 Gnosis Publishers. Precision in Scholarly Excellence.
            </p>
            <div className="flex gap-4">
              <a
                href="mailto:gnosispublishers26@gmail.com"
                className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center hover:bg-emerald-800 hover:text-white transition-all"
                title="Email Us"
              >
                <Mail size={14} />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center hover:bg-emerald-800 hover:text-white transition-all"
              >
                <Share2 size={14} />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-serif italic text-lg text-emerald-900 mb-6">
              Publishing
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="text-xs text-stone-500 hover:text-emerald-600 hover:underline decoration-emerald-800/30 transition-all duration-300"
                >
                  Submit Manuscript
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-xs text-stone-500 hover:text-emerald-600 hover:underline decoration-emerald-800/30 transition-all duration-300"
                >
                  Ethical Guidelines
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-xs text-stone-500 hover:text-emerald-600 hover:underline decoration-emerald-800/30 transition-all duration-300"
                >
                  Open Access Policy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif italic text-lg text-emerald-900 mb-6">
              Inquiries
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:gnosispublishers26@gmail.com"
                  className="text-xs text-stone-500 hover:text-emerald-600 hover:underline decoration-emerald-800/30 transition-all duration-300"
                >
                  Contact Academic Board
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-xs text-stone-500 hover:text-emerald-600 hover:underline decoration-emerald-800/30 transition-all duration-300"
                >
                  Privacy Registry
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif italic text-lg text-emerald-900 mb-6">
              Newsletter
            </h4>
            <p className="text-xs text-stone-500 mb-4">
              Stay updated with our latest monthly volumes.
            </p>
            <div className="flex">
              <input
                className="bg-surface-container-low border-0 text-xs py-2 px-4 rounded-l-md focus:ring-1 focus:ring-primary w-full"
                placeholder="gnosispublishers26@gmail.com"
                type="email"
              />
              <button className="bg-primary text-on-primary px-4 py-2 rounded-r-md text-xs font-bold transition-all hover:bg-primary-container active:scale-95">
                Join
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-12 py-8 border-t border-stone-200">
          <p className="text-xs text-stone-400 text-center">
            © 2024 Gnosis Publishers. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/9994145453"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 hover:shadow-2xl transition-all duration-300 flex items-center justify-center"
        aria-label="Chat on WhatsApp"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  );
};

export default Layout;
