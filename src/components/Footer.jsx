import React from 'react';
import { Twitter, Instagram, Globe, Mail, Phone, MapPin, ArrowRight, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import Logo from './Logo';

const Footer = () => {
    const footerLinks = [
        { title: 'Plataforma', links: ['Características', 'Soluciones', 'Integraciones', 'API'] },
        { title: 'Compañía', links: ['Sobre Nosotros', 'Nuestra Misión', 'Blog', 'Prensa'] },
        { title: 'Soporte', links: ['Centro de Ayuda', 'Documentación', 'Estado del Servicio', 'Contacto'] },
        { title: 'Legal', links: ['Privacidad', 'Términos', 'Cookies', 'Licencias'] },
    ];

    return (
        <footer className="relative bg-slate-900 pt-24 pb-12 overflow-hidden border-t border-white/5">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 blur-[120px] rounded-full -ml-48 -mb-48 opacity-50" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-20">
                    {/* Brand Section */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="flex items-center gap-4 group">
                             <motion.div 
                                whileHover={{ rotate: 15, scale: 1.1 }}
                                className="p-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-xl group-hover:border-emerald-500/50 transition-colors"
                             >
                                <Logo className="w-10 h-10" />
                             </motion.div>
                             <div className="flex flex-col">
                                <span className="text-3xl font-black text-white tracking-tighter">Marketify</span>
                                <span className="text-[10px] uppercase font-black tracking-[0.4em] text-emerald-400">Next-GenCommerce</span>
                             </div>
                        </div>

                        <p className="text-slate-400 font-medium text-lg leading-relaxed max-w-sm">
                            Redefiniendo el e-commerce global con tecnología de alta gama para comerciantes visionarios.
                        </p>

                        <div className="flex gap-4">
                            {[Twitter, Instagram, Globe, Github].map((Icon, idx) => (
                                <motion.a 
                                    key={idx}
                                    whileHover={{ scale: 1.1, translateY: -4 }}
                                    href="#" 
                                    className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all"
                                >
                                    <Icon className="w-5 h-5" />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Links Grid */}
                    <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-8">
                        {footerLinks.map((section, idx) => (
                            <div key={idx} className="space-y-6">
                                <h4 className="text-sm font-black text-white uppercase tracking-[0.2em] opacity-50">{section.title}</h4>
                                <ul className="space-y-4">
                                    {section.links.map((link, lIdx) => (
                                        <li key={lIdx}>
                                            <a href="#" className="text-slate-400 font-bold hover:text-emerald-400 transition-colors duration-300 flex items-center gap-2 group">
                                               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/0 group-hover:bg-emerald-500/100 transition-all duration-300" />
                                               {link}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="h-px bg-white/5 w-full mb-12" />

                {/* Newsletter / Contact Promo */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center py-12 px-10 rounded-[3rem] bg-emerald-500/10 border border-emerald-500/20 mb-20">
                     <div className="md:col-span-2">
                        <h3 className="text-2xl font-black text-white mb-2">¿Listo para escalar tu negocio?</h3>
                        <p className="text-emerald-100/60 font-medium">Únete a los miles de comerciantes que ya están vendiendo con Marketify.</p>
                     </div>
                     <button className="h-16 bg-white text-slate-900 rounded-2xl font-black uppercase tracking-widest hover:bg-emerald-400 hover:text-slate-900 transition-all active:scale-95 flex items-center justify-center gap-3 shadow-2xl shadow-emerald-900/50">
                        Comenzar Ahora <ArrowRight className="w-5 h-5" />
                     </button>
                </div>

                {/* Info Bar */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-t border-white/5">
                     <div className="flex items-center gap-4 text-slate-400 font-bold">
                        <MapPin className="w-5 h-5 text-emerald-500" />
                        <span className="text-sm">Silicon Valley, CA • Madrid, ES</span>
                     </div>
                     <div className="flex items-center gap-4 text-slate-400 font-bold justify-start md:justify-center">
                        <Mail className="w-5 h-5 text-emerald-500" />
                        <span className="text-sm">hello@marketify.pro</span>
                     </div>
                     <div className="flex items-center gap-4 text-slate-400 font-bold justify-start md:justify-end">
                        <Phone className="w-5 h-5 text-emerald-500" />
                        <span className="text-sm">+34 900 100 200</span>
                     </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-12 gap-6 opacity-40">
                    <p className="text-slate-500 text-xs font-black uppercase tracking-widest">© 2026 Marketify Global Corp. Todos los derechos reservados.</p>
                    <div className="flex gap-8">
                        <a href="#" className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Estado</a>
                        <a href="#" className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Seguridad</a>
                        <a href="#" className="text-xs font-black uppercase tracking-widest text-slate-500 hover:text-white transition-colors">Legal</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
