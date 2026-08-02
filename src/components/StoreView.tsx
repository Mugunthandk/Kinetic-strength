import React, { useState } from 'react';
import { STORE_ITEMS } from '../data/mockData';
import { StoreItem, CartItem } from '../types';
import { ShoppingBag, Star, Plus, Check, Zap, Filter } from 'lucide-react';

interface StoreViewProps {
  cart: CartItem[];
  onAddToCart: (item: StoreItem) => void;
  setIsCartOpen: (open: boolean) => void;
}

export const StoreView: React.FC<StoreViewProps> = ({ cart, onAddToCart, setIsCartOpen }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [addedIds, setAddedIds] = useState<string[]>([]);

  const categories = ['All', 'Supplements', 'Apparel', 'Gear', 'Tech'];

  const filteredItems = selectedCategory === 'All'
    ? STORE_ITEMS
    : STORE_ITEMS.filter(item => item.category === selectedCategory);

  const handleAdd = (item: StoreItem) => {
    onAddToCart(item);
    setAddedIds((prev) => [...prev, item.id]);
    setTimeout(() => {
      setAddedIds((prev) => prev.filter(id => id !== item.id));
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#090909] py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C7FF00]/10 border border-[#C7FF00]/30 text-[#C7FF00] text-xs font-mono-custom font-bold uppercase mb-3">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>KINETIC ATHLETE GEAR & FORMULAS</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white uppercase font-display tracking-tight">
            PERFORMANCE <span className="text-[#C7FF00]">STORE</span>
          </h1>
          <p className="text-sm text-zinc-400 mt-2 max-w-2xl">
            Cold-filtered protein isolates, high-stimulant pre-workouts, 480GSM heavyweight French terry apparel, and biometric sensing hardware.
          </p>
        </div>

        {/* CATEGORIES */}
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all ${
                selectedCategory === cat
                  ? 'bg-[#C7FF00] text-black shadow-md'
                  : 'bg-zinc-900 text-zinc-300 hover:text-white border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* PRODUCTS GRID */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredItems.map((product) => {
          const isJustAdded = addedIds.includes(product.id);

          return (
            <div
              key={product.id}
              className="bg-zinc-900/80 border border-white/10 rounded-2xl overflow-hidden hover:border-[#C7FF00]/50 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* IMAGE */}
                <div className="relative h-64 overflow-hidden bg-zinc-800/20 p-2">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-md text-[10px] font-bold text-[#C7FF00] uppercase border border-[#C7FF00]/30 font-mono-custom">
                    {product.category}
                  </div>

                  <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-md text-xs font-bold text-white flex items-center gap-1 border border-white/10">
                    <Star className="w-3.5 h-3.5 fill-[#C7FF00] text-[#C7FF00]" />
                    <span>{product.rating}</span>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-6">
                  <h3 className="text-lg font-black text-white uppercase font-display group-hover:text-[#C7FF00] transition-colors leading-snug">
                    {product.name}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* FOOTER & BUY BUTTONS */}
              <div className="p-6 pt-0 flex flex-col gap-3 border-t border-white/10 mt-4 pt-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-zinc-400 font-bold block uppercase font-mono-custom">Athletic Price</span>
                    <span className="text-2xl font-black text-[#C7FF00] font-mono-custom">${product.price}</span>
                  </div>

                  <span className="text-[10px] px-2.5 py-1 rounded-md bg-[#C7FF00]/10 text-[#C7FF00] border border-[#C7FF00]/30 font-mono-custom font-bold">
                    IN STOCK • EXPRESS PICKUP
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleAdd(product)}
                    className={`py-3 rounded-xl font-extrabold text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all ${
                      isJustAdded
                        ? 'bg-zinc-800 text-[#C7FF00] border border-[#C7FF00]'
                        : 'bg-zinc-800 hover:bg-zinc-700 text-white border border-white/20'
                    }`}
                  >
                    {isJustAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#C7FF00]" />
                        <span>ADDED</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>ADD TO CART</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      onAddToCart(product);
                      setIsCartOpen(true);
                    }}
                    className="py-3 bg-[#C7FF00] hover:bg-[#b0e600] text-black font-black text-[11px] uppercase tracking-wider rounded-xl transition-all shadow-[0_0_15px_rgba(199,255,0,0.3)] flex items-center justify-center gap-1.5"
                  >
                    <Zap className="w-3.5 h-3.5 fill-black" />
                    <span>BUY NOW</span>
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
