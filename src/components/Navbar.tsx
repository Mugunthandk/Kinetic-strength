import React, { useState } from 'react';
import { ViewMode, User, CartItem } from '../types';
import { 
  Zap, 
  Sparkles, 
  MapPin, 
  Calendar, 
  ShoppingBag, 
  Users, 
  QrCode, 
  LayoutDashboard, 
  Menu, 
  X, 
  Crown,
  ChevronRight
} from 'lucide-react';

interface NavbarProps {
  currentView: ViewMode;
  setCurrentView: (view: ViewMode) => void;
  user: User;
  cart: CartItem[];
  setIsCartOpen: (open: boolean) => void;
  onOpenScanPass: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  user,
  cart,
  setIsCartOpen,
  onOpenScanPass
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navItems: { view: ViewMode; label: string; icon: React.ReactNode; badge?: string }[] = [
    { view: 'home', label: 'Home', icon: <Zap className="w-4 h-4" /> },
    { view: 'schedule', label: 'Schedule', icon: <Calendar className="w-4 h-4" /> },
    { view: 'trainers', label: 'Trainers', icon: <Users className="w-4 h-4" /> },
    { view: 'memberships', label: 'Plans', icon: <Crown className="w-4 h-4" /> },
    { view: 'locations', label: 'Clubs', icon: <MapPin className="w-4 h-4" /> },
    { view: 'store', label: 'Store', icon: <ShoppingBag className="w-4 h-4" /> },
    { view: 'community', label: 'Community', icon: <Users className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#090909]/90 backdrop-blur-xl border-b border-white/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 h-20 flex items-center justify-between">
        
        {/* LOGO */}
        <div 
          onClick={() => setCurrentView('home')} 
          className="flex items-center gap-2.5 cursor-pointer group select-none -ml-1 sm:-ml-2"
        >
          <div className="w-8 h-8 bg-[#C7FF00] flex items-center justify-center rounded-sm shadow-[0_0_15px_rgba(199,255,0,0.3)] group-hover:scale-105 transition-transform">
            <div className="w-4 h-4 bg-black" />
          </div>
          <span className="text-xl font-black tracking-tighter uppercase font-display text-white">
            Kinetic<span className="text-[#C7FF00]">Strength</span>
          </span>
        </div>

        {/* DESKTOP NAV LINKS */}
        <nav className="hidden lg:flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = currentView === item.view;
            return (
              <button
                key={item.view}
                onClick={() => setCurrentView(item.view)}
                className={`relative text-[11px] uppercase tracking-[0.2em] font-bold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'text-[#C7FF00] opacity-100'
                    : 'text-white/70 hover:text-white hover:opacity-100'
                }`}
              >
                <span>{item.label}</span>
                {item.badge && !isActive && (
                  <span className="bg-[#C7FF00]/20 text-[#C7FF00] text-[9px] font-extrabold px-1.5 py-0.5 rounded-full border border-[#C7FF00]/30 animate-pulse">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* RIGHT ACTION CONTROLS */}
        <div className="hidden sm:flex items-center gap-3">
          {/* DIGITAL QR ACCESS PASS BUTTON */}
          <button
            onClick={onOpenScanPass}
            className="px-5 py-2 bg-[#C7FF00] text-black text-xs font-black uppercase tracking-wider rounded-full shadow-[0_0_20px_rgba(199,255,0,0.3)] hover:scale-105 transition-transform flex items-center gap-2"
          >
            <QrCode className="w-4 h-4" />
            <span>Join Elite</span>
          </button>

          {/* CART BUTTON */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all"
            aria-label="View Shopping Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#C7FF00] text-black font-extrabold text-[10px] rounded-full flex items-center justify-center border-2 border-black">
                {totalCartCount}
              </span>
            )}
          </button>

          {/* DASHBOARD / PROFILE BUTTON */}
          <button
            onClick={() => setCurrentView('dashboard')}
            className={`flex items-center gap-2 pl-2 pr-3.5 py-1.5 rounded-full border transition-all ${
              currentView === 'dashboard'
                ? 'bg-[#C7FF00]/10 border-[#C7FF00] text-[#C7FF00]'
                : 'bg-white/5 border-white/10 text-zinc-300 hover:text-white hover:border-white/20'
            }`}
          >
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-6 h-6 rounded-full object-cover border border-[#C7FF00]"
            />
            <span className="text-[11px] font-extrabold tracking-wider uppercase max-w-[80px] truncate">
              {user.name.split(' ')[0]}
            </span>
          </button>
        </div>

        {/* MOBILE HAMBURGER TOGGLE */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 rounded-lg bg-zinc-900 border border-white/10 text-white"
          >
            <ShoppingBag className="w-4 h-4" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C7FF00] text-black font-bold text-[9px] rounded-full flex items-center justify-center">
                {totalCartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#C7FF00]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-zinc-950/95 border-b border-white/10 px-4 pt-3 pb-6 flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = currentView === item.view;
            return (
              <button
                key={item.view}
                onClick={() => {
                  setCurrentView(item.view);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center justify-between p-3 rounded-xl text-sm font-bold uppercase tracking-wider ${
                  isActive
                    ? 'bg-[#C7FF00] text-black'
                    : 'bg-zinc-900/70 text-zinc-300 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-60" />
              </button>
            );
          })}

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenScanPass();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 p-3 rounded-xl bg-zinc-900 border border-[#C7FF00] text-[#C7FF00] font-bold text-xs uppercase"
            >
              <QrCode className="w-4 h-4" />
              <span>Digital Key Pass</span>
            </button>

            <button
              onClick={() => {
                setCurrentView('dashboard');
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-2 p-3 rounded-xl bg-zinc-900 border border-white/10 text-white font-bold text-xs uppercase"
            >
              <LayoutDashboard className="w-4 h-4 text-[#C7FF00]" />
              <span>Member Dashboard</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
