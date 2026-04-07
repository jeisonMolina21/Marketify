import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ShieldCheck, Zap, Globe, ChevronRight, Star, ArrowRight, Award } from 'lucide-react';
import { cn } from '../lib/utils';

const PlanesView = ({ setActiveView }) => {
  const plans = [
    { 
        name: 'Lite', 
        price: 0, 
        features: ['Hasta 10 productos', 'Tienda pública estándar', 'Pasarela Marketify', 'Soporte comunidad'], 
        color: 'slate', 
        label: 'Emprendedor' 
    },
    { 
        name: 'Pro', 
        price: 49, 
        features: ['Productos ilimitados', 'Dominio personalizado', '0% Comisiones propias', 'Estadísticas Pro'], 
        color: 'emerald', 
        popular: true, 
        label: 'Más Popular' 
    },
    { 
        name: 'Enterprise', 
        price: 199, 
        features: ['Soporte 24/7 Dedicado', 'API de Inventario', 'Múltiples administradores', 'Whitelabel Total'], 
        color: 'indigo', 
        label: 'Escalable' 
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pt-32 pb-24 overflow-hidden">
      {/* Platform Info Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div className="relative bg-slate-900 rounded-[4rem] p-12 md:p-24 overflow-hidden luxury-shadow shadow-2xl">
          {/* Animated Background Elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[150px] rounded-full -mr-64 -mt-64 animate-pulse" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[150px] rounded-full -ml-64 -mb-64 opacity-50" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div 
                initial={{ opacity: 0, x: -40 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-emerald-400 text-xs font-black uppercase tracking-[0.3em] mb-10">
                    <Award className="w-5 h-5" /> Misión Marketify 2026
                </div>
                <h2 className="text-5xl md:text-7xl font-black text-white leading-[0.9] tracking-[ -0.05em] mb-10">
                    Potenciando tu <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-200 italic">Soberanía Digital</span>.
                </h2>
                <p className="text-xl text-slate-400 leading-relaxed font-medium mb-12 max-w-lg">
                  Nuestro modelo de licenciamiento elimina las barreras de entrada. No pagas comisiones por ventas, solo una tarifa justa mensual por usar la mejor tecnología del mercado.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="p-6 bg-white/5 rounded-3xl border border-white/10 hover:border-emerald-500/30 transition-all group">
                    <ShieldCheck className="w-8 h-8 text-emerald-400 mb-4 group-hover:scale-110 transition-transform" />
                    <h4 className="text-white text-lg font-black tracking-tight mb-1">100% Seguro</h4>
                    <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">Uptime Garantizado</p>
                  </div>
                  <div className="p-6 bg-white/5 rounded-3xl border border-white/10 hover:border-emerald-500/30 transition-all group">
                    <Zap className="w-8 h-8 text-amber-400 mb-4 group-hover:scale-110 transition-transform" />
                    <h4 className="text-white text-lg font-black tracking-tight mb-1">Ultra Rápido</h4>
                    <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">Core Optimizado</p>
                  </div>
                </div>
            </motion.div>

            <motion.div 
                initial={{ scale: 0.8, opacity: 0 }} 
                whileInView={{ scale: 1, opacity: 1 }} 
                viewport={{ once: true }} 
                transition={{ duration: 1, delay: 0.2 }}
                className="relative hidden lg:block"
            >
                <div className="absolute inset-0 bg-emerald-500/20 blur-[120px] animate-pulse" />
                <div className="relative bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-12 shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700">
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-12 h-2 rounded-full bg-emerald-500/50" />
                        <div className="w-6 h-2 rounded-full bg-emerald-500/20" />
                    </div>
                    <div className="space-y-8">
                        <div className="h-10 w-3/4 bg-white/10 rounded-2xl animate-pulse" />
                        <div className="h-48 w-full bg-white/5 rounded-[2rem] border border-white/5 flex items-center justify-center">
                            <Globe className="w-20 h-20 text-white/10 animate-spin-slow" />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="h-12 bg-white/10 rounded-2xl" />
                            <div className="h-12 bg-white/10 rounded-2xl" />
                        </div>
                    </div>
                </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Plans Pricing Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
          >
            <h2 className="text-6xl md:text-8xl font-black text-slate-900 tracking-[ -0.06em] leading-[0.85] mb-8">
                Elige tu <br />
                <span className="italic text-emerald-600">Escala de Éxito</span>.
            </h2>
            <p className="text-xl text-slate-500 font-medium">Arquitectura de precios transparente, diseñada para crecer contigo.</p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-stretch">
          {plans.map((plan, idx) => (
            <motion.div 
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.8, ease: "easeOut" }}
              className={cn(
                "relative group bg-white rounded-[3rem] p-10 lg:p-14 border transition-all duration-700 hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] flex flex-col",
                plan.popular 
                  ? "border-emerald-500 shadow-2xl shadow-emerald-500/10 ring-8 ring-emerald-500/5 order-first md:order-none" 
                  : "border-slate-100 hover:border-slate-200"
              )}
            >
              <div className="mb-12">
                <span className={cn(
                    "inline-block px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-8",
                    plan.popular ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-500"
                )}>
                    {plan.label}
                </span>
                <h3 className="text-4xl font-black text-slate-900 tracking-tight mb-4 group-hover:text-emerald-600 transition-colors">{plan.name}</h3>
                <div className="flex items-baseline gap-2">
                    <span className="text-7xl font-black text-slate-900 tracking-tighter">${plan.price}</span>
                    <span className="text-slate-400 font-black uppercase text-xs tracking-widest">/ Mes</span>
                </div>
              </div>

              <ul className="space-y-6 mb-16 flex-grow">
                {plan.features.map(feature => (
                  <li key={feature} className="flex items-center gap-4 text-slate-600 font-bold group-hover:text-slate-900 transition-colors">
                    <div className="p-1 rounded-full bg-emerald-500/10"><CheckCircle className="w-5 h-5 text-emerald-500" /></div>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => setActiveView('login')}
                className={cn(
                  "w-full h-18 rounded-2xl font-black text-base uppercase tracking-widest transition-all duration-300 active:scale-95 flex items-center justify-center gap-3 shadow-xl",
                  plan.popular 
                    ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-500/20" 
                    : "bg-slate-900 text-white hover:bg-slate-800 shadow-slate-900/10"
                )}
              >
                Comenzar <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PlanesView;
