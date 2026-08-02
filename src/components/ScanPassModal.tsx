import React, { useState } from 'react';
import { User } from '../types';
import { QrCode, ShieldCheck, X, CheckCircle2, Lock, Unlock, Zap } from 'lucide-react';

interface ScanPassModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
}

export const ScanPassModal: React.FC<ScanPassModalProps> = ({ isOpen, onClose, user }) => {
  const [isUnlocked, setIsUnlocked] = useState(false);

  if (!isOpen) return null;

  const handleSimulateScan = () => {
    setIsUnlocked(true);
    setTimeout(() => {
      setIsUnlocked(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-zinc-950 border-2 border-[#C7FF00]/60 rounded-3xl max-w-sm w-full p-6 text-center relative shadow-[0_0_50px_rgba(199,255,0,0.3)]">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C7FF00]/10 border border-[#C7FF00]/40 text-[#C7FF00] text-[10px] font-mono-custom font-extrabold uppercase mb-4">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>24/7 BIOMETRIC SPEED GATE</span>
        </div>

        <h2 className="text-2xl font-black text-white uppercase font-display">{user.name}</h2>
        <p className="text-xs text-zinc-400 font-mono-custom mt-0.5">{user.tier.toUpperCase().replace('_', ' ')} MEMBER</p>

        {/* QR CODE SCANNER BOX */}
        <div className="my-6 p-6 rounded-2xl bg-black border border-white/15 relative overflow-hidden flex flex-col items-center justify-center">
          
          {!isUnlocked ? (
            <>
              {/* SCANNING LASER LINE */}
              <div className="w-full h-1 bg-[#C7FF00] shadow-[0_0_15px_#C7FF00] absolute top-2 animate-bounce" />
              
              <div className="w-48 h-48 bg-white p-3 rounded-xl shadow-inner flex items-center justify-center">
                {/* Generated QR visual pattern */}
                <svg className="w-full h-full text-black" viewBox="0 0 100 100" fill="currentColor">
                  <path d="M0,0 h30 v30 h-30 z M10,10 h10 v10 h-10 z M70,0 h30 v30 h-30 z M80,10 h10 v10 h-10 z M0,70 h30 v30 h-30 z M10,80 h10 v10 h-10 z M40,10 h10 v20 h-10 z M10,40 h20 v10 h-20 z M40,40 h20 v20 h-20 z M70,40 h20 v10 h-20 z M40,70 h20 v20 h-20 z M70,70 h30 v10 h-30 z M80,85 h10 v15 h-10 z" />
                </svg>
              </div>

              <span className="text-[10px] font-mono-custom text-zinc-400 mt-4 block uppercase font-bold">
                Pass ID: {user.qrCodeId}
              </span>
            </>
          ) : (
            <div className="py-8 text-center animate-in zoom-in-90 duration-300">
              <div className="w-16 h-16 rounded-full bg-[#C7FF00] text-black flex items-center justify-center mx-auto mb-3 shadow-[0_0_30px_#C7FF00]">
                <Unlock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-[#C7FF00] uppercase font-display">SPEED GATE UNLOCKED</h3>
              <p className="text-xs text-white font-bold mt-1">Welcome to KINETIC STRENGTH.</p>
            </div>
          )}

        </div>

        {!isUnlocked && (
          <button
            onClick={handleSimulateScan}
            className="w-full py-3.5 bg-[#C7FF00] hover:bg-[#b0e600] text-black font-extrabold text-xs uppercase rounded-xl transition-all shadow-[0_0_20px_rgba(199,255,0,0.4)] flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4 fill-black" />
            <span>SIMULATE BIOMETRIC SCAN</span>
          </button>
        )}

      </div>
    </div>
  );
};
