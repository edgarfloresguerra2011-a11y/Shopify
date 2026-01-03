
import React, { useState } from 'react';
import { Product, ViewMode } from '../types';

interface ProductDetailProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  onNavigate: (view: ViewMode) => void;
  onCheckout: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onAddToCart, onNavigate, onCheckout }) => {
  const [qty, setQty] = useState(1);
  const [selectedColor, setSelectedColor] = useState('Obsidian');

  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-12 md:py-20 animate-in fade-in duration-700">
      <nav className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-12">
        <button onClick={() => onNavigate(ViewMode.HOME)} className="hover:text-primary-600 transition-colors">Inicio</button>
        <span className="text-gray-200">/</span>
        <button onClick={() => onNavigate(ViewMode.SHOP)} className="hover:text-primary-600 transition-colors">{product.category}</button>
        <span className="text-gray-200">/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
        {/* Galería Shopify Style */}
        <div className="flex-1 space-y-6">
          <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-gray-50 shadow-sm relative group">
            <img src={product.image} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
            {product.isBestSeller && (
              <div className="absolute top-8 left-8 bg-black text-white px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-widest shadow-2xl">Más Vendido</div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="aspect-square rounded-3xl overflow-hidden bg-gray-100"><img src="https://picsum.photos/seed/pdetail1/600/600" className="w-full h-full object-cover" /></div>
            <div className="aspect-square rounded-3xl overflow-hidden bg-gray-100"><img src="https://picsum.photos/seed/pdetail2/600/600" className="w-full h-full object-cover" /></div>
          </div>
        </div>

        {/* Configuración de Producto */}
        <div className="w-full lg:w-[500px] flex flex-col gap-10">
          <div className="sticky top-28">
            <div className="mb-6 flex items-center gap-3">
              <span className="bg-green-100 text-green-700 text-[10px] font-black uppercase tracking-[0.1em] px-4 py-1.5 rounded-full">En Stock</span>
              <span className="text-gray-400 text-xs font-bold flex items-center gap-1"><span className="material-symbols-outlined !text-sm">local_shipping</span> Envío gratuito</span>
            </div>
            
            <h1 className="font-display font-bold text-5xl md:text-6xl mb-6 leading-tight tracking-tight">{product.name}</h1>
            <p className="text-gray-500 text-lg leading-relaxed mb-10">{product.description} Experimenta la convergencia perfecta entre artesanía y tecnología inteligente.</p>

            <div className="flex items-baseline gap-6 mb-12 pb-12 border-b border-gray-100">
              <span className="text-5xl font-display font-bold tracking-tighter">${product.price}.00</span>
              {product.originalPrice && <span className="text-2xl text-gray-300 line-through tracking-tighter">${product.originalPrice}.00</span>}
            </div>

            <div className="space-y-10">
              {/* Selector de Color */}
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-gray-900 block mb-6">Variante: {selectedColor}</label>
                <div className="flex gap-5">
                  {['Obsidian', 'Silver', 'Arctic'].map((color, i) => (
                    <button 
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-14 h-14 rounded-full border-2 transition-all p-1 ${selectedColor === color ? 'border-primary-600 scale-110 shadow-xl' : 'border-transparent'}`}
                    >
                      <div className={`w-full h-full rounded-full`} style={{ backgroundColor: i === 0 ? '#111' : i === 1 ? '#cbd5e1' : '#f8fafc' }}></div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Controles de Compra */}
              <div className="flex flex-col gap-4">
                <div className="flex gap-4 items-stretch">
                  <div className="flex items-center bg-gray-100 rounded-3xl p-1 h-16 w-40">
                    <button onClick={() => setQty(q => Math.max(1, q-1))} className="w-12 h-full flex items-center justify-center hover:bg-white rounded-2xl transition-all"><span className="material-symbols-outlined">remove</span></button>
                    <input type="number" value={qty} className="w-12 text-center bg-transparent border-none font-black text-lg" readOnly />
                    <button onClick={() => setQty(q => q+1)} className="w-12 h-full flex items-center justify-center hover:bg-white rounded-2xl transition-all"><span className="material-symbols-outlined">add</span></button>
                  </div>
                  <button 
                    onClick={() => onAddToCart(product, qty)}
                    className="flex-1 bg-gray-900 hover:bg-primary-600 text-white font-black rounded-3xl shadow-2xl transition-all active:scale-[0.98] h-16"
                  >
                    Añadir al Carrito
                  </button>
                </div>

                <button 
                  onClick={onCheckout}
                  className="w-full bg-[#5a31f4] hover:bg-[#4d27da] text-white font-black py-5 rounded-3xl transition-all flex items-center justify-center gap-3 shadow-xl h-16"
                >
                  Comprar con <span className="italic tracking-tighter text-2xl font-black">Shop Pay</span>
                </button>
              </div>

              {/* Beneficios */}
              <div className="grid grid-cols-1 gap-4 p-8 bg-gray-50 rounded-[2rem] border border-gray-100">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-primary-600">verified_user</span>
                  <span className="text-sm font-bold">Garantía oficial de 2 años</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-primary-600">published_with_changes</span>
                  <span className="text-sm font-bold">Devoluciones gratuitas (30 días)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
