import React from 'react';
import { ViewMode } from '../types';
import { Zap, ShieldCheck, MapPin, Instagram, Youtube, Twitter, ArrowUpRight } from 'lucide-react';

interface FooterProps {
  setCurrentView: (view: ViewMode) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentView }) => {
  return (
    <footer className="bg-[#050505] border-t border-white/10 pt-16 pb-12 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-white/10 pb-12">
          
          {/* LOGO & BRAND DESCRIPTION */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-black border border-[#C7FF00] flex items-center justify-center">
                <Zap className="w-5 h-5 text-[#C7FF00] fill-[#C7FF00]/20" />
              </div>
              <span className="font-display font-extrabold text-lg text-white uppercase tracking-wider">
                KINETIC <span className="text-[#C7FF00]">STRENGTH</span>
              </span>
            </div>

            <p className="text-zinc-400 leading-relaxed text-xs max-w-sm">
              The world standard in ultra-premium fitness management, generative AI strength programming, biometric access, and athletic recovery.
            </p>

            <div className="pt-2 flex items-center gap-3 text-white">
              <a href="#instagram" className="p-2 rounded-lg bg-zinc-900 border border-white/10 hover:border-[#C7FF00] transition-colors">
                <Instagram className="w-4 h-4 text-[#C7FF00]" />
              </a>
              <a href="#youtube" className="p-2 rounded-lg bg-zinc-900 border border-white/10 hover:border-[#C7FF00] transition-colors">
                <Youtube className="w-4 h-4 text-[#C7FF00]" />
              </a>
              <a href="#twitter" className="p-2 rounded-lg bg-zinc-900 border border-white/10 hover:border-[#C7FF00] transition-colors">
                <Twitter className="w-4 h-4 text-[#C7FF00]" />
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-bold text-white uppercase text-xs tracking-wider">PLATFORM</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => setCurrentView('trainers')} className="hover:text-[#C7FF00] transition-colors">
                  Elite Trainers
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('memberships')} className="hover:text-[#C7FF00] transition-colors">
                  Memberships
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('schedule')} className="hover:text-[#C7FF00] transition-colors">
                  Class Schedule
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('store')} className="hover:text-[#C7FF00] transition-colors">
                  Athlete Gear Store
                </button>
              </li>
            </ul>
          </div>

          {/* FLAGSHIP LOCATIONS */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-bold text-white uppercase text-xs tracking-wider">FLAGSHIP PASSPORTS</h4>
            <ul className="space-y-2 font-mono-custom">
              <li className="flex items-center gap-1.5 text-zinc-300">
                <MapPin className="w-3.5 h-3.5 text-[#C7FF00]" />
                <span>SoHo — New York City</span>
              </li>
              <li className="flex items-center gap-1.5 text-zinc-300">
                <MapPin className="w-3.5 h-3.5 text-[#C7FF00]" />
                <span>Mayfair — London</span>
              </li>
              <li className="flex items-center gap-1.5 text-zinc-300">
                <MapPin className="w-3.5 h-3.5 text-[#C7FF00]" />
                <span>Shibuya — Tokyo</span>
              </li>
              <li className="flex items-center gap-1.5 text-zinc-300">
                <MapPin className="w-3.5 h-3.5 text-[#C7FF00]" />
                <span>Downtown — Dubai</span>
              </li>
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-bold text-white uppercase text-xs tracking-wider">ATHLETE DISPATCH</h4>
            <p className="text-zinc-400 text-xs">Subscribe for high-yield sports science research & drops.</p>

            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed to Kinetic Intelligence!'); }} className="flex gap-1.5">
              <input
                type="email"
                placeholder="athlete@domain.com"
                className="bg-zinc-900 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:border-[#C7FF00] outline-none flex-1"
              />
              <button
                type="submit"
                className="bg-[#C7FF00] text-black font-extrabold px-3 py-2 rounded-xl hover:bg-[#b0e600] transition-colors"
              >
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono-custom text-zinc-500">
          <span>© {new Date().getFullYear()} KINETIC STRENGTH INC. ALL RIGHTS RESERVED.</span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-[#C7FF00]">
              <ShieldCheck className="w-3.5 h-3.5" /> PWA READY & BIOMETRIC ENCRYPTED
            </span>
            <a href="#privacy" className="hover:text-zinc-300">PRIVACY</a>
            <a href="#terms" className="hover:text-zinc-300">TERMS</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
