import React, { useState } from 'react';
import { MEMBERSHIP_PLANS, MembershipPlan } from '../data/mockData';
import { User, MembershipTierId } from '../types';
import { Check, Crown, Zap, ShieldCheck, Sparkles, CreditCard, X } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MembershipsViewProps {
  user: User;
  onUpdateUserTier: (tier: MembershipTierId) => void;
}

export const MembershipsView: React.FC<MembershipsViewProps> = ({ user, onUpdateUserTier }) => {
  const [isAnnual, setIsAnnual] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<MembershipPlan | null>(null);
  const [isPaying, setIsPaying] = useState(false);
  const [paymentComplete, setPaymentComplete] = useState(false);

  const handleCheckout = (plan: MembershipPlan) => {
    setSelectedPlan(plan);
    setPaymentComplete(false);
  };

  const processPayment = () => {
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      setPaymentComplete(true);
      if (selectedPlan) {
        onUpdateUserTier(selectedPlan.id);
      }
      // Trigger Confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C7FF00', '#ffffff', '#000000']
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#090909] py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* HEADER TITLE */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C7FF00]/10 border border-[#C7FF00]/30 text-[#C7FF00] text-xs font-mono-custom font-bold uppercase mb-3">
          <Crown className="w-3.5 h-3.5" />
          <span>EXCLUSIVE CLUB PASSPORT</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-white uppercase font-display tracking-tight">
          MEMBERSHIP <span className="text-[#C7FF00]">TIERS</span>
        </h1>
        <p className="text-sm text-zinc-400 mt-3 leading-relaxed">
          Unrestricted access to world-class facilities, AI form biomechanics, Master Trainers, and cold-cryo recovery suites.
        </p>

        {/* BILLING CYCLE TOGGLE */}
        <div className="mt-8 inline-flex items-center p-1.5 rounded-full bg-zinc-900 border border-white/10">
          <button
            onClick={() => setIsAnnual(false)}
            className={`px-5 py-2 rounded-full text-xs font-bold uppercase transition-all ${
              !isAnnual ? 'bg-[#C7FF00] text-black shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={`px-5 py-2 rounded-full text-xs font-bold uppercase flex items-center gap-2 transition-all ${
              isAnnual ? 'bg-[#C7FF00] text-black shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <span>Annual</span>
            <span className="bg-black text-[#C7FF00] text-[9px] px-2 py-0.5 rounded-full font-extrabold">
              SAVE 20%
            </span>
          </button>
        </div>
      </div>

      {/* PLANS CARDS GRID */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {MEMBERSHIP_PLANS.map((plan) => {
          const price = isAnnual ? plan.priceAnnualMonthly : plan.priceMonthly;
          const isCurrentTier = user.tier === plan.id;

          return (
            <div
              key={plan.id}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                plan.isPopular
                  ? 'bg-zinc-900 border-2 border-[#C7FF00] shadow-[0_0_30px_rgba(199,255,0,0.25)]'
                  : 'bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/20'
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-[#C7FF00] text-black text-[10px] font-black px-3.5 py-1 rounded-full uppercase tracking-widest shadow-sm">
                  {plan.badge}
                </span>
              )}

              <div>
                <h3 className="text-xl font-black text-white uppercase font-display">{plan.name}</h3>
                <p className="text-xs text-zinc-400 mt-1 min-h-[36px]">{plan.tagline}</p>

                <div className="mt-6 mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-white font-mono-custom">${price}</span>
                    <span className="text-xs font-bold text-zinc-400">/ MONTH</span>
                  </div>
                  {isAnnual && plan.id !== 'day_pass' && (
                    <span className="text-[10px] text-[#C7FF00] font-mono-custom font-bold">Billed annually</span>
                  )}
                </div>

                <div className="space-y-3 pt-4 border-t border-white/10">
                  {plan.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                      <Check className="w-4 h-4 text-[#C7FF00] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => handleCheckout(plan)}
                disabled={isCurrentTier}
                className={`w-full mt-8 py-3.5 rounded-full font-black text-xs uppercase tracking-wider transition-all ${
                  isCurrentTier
                    ? 'bg-zinc-800 text-zinc-500 cursor-default border border-zinc-700'
                    : plan.isPopular
                    ? 'bg-[#C7FF00] text-black hover:bg-[#b0e600] shadow-[0_0_20px_rgba(199,255,0,0.3)]'
                    : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                }`}
              >
                {isCurrentTier ? 'CURRENT ACTIVE TIER' : `SELECT ${plan.name}`}
              </button>
            </div>
          );
        })}
      </div>

      {/* KINETIC TECHNOLOGY SECTION MATCHING MOCKUP */}
      <div className="mt-20 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C7FF00]/10 border border-[#C7FF00]/30 text-[#C7FF00] text-[10px] font-mono-custom font-bold uppercase mb-4">
            <Zap className="w-3.5 h-3.5" />
            <span>INTEGRATED HARDWARE & SOFTWARE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase font-display tracking-tight">
            KINETIC TECHNOLOGY
          </h2>
          <p className="mt-3 text-sm text-zinc-400 leading-relaxed max-w-2xl">
            Engineered for high-performance athletes. Every membership includes our proprietary AI mobile app, real-time biometric scanning, automatic load auto-regulation, and instant syncing with Eleiko and Hammer Strength smart stations.
          </p>
        </div>

        <div className="lg:col-span-4 bg-black/60 border border-white/10 p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono-custom font-bold text-zinc-400 uppercase">BIOMETRIC SYNC RATE</span>
            <span className="text-[#C7FF00] font-mono-custom font-bold text-xs">2,400 HZ</span>
          </div>
          <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden mb-4">
            <div className="h-full bg-[#C7FF00] w-[92%]" />
          </div>
          <p className="text-[11px] text-zinc-400">
            Sub-second latency between your wearable sensor, gym floor platforms, and AI workout coach.
          </p>
        </div>
      </div>

      {/* FREQUENTLY ASKED QUESTIONS MATCHING MOCKUP */}
      <div className="mt-20 max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-black text-white uppercase font-display tracking-tight">
            FREQUENTLY ASKED <span className="text-[#C7FF00]">QUESTIONS</span>
          </h2>
          <p className="text-xs text-zinc-400 mt-2 uppercase font-mono-custom">Got questions? We've got the data.</p>
        </div>

        <div className="space-y-4">
          <details className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 group cursor-pointer transition-all hover:border-[#C7FF00]/40">
            <summary className="font-extrabold text-sm uppercase tracking-wider text-white flex justify-between items-center list-none">
              <span>HOW DOES THE 24/7 KEY PASS WORK?</span>
              <span className="text-[#C7FF00] group-open:rotate-180 transition-transform font-bold text-lg">+</span>
            </summary>
            <p className="mt-4 text-xs text-zinc-400 leading-relaxed font-medium">
              Your digital QR key pass updates dynamically inside the Kinetic mobile app. Simply scan at the biometric speed gates at any flagship location for sub-second keyless entry.
            </p>
          </details>

          <details className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 group cursor-pointer transition-all hover:border-[#C7FF00]/40">
            <summary className="font-extrabold text-sm uppercase tracking-wider text-white flex justify-between items-center list-none">
              <span>CAN I CANCEL OR PAUSE ANY TIME?</span>
              <span className="text-[#C7FF00] group-open:rotate-180 transition-transform font-bold text-lg">+</span>
            </summary>
            <p className="mt-4 text-xs text-zinc-400 leading-relaxed font-medium">
              Yes! We do not believe in locking athletes into predatory contracts. Pause or cancel your membership with 1-click directly from your dashboard anytime.
            </p>
          </details>

          <details className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 group cursor-pointer transition-all hover:border-[#C7FF00]/40">
            <summary className="font-extrabold text-sm uppercase tracking-wider text-white flex justify-between items-center list-none">
              <span>DO YOU OFFER STUDENT OR MILITARY DISCOUNTS?</span>
              <span className="text-[#C7FF00] group-open:rotate-180 transition-transform font-bold text-lg">+</span>
            </summary>
            <p className="mt-4 text-xs text-zinc-400 leading-relaxed font-medium">
              Yes, active students, military personnel, and first responders receive a 15% discount on all monthly tiers upon verifying credentials.
            </p>
          </details>

          <details className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 group cursor-pointer transition-all hover:border-[#C7FF00]/40">
            <summary className="font-extrabold text-sm uppercase tracking-wider text-white flex justify-between items-center list-none">
              <span>ARE GUEST PASSES REALLY INCLUDED?</span>
              <span className="text-[#C7FF00] group-open:rotate-180 transition-transform font-bold text-lg">+</span>
            </summary>
            <p className="mt-4 text-xs text-zinc-400 leading-relaxed font-medium">
              Kinetic Pro includes 2 monthly guest passes, while Black Tier VIP and Elite Executive include unlimited guest passes for workout partners.
            </p>
          </details>
        </div>
      </div>

      {/* SIMULATED CHECKOUT MODAL */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-[#C7FF00]/50 rounded-2xl max-w-md w-full p-6 relative shadow-[0_0_50px_rgba(199,255,0,0.2)]">
            
            <button
              onClick={() => setSelectedPlan(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            {!paymentComplete ? (
              <div>
                <div className="flex items-center gap-2 text-[#C7FF00] text-xs font-mono-custom font-bold uppercase mb-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>SECURE ENCRYPTED CHECKOUT</span>
                </div>

                <h2 className="text-2xl font-black text-white uppercase font-display">{selectedPlan.name}</h2>
                <p className="text-xs text-zinc-400 mt-1">{selectedPlan.tagline}</p>

                <div className="my-6 p-4 rounded-xl bg-black border border-white/10 flex justify-between items-center">
                  <div>
                    <span className="block text-xs font-bold text-white">Total Charge</span>
                    <span className="text-[10px] text-zinc-400">Includes 24/7 keyless biometric access</span>
                  </div>
                  <span className="text-2xl font-black text-[#C7FF00] font-mono-custom">
                    ${isAnnual ? selectedPlan.priceAnnualMonthly : selectedPlan.priceMonthly}
                  </span>
                </div>

                <div className="space-y-3 mb-6">
                  <div>
                    <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">Cardholder Name</label>
                    <input
                      type="text"
                      defaultValue={user.name}
                      className="w-full bg-zinc-950 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">Card Number (Simulated)</label>
                    <div className="relative">
                      <input
                        type="text"
                        defaultValue="4242 •••• •••• 4242"
                        className="w-full bg-zinc-950 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none font-mono-custom"
                      />
                      <CreditCard className="w-4 h-4 text-zinc-400 absolute right-3 top-3" />
                    </div>
                  </div>
                </div>

                <button
                  onClick={processPayment}
                  disabled={isPaying}
                  className="w-full py-4 bg-[#C7FF00] hover:bg-[#b0e600] text-black font-extrabold text-xs uppercase rounded-xl transition-all shadow-[0_0_20px_rgba(199,255,0,0.4)] flex items-center justify-center gap-2"
                >
                  {isPaying ? (
                    <>
                      <Zap className="w-4 h-4 animate-spin" />
                      <span>AUTHORIZING PAYMENT...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>CONFIRM & ACTIVATED KEY PASS</span>
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-[#C7FF00]/20 text-[#C7FF00] border-2 border-[#C7FF00] flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <Check className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-black text-white uppercase font-display">WELCOME TO {selectedPlan.name}</h2>
                <p className="text-xs text-zinc-300 mt-2">
                  Your biometric key pass has been generated! You now have 24/7 keyless access to KINETIC STRENGTH flagship clubs.
                </p>

                <button
                  onClick={() => setSelectedPlan(null)}
                  className="mt-6 w-full py-3 bg-[#C7FF00] text-black font-extrabold text-xs uppercase rounded-xl"
                >
                  DONE
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
