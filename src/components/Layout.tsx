import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, Share2, LogOut, Settings } from 'lucide-react';
import { motion } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { user, isAdmin, signIn, signOut } = useAuth();

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
                  onClick={signIn}
                  className="px-5 py-2 text-sm font-bold text-emerald-900 hover:bg-emerald-100/50 rounded-full transition-all active:scale-95"
                >
                  Login
                </button>
                <button 
                  onClick={signIn}
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
                href="#"
                className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center hover:bg-emerald-800 hover:text-white transition-all"
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
                  href="#"
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
                placeholder="Academic email"
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
    </div>
  );
};

export default Layout;
