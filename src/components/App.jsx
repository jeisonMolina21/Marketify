import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Separate Components
import Navbar from './Navbar';
import Footer from './Footer';
import PublicStoreView from './PublicStoreView';
import PlanesView from './PlanesView';
import LoginView from './LoginView';
import SellerDashboard from './SellerDashboard';

export default function App() {
  const [activeView, setActiveView] = useState('store');
  const [user, setUser] = useState(null);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeView]);

  const logout = () => {
      setUser(null);
      setActiveView('store');
  }

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50/30">
      <Navbar 
        activeView={activeView} 
        setActiveView={setActiveView} 
        user={user} 
        logout={logout} 
      />
      
      <main className="flex-grow overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ 
              duration: 0.25, 
              ease: [0.22, 1, 0.36, 1] 
            }}
          >
            {activeView === 'store' && <PublicStoreView />}
            {activeView === 'planes' && <PlanesView setActiveView={setActiveView} />}
            {activeView === 'login' && <LoginView setUser={setUser} setActiveView={setActiveView} />}
            {activeView === 'seller' && user && <SellerDashboard user={user} logout={logout} />}
            {activeView === 'seller' && !user && <LoginView setUser={setUser} setActiveView={setActiveView} />}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
