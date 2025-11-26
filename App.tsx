import React, { useState, useEffect } from 'react';
import { ShoppingBag, Coffee, ArrowRight, Star, Clock, MapPin, X, Menu as MenuIcon, ChevronRight, Instagram, Twitter, MessageCircle, Mail } from 'lucide-react';
import { MenuItemData, ReviewData, NavOverlayProps, MarqueeProps } from './types';

// --- Constants & Data ---

const THEME = {
  orange: '#FF5E1A',
  black: '#121212',
  offWhite: '#F3F3F3',
  gray: '#2A2A2A'
};

const MENU_ITEMS: MenuItemData[] = [
  { name: "Nitro Cold Brew", price: "5.50", desc: "Velvety smooth, nitrogen-infused cold brew steeped for 24 hours.", tags: ["Signature", "Cold"], image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&q=80&w=600" },
  { name: "Orange Zest Espresso", price: "4.75", desc: "Double shot espresso with a twist of candied orange peel.", tags: ["Hot", "Citrus"], image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600" },
  { name: "Charcoal Latte", price: "6.00", desc: "Activated charcoal, vanilla bean syrup, and oat milk art.", tags: ["Wellness", "Vegan"], image: "https://images.unsplash.com/photo-1461023058943-48dbf1399f98?auto=format&fit=crop&q=80&w=600" },
  { name: "Spicy Mocha", price: "5.25", desc: "Dark chocolate, cayenne pepper, cinnamon, and espresso.", tags: ["Spicy", "Hot"], image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&q=80&w=600" },
  { name: "Sourdough Toast", price: "8.00", desc: "Thick cut, avocado smash, chili flakes, and poached egg.", tags: ["Food", "Savory"], image: "https://images.unsplash.com/photo-1525351484163-7529414395d8?auto=format&fit=crop&q=80&w=600" },
  { name: "Croissant Cube", price: "4.50", desc: "Modern flaky pastry cube filled with matcha cream.", tags: ["Pastry", "Sweet"], image: "https://images.unsplash.com/photo-1555507036-ab1f40388085?auto=format&fit=crop&q=80&w=600" },
];

const REVIEWS: ReviewData[] = [
  { id: 1, author: "Alex D.", handle: "@alex_eats", text: "The vibe is unmatched. It's like if brutalism tasted like dark chocolate.", rating: 5 },
  { id: 2, author: "Sarah J.", handle: "@sarah.brew", text: "Finally a place that doesn't serve weak bean water. The Nitro is serious business.", rating: 5 },
  { id: 3, author: "Marcus K.", handle: "@mk_design", text: "Came for the aesthetics, stayed for the Orange Zest Espresso. 10/10.", rating: 4 },
];

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1511537632536-b7a4896848a5?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800",
];

// --- Sub-Components ---

const HandLogo = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Stylized OK Hand Sign */}
    <path 
      d="M20 90 L20 60 C20 50 25 40 35 40 L35 70" 
      stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"
    />
    <path 
      d="M45 75 L45 20 L55 20 L55 75" 
      stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"
    />
    <path 
      d="M65 75 L65 10 L75 10 L75 75" 
      stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"
    />
    <path 
      d="M85 80 L85 25 L95 25 L95 85" 
      stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"
    />
    <circle cx="35" cy="45" r="12" stroke="currentColor" strokeWidth="8" />
  </svg>
);

const Marquee: React.FC<MarqueeProps> = ({ text, direction = 'left', className = "" }) => (
  <div className={`relative flex overflow-hidden py-3 text-black font-black uppercase tracking-widest border-y-2 border-black ${className}`}>
    <div className={`flex gap-8 ${direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse'}`}>
      {[...Array(10)].map((_, i) => (
        <span key={i} className="flex items-center gap-8 text-lg sm:text-xl whitespace-nowrap">
          {text} <Star className="w-4 h-4 fill-black" />
        </span>
      ))}
    </div>
    <div className={`absolute top-3 flex gap-8 ${direction === 'left' ? 'animate-marquee2' : 'animate-marquee2-reverse'}`}>
      {[...Array(10)].map((_, i) => (
        <span key={i} className="flex items-center gap-8 text-lg sm:text-xl whitespace-nowrap">
          {text} <Star className="w-4 h-4 fill-black" />
        </span>
      ))}
    </div>
  </div>
);

const MenuItem: React.FC<MenuItemData> = ({ name, price, desc, tags, image }) => (
  <div className="group relative bg-[#1A1A1A] border border-[#333] hover:border-[#FF5E1A] transition-all duration-300 overflow-hidden flex flex-col h-full">
    <div className="h-64 overflow-hidden relative">
      <img src={image} alt={name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
      <div className="absolute top-0 right-0 bg-[#FF5E1A] text-black px-4 py-2 text-lg font-black border-l border-b border-black">
        ${price}
      </div>
    </div>
    <div className="p-6 flex flex-col flex-grow relative">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-2xl font-bold text-white uppercase font-serif tracking-wide group-hover:text-[#FF5E1A] transition-colors">{name}</h3>
      </div>
      <p className="text-gray-400 text-sm mb-6 line-clamp-2 flex-grow">{desc}</p>
      
      <div className="flex items-center justify-between mt-auto">
        <div className="flex gap-2">
            {tags.map(tag => (
            <span key={tag} className="text-[10px] uppercase font-bold px-2 py-1 bg-[#2A2A2A] text-gray-300 border border-gray-700">
                {tag}
            </span>
            ))}
        </div>
        <button className="w-10 h-10 bg-white text-black flex items-center justify-center hover:bg-[#FF5E1A] transition-colors">
             <ArrowRight size={20} className="-rotate-45" />
        </button>
      </div>
    </div>
  </div>
);

const NavOverlay: React.FC<NavOverlayProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 bg-[#FF5E1A] flex flex-col items-center justify-center animate-fadeIn">
      <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-black text-white rounded-full hover:rotate-90 transition-transform">
        <X size={32} />
      </button>
      <nav className="flex flex-col gap-6 text-center">
        {['Menu', 'About', 'Locations', 'Reviews', 'Merch'].map((item) => (
          <a 
            key={item} 
            href={`#${item.toLowerCase()}`} 
            onClick={onClose} 
            className="text-5xl md:text-8xl font-black text-black uppercase hover:text-white transition-all hover:scale-110 hover:italic tracking-tighter"
          >
            {item}
          </a>
        ))}
      </nav>
      <div className="absolute bottom-10 text-black font-mono font-bold tracking-widest">
        EST. 2024 • GILLBET CAFE
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#121212] text-white font-sans selection:bg-[#FF5E1A] selection:text-black">
      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-100%); } }
        @keyframes marquee2 { 0% { transform: translateX(100%); } 100% { transform: translateX(0); } }
        @keyframes marquee-reverse { 0% { transform: translateX(-100%); } 100% { transform: translateX(0); } }
        @keyframes marquee2-reverse { 0% { transform: translateX(0); } 100% { transform: translateX(100%); } }
        .animate-marquee { animation: marquee 25s linear infinite; }
        .animate-marquee2 { animation: marquee2 25s linear infinite; }
        .animate-marquee-reverse { animation: marquee-reverse 25s linear infinite; }
        .animate-marquee2-reverse { animation: marquee2-reverse 25s linear infinite; }
      `}</style>

      <NavOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Header */}
      <header className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled ? 'bg-[#121212]/95 backdrop-blur-md py-4 border-b border-[#333]' : 'py-8 bg-transparent'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-[#FF5E1A] rounded-full flex items-center justify-center text-black group-hover:scale-110 transition-transform">
              <HandLogo className="w-8 h-8 text-black" />
            </div>
            <span className="font-black text-2xl tracking-tighter uppercase group-hover:text-[#FF5E1A] transition-colors">Gillbet</span>
          </a>
          
          <div className="flex items-center gap-8">
            <button className="hidden md:flex items-center gap-2 text-sm font-bold uppercase hover:text-[#FF5E1A] transition-colors tracking-widest">
              <ShoppingBag size={18} /> Cart (0)
            </button>
            <button onClick={() => setIsMenuOpen(true)} className="flex items-center gap-3 text-sm font-bold uppercase hover:text-[#FF5E1A] transition-colors tracking-widest group">
              <span className="hidden md:block">Menu</span>
              <div className="p-2 bg-white text-black rounded-full group-hover:bg-[#FF5E1A] transition-colors">
                <MenuIcon size={20} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden border-b border-[#222]">
        <div className="absolute top-0 right-0 w-3/4 h-full bg-gradient-to-l from-[#1a1a1a] to-transparent pointer-events-none"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-1/4 left-10 w-32 h-32 border-4 border-[#333] rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-64 h-64 border border-[#333] rotate-45"></div>

        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-10">
            <div className="flex items-center gap-4">
               <div className="h-[2px] w-12 bg-[#FF5E1A]"></div>
               <span className="text-[#FF5E1A] font-bold uppercase tracking-widest text-sm">Est. 2024 • Downtown</span>
            </div>
            
            <h1 className="text-7xl md:text-9xl font-black leading-[0.85] tracking-tighter">
              WAKE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5E1A] to-white">UP &</span><br />
              SMELL<br />
              THE <span className="italic font-serif">ART.</span>
            </h1>
            
            <p className="text-gray-400 text-xl max-w-md leading-relaxed">
              We don't serve average. We serve the kind of coffee that makes you question why you ever drank anything else.
            </p>
            
            <div className="flex flex-wrap gap-6 pt-4">
              <button className="px-10 py-5 bg-[#FF5E1A] text-black font-black uppercase hover:bg-white transition-all transform hover:-translate-y-1 shadow-[8px_8px_0px_0px_#FFF]">
                Order Pickup
              </button>
              <button className="px-10 py-5 bg-transparent border-2 border-white text-white font-black uppercase hover:bg-white hover:text-black transition-all">
                View Menu
              </button>
            </div>
          </div>
          
          <div className="relative hidden md:block">
            <div className="relative z-10">
               <img 
                 src="https://images.unsplash.com/photo-1512568400610-62da28bc8a13?auto=format&fit=crop&q=80&w=800" 
                 alt="Latte Art" 
                 className="w-full max-w-md mx-auto grayscale contrast-125 brightness-90 hover:grayscale-0 transition-all duration-700 border-8 border-white shadow-[20px_20px_0px_0px_#FF5E1A] rotate-3 hover:rotate-0"
               />
            </div>
            
             <div className="absolute -bottom-16 -left-16 bg-[#FF5E1A] text-black p-8 font-black text-4xl rotate-[-6deg] z-20 border-4 border-black">
                100% <br/> ORGANIC
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 animate-bounce">
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <ArrowRight className="rotate-90" />
        </div>
      </section>

      <Marquee text="FRESH BREW • NO NONSENSE • GILLBET CAFE • OPEN 24/7 •" className="bg-[#FF5E1A] text-black" />

      {/* About / Philosophy Section */}
      <section id="about" className="py-24 bg-[#0F0F0F] relative overflow-hidden">
        <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
                <div className="relative">
                    <div className="absolute inset-0 bg-[#FF5E1A] translate-x-4 translate-y-4 border-2 border-white/20"></div>
                    <img 
                        src="https://images.unsplash.com/photo-1442975631115-c4f7b05b8a2c?auto=format&fit=crop&q=80&w=800" 
                        alt="Coffee Beans" 
                        className="relative z-10 w-full h-[500px] object-cover grayscale contrast-125 border-2 border-white/20"
                    />
                </div>
                <div className="space-y-8">
                    <h2 className="text-5xl md:text-7xl font-black uppercase leading-none">
                        Not Just <br/>
                        <span className="text-[#FF5E1A]">Bean Water.</span>
                    </h2>
                    <p className="text-xl text-gray-300 leading-relaxed font-light">
                        Gillbet was born from a frustration with the bland. We believe coffee should punch you in the face (metaphorically) and hug your soul (literally). 
                    </p>
                    <p className="text-gray-400">
                        Sourced from high-altitude farms, roasted in small batches, and served with an attitude. Our baristas are artists, our machines are precision instruments, and our vibe is non-negotiable.
                    </p>
                    <div className="flex gap-4 pt-4">
                        <div className="text-center px-6 py-4 border border-[#333] hover:border-[#FF5E1A] transition-colors">
                            <h4 className="text-3xl font-black text-[#FF5E1A]">15+</h4>
                            <span className="text-xs uppercase tracking-widest text-gray-400">Origins</span>
                        </div>
                        <div className="text-center px-6 py-4 border border-[#333] hover:border-[#FF5E1A] transition-colors">
                            <h4 className="text-3xl font-black text-[#FF5E1A]">24h</h4>
                            <span className="text-xs uppercase tracking-widest text-gray-400">Roasting</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 bg-[#121212]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <h2 className="text-5xl md:text-6xl font-black uppercase mb-4">The <span className="text-[#FF5E1A] italic font-serif">Goods</span></h2>
              <p className="text-gray-400 max-w-sm">Carefully curated menu for the discerning palate. No syrups, just flavor.</p>
            </div>
            <div className="flex gap-0 border border-[#333]">
               <button className="px-8 py-3 bg-[#FF5E1A] text-black font-bold uppercase hover:bg-white transition-colors">All</button>
               <button className="px-8 py-3 bg-transparent text-gray-400 hover:text-white font-bold uppercase border-l border-[#333] transition-colors">Coffee</button>
               <button className="px-8 py-3 bg-transparent text-gray-400 hover:text-white font-bold uppercase border-l border-[#333] transition-colors">Eats</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MENU_ITEMS.map((item, idx) => (
              <MenuItem key={idx} {...item} />
            ))}
          </div>
          
          <div className="mt-20 flex justify-center">
             <a href="#" className="group flex flex-col items-center gap-2">
                <span className="text-2xl font-black uppercase tracking-widest group-hover:text-[#FF5E1A] transition-colors">View Full Menu</span>
                <div className="w-full h-1 bg-[#333] group-hover:bg-[#FF5E1A] transition-colors duration-500"></div>
             </a>
          </div>
        </div>
      </section>

      <Marquee text="THE VIBE IS IMMACULATE • TASTE THE DIFFERENCE •" direction="right" className="bg-white text-black border-none" />

      {/* Reviews Section */}
      <section id="reviews" className="py-24 bg-[#FF5E1A] text-black overflow-hidden">
        <div className="container mx-auto px-6 mb-12 flex justify-between items-end">
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter">Street <br/> Talk</h2>
            <div className="hidden md:block">
                <Star className="w-24 h-24 stroke-1 fill-transparent stroke-black rotate-12" />
            </div>
        </div>
        
        <div className="flex overflow-x-auto gap-8 pb-12 px-6 scrollbar-hide snap-x">
            {REVIEWS.map((review) => (
                <div key={review.id} className="min-w-[350px] md:min-w-[450px] bg-black text-white p-8 md:p-12 snap-center border-4 border-black shadow-[12px_12px_0px_0px_rgba(255,255,255,0.2)]">
                    <div className="flex gap-1 mb-6">
                        {[...Array(review.rating)].map((_, i) => <Star key={i} className="w-5 h-5 fill-[#FF5E1A] text-[#FF5E1A]" />)}
                    </div>
                    <p className="text-xl md:text-2xl font-bold leading-tight mb-8">"{review.text}"</p>
                    <div className="flex items-center gap-4 border-t border-gray-800 pt-6">
                        <div className="w-10 h-10 bg-[#FF5E1A] rounded-full"></div>
                        <div>
                            <p className="font-bold uppercase">{review.author}</p>
                            <p className="text-xs text-gray-500">{review.handle}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </section>

      {/* Gallery Section */}
      <section className="grid grid-cols-2 md:grid-cols-4 h-[400px] md:h-[500px]">
        {GALLERY_IMAGES.map((src, i) => (
            <div key={i} className="relative group overflow-hidden border border-black">
                <img src={src} alt="Gallery" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Instagram className="text-white w-8 h-8" />
                </div>
            </div>
        ))}
      </section>

      {/* Location & Newsletter */}
      <section className="py-0 bg-white text-black">
        <div className="grid md:grid-cols-2">
          {/* Location */}
          <div className="p-12 md:p-24 flex flex-col justify-center bg-[#F3F3F3] text-black border-b md:border-b-0 md:border-r border-black">
            <div className="flex items-center gap-4 mb-8">
                 <div className="p-3 bg-[#FF5E1A] border-2 border-black">
                    <MapPin size={32} />
                 </div>
                 <div className="p-3 bg-white border-2 border-black">
                    <Clock size={32} />
                 </div>
            </div>
            
            <h3 className="text-5xl font-black uppercase mb-8">Find Us</h3>
            
            <div className="space-y-6">
                <div>
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">HQ / Roastery</p>
                    <p className="text-2xl font-bold">123 Orange St, Downtown</p>
                </div>
                <div>
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Hours</p>
                    <p className="text-xl font-mono">Mon-Fri: 7am - 9pm</p>
                    <p className="text-xl font-mono">Sat-Sun: 8am - 10pm</p>
                </div>
            </div>
            
            <button className="mt-10 w-fit bg-black text-white px-8 py-4 font-bold uppercase hover:bg-[#FF5E1A] hover:text-black transition-colors flex items-center gap-3">
              Get Directions <ArrowRight size={18} />
            </button>
          </div>

          {/* Newsletter */}
          <div className="p-12 md:p-24 flex flex-col justify-center bg-white text-black relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
                <Mail size={200} />
             </div>
            <h3 className="text-5xl font-black uppercase mb-4 relative z-10">Join The <span className="text-[#FF5E1A]">Cult</span></h3>
            <p className="text-lg mb-8 relative z-10 font-medium">Get secret menu items, invite-only event access, and free shipping on beans.</p>
            
            <form className="relative z-10 space-y-4" onSubmit={(e) => e.preventDefault()}>
                <input 
                    type="email" 
                    placeholder="ENTER YOUR EMAIL" 
                    className="w-full bg-[#f0f0f0] border-2 border-black p-4 text-black font-bold placeholder:text-gray-400 focus:outline-none focus:border-[#FF5E1A]"
                />
                <button className="w-full bg-[#FF5E1A] border-2 border-black text-black py-4 font-black uppercase hover:bg-black hover:text-[#FF5E1A] hover:border-black transition-all shadow-[4px_4px_0px_0px_#000]">
                    Subscribe
                </button>
            </form>
            <p className="text-xs text-gray-500 mt-4 relative z-10 uppercase tracking-wider">No spam. Only caffeine.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] text-white pt-24 pb-12 border-t border-[#222]">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start mb-20 gap-10">
            <div className="max-w-xl">
              <h2 className="text-[10vw] md:text-[8vw] leading-none font-black text-[#222] uppercase select-none hover:text-[#333] transition-colors">Gillbet</h2>
              <p className="text-gray-500 mt-4 text-lg">
                Crafting the future of coffee culture one cup at a time. Unapologetically bold.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-12 md:gap-24 text-right md:text-left">
              <div className="space-y-6">
                <h4 className="text-[#FF5E1A] font-bold uppercase tracking-widest text-sm border-b border-[#333] pb-2">Socials</h4>
                <ul className="space-y-4 text-gray-400 font-medium">
                  <li className="hover:text-white cursor-pointer flex items-center gap-2 md:justify-start justify-end"><Instagram size={18}/> Instagram</li>
                  <li className="hover:text-white cursor-pointer flex items-center gap-2 md:justify-start justify-end"><Twitter size={18}/> Twitter</li>
                  <li className="hover:text-white cursor-pointer flex items-center gap-2 md:justify-start justify-end"><MessageCircle size={18}/> TikTok</li>
                </ul>
              </div>
              <div className="space-y-6">
                <h4 className="text-[#FF5E1A] font-bold uppercase tracking-widest text-sm border-b border-[#333] pb-2">Company</h4>
                <ul className="space-y-4 text-gray-400 font-medium">
                  <li className="hover:text-white cursor-pointer">Our Story</li>
                  <li className="hover:text-white cursor-pointer">Careers</li>
                  <li className="hover:text-white cursor-pointer">Contact</li>
                  <li className="hover:text-white cursor-pointer">Legal</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 uppercase tracking-widest border-t border-[#222] pt-8">
             <p>&copy; 2024 Gillbet Cafe. All rights reserved.</p>
             <div className="flex items-center gap-1 mt-4 md:mt-0">
                <span>Designed with</span> <Star className="w-3 h-3 fill-[#FF5E1A] text-none" /> <span>and Caffeine.</span>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
}