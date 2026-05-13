import React from 'react';
import { ShoppingCart, Star, Eye, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCartStore } from '../store/useCartStore';
import { cn } from '../lib/utils';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      ...product,
      quantity: 1
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500"
    >
      <a href={`/product/${product.id}`} className="block relative aspect-[4/5] overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Badges */}
        <div class="absolute top-4 left-4 flex flex-col gap-2">
          <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-900 border border-white/50 shadow-sm">
            {product.category}
          </span>
        </div>

        {/* Quick Actions */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300">
          <button className="w-10 h-10 rounded-full bg-white text-slate-600 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all shadow-lg">
            <Heart className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-full bg-white text-slate-600 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all shadow-lg">
            <Eye className="w-5 h-5" />
          </button>
        </div>

        {/* Add to Cart Overlay */}
        <div className="absolute inset-x-4 bottom-4 translate-y-12 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <button 
            onClick={handleAddToCart}
            className="w-full btn-primary-marketify py-3 shadow-xl shadow-emerald-500/20"
          >
            <ShoppingCart className="w-4 h-4" />
            Añadir al Carrito
          </button>
        </div>
      </a>

      <div className="p-6 space-y-3">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={cn("w-3 h-3", i < product.rating ? "fill-orange-400 text-orange-400" : "fill-slate-100 text-slate-100")} 
            />
          ))}
          <span className="text-[10px] text-slate-400 font-bold ml-1">({product.reviews})</span>
        </div>
        
        <h3 className="font-bold text-slate-900 line-clamp-1 group-hover:text-emerald-700 transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between">
          <p className="text-xl font-black text-slate-900 tracking-tighter">
            ${product.price.toLocaleString('es-CO')}
          </p>
          <span className="text-[10px] text-emerald-600 font-black uppercase tracking-widest bg-emerald-50 px-2 py-1 rounded-md">
            En Stock
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
