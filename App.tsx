
import React, { useState, useMemo } from 'react';
import { ViewMode, Product, CartItem, Language } from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import InfoPage from './pages/InfoPage';
import GeminiAssistant from './components/GeminiAssistant';

const SHOPIFY_PRODUCTS: Product[] = [
  { id: '1', name: 'Horizon Specs', brand: 'Modern Living', description: 'Gafas de realidad aumentada con montura clásica de acetato.', price: 299, rating: 4.8, reviewsCount: 128, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&q=80&w=800', category: 'Wearables', isNew: true },
  { id: '2', name: 'Lumina Hub', brand: 'Modern Living', description: 'Centro de control inteligente con diseño minimalista.', price: 149, rating: 5, reviewsCount: 84, image: 'https://images.unsplash.com/photo-1558002038-103792e1972d?auto=format&fit=crop&q=80&w=800', category: 'Home Security' },
  { id: '3', name: 'Aura Speaker', brand: 'Modern Living', description: 'Altavoz de alta fidelidad con acabado en cristal templado.', price: 199, rating: 4.5, reviewsCount: 56, image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&q=80&w=800', category: 'Home Audio' },
  { id: '4', name: 'Gradient Lightstrip V2', brand: 'Philips Hue', description: 'Tira LED inteligente con gradiente de color dinámico.', price: 129, rating: 4.8, reviewsCount: 128, image: 'https://images.unsplash.com/photo-1550537687-c91072c4792d?auto=format&fit=crop&q=80&w=800', category: 'Lighting & Decor', isBestSeller: true },
  { id: '5', name: 'A19 Smart Bulb Color', brand: 'LIFX', description: 'Bombilla inteligente con espectro completo de color.', price: 39, originalPrice: 49, rating: 5, reviewsCount: 450, image: 'https://images.unsplash.com/photo-1550985543-f47f38aee65e?auto=format&fit=crop&q=80&w=800', category: 'Lighting & Decor' },
  { id: '6', name: 'Shapes Triangles Kit', brand: 'Nanoleaf', description: 'Paneles de luz modulares triangulares para pared.', price: 199, rating: 4, reviewsCount: 89, image: 'https://images.unsplash.com/photo-1507646227570-511a767468e5?auto=format&fit=crop&q=80&w=800', category: 'Lighting & Decor' },
  { id: '7', name: 'Lyra Floor Lamp', brand: 'Govee', description: 'Lámpara de pie moderna con efectos de iluminación RGBIC.', price: 149, rating: 5, reviewsCount: 214, image: 'https://images.unsplash.com/photo-1513506491745-1d262f3c23e6?auto=format&fit=crop&q=80&w=800', category: 'Lighting & Decor', originalPrice: 179 },
  { id: '8', name: 'Smart Glass Pane', brand: 'Modern Living', description: 'Cristal inteligente con transparencia conmutable.', price: 399, rating: 4.9, reviewsCount: 34, image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800', category: 'Lighting & Decor', isNew: true },
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewMode>(ViewMode.HOME);
  const [language, setLanguage] = useState<Language>('ES');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  const notify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleCategoryNav = (cat: string) => {
    setActiveCategory(cat);
    setSearchQuery('');
    setCurrentView(ViewMode.SHOP);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredProducts = useMemo(() => {
    let list = SHOPIFY_PRODUCTS;
    if (activeCategory === 'Sale') list = list.filter(p => p.originalPrice);
    else if (activeCategory === 'New Arrivals') list = list.filter(p => p.isNew);
    else if (activeCategory === 'Tech') list = list.filter(p => ['Wearables', 'Home Audio', 'Home Security'].includes(p.category));
    else if (activeCategory === 'Home & Living') list = list.filter(p => p.category === 'Lighting & Decor');
    else if (activeCategory !== 'All') list = list.filter(p => p.category.includes(activeCategory));
    
    if (searchQuery) {
      list = list.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return list;
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa] selection:bg-gray-900 selection:text-white">
      {notification && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] bg-gray-900 text-white px-8 py-3 rounded-full shadow-2xl animate-in slide-in-from-top duration-300 font-bold text-xs uppercase tracking-widest border border-white/10">
          {notification}
        </div>
      )}

      <Navbar 
        onNavigate={setCurrentView}
        onCategorySelect={handleCategoryNav}
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
        wishlistCount={wishlist.length}
        onSearch={setSearchQuery}
        language={language}
        onLanguageChange={setLanguage}
      />

      <main className="flex-grow">
        {currentView === ViewMode.HOME && (
          <Home 
            language={language} 
            highlights={SHOPIFY_PRODUCTS.slice(0, 3)} 
            onNavigate={setCurrentView}
            onProductSelect={(p) => { setSelectedProduct(p); setCurrentView(ViewMode.PRODUCT); }}
          />
        )}
        {currentView === ViewMode.SHOP && (
          <Shop 
            products={filteredProducts}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            language={language}
            wishlist={wishlist}
            onToggleWishlist={(id) => setWishlist(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id])}
            onAddToCart={(p) => { 
              setCart(prev => {
                const ext = prev.find(x => x.id === p.id);
                if (ext) return prev.map(x => x.id === p.id ? {...x, quantity: x.quantity + 1} : x);
                return [...prev, {...p, quantity: 1}];
              });
              notify(`${p.name} +1`);
            }}
            onProductSelect={(p) => { setSelectedProduct(p); setCurrentView(ViewMode.PRODUCT); }}
          />
        )}
        {currentView === ViewMode.PRODUCT && selectedProduct && (
          <ProductDetail 
            product={selectedProduct} 
            language={language} 
            onNavigate={setCurrentView}
            onAddToCart={(p, q) => {
              setCart(prev => {
                const ext = prev.find(x => x.id === p.id);
                if (ext) return prev.map(x => x.id === p.id ? {...x, quantity: x.quantity + q} : x);
                return [...prev, {...p, quantity: q}];
              });
              notify(`${p.name} +${q}`);
            }}
            onCheckout={() => { setCart([]); setCurrentView(ViewMode.CHECKOUT_SUCCESS); }}
          />
        )}
        {currentView === ViewMode.CART && (
          <Cart 
            items={cart}
            language={language}
            onUpdateQty={(id, d) => setCart(p => p.map(x => x.id === id ? {...x, quantity: Math.max(1, x.quantity + d)} : x))}
            onRemove={(id) => setCart(p => p.filter(x => x.id !== id))}
            onNavigate={setCurrentView}
            onCheckout={() => { setCart([]); setCurrentView(ViewMode.CHECKOUT_SUCCESS); }}
          />
        )}
        {[ViewMode.STORY, ViewMode.SUSTAINABILITY, ViewMode.PRIVACY, ViewMode.TERMS, ViewMode.SUPPORT].includes(currentView) && (
          <InfoPage view={currentView} language={language} onNavigate={setCurrentView} />
        )}
        {currentView === ViewMode.CHECKOUT_SUCCESS && (
          <div className="py-40 text-center animate-in zoom-in duration-500">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
              <span className="material-symbols-outlined !text-4xl">check_circle</span>
            </div>
            <h1 className="text-5xl font-display font-black mb-6">¡Pedido Confirmado!</h1>
            <p className="text-gray-500 mb-10 max-w-sm mx-auto">Gracias por confiar en Modern Living. Tu pedido está siendo procesado por nuestro sistema inteligente.</p>
            <button onClick={() => setCurrentView(ViewMode.HOME)} className="bg-black text-white px-12 py-4 rounded-full font-bold shadow-xl">Volver al Inicio</button>
          </div>
        )}
      </main>

      <Footer onNavigate={setCurrentView} onCategorySelect={handleCategoryNav} language={language} />

      <button 
        onClick={() => setIsAssistantOpen(true)}
        className="fixed bottom-8 right-8 z-50 bg-black text-white p-5 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all"
      >
        <span className="material-symbols-outlined">auto_awesome</span>
      </button>

      <GeminiAssistant 
        isOpen={isAssistantOpen} 
        onClose={() => setIsAssistantOpen(false)} 
        language={language}
        products={SHOPIFY_PRODUCTS}
        onAddToCart={(id) => {
          const p = SHOPIFY_PRODUCTS.find(x => x.id === id);
          if (p) {
            setCart(prev => {
              const ext = prev.find(x => x.id === p.id);
              if (ext) return prev.map(x => x.id === p.id ? {...x, quantity: x.quantity + 1} : x);
              return [...prev, {...p, quantity: 1}];
            });
            notify(p.name);
          }
        }}
      />
    </div>
  );
};

export default App;
