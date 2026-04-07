import React, { useState, useEffect } from 'react';
import { Layout, User, LogIn, Menu, X, LogOut, ArrowRight, LayoutDashboard, Store, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import Logo from './Logo';

const Navbar = ({ activeView, setActiveView, user, logout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'store', label: 'Catálogo', icon: Store },
    { id: 'planes', label: 'Planes', icon: CreditCard },
    user 
      ? { id: 'seller', label: 'Mi Panel', icon: LayoutDashboard } 
      : { id: 'login', label: 'Acceso', icon: LogIn },
  ];

  const NavButton = ({ item, mobile = false }) => (
    <button
      onClick={() => {
        setActiveView(item.id);
        if (mobile) setIsOpen(false);
      }}
      className={cn(
        "relative px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 group overflow-hidden",
        activeView === item.id 
          ? "text-emerald-700 bg-emerald-500/10" 
          : "text-slate-500 hover:text-slate-900 hover:bg-slate-100/50",
        mobile && "w-full text-lg py-4 px-6 justify-start"
      )}
    >
      <item.icon className={cn(
        "w-4 h-4 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3",
        activeView === item.id ? "text-emerald-600" : "text-slate-400 group-hover:text-slate-600",
        mobile && "w-6 h-6"
      )} />
      {item.label}
      {activeView === item.id && !mobile && (
        <motion.div 
          layoutId="nav-pill"
          className="absolute inset-0 bg-emerald-500/5 border border-emerald-500/20 rounded-xl -z-10"
          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
        />
      )}
    </button>
  );

  return (
    <nav className={cn(
      "fixed top-0 inset-x-0 z-[100] transition-all duration-500",
      scrolled 
        ? "bg-white/80 backdrop-blur-xl border-b border-slate-200/50 py-3 shadow-xl shadow-slate-900/5" 
        : "bg-transparent py-5"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => setActiveView('store')}
          >
            <motion.div 
              whileHover={{ rotate: -15, scale: 1.15, filter: "brightness(1.1)" }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Logo className="w-12 h-12" />
            </motion.div>
            <div className="flex flex-col">
              <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-br from-slate-900 via-emerald-800 to-emerald-950 tracking-tighter leading-none">
                Marketify
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-emerald-600/60 font-black -mt-0.5 ml-0.5">
                Next-GenCommerce
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1.5 bg-slate-400/5 p-1 rounded-2xl border border-slate-200/20 backdrop-blur-sm">
            {navItems.map((item) => (
              <NavButton key={item.id} item={item} />
            ))}
          </div>

          {/* Desktop Auth/CTA */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                <div className="flex flex-col items-end">
                  <span className="text-xs font-black text-slate-900">{user.name}</span>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] text-emerald-600 font-black uppercase tracking-widest">{user.plan}</span>
                  </div>
                </div>
                <button 
                  onClick={logout} 
                  className="p-3 rounded-xl bg-slate-100 text-slate-500 hover:text-red-500 hover:bg-red-50 hover:border-red-100 border border-transparent transition-all"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
                <button 
                  onClick={() => setActiveView('login')} 
                  className="btn-primary-marketify group px-7 shadow-lg shadow-emerald-500/20"
                >
                    Comenzar 
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className={cn(
                "p-3 rounded-2xl transition-all duration-300",
                isOpen ? "bg-emerald-500 text-white" : "bg-white text-slate-600 border border-slate-200"
              )}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xl z-[-1] md:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-[85%] max-w-sm bg-white shadow-2xl z-[110] md:hidden flex flex-col pt-24 px-6 border-l border-slate-100"
            >
              <div className="space-y-3">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 pl-4">Navegación</p>
                {navItems.map((item) => (
                  <NavButton key={item.id} item={item} mobile />
                ))}
              </div>

              <div className="mt-auto mb-10 space-y-4">
                <div className="h-px bg-slate-100 w-full" />
                {user ? (
                   <button 
                    onClick={() => { logout(); setIsOpen(false); }} 
                    className="w-full flex items-center gap-4 px-6 py-5 rounded-2xl text-lg font-bold text-red-500 bg-red-50 hover:bg-red-100 transition-all"
                   >
                     <LogOut className="w-6 h-6" /> Cerrar Sesión
                   </button>
                ) : (
                  <button 
                    onClick={() => { setActiveView('login'); setIsOpen(false); }} 
                    className="w-full btn-primary-marketify py-5 text-lg"
                  >
                    Acceso Comerciante <ArrowRight className="w-5 h-5" />
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
