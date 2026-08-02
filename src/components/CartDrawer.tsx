import React, { useState } from 'react';
import { CartItem } from '../types';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  Check, 
  Sparkles, 
  CreditCard, 
  Smartphone, 
  Wallet, 
  Building2, 
  ShieldCheck,
  Lock,
  Tag,
  Flame,
  Award,
  QrCode,
  Download,
  PartyPopper,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

type PaymentMethod = 'applepay' | 'card' | 'gympass' | 'frontdesk';

// Web Audio API Firecracker & Celebration Sound Synthesizer
const triggerCelebrationAudio = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const audioCtx = new AudioContextClass();

    // 1. Firecracker pops sequence
    const popTimes = [0, 0.08, 0.18, 0.28, 0.42, 0.58, 0.72, 0.9, 1.1, 1.3];
    popTimes.forEach((t, idx) => {
      const bufferSize = audioCtx.sampleRate * 0.07;
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.15));
      }

      const noise = audioCtx.createBufferSource();
      noise.buffer = buffer;
      const gain = audioCtx.createGain();
      const volume = Math.max(0.1, 0.35 - idx * 0.02);
      gain.gain.setValueAtTime(volume, audioCtx.currentTime + t);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + t + 0.07);

      noise.connect(gain);
      gain.connect(audioCtx.destination);
      noise.start(audioCtx.currentTime + t);
    });

    // 2. Victory chime notes (C Major Arpeggio: C5, E5, G5, C6, E6)
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    notes.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime + 0.3 + idx * 0.1);

      gain.gain.setValueAtTime(0.2, audioCtx.currentTime + 0.3 + idx * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3 + idx * 0.1 + 0.45);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(audioCtx.currentTime + 0.3 + idx * 0.1);
      osc.stop(audioCtx.currentTime + 0.3 + idx * 0.1 + 0.45);
    });
  } catch (e) {
    // Audio context polyfill silent fallback
  }
};

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('applepay');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<{
    orderId: string;
    totalPaid: number;
    items: CartItem[];
    paymentMethodName: string;
    dateStr: string;
  } | null>(null);

  // Card Form State
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');
  const [cardName, setCardName] = useState('ALEX RIVERS');

  // Promo Code State
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const totalAmount = Math.max(0, subtotal - discountAmount);

  const applyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'KINETIC10' || promoCode.trim().toUpperCase() === 'ATHLETE') {
      setDiscountPercent(15);
      setPromoApplied(true);
    } else if (promoCode.trim().toUpperCase() === 'VIP') {
      setDiscountPercent(25);
      setPromoApplied(true);
    } else {
      alert('Invalid promo code. Try "KINETIC10" or "VIP"');
    }
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      
      const orderData = {
        orderId: `KP-${Math.floor(100000 + Math.random() * 900000)}`,
        totalPaid: totalAmount,
        items: [...cart],
        paymentMethodName: selectedMethod === 'applepay' ? 'Apple / Google Pay' : selectedMethod === 'card' ? 'Credit Card' : selectedMethod === 'gympass' ? 'Member Pass Balance' : 'Pay at Front Desk',
        dateStr: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ', ' + new Date().toLocaleDateString()
      };

      setCompletedOrder(orderData);

      // Trigger Cracker Sound FX
      triggerCelebrationAudio();

      // Multi-stage Fireworks / Cracker Confetti Bursts
      const duration = 2.5 * 1000;
      const animationEnd = Date.now() + duration;

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      const interval: any = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        // Left Cracker Cannon
        confetti({
          particleCount,
          spread: 80,
          startVelocity: 45,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ['#C7FF00', '#FF0055', '#00E5FF', '#FFFFFF', '#FFD700']
        });

        // Right Cracker Cannon
        confetti({
          particleCount,
          spread: 80,
          startVelocity: 45,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ['#C7FF00', '#FF0055', '#00E5FF', '#FFFFFF', '#FFD700']
        });
      }, 250);

    }, 1600);
  };

  const handleCloseCompletion = () => {
    setCompletedOrder(null);
    onClearCart();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/85 backdrop-blur-md flex justify-end">
      
      {/* FULL PAYMENT COMPLETE CELEBRATION MODAL OVERLAY */}
      {completedOrder ? (
        <div className="w-full max-w-lg bg-[#0a1103] border-l-2 border-[#C7FF00] h-full flex flex-col justify-between p-6 shadow-[0_0_80px_rgba(199,255,0,0.35)] relative overflow-y-auto animate-fade-in z-50">
          
          <button
            onClick={handleCloseCompletion}
            className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/80 hover:bg-[#C7FF00] text-white hover:text-black rounded-full border border-[#C7FF00]/50 flex items-center justify-center transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          {/* TOP CELEBRATION HEADER */}
          <div className="text-center pt-6 space-y-3">
            <div className="relative inline-block">
              <div className="w-20 h-20 rounded-full bg-[#C7FF00] text-black flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(199,255,0,0.6)] animate-bounce">
                <PartyPopper className="w-10 h-10" />
              </div>
              <Flame className="w-6 h-6 text-amber-400 absolute -top-1 -right-1 animate-pulse" />
            </div>

            <div>
              <span className="px-3 py-1 rounded-full bg-[#C7FF00]/20 text-[#C7FF00] border border-[#C7FF00]/40 font-mono-custom font-bold text-xs uppercase tracking-widest">
                🎉 CRACKERS & CONFETTI RELEASED!
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white uppercase font-display tracking-tight mt-2">
                PAYMENT <span className="text-[#C7FF00]">COMPLETE!</span>
              </h2>
              <p className="text-xs text-zinc-300 font-mono-custom mt-1">
                ORDER ID: <span className="text-[#C7FF00] font-black">{completedOrder.orderId}</span>
              </p>
            </div>
          </div>

          {/* RECEIPT BREAKDOWN CARD */}
          <div className="my-6 bg-black/70 border border-[#C7FF00]/40 p-5 rounded-3xl space-y-4 shadow-inner">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-xs font-mono-custom text-zinc-400">
                <CheckCircle2 className="w-4 h-4 text-[#C7FF00]" />
                <span>STATUS: PAID & DISPATCHED</span>
              </div>
              <span className="text-[10px] font-mono-custom text-zinc-500">{completedOrder.dateStr}</span>
            </div>

            {/* PURCHASED ITEMS LIST */}
            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
              {completedOrder.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <img src={item.product.image} alt={item.product.name} className="w-8 h-8 object-cover rounded-lg" />
                    <div>
                      <div className="font-bold text-white uppercase text-[11px] truncate max-w-[180px]">{item.product.name}</div>
                      <div className="text-[10px] text-zinc-400 font-mono-custom">QTY: {item.quantity} x ${item.product.price}</div>
                    </div>
                  </div>
                  <span className="font-mono-custom font-black text-[#C7FF00]">${item.product.price * item.quantity}</span>
                </div>
              ))}
            </div>

            {/* TOTAL PAID & METHOD */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono-custom text-zinc-400 block uppercase">PAID VIA {completedOrder.paymentMethodName.toUpperCase()}</span>
                <span className="text-xs text-zinc-300 font-mono-custom">Express Athlete Pickup</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono-custom text-zinc-400 block uppercase">TOTAL AMOUNT</span>
                <span className="text-2xl font-black text-[#C7FF00] font-mono-custom">${completedOrder.totalPaid}</span>
              </div>
            </div>

            {/* ATHLETE POINTS EARNED REWARD */}
            <div className="bg-[#C7FF00]/15 border border-[#C7FF00]/40 p-3 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#C7FF00]" />
                <div>
                  <div className="text-xs font-black text-[#C7FF00] uppercase font-mono-custom">+150 KINETIC REWARD PTS</div>
                  <div className="text-[10px] text-zinc-300">Added to your athlete member balance</div>
                </div>
              </div>
              <span className="text-[10px] bg-[#C7FF00] text-black font-black px-2 py-0.5 rounded uppercase">CLAIMED</span>
            </div>

            {/* PICKUP QR CODE / BARCODE */}
            <div className="bg-white p-3 rounded-2xl text-center space-y-1">
              <div className="flex items-center justify-center gap-2 text-black font-black text-xs font-mono-custom tracking-widest uppercase">
                <QrCode className="w-4 h-4 text-black" />
                <span>EXPRESS PICKUP BARCODE</span>
              </div>
              <div className="font-mono-custom text-black text-lg tracking-[0.3em] font-bold">
                ||||| | |||| ||| |||||| |
              </div>
              <div className="text-[10px] text-zinc-600 font-mono-custom">
                Scan at SoHo NYC Front Desk or locker kiosk
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="space-y-2">
            <button
              onClick={() => alert(`Receipt PDF for order ${completedOrder.orderId} downloaded to your device!`)}
              className="w-full py-3 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider rounded-2xl border border-white/20 transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4 text-[#C7FF00]" />
              <span>DOWNLOAD RECEIPT PDF</span>
            </button>

            <button
              onClick={handleCloseCompletion}
              className="w-full py-4 bg-[#C7FF00] hover:bg-[#b0e600] text-black font-black text-xs uppercase tracking-wider rounded-2xl shadow-[0_0_30px_rgba(199,255,0,0.4)] transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 fill-black" />
              <span>CONTINUE ATHLETE SHOPPING</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      ) : (
        /* STANDARD CART & CHECKOUT DRAWER */
        <div className="w-full max-w-md bg-zinc-950 border-l border-white/10 h-full flex flex-col justify-between p-5 sm:p-6 shadow-2xl relative animate-in slide-in-from-right duration-300">
          
          {/* HEADER */}
          <div className="flex-1 overflow-y-auto pr-1">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 sticky top-0 bg-zinc-950 z-10">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#C7FF00]" />
                <h2 className="text-lg sm:text-xl font-black text-white uppercase font-display">KINETIC CART & CHECKOUT</h2>
              </div>
              <button
                onClick={onClose}
                className="text-zinc-400 hover:text-white p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* CART ITEMS LIST */}
            {cart.length === 0 ? (
              <div className="py-20 text-center">
                <ShoppingBag className="w-12 h-12 text-zinc-700 mx-auto mb-3" />
                <p className="text-sm text-zinc-400 font-bold uppercase">YOUR CART IS EMPTY</p>
                <p className="text-xs text-zinc-500 mt-1">Explore our high-performance supplements & apparel.</p>
              </div>
            ) : (
              <div className="mt-4 space-y-3">
                <div className="text-[10px] font-mono-custom font-bold text-zinc-400 uppercase tracking-wider">
                  SELECTED ATHLETE GEAR ({cart.length})
                </div>

                {cart.map((item) => (
                  <div key={item.product.id} className="bg-zinc-900 border border-white/10 p-3 rounded-2xl flex items-center justify-between gap-3">
                    <img src={item.product.image} alt={item.product.name} className="w-12 h-12 object-cover rounded-xl shrink-0" />
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-white uppercase truncate">{item.product.name}</h4>
                      <span className="text-xs font-bold text-[#C7FF00] font-mono-custom">${item.product.price}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, -1)}
                        className="w-6 h-6 rounded bg-zinc-800 text-white font-bold text-xs hover:bg-zinc-700"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold text-white font-mono-custom w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, 1)}
                        className="w-6 h-6 rounded bg-zinc-800 text-white font-bold text-xs hover:bg-zinc-700"
                      >
                        +
                      </button>

                      <button
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-zinc-500 hover:text-red-400 p-1 ml-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* PROMO CODE SECTION */}
                <div className="pt-2">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-3" />
                      <input 
                        type="text" 
                        placeholder="PROMO CODE (e.g. KINETIC10)"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="w-full bg-zinc-900 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white font-mono-custom placeholder:text-zinc-600 focus:outline-none focus:border-[#C7FF00]"
                      />
                    </div>
                    <button 
                      onClick={applyPromo}
                      className="px-4 py-2 bg-zinc-800 hover:bg-[#C7FF00] text-zinc-300 hover:text-black font-bold text-xs rounded-xl uppercase transition-all"
                    >
                      APPLY
                    </button>
                  </div>
                  {promoApplied && (
                    <p className="text-[11px] text-[#C7FF00] font-mono-custom font-bold mt-1">
                      ✓ {discountPercent}% ATHLETE DISCOUNT APPLIED!
                    </p>
                  )}
                </div>

                {/* SELECT PAYMENT METHOD SECTION */}
                <div className="pt-4 border-t border-white/10">
                  <div className="text-[11px] font-mono-custom font-bold text-[#C7FF00] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-[#C7FF00]" />
                    <span>SELECT PAYMENT METHOD</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {/* OPTION 1: APPLE / GOOGLE PAY */}
                    <button
                      onClick={() => setSelectedMethod('applepay')}
                      className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                        selectedMethod === 'applepay'
                          ? 'bg-[#C7FF00]/15 border-[#C7FF00] text-white shadow-[0_0_15px_rgba(199,255,0,0.2)]'
                          : 'bg-zinc-900 border-white/10 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <Smartphone className={`w-4 h-4 ${selectedMethod === 'applepay' ? 'text-[#C7FF00]' : 'text-zinc-400'}`} />
                      <div className="mt-2">
                        <div className="text-xs font-black uppercase text-white">APPLE / GOOGLE PAY</div>
                        <div className="text-[10px] text-zinc-400">Instant 1-Touch</div>
                      </div>
                    </button>

                    {/* OPTION 2: CREDIT / DEBIT CARD */}
                    <button
                      onClick={() => setSelectedMethod('card')}
                      className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                        selectedMethod === 'card'
                          ? 'bg-[#C7FF00]/15 border-[#C7FF00] text-white shadow-[0_0_15px_rgba(199,255,0,0.2)]'
                          : 'bg-zinc-900 border-white/10 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <CreditCard className={`w-4 h-4 ${selectedMethod === 'card' ? 'text-[#C7FF00]' : 'text-zinc-400'}`} />
                      <div className="mt-2">
                        <div className="text-xs font-black uppercase text-white">CREDIT / DEBIT CARD</div>
                        <div className="text-[10px] text-zinc-400">Visa, Amex, MC</div>
                      </div>
                    </button>

                    {/* OPTION 3: GYM MEMBER PASS CREDITS */}
                    <button
                      onClick={() => setSelectedMethod('gympass')}
                      className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                        selectedMethod === 'gympass'
                          ? 'bg-[#C7FF00]/15 border-[#C7FF00] text-white shadow-[0_0_15px_rgba(199,255,0,0.2)]'
                          : 'bg-zinc-900 border-white/10 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <Wallet className={`w-4 h-4 ${selectedMethod === 'gympass' ? 'text-[#C7FF00]' : 'text-zinc-400'}`} />
                      <div className="mt-2">
                        <div className="text-xs font-black uppercase text-white">MEMBER PASS BALANCE</div>
                        <div className="text-[10px] text-[#C7FF00] font-mono-custom font-bold">$450.00 Credit</div>
                      </div>
                    </button>

                    {/* OPTION 4: FRONT DESK / PAY AT GYM */}
                    <button
                      onClick={() => setSelectedMethod('frontdesk')}
                      className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                        selectedMethod === 'frontdesk'
                          ? 'bg-[#C7FF00]/15 border-[#C7FF00] text-white shadow-[0_0_15px_rgba(199,255,0,0.2)]'
                          : 'bg-zinc-900 border-white/10 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <Building2 className={`w-4 h-4 ${selectedMethod === 'frontdesk' ? 'text-[#C7FF00]' : 'text-zinc-400'}`} />
                      <div className="mt-2">
                        <div className="text-xs font-black uppercase text-white">PAY AT FRONT DESK</div>
                        <div className="text-[10px] text-zinc-400">Reserve for pickup</div>
                      </div>
                    </button>
                  </div>

                  {/* CONDITIONAL PAYMENT INPUT FIELDS */}
                  {selectedMethod === 'card' && (
                    <div className="mt-3 bg-zinc-900 border border-[#C7FF00]/30 p-3.5 rounded-2xl space-y-2.5 animate-fade-in">
                      <div>
                        <label className="text-[10px] font-mono-custom text-zinc-400 uppercase">CARDHOLDER NAME</label>
                        <input 
                          type="text" 
                          value={cardName} 
                          onChange={(e) => setCardName(e.target.value)}
                          className="w-full bg-zinc-950 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono-custom focus:outline-none focus:border-[#C7FF00]" 
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono-custom text-zinc-400 uppercase">CARD NUMBER</label>
                        <input 
                          type="text" 
                          value={cardNumber} 
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full bg-zinc-950 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono-custom focus:outline-none focus:border-[#C7FF00]" 
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] font-mono-custom text-zinc-400 uppercase">EXPIRY</label>
                          <input 
                            type="text" 
                            value={cardExpiry} 
                            onChange={(e) => setCardExpiry(e.target.value)}
                            className="w-full bg-zinc-950 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono-custom focus:outline-none focus:border-[#C7FF00]" 
                          />
                        </div>
                        <div>
                          <label className="text-[10px] font-mono-custom text-zinc-400 uppercase">CVC / CVV</label>
                          <input 
                            type="text" 
                            value={cardCvc} 
                            onChange={(e) => setCardCvc(e.target.value)}
                            className="w-full bg-zinc-950 border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white font-mono-custom focus:outline-none focus:border-[#C7FF00]" 
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedMethod === 'gympass' && (
                    <div className="mt-3 bg-[#C7FF00]/10 border border-[#C7FF00]/30 p-3 rounded-2xl text-xs text-zinc-300 font-mono-custom">
                      <span className="text-[#C7FF00] font-bold">KINETIC PASS ID:</span> #KP-8829-NYC
                      <br />
                      Available Credit: <span className="text-white font-bold">$450.00</span>. Balance after purchase: <span className="text-[#C7FF00] font-bold">${(450 - totalAmount).toFixed(2)}</span>
                    </div>
                  )}

                  {selectedMethod === 'frontdesk' && (
                    <div className="mt-3 bg-zinc-900 border border-white/10 p-3 rounded-2xl text-xs text-zinc-300 font-mono-custom">
                      Items will be placed on hold at your primary gym location (SoHo NYC) for 24 hours. Pay via Cash/Card upon collection.
                    </div>
                  )}

                </div>

              </div>
            )}
          </div>

          {/* CHECKOUT FOOTER */}
          {cart.length > 0 && (
            <div className="border-t border-white/10 pt-4 space-y-3 shrink-0 bg-zinc-950">
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span className="font-mono-custom text-white">${subtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#C7FF00]">
                    <span>Discount ({discountPercent}%)</span>
                    <span className="font-mono-custom">-${discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm pt-1 border-t border-white/10 font-bold">
                  <span className="text-white uppercase">TOTAL AMOUNT</span>
                  <span className="text-2xl font-black text-[#C7FF00] font-mono-custom">${totalAmount}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full py-4 bg-[#C7FF00] hover:bg-[#b0e600] text-black font-extrabold text-xs uppercase tracking-wider rounded-2xl transition-all shadow-[0_0_25px_rgba(199,255,0,0.35)] flex items-center justify-center gap-2"
              >
                {isCheckingOut ? (
                  <span>PROCESSING ENCRYPTED PAYMENT...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>PAY ${totalAmount} VIA {selectedMethod.toUpperCase()}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-500 font-mono-custom">
                <Lock className="w-3 h-3 text-zinc-500" />
                <span>256-BIT ENCRYPTED ATHLETE CHECKOUT</span>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};

