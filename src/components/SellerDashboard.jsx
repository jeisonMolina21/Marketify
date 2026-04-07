import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Package, BarChart3, Users, Settings, 
  LogOut, Plus, Search, MoreVertical, TrendingUp, 
  ArrowUpRight, ArrowDownRight, Globe, ShoppingCart, 
  Menu, X, Bell, Calendar, ArrowRight
} from 'lucide-react';
import { cn } from '../lib/utils';
import Logo from './Logo';

const SellerDashboard = ({ user, logout }) => {
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 600);
        return () => clearTimeout(timer);
    }, []);

    const menuItems = [
        { id: 'overview', label: 'Panorama', icon: LayoutDashboard },
        { id: 'products', label: 'Productos', icon: Package },
        { id: 'analytics', label: 'Analíticas', icon: BarChart3 },
        { id: 'customers', label: 'Clientes', icon: Users },
        { id: 'settings', label: 'Ajustes', icon: Settings },
    ];

    const stats = [
        { label: 'Ventas Totales', value: '$24,500', trend: '+12.5%', isUp: true, icon: TrendingUp },
        { label: 'Pedidos Hoy', value: '142', trend: '+18.2%', isUp: true, icon: ShoppingCart },
        { label: 'Visitas Únicas', value: '12,403', trend: '-2.4%', isUp: false, icon: Globe },
        { label: 'Conversion', value: '3.4%', trend: '+0.5%', isUp: true, icon: BarChart3 },
    ];

    const SidebarItem = ({ item }) => (
      <button
        onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }}
        className={cn(
          "w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all group relative overflow-hidden",
          activeTab === item.id 
            ? "bg-emerald-600 text-white shadow-xl shadow-emerald-500/20" 
            : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
        )}
      >
        <item.icon className={cn("w-5 h-5", activeTab === item.id ? "text-white" : "text-slate-400 group-hover:text-emerald-500")} />
        {item.label}
        {activeTab === item.id && (
          <motion.div layoutId="active-pill" className="absolute right-0 top-0 bottom-0 w-1 bg-white/30" />
        )}
      </button>
    );

    const StatSkeleton = () => (
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
            <div className="flex justify-between">
                <div className="w-12 h-12 skeleton rounded-2xl" />
                <div className="w-16 h-4 skeleton" />
            </div>
            <div className="h-10 skeleton w-3/4" />
            <div className="h-4 skeleton w-1/2" />
        </div>
    );

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex pt-20">
            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar Component */}
            <aside className={cn(
                "fixed inset-y-0 left-0 z-[110] w-80 bg-white border-r border-slate-200 transition-transform duration-300 lg:relative lg:translate-x-0 p-8 flex flex-col pt-32 lg:pt-8",
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="space-y-2 flex-grow">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 pl-4 font-sans">Administración</p>
                    {menuItems.map(item => <SidebarItem key={item.id} item={item} />)}
                </div>

                <div className="mt-auto space-y-6 pt-12">
                     <button 
                        onClick={logout}
                        className="w-full flex items-center justify-center gap-3 h-14 bg-red-50 text-red-500 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-100 transition-colors"
                     >
                         <LogOut className="w-4 h-4" /> Salir del Panel
                     </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-grow p-4 lg:p-12 overflow-x-hidden">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                   <div>
                        <div className="flex items-center gap-4 mb-4 lg:hidden">
                            <button onClick={() => setIsSidebarOpen(true)} className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-600">
                                 <Menu className="w-6 h-6" />
                            </button>
                            <Logo className="w-8 h-8" />
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter leading-none mb-2">Panorama <span className="italic text-emerald-600">Global</span>.</h2>
                        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Martes, 07 de Abril • Estado: Saludable</p>
                   </div>

                   <div className="flex items-center gap-4 w-full md:w-auto">
                        <button className="flex-grow md:flex-grow-0 btn-primary-marketify shadow-2xl shadow-emerald-500/10 h-14 px-8">
                             <Plus className="w-5 h-5" /> <span className="hidden sm:inline">Nuevo Producto</span>
                        </button>
                   </div>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {loading ? (
                        [...Array(4)].map((_, i) => <StatSkeleton key={i} />)
                    ) : (
                        stats.map((stat, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.05 }}
                                className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:translate-y-[-2px] transition-all duration-300 relative overflow-hidden group"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <div className="p-3 rounded-2xl bg-emerald-500/5 text-emerald-600">
                                         <stat.icon className="w-6 h-6" />
                                    </div>
                                    <div className={cn("flex items-center gap-1 text-[10px] font-black uppercase tracking-widest", stat.isUp ? "text-emerald-500" : "text-red-500")}>
                                         {stat.trend}
                                    </div>
                                </div>
                                <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none mb-1">{stat.value}</h3>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                            </motion.div>
                        ))
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                     <div className="lg:col-span-2 space-y-8">
                         <div className="bg-white rounded-[3rem] border border-slate-100 shadow-sm overflow-hidden">
                             <div className="p-10 border-b border-slate-50 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                                 <div>
                                     <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-1">Inventario</h3>
                                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Gestiona tus colecciones en tiempo real</p>
                                 </div>
                             </div>
                             <div className="overflow-x-auto custom-scrollbar">
                                 <table className="w-full">
                                     <thead>
                                         <tr className="bg-slate-50/50">
                                             {['Producto', 'Categoría', 'Precio', 'Stock', 'Estado'].map(h => (
                                                 <th key={h} className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 py-6 px-10 text-left">{h}</th>
                                             ))}
                                         </tr>
                                     </thead>
                                     <tbody className="divide-y divide-slate-50">
                                         {loading ? (
                                             [...Array(4)].map((_, i) => (
                                                 <tr key={i}>
                                                     {[1,2,3,4,5].map(j => (
                                                         <td key={j} className="py-6 px-10"><div className="h-6 skeleton w-full" /></td>
                                                     ))}
                                                 </tr>
                                             ))
                                         ) : (
                                            [
                                                { name: 'MacBook Air M3', cat: 'Laptops', price: '$1299', stock: 12, status: 'Activo' },
                                                { name: 'Monitor 5K 27"', cat: 'Monitores', price: '$1599', stock: 4, status: 'Bajo Stock' },
                                                { name: 'Silla Pro Ergonomic', cat: 'Mobiliario', price: '$850', stock: 24, status: 'Activo' },
                                                { name: 'MX Keyboard v2', cat: 'Ajustes', price: '$169', stock: 0, status: 'Agotado' },
                                            ].map((row, idx) => (
                                                <tr key={idx} className="hover:bg-slate-50 transition-colors group">
                                                    <td className="py-6 px-10"><span className="text-sm font-black text-slate-800">{row.name}</span></td>
                                                    <td className="py-6 px-10 text-xs font-bold text-slate-400 uppercase">{row.cat}</td>
                                                    <td className="py-6 px-10 text-sm font-black text-slate-900 tracking-tight">{row.price}</td>
                                                    <td className="py-6 px-10 text-sm font-bold text-slate-600">{row.stock} uds</td>
                                                    <td className="py-6 px-10">
                                                        <span className={cn(
                                                            "text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full",
                                                            row.status === 'Activo' ? "bg-emerald-500/10 text-emerald-600" : "bg-red-500/10 text-red-600"
                                                        )}>{row.status}</span>
                                                    </td>
                                                </tr>
                                            ))
                                         )}
                                     </tbody>
                                 </table>
                             </div>
                         </div>
                     </div>
                </div>
            </main>
        </div>
    );
};

export default SellerDashboard;
