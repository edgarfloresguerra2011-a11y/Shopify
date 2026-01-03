
import React, { useMemo } from 'react';
import { Product, Language } from '../types';

interface ShopProps {
  products: Product[];
  activeCategory: string;
  onCategoryChange: (c: string) => void;
  wishlist: string[];
  onProductSelect: (p: Product) => void;
  onAddToCart: (p: Product) => void;
  onToggleWishlist: (id: string) => void;
  language: Language;
}

const Shop: React.FC<ShopProps> = ({ 
  products, 
  activeCategory, 
  onCategoryChange,
  wishlist,
  onProductSelect, 
  onAddToCart, 
  onToggleWishlist,
  language
}) => {
  const categories = [
    { name: 'All', ES: 'Todos', EN: 'All', FR: 'Tous', DE: 'Alle', ZH: '全部' },
    { name: 'Lighting & Decor', ES: 'Iluminación', EN: 'Lighting', FR: 'Éclairage', DE: 'Beleuchtung', ZH: '照明' },
    { name: 'Home Audio', ES: 'Audio', EN: 'Audio', FR: 'Audio', DE: 'Audio', ZH: '音频' },
    { name: 'Wearables', ES: 'Wearables', EN: 'Wearables', FR: 'Wearables', DE: 'Wearables', ZH: '穿戴' },
    { name: 'Sale', ES: 'Ofertas', EN: 'Sale', FR: 'Promos', DE: 'Angebote', ZH: '特价' }
  ];

  return (
    <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row min-h-screen">
      <aside className="w-full lg:w-80 p-10 border-r border-gray-100">
        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-8">Categorías</h3>
        <div className="flex lg:flex-col gap-2 overflow-x-auto pb-4 lg:pb-0">
          {categories.map(c => (
            <button 
              key={c.name}
              onClick={() => onCategoryChange(c.name)}
              className={`whitespace-nowrap px-6 py-3 rounded-2xl text-xs font-bold transition-all ${activeCategory === c.name ? 'bg-black text-white shadow-xl scale-105' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
            >
              {c[language]}
            </button>
          ))}
        </div>
      </aside>

      <main className="flex-1 p-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-12">
          {products.map(p => (
            <div key={p.id} className="group relative bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500">
              <div className="aspect-[4/5] overflow-hidden bg-gray-50 cursor-pointer" onClick={() => onProductSelect(p)}>
                <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <button 
                  onClick={(e) => { e.stopPropagation(); onToggleWishlist(p.id); }}
                  className={`absolute top-6 right-6 p-3 rounded-full shadow-xl transition-all ${wishlist.includes(p.id) ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-400'}`}
                >
                  <span className={`material-symbols-outlined !text-xl ${wishlist.includes(p.id) ? 'fill-current' : ''}`}>favorite</span>
                </button>
                <div className="absolute inset-x-6 bottom-6 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <button onClick={(e) => { e.stopPropagation(); onAddToCart(p); }} className="w-full bg-black text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl">
                    Comprar Ahora
                  </button>
                </div>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">{p.brand}</span>
                    <h3 className="font-display font-bold text-xl">{p.name}</h3>
                  </div>
                  <div className="text-right">
                    <p className="font-display font-black text-xl tracking-tighter">${p.price}.00</p>
                    {p.originalPrice && <p className="text-[10px] text-gray-300 line-through tracking-tighter">${p.originalPrice}.00</p>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Shop;
