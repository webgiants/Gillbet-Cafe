import React, { useState, useEffect } from 'react';
import { ShoppingBag, Coffee, ArrowRight, Star, Clock, MapPin, X, Menu as MenuIcon, ChevronRight, Instagram, Twitter, MessageCircle, Phone, Navigation } from 'lucide-react';
import { MenuItemData, ReviewData, NavOverlayProps, MarqueeProps } from './types';

// --- Constants & Data ---

const THEME = {
  orange: '#FF5E1A',
  black: '#121212',
  offWhite: '#F3F3F3',
  gray: '#2A2A2A'
};

const SIGNATURE_ITEMS: MenuItemData[] = [
  { 
    name: "Madras Filter Coffee", 
    price: "40", 
    desc: "Authentic South Indian brew. Strong, frothy, and served in the traditional brass davara tumbler.", 
    tags: ["Legendary", "Hot"], 
    image: "https://images.unsplash.com/photo-1596920658464-9041a31d2798?auto=format&fit=crop&q=80&w=600" 
  },
  { 
    name: "Classic Ginger Tea", 
    price: "35", 
    desc: "Freshly crushed ginger infused with strong tea leaves. The perfect kick for Chennai evenings.", 
    tags: ["Spicy", "Hot"], 
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&q=80&w=600" 
  },
];

interface MenuCategory {
  title: string;
  description: string;
  items: MenuItemData[];
}

const MENU_CATEGORIES: MenuCategory[] = [
  {
    title: "Hot Classics",
    description: "Traditional warmers for the soul.",
    items: [
      { name: "Masala Tea", price: "35", desc: "Aromatic blend of cardamom, cloves, and cinnamon.", tags: ["Spiced"], image: "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?auto=format&fit=crop&q=80&w=600" },
      { name: "Classic Tea", price: "25", desc: "Simple, strong, and comforting.", tags: ["Classic"], image: "https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&q=80&w=600" },
      { name: "Lemon Tea", price: "30", desc: "Zesty and refreshing with a hint of mint.", tags: ["Citrus"], image: "https://images.unsplash.com/photo-1595981267035-7b04ca84a82d?auto=format&fit=crop&q=80&w=600" },
      { name: "Green Tea", price: "35", desc: "Light, healthy, and full of antioxidants.", tags: ["Healthy"], image: "https://images.unsplash.com/photo-1627435601361-ec25481c3db6?auto=format&fit=crop&q=80&w=600" },
      { name: "Sukku Malli Coffee", price: "35", desc: "Traditional herbal coffee with dry ginger and coriander.", tags: ["Herbal"], image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=600" },
      { name: "Hot Boost / Horlicks", price: "40", desc: "The classic malt drinks we all grew up loving.", tags: ["Malt"], image: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?auto=format&fit=crop&q=80&w=600" },
    ]
  },
  {
    title: "Crispy & Crunchy",
    description: "Perfect companions for your brew.",
    items: [
      { name: "Crispy Samosa", price: "20", desc: "Golden fried pastry filled with spiced potatoes and peas.", tags: ["Vegan"], image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=600" },
      { name: "Egg Puff", price: "30", desc: "Flaky pastry with a spicy boiled egg masala filling.", tags: ["Bestseller"], image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=600" },
      { name: "Chicken Puff", price: "40", desc: "Oven-baked layers filled with spicy chicken masala.", tags: ["Non-Veg"], image: "https://images.unsplash.com/photo-1606757302279-376246473136?auto=format&fit=crop&q=80&w=600" },
      { name: "Veg Momos", price: "80", desc: "Steamed dumplings served with spicy chutney.", tags: ["Steamed"], image: "https://images.unsplash.com/photo-1626776420079-95e2475cadbd?auto=format&fit=crop&q=80&w=600" },
      { name: "French Fries", price: "80", desc: "Classic salted shoestring fries.", tags: ["Fried"], image: "https://images.unsplash.com/photo-1573080496987-a199f8cd4054?auto=format&fit=crop&q=80&w=600" },
      { name: "Chicken Popcorn", price: "110", desc: "Bite-sized crispy chicken chunks.", tags: ["Non-Veg"], image: "https://images.unsplash.com/photo-1562967960-f556f3f02db1?auto=format&fit=crop&q=80&w=600" },
    ]
  },
  {
    title: "Filling Eats",
    description: "Sandwiches, Maggi, and Omelettes.",
    items: [
      { name: "Paneer Sandwich", price: "90", desc: "Spiced paneer filling grilled between thick bread slices.", tags: ["Grilled"], image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80&w=600" },
      { name: "Chicken Sandwich", price: "110", desc: "Shredded chicken in mayo and spices.", tags: ["Non-Veg"], image: "https://images.unsplash.com/photo-1553909489-cd47e3b215a7?auto=format&fit=crop&q=80&w=600" },
      { name: "Corn Cheese Sandwich", price: "90", desc: "Sweet corn and melting cheese toast.", tags: ["Cheesy"], image: "https://images.unsplash.com/photo-1619860860774-1e7e1732e440?auto=format&fit=crop&q=80&w=600" },
      { name: "Bun Butter Jam", price: "50", desc: "Nostalgia on a plate. Soft bun, generous butter, and fruit jam.", tags: ["Sweet"], image: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&q=80&w=600" },
      { name: "Bread Omelette", price: "70", desc: "Street style spicy omelette wrapped around toasted bread.", tags: ["Spicy"], image: "https://images.unsplash.com/photo-1510693206972-df098062cb71?auto=format&fit=crop&q=80&w=600" },
      { name: "Spicy Maggi", price: "60", desc: "Your favorite noodles cooked with extra spices and veggies.", tags: ["Comfort"], image: "https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?auto=format&fit=crop&q=80&w=600" },
    ]
  }
];

const REVIEWS: ReviewData[] = [
  { id: 1, author: "Arun K.", handle: "@arun_chennai", text: "The Filter Coffee hits different here. Proper strong.", rating: 5 },
  { id: 2, author: "Sarah J.", handle: "@sarah.eats", text: "Best spot for a quick Bun Butter Jam and chill vibes.", rating: 5 },
  { id: 3, author: "Vikram R.", handle: "@vik_designs", text: "Finally a cafe in Chennai with this brutalist aesthetic. Love it.", rating: 4 },
];

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1511537632536-b7a4896848a5?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800",
];

const CONTACT_INFO = {
  instagram: "https://www.instagram.com/gillbet_cafe?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  phone: "08056565274",
  plusCode: "26M9+58 Chennai, Tamil Nadu",
  mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31096.351368087875!2d80.18229941083985!3d13.032875100000009!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267e95be6fc25%3A0x4ea6a76da5cf671b!2sGillbet%20cafe!5e0!3m2!1sen!2sin!4v1764170234900!5m2!1sen!2sin"
};

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
  <div className="group relative bg-[#1A1A1A] border border-[#333] hover:border-[#FF5E1A] transition-all duration-300 overflow-hidden flex flex-col h-full shadow-lg">
    <div className="h-56 overflow-hidden relative">
      <img src={image} alt={name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
      <div className="absolute top-0 right-0 bg-[#FF5E1A] text-black px-4 py-1 text-lg font-black border-l border-b border-black">
        ₹{price}
      </div>
    </div>
    <div className="p-5 flex flex-col flex-grow relative">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold text-white uppercase font-serif tracking-wide group-hover:text-[#FF5E1A] transition-colors leading-tight">{name}</h3>
      </div>
      <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">{desc}</p>
      
      <div className="flex items-center justify-between mt-auto">
        <div className="flex flex-wrap gap-2">
            {tags.slice(0, 2).map(tag => (
            <span key={tag} className="text-[10px] uppercase font-bold px-2 py-1 bg-[#2A2A2A] text-gray-300 border border-gray-700">
                {tag}
            </span>
            ))}
        </div>
        <button className="w-8 h-8 bg-white text-black flex items-center justify-center hover:bg-[#FF5E1A] transition-colors rounded-sm">
             <ArrowRight size={16} className="-rotate-45" />
        </button>
      </div>
    </div>
  </div>
);

const SignatureItem: React.FC<MenuItemData> = ({ name, price, desc, tags, image }) => (
  <div className="relative group overflow-hidden border-2 border-[#FF5E1A] bg-black">
    <div className="absolute inset-0 bg-[#FF5E1A] translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-0"></div>
    <div className="relative z-10 grid md:grid-cols-2 h-full">
       <div className="h-64 md:h-full overflow-hidden border-b md:border-b-0 md:border-r border-[#FF5E1A]">
          <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
       </div>
       <div className="p-8 flex flex-col justify-center">
          <div className="flex flex-wrap gap-2 mb-4">
             {tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-[#FF5E1A] text-black text-xs font-black uppercase tracking-widest group-hover:bg-black group-hover:text-[#FF5E1A] transition-colors">
                   {tag}
                </span>
             ))}
          </div>
          <h3 className="text-3xl md:text-4xl font-black uppercase mb-4 text-white group-hover:text-black transition-colors">{name}</h3>
          <p className="text-gray-400 group-hover:text-black/80 transition-colors mb-6">{desc}</p>
          <div className="flex items-center justify-between">
              <span className="text-3xl font-black text-[#FF5E1A] group-hover:text-black transition-colors">₹{price}</span>
              <button className="px-6 py-2 border-2 border-white text-white font-bold uppercase group-hover:border-black group-hover:text-black transition-colors">
                 Order Now
              </button>
          </div>
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
        {['Menu', 'About', 'Locations', 'Reviews', 'Socials'].map((item) => (
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
               <span className="text-[#FF5E1A] font-bold uppercase tracking-widest text-sm">Est. 2024 • Chennai</span>
            </div>
            
            <h1 className="text-7xl md:text-9xl font-black leading-[0.85] tracking-tighter">
              WAKE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5E1A] to-white">UP &</span><br />
              SMELL<br />
              THE <span className="italic font-serif">ART.</span>
            </h1>
            
            <p className="text-gray-400 text-xl max-w-md leading-relaxed">
              We don't serve average coffee. We serve the kind of coffee that makes you wonder why you ever drank anything else.
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
                        More Than <br/>
                        <span className="text-[#FF5E1A]">Just Coffee.</span>
                    </h2>
                    <p className="text-xl text-gray-300 leading-relaxed font-light">
                        Gillbet was born from a love for real taste. We believe coffee should be strong, rich, and full of flavor. No shortcuts, just great brewing.
                    </p>
                    <p className="text-gray-400">
                        Sourced from the best farms, roasted fresh, and served with care. Our baristas are experts, and our quality is guaranteed.
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
              <h2 className="text-5xl md:text-6xl font-black uppercase mb-4">Signature <span className="text-[#FF5E1A] italic font-serif">Brews</span></h2>
              <p className="text-gray-400 max-w-sm">The drinks that define us. Absolute must-haves.</p>
            </div>
            <div className="flex gap-0 border border-[#333]">
               <button className="px-8 py-3 bg-[#FF5E1A] text-black font-bold uppercase hover:bg-white transition-colors">Featured</button>
            </div>
          </div>
          
          {/* Signature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
             {SIGNATURE_ITEMS.map((item, idx) => (
                <SignatureItem key={idx} {...item} />
             ))}
          </div>

          {/* Categorized Menu */}
          {MENU_CATEGORIES.map((category, idx) => (
            <div key={idx} className="mb-20 last:mb-0">
               <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6 border-b border-[#333] pb-6">
                 <div>
                   <h2 className="text-4xl md:text-5xl font-black uppercase mb-2">{category.title}</h2>
                   <p className="text-gray-400">{category.description}</p>
                 </div>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                 {category.items.map((item, itemIdx) => (
                   <MenuItem key={itemIdx} {...item} />
                 ))}
               </div>
            </div>
          ))}

          <div className="mt-20 flex justify-center">
             <a href="#" className="group flex flex-col items-center gap-2">
                <span className="text-2xl font-black uppercase tracking-widest group-hover:text-[#FF5E1A] transition-colors">Order On Zomato</span>
                <div className="w-full h-1 bg-[#333] group-hover:bg-[#FF5E1A] transition-colors duration-500"></div>
             </a>
          </div>
        </div>
      </section>

      <Marquee text="THE VIBE IS IMMACULATE • TASTE THE DIFFERENCE •" direction="right" className="bg-white text-black border-none" />

      {/* Reviews Section */}
      <section id="reviews" className="py-24 bg-[#FF5E1A] text-black overflow-hidden">
        <div className="container mx-auto px-6 mb-12 flex justify-between items-end">
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter">What <br/> People Say</h2>
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

      {/* Location & Map Section */}
      <section id="locations" className="py-0 bg-white text-black">
        <div className="grid md:grid-cols-2">
          {/* Info Side */}
          <div className="p-12 md:p-12 lg:p-24 flex flex-col justify-center bg-[#F3F3F3] text-black border-b md:border-b-0 md:border-r border-black order-2 md:order-1">
            <div className="flex items-center gap-4 mb-8">
                 <div className="p-3 bg-[#FF5E1A] border-2 border-black">
                    <MapPin size={32} />
                 </div>
                 <div className="p-3 bg-white border-2 border-black">
                    <Clock size={32} />
                 </div>
            </div>
            
            <h3 className="text-4xl lg:text-5xl font-black uppercase mb-8">Visit Us</h3>
            
            <div className="space-y-6">
                <div>
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Gillbet Cafe</p>
                    <p className="text-2xl font-bold">{CONTACT_INFO.plusCode}</p>
                    <p className="text-lg font-medium text-gray-700 mt-1">2nd Avenue, Anna Nagar, Chennai</p>
                </div>
                <div>
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Contact</p>
                    <p className="text-xl font-mono flex items-center gap-2"> <Phone size={20}/> {CONTACT_INFO.phone}</p>
                </div>
                <div>
                    <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Hours</p>
                    <p className="text-xl font-mono">Mon-Fri: 7am - 9pm</p>
                    <p className="text-xl font-mono">Sat-Sun: 8am - 10pm</p>
                </div>
            </div>
            
            <a 
              href="https://www.google.com/maps" 
              target="_blank" 
              rel="noreferrer"
              className="mt-10 w-fit bg-black text-white px-8 py-4 font-bold uppercase hover:bg-[#FF5E1A] hover:text-black transition-colors flex items-center gap-3"
            >
              Get Directions <Navigation size={18} />
            </a>
          </div>

          {/* Map Side */}
          <div className="h-[500px] md:h-auto bg-gray-200 relative order-1 md:order-2 border-b border-black md:border-b-0">
             <iframe 
               src={CONTACT_INFO.mapEmbed} 
               className="absolute inset-0 w-full h-full grayscale hover:grayscale-0 transition-all duration-500" 
               allowFullScreen 
               loading="lazy" 
               referrerPolicy="no-referrer-when-downgrade"
             ></iframe>
             <div className="absolute top-4 right-4 bg-white p-2 border-2 border-black shadow-[4px_4px_0px_0px_#FF5E1A]">
                <p className="font-bold text-xs uppercase tracking-widest">Live Map</p>
             </div>
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
                Creating the best coffee experience in Chennai. Bold flavors, great vibes.
              </p>
              
              <div className="mt-8 p-4 border border-[#333] inline-flex items-center gap-4 bg-[#111] max-w-sm">
                 <div className="w-20 h-20 bg-white p-1 flex-shrink-0">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(CONTACT_INFO.instagram)}`} 
                      alt="Instagram QR" 
                      className="w-full h-full"
                    />
                 </div>
                 <div>
                    <p className="font-bold text-[#FF5E1A] uppercase text-sm mb-1">Scan to Follow</p>
                    <p className="text-xs text-gray-400">Join our community on Instagram for daily updates.</p>
                 </div>
              </div>

            </div>
            <div className="grid grid-cols-2 gap-12 md:gap-24 text-right md:text-left">
              <div className="space-y-6">
                <h4 className="text-[#FF5E1A] font-bold uppercase tracking-widest text-sm border-b border-[#333] pb-2">Socials</h4>
                <ul className="space-y-4 text-gray-400 font-medium">
                  <li>
                    <a href={CONTACT_INFO.instagram} target="_blank" rel="noreferrer" className="hover:text-white cursor-pointer flex items-center gap-2 md:justify-start justify-end">
                      <Instagram size={18}/> Instagram
                    </a>
                  </li>
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
