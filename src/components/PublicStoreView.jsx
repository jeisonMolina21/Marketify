import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Store, ShoppingCart, ChevronRight, X, Package, Search, Filter, Star, Heart } from 'lucide-react';
import { cn } from '../lib/utils';

const PublicStoreView = () => {
    const [loading, setLoading] = useState(true);
    
    const products = [
        { id: 1, name: 'MacBook Air M3', price: 1299, img: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800', category: 'Laptops', rating: 4.9, reviews: 128 },
        { id: 2, name: 'Herman Miller Embody', price: 1800, img: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&q=80&w=800', category: 'Mobiliario', rating: 4.8, reviews: 85 },
        { id: 3, name: 'Studio Display 5K', price: 1599, img: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800', category: 'Monitores', rating: 4.9, reviews: 92 },
        { id: 4, name: 'Keyboard MX Mechanical', price: 169, img: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=800', category: 'Accesorios', rating: 4.7, reviews: 210 },
        { id: 5, name: 'Sony WH-1000XM5', price: 399, img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800', category: 'Audio', rating: 4.8, reviews: 340 },
        { id: 6, name: 'Standing Desk Pro', price: 850, img: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&q=80&w=800', category: 'Mobiliario', rating: 4.6, reviews: 64 },
    ];

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const addToCart = (product) => {
        setCart(prev => {
            const exists = prev.find(i => i.id === product.id);
            if (exists) return prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
            return [...prev, { ...product, qty: 1 }];
        });
        setIsCartOpen(true);
    };

    const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

    const ProductSkeleton = () => (
        <div className="space-y-8">
            <div className="skeleton aspect-[4/5] rounded-[2.5rem]" />
            <div className="space-y-4 px-2">
                <div className="h-8 skeleton w-3/4" />
                <div className="h-4 skeleton w-1/2" />
                <div className="h-10 skeleton w-1/4" />
            </div>
        </div>
    );

    return (
        <div className="bg-slate-50 min-h-screen pt-32 pb-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero / Header Section */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-12">
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }} 
                        animate={{ opacity: 1, x: 0 }}
                        className="max-w-2xl"
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 text-[10px] font-black uppercase tracking-widest mb-6">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            Nuevas Entradas Disponibles
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.85] mb-8">
                            Equipa tu <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-900 italic text-shadow-sm">Ecosistema Digital</span>.
                        </h1>
                        <p className="text-xl text-slate-500 font-medium leading-relaxed">
                            Diseño funcional y tecnología de vanguardia para profesionales que no aceptan menos que la perfección.
                        </p>
                    </motion.div>

                    <div className="w-full lg:w-96 space-y-4">
                        <div className="relative group">
                            <input 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Buscar colección..." 
                                className="w-full h-16 pl-14 pr-6 rounded-2xl bg-white border-slate-200 shadow-xl shadow-slate-200/40 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-bold transition-all duration-200"
                            />
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors w-5 h-5" />
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                    {loading ? (
                        [...Array(6)].map((_, i) => <ProductSkeleton key={i} />)
                    ) : (
                        products.map((product, idx) => (
                            <motion.div 
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.05 }}
                                className="group"
                            >
                                <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-slate-100 mb-8 premium-shadow">
                                    <img 
                                        loading="lazy"
                                        src={product.img} 
                                        className="w-full h-full object-cover grayscale-[0.2] transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0" 
                                        alt={product.name} 
                                    />
                                    
                                    <div className="absolute inset-x-6 bottom-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                        <button 
                                            onClick={() => addToCart(product)}
                                            className="w-full h-14 bg-white text-slate-900 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all active:scale-95 flex items-center justify-center gap-3 shadow-2xl"
                                        >
                                            <ShoppingCart className="w-5 h-5" /> Añadir 
                                        </button>
                                    </div>
                                </div>

                                <div className="flex justify-between items-start px-2">
                                    <div>
                                        <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-tight mb-2 group-hover:text-emerald-600 transition-colors duration-200">
                                            {product.name}
                                        </h3>
                                        <div className="flex items-center gap-2">
                                            <Star className="w-3 h-3 fill-emerald-500 text-emerald-500" />
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{product.reviews} Reseñas</span>
                                        </div>
                                    </div>
                                    <span className="text-3xl font-black text-slate-900 tracking-tighter">${product.price}</span>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>

            {/* Cart Sidebar */}
            <AnimatePresence>
                {isCartOpen && (
                    <>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsCartOpen(false)}
                            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xl z-[200]"
                        />
                        <motion.aside 
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-[210] flex flex-col border-l border-slate-100"
                        >
                            <div className="p-8 lg:p-10 flex flex-col h-full">
                                <div className="flex items-center justify-between mb-12">
                                    <h2 className="text-4xl font-black text-slate-900 tracking-tighter">Mi Bolsa</h2>
                                    <button onClick={() => setIsCartOpen(false)} className="p-4 bg-slate-50 hover:bg-red-50 hover:text-red-500 rounded-[1.5rem] transition-all">
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                <div className="flex-grow overflow-y-auto space-y-8 pr-2 custom-scrollbar">
                                    {cart.length === 0 ? (
                                        <div className="text-center py-24 px-8 border-2 border-dashed border-slate-100 rounded-[3rem] bg-slate-50/50">
                                            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Tu bolsa está vacía</p>
                                        </div>
                                    ) : (
                                        cart.map((item) => (
                                            <div className="flex gap-6 group relative" key={item.id}>
                                                <div className="w-24 h-24 rounded-[1.5rem] overflow-hidden bg-slate-50 border border-slate-100 shrink-0">
                                                    <img src={item.img} className="w-full h-full object-cover" alt="" />
                                                </div>
                                                <div className="flex-grow flex flex-col justify-center">
                                                    <h4 className="font-black text-slate-900 tracking-tight text-lg mb-1">{item.name}</h4>
                                                    <div className="flex justify-between items-center">
                                                         <span className="text-sm font-black text-slate-400">Cant: {item.qty}</span>
                                                         <span className="text-lg font-black text-emerald-600 tracking-tighter">${item.price * item.qty}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>

                                <div className="mt-12 bg-slate-900 text-white p-10 rounded-[3rem] luxury-gradient">
                                    <div className="flex justify-between items-end mb-8">
                                        <span className="text-sm font-black uppercase tracking-widest text-white/60">Total</span>
                                        <span className="text-4xl font-black tracking-tighter text-emerald-400">${total}</span>
                                    </div>
                                    <button 
                                        className="w-full h-18 bg-white text-slate-900 rounded-2xl font-black text-lg uppercase tracking-widest hover:bg-emerald-400 transition-all flex items-center justify-center gap-4 shadow-2xl"
                                        onClick={() => { alert('¡Gracias por tu compra!'); setCart([]); setIsCartOpen(false); }}
                                    >
                                        Pagar <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PublicStoreView;
