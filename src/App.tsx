import React, { useState } from 'react';
import { ViewMode, User, CartItem, StoreItem, MembershipTierId } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MembershipsView } from './components/MembershipsView';
import { LocationsView } from './components/LocationsView';
import { ScheduleView } from './components/ScheduleView';
import { TrainersView } from './components/TrainersView';
import { StoreView } from './components/StoreView';
import { CommunityView } from './components/CommunityView';
import { DashboardView } from './components/DashboardView';
import { CartDrawer } from './components/CartDrawer';
import { ScanPassModal } from './components/ScanPassModal';
import { Footer } from './components/Footer';
import { QrCode } from 'lucide-react';

export function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScanPassOpen, setIsScanPassOpen] = useState(false);

  // ACTIVE ATHLETE USER STATE
  const [user, setUser] = useState<User>({
    id: 'usr-9012',
    name: 'Marcus Vance',
    email: 'marcus.vance@kineticstrength.com',
    role: 'member',
    tier: 'black_tier',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    qrCodeId: 'KNT-8890-VIP',
    membershipActive: true,
    joinedDate: 'Jan 2024',
    stats: {
      workoutsCompleted: 142,
      totalVolumeKg: 284500,
      streakDays: 24,
      caloriesBurned: 94200,
      rank: 'TOP 1% ATHLETE',
    },
  });

  // CART STATE
  const [cart, setCart] = useState<CartItem[]>([]);

  const handleAddToCart = (product: StoreItem) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleUpdateUserTier = (tier: MembershipTierId) => {
    setUser((prev) => ({
      ...prev,
      tier,
      membershipActive: true,
    }));
  };

  return (
    <div className="min-h-screen bg-[#090909] text-white flex flex-col justify-between font-sans selection:bg-[#C7FF00] selection:text-black">
      
      {/* NAVBAR */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        user={user}
        cart={cart}
        setIsCartOpen={setIsCartOpen}
        onOpenScanPass={() => setIsScanPassOpen(true)}
      />

      {/* VIEW SWITCHER */}
      <main className="flex-1">
        {currentView === 'home' && (
          <HeroSection
            setCurrentView={setCurrentView}
            onOpenScanPass={() => setIsScanPassOpen(true)}
          />
        )}

        {currentView === 'memberships' && (
          <MembershipsView
            user={user}
            onUpdateUserTier={handleUpdateUserTier}
          />
        )}

        {currentView === 'locations' && <LocationsView />}

        {currentView === 'schedule' && <ScheduleView />}

        {currentView === 'trainers' && <TrainersView />}

        {currentView === 'store' && (
          <StoreView
            cart={cart}
            onAddToCart={handleAddToCart}
            setIsCartOpen={setIsCartOpen}
          />
        )}

        {currentView === 'community' && <CommunityView user={user} />}

        {currentView === 'dashboard' && (
          <DashboardView
            user={user}
            setCurrentView={setCurrentView}
            onOpenScanPass={() => setIsScanPassOpen(true)}
          />
        )}
      </main>

      {/* FLOATING QUICK SCAN PASS TRIGGER */}
      <button
        onClick={() => setIsScanPassOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-[#C7FF00] text-black font-extrabold p-4 rounded-2xl shadow-[0_0_25px_rgba(199,255,0,0.5)] hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
        aria-label="Open Biometric Pass"
      >
        <QrCode className="w-6 h-6" />
        <span className="hidden sm:inline text-xs uppercase tracking-wider font-extrabold">KEY PASS</span>
      </button>

      {/* MODALS & DRAWERS */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      <ScanPassModal
        isOpen={isScanPassOpen}
        onClose={() => setIsScanPassOpen(false)}
        user={user}
      />

      {/* FOOTER */}
      <Footer setCurrentView={setCurrentView} />

    </div>
  );
}

export default App;
