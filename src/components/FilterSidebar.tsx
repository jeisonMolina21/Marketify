import React, { useState } from 'react';
import { Search, Filter, ChevronDown, Star } from 'lucide-react';
import { cn } from '../lib/utils';

const categories = ['Todas', 'Tecnología', 'Moda', 'Hogar', 'Deportes', 'Accesorios'];
const brands = ['Chronos', 'Sonic', 'Polaris', 'TechPro', 'Samsung', 'Apple'];

const FilterSidebar = () => {
  const [priceRange, setPriceRange] = useState([0, 5000000]);

  return (
    <aside className="space-y-8 h-fit sticky top-32">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input 
          type="text" 
          placeholder="Buscar productos..."
          className="w-full bg-white border border-slate-200 rounded-2xl py-3 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
        />
      </div>

      {/* Categories */}
      <div>
        <h4 class="text-sm font-black text-slate-900 uppercase tracking-widest mb-4 flex items-center justify-between">
          Categorías
          <ChevronDown className="w-4 h-4 text-slate-300" />
        </h4>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label key={cat} className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center w-5 h-5 rounded-md border-2 border-slate-200 group-hover:border-emerald-500 transition-all">
                <input type="checkbox" className="peer absolute inset-0 opacity-0 cursor-pointer" />
                <div className="w-2.5 h-2.5 bg-emerald-500 rounded-sm opacity-0 peer-checked:opacity-100 transition-all"></div>
              </div>
              <span className="text-sm font-bold text-slate-500 group-hover:text-slate-900 transition-colors">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 class="text-sm font-black text-slate-900 uppercase tracking-widest mb-6">Precio (COP)</h4>
        <div className="px-2">
          <input 
            type="range" 
            min="0" 
            max="5000000" 
            step="100000"
            className="w-full accent-emerald-600 mb-4"
          />
          <div className="flex justify-between text-xs font-black text-slate-400">
            <span>$0</span>
            <span>$5.000.000+</span>
          </div>
        </div>
      </div>

      {/* Brands */}
      <div>
        <h4 class="text-sm font-black text-slate-900 uppercase tracking-widest mb-4">Marcas</h4>
        <div className="flex flex-wrap gap-2">
          {brands.map((brand) => (
            <button key={brand} className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-500 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50 transition-all">
              {brand}
            </button>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h4 class="text-sm font-black text-slate-900 uppercase tracking-widest mb-4">Calificación</h4>
        <div className="space-y-2">
          {[5, 4, 3].map((star) => (
            <label key={star} className="flex items-center gap-3 cursor-pointer group">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={cn("w-4 h-4", i < star ? "fill-orange-400 text-orange-400" : "text-slate-200")} />
                ))}
              </div>
              <span className="text-xs font-bold text-slate-400">o más</span>
            </label>
          ))}
        </div>
      </div>

      <button className="btn-primary-marketify w-full py-4 text-sm mt-4">
        Aplicar Filtros
      </button>
    </aside>
  );
};

export default FilterSidebar;
