import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Mail, Lock, ShieldCheck, Github, Chrome } from 'lucide-react';
import { cn } from '../lib/utils';
import Logo from './Logo';

const LoginView = ({ setUser, setActiveView }) => {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 lg:p-8 pt-32 pb-24 overflow-hidden relative">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/5 blur-[120px] rounded-full -mr-96 -mt-96" />
            <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full -ml-96 -mb-96" />

            <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center relative z-10">
                {/* Left Side: Branding / Copy */}
                <motion.div 
                    initial={{ opacity: 0, x: -50 }} 
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="hidden lg:block space-y-12"
                >
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 text-xs font-black uppercase tracking-[0.2em]">
                             Portal de Comerciantes Pro
                        </div>
                        <h1 className="text-7xl xl:text-8xl font-black text-slate-900 tracking-tighter leading-[0.9]">
                            Comienza tu <br />
                            <span className="italic text-emerald-600">Era Digital</span>.
                        </h1>
                        <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-md">
                            La plataforma que redefine el comercio independiente. Sin comisiones, sin límites, solo crecimiento.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-2">
                             <h4 className="text-3xl font-black text-slate-900 tracking-tighter">12.5k+</h4>
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Comercios Activos</p>
                             <div className="h-1 w-8 bg-emerald-500 rounded-full" />
                        </div>
                        <div className="space-y-2">
                             <h4 className="text-3xl font-black text-slate-900 tracking-tighter">99.99%</h4>
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Uptime Global</p>
                             <div className="h-1 w-8 bg-emerald-500 rounded-full" />
                        </div>
                    </div>

                    <div className="flex items-center gap-4 p-6 rounded-[2rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/50 w-fit">
                         <div className="p-3 bg-emerald-500 text-white rounded-2xl"><ShieldCheck className="w-6 h-6" /></div>
                         <div>
                            <p className="text-sm font-black text-slate-900 tracking-tight">Acceso SSL Encriptado</p>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Nivel Bancario 256-bit</p>
                         </div>
                    </div>
                </motion.div>

                {/* Right Side: Login Card */}
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="w-full max-w-lg mx-auto"
                >
                    <div className="bg-white rounded-[3.5rem] p-10 lg:p-16 shadow-2xl shadow-slate-900/5 border border-white relative overflow-hidden group">
                        {/* Decorative Gradient Overlay */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                        
                        <div className="text-center mb-12">
                             <Logo className="w-16 h-16 mx-auto mb-8" />
                             <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-3">Bienvenido, Jefe</h2>
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Acceso Administrativo Seguro</p>
                        </div>

                        <form className="space-y-6" onSubmit={(e) => { 
                            e.preventDefault(); 
                            setUser({ name: 'Alexander Mercado', email: 'alex@marketify.pro', plan: 'Empresarial' }); 
                            setActiveView('seller');
                        }}>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Tu Identidad Digital</label>
                                <div className="relative group/field">
                                    <input 
                                        type="email" 
                                        required 
                                        placeholder="email@tu-dominio.com" 
                                        className="input-marketify pl-14" 
                                    />
                                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within/field:text-emerald-500 transition-colors" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Contraseña Maestra</label>
                                <div className="relative group/field">
                                    <input 
                                        type="password" 
                                        required 
                                        placeholder="••••••••" 
                                        className="input-marketify pl-14" 
                                    />
                                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within/field:text-emerald-500 transition-colors" />
                                </div>
                                <div className="flex justify-end pt-1">
                                    <button type="button" className="text-[10px] font-black text-emerald-600 uppercase tracking-widest hover:underline">¿Clave olvidada?</button>
                                </div>
                            </div>

                            <button type="submit" className="w-full h-18 btn-primary-marketify text-lg shadow-2xl shadow-emerald-500/20 tracking-widest uppercase">
                                Autenticar <ArrowRight className="w-5 h-5" />
                            </button>
                        </form>

                        <div className="mt-12">
                             <div className="relative flex items-center justify-center mb-8">
                                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100" /></div>
                                <span className="relative px-6 bg-white text-[10px] font-black text-slate-300 uppercase tracking-widest">O continúa con</span>
                             </div>

                             <div className="grid grid-cols-2 gap-4">
                                <button className="h-14 border border-slate-100 rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-50 hover:border-slate-200 transition-all active:scale-95 group">
                                     <Chrome className="w-5 h-5 text-slate-400 group-hover:text-amber-500 transition-colors" />
                                     <span className="text-xs font-black text-slate-900 uppercase">Google</span>
                                </button>
                                <button className="h-14 border border-slate-100 rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-50 hover:border-slate-200 transition-all active:scale-95 group">
                                     <Github className="w-5 h-5 text-slate-400 group-hover:text-slate-900 transition-colors" />
                                     <span className="text-xs font-black text-slate-900 uppercase">Github</span>
                                </button>
                             </div>
                        </div>

                        <div className="mt-12 text-center">
                            <p className="text-sm font-medium text-slate-500">¿Sin licencia activa?</p>
                            <button 
                                onClick={() => setActiveView('planes')} 
                                className="mt-2 text-sm font-black text-emerald-600 uppercase tracking-widest group inline-flex items-center gap-2"
                            >
                                Adquirir un Plan <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </button>
                        </div>
                    </div>
                    <p className="mt-8 text-center text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] opacity-50">
                             Protección Marketify Shield Activada v4.2
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default LoginView;
