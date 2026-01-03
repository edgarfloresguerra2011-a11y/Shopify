
import React from 'react';
import { CartItem, ViewMode } from '../types';

interface CartProps {
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQty: (id: string, delta: number) => void;
  onNavigate: (view: ViewMode) => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({ items, onRemove, onUpdateQty, onNavigate, onCheckout }) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 150 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-40 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner">
          <span className="material-symbols-outlined !text-4xl text-gray-200">shopping_bag</span>
        </div>
        <h2 className="text-4xl font-display font-bold mb-6">Tu carrito está vacío</h2>
        <p className="text-gray-500 mb-12 max-w-sm mx-auto text-lg">Parece que aún no has encontrado nada para ti. ¡Explora nuestras colecciones!</p>
        <button 
          onClick={() => onNavigate(ViewMode.SHOP)}
          className="bg-primary-600 text-white font-black px-12 py-5 rounded-full shadow-2xl shadow-primary-500/30 hover:scale-105 transition-all active:scale-95"
        >
          Explorar Productos
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <h1 className="text-5xl font-display font-bold mb-4 tracking-tight">Tu Carrito</h1>
          <p className="text-gray-500 text-lg font-medium">Tienes {items.length} artículos en tu selección.</p>
        </div>
        <button 
          onClick={() => onNavigate(ViewMode.SHOP)}
          className="text-primary-600 font-black hover:underline underline-offset-[12px] decoration-2"
        >
          Continuar Comprando
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Listado de Productos */}
        <div className="lg:col-span-8 space-y-8">
          {items.map(item => (
            <div key={item.id} className="flex flex-col sm:flex-row gap-8 p-8 bg-white rounded-[2.5rem] border border-gray-50 shadow-sm relative group hover:shadow-xl transition-all duration-500">
              <div className="h-40 w-full sm:w-40 rounded-3xl overflow-hidden bg-gray-50 flex-shrink-0 cursor-pointer" onClick={() => onNavigate(ViewMode.PRODUCT)}>
                <img src={item.image} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
              </div>
              <div className="flex-grow flex flex-col justify-between py-2">
                <div>
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="font-display font-bold text-2xl">{item.name}</h3>
                    <button 
                      onClick={() => onRemove(item.id)}
                      className="text-gray-300 hover:text-red-500 transition-colors p-2"
                    >
                      <span className="material-symbols-outlined !text-[22px]">delete</span>
                    </button>
                  </div>
                  <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mt-1 mb-6">{item.category}</p>
                </div>
                
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center bg-gray-50 rounded-2xl p-1 border border-gray-100">
                    <button onClick={() => onUpdateQty(item.id, -1)} className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-xl transition-all"><span className="material-symbols-outlined !text-sm">remove</span></button>
                    <span className="w-10 text-center font-black text-sm">{item.quantity}</span>
                    <button onClick={() => onUpdateQty(item.id, 1)} className="w-10 h-10 flex items-center justify-center hover:bg-white rounded-xl transition-all"><span className="material-symbols-outlined !text-sm">add</span></button>
                  </div>
                  <div className="text-right">
                    <p className="font-display font-bold text-2xl tracking-tighter">${item.price * item.quantity}.00</p>
                    {item.quantity > 1 && <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">${item.price}.00 c/u</p>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Resumen Shopify Checkout */}
        <div className="lg:col-span-4 lg:sticky lg:top-28">
          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-[0_40px_100px_rgba(0,0,0,0.05)]">
            <h2 className="text-3xl font-display font-bold mb-10">Resumen</h2>
            
            <div className="space-y-5 mb-10 pb-10 border-b border-gray-100">
              <div className="flex justify-between text-gray-500 font-bold">
                <span>Subtotal</span>
                <span className="text-gray-900">${subtotal}.00</span>
              </div>
              <div className="flex justify-between text-gray-500 font-bold">
                <span>Envío</span>
                <span className={shipping === 0 ? 'text-green-600' : 'text-gray-900'}>{shipping === 0 ? 'Gratis' : `$${shipping}.00`}</span>
              </div>
              <div className="flex justify-between text-gray-500 font-bold">
                <span>Impuestos (8%)</span>
                <span className="text-gray-900">${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between items-baseline mb-12">
              <span className="text-2xl font-bold">Total</span>
              <div className="text-right">
                <span className="text-5xl font-display font-bold tracking-tighter text-primary-600">${total.toFixed(2)}</span>
                <p className="text-[10px] font-black text-gray-400 tracking-[0.2em] uppercase mt-2">USD</p>
              </div>
            </div>

            <div className="space-y-4">
              <button 
                onClick={onCheckout}
                className="w-full bg-gray-900 hover:bg-primary-600 text-white font-black py-6 rounded-3xl shadow-2xl transition-all flex items-center justify-center gap-3 active:scale-[0.98] group"
              >
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">lock</span>
                Finalizar Compra
              </button>
              
              <div className="grid grid-cols-2 gap-4">
                <button className="bg-[#ffc439] h-14 rounded-2xl flex items-center justify-center hover:opacity-90 shadow-sm">
                  <span className="text-[#003087] font-black italic text-xl">PayPal</span>
                </button>
                <button className="bg-black h-14 rounded-2xl flex items-center justify-center hover:opacity-90 shadow-sm">
                  <span className="text-white font-black text-lg">Apple Pay</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
