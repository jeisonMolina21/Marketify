import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, User, Search, Store, LayoutDashboard, LogIn, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import Logo from './Logo';
import CartDrawer from './cart/CartDrawer';
import { useCartStore } from '../store/useCartStore';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const totalItems = useCartStore((state) => state.getTotalItems());
  
  // Hydration fix for Zustand
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Inicio', href: '/' },
    { label: 'Catálogo', href: '/catalog' },
    { label: 'Categorías', href: '/#categories' },
    { label: 'Admin', href: '/admin', icon: LayoutDashboard },
  ];

  return (
    <>
      <nav className={cn(
        "fixed top-0 inset-x-0 z-[100] transition-all duration-500",
        scrolled 
          ? "bg-white/80 backdrop-blur-xl border-b border-slate-200/50 py-3 shadow-xl shadow-slate-900/5" 
          : "bg-transparent py-5"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <a href="/" className="flex items-center gap-3 group">
              <motion.div 
                whileHover={{ rotate: -10, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Logo className="w-12 h-12" />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-br from-slate-900 via-emerald-800 to-emerald-950 tracking-tighter leading-none">
                  Marketify
                </span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-emerald-600/60 font-black -mt-0.5 ml-0.5">
                  Colombia Store
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm font-bold text-slate-500 hover:text-emerald-600 transition-colors flex items-center gap-2"
                >
                  {item.icon && <item.icon className="w-4 h-4" />}
                  {item.label}
                </a>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              <button className="p-2.5 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors hidden sm:block">
                <Search className="w-5 h-5" />
              </button>
              
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 rounded-xl bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500 hover:text-white transition-all duration-300 group"
              >
                <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-110" />
                {mounted && totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white animate-in zoom-in">
                    {totalItems}
                  </span>
                )}
              </button>

              <div className="h-8 w-px bg-slate-200 mx-1 hidden md:block" />

              <a 
                href="/admin" 
                className="hidden md:flex btn-primary-marketify px-6 py-2.5 text-sm shadow-emerald-500/10"
              >
                Acceso Admin
              </a>

              {/* Mobile Toggle */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2.5 rounded-xl border border-slate-200 text-slate-600"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center justify-between px-4 py-3 rounded-2xl bg-slate-50 text-slate-900 font-bold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon && <item.icon className="w-5 h-5 text-emerald-600" />}
                      {item.label}
                    </div>
                    <ChevronRight className="w-5 h-5 text-slate-300" />
                  </a>
                ))}
                <a
                  href="/admin"
                  className="btn-primary-marketify w-full py-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard Administrativo
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Navbar;
