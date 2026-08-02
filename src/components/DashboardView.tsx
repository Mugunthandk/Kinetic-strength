import React, { useState } from 'react';
import { User, ViewMode } from '../types';
import { QrCode, Activity, Flame, Trophy, Calendar, Sparkles, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { WorkoutLogger } from './WorkoutLogger';

interface DashboardViewProps {
  user: User;
  setCurrentView: (view: ViewMode) => void;
  onOpenScanPass: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ user, setCurrentView, onOpenScanPass }) => {
  const [statsState, setStatsState] = useState({
    workoutsCompleted: user.stats.workoutsCompleted,
    totalVolumeKg: user.stats.totalVolumeKg
  });

  const handleUpdateStats = (addedWorkouts: number, addedVolume: number) => {
    setStatsState(prev => ({
      workoutsCompleted: prev.workoutsCompleted + addedWorkouts,
      totalVolumeKg: prev.totalVolumeKg + addedVolume
    }));
  };

  return (
    <div className="min-h-screen bg-[#090909] py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* USER PROFILE BANNER */}
      <div className="bg-zinc-900 border border-[#C7FF00]/40 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-[0_0_30px_rgba(199,255,0,0.1)]">
        <div className="flex items-center gap-5 z-10">
          <img src={user.avatar} alt={user.name} className="w-20 h-20 rounded-2xl object-cover border-2 border-[#C7FF00] shadow-lg" />
          
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono-custom font-extrabold text-[#C7FF00] bg-[#C7FF00]/10 px-2.5 py-0.5 rounded border border-[#C7FF00]/30 uppercase">
                {user.tier === 'black_tier' ? 'BLACK TIER VIP PASSPORT' : 'KINETIC PRO PASSPORT'}
              </span>
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Active Member
              </span>
            </div>

            <h1 className="text-3xl font-black text-white uppercase font-display">{user.name}</h1>
            <p className="text-xs text-zinc-400 font-mono-custom mt-0.5">Member ID: {user.qrCodeId} • Joined {user.joinedDate}</p>
          </div>
        </div>

        <button
          onClick={onOpenScanPass}
          className="px-6 py-4 rounded-xl bg-[#C7FF00] hover:bg-[#b0e600] text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(199,255,0,0.3)] shrink-0 z-10"
        >
          <QrCode className="w-5 h-5" />
          <span>OPEN BIOMETRIC DIGITAL KEY PASS</span>
        </button>
      </div>

      {/* STATS OVERVIEW */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-zinc-900/80 border border-white/10 p-5 rounded-2xl">
          <Activity className="w-5 h-5 text-[#C7FF00] mb-2" />
          <span className="text-3xl font-extrabold text-white font-mono-custom block">{statsState.workoutsCompleted}</span>
          <span className="text-xs text-zinc-400 uppercase font-bold mt-1 block">Workouts Logged</span>
        </div>

        <div className="bg-zinc-900/80 border border-white/10 p-5 rounded-2xl">
          <Flame className="w-5 h-5 text-[#C7FF00] mb-2" />
          <span className="text-3xl font-extrabold text-white font-mono-custom block">{(statsState.totalVolumeKg / 1000).toFixed(1)}k KG</span>
          <span className="text-xs text-zinc-400 uppercase font-bold mt-1 block">Total Lifted Volume</span>
        </div>

        <div className="bg-zinc-900/80 border border-white/10 p-5 rounded-2xl">
          <Trophy className="w-5 h-5 text-[#C7FF00] mb-2" />
          <span className="text-3xl font-extrabold text-white font-mono-custom block">{user.stats.streakDays} DAYS</span>
          <span className="text-xs text-zinc-400 uppercase font-bold mt-1 block">Active Training Streak</span>
        </div>

        <div className="bg-zinc-900/80 border border-white/10 p-5 rounded-2xl">
          <Sparkles className="w-5 h-5 text-[#C7FF00] mb-2" />
          <span className="text-3xl font-extrabold text-white font-mono-custom block">{user.stats.rank}</span>
          <span className="text-xs text-zinc-400 uppercase font-bold mt-1 block">Global Athlete Rank</span>
        </div>
      </div>

      {/* LOG WORKOUT & STRENGTH GAINS PROGRESS CHART */}
      <WorkoutLogger onUpdateStats={handleUpdateStats} />

      {/* QUICK ACTIONS */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-zinc-900/80 border border-white/10 p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <span className="text-[#C7FF00] font-mono-custom text-xs font-bold uppercase tracking-widest block mb-1">
              COMMUNITY LEADERBOARD
            </span>
            <h3 className="text-2xl font-black text-white uppercase font-display">ATHLETE COMMUNITY & PRS</h3>
            <p className="text-xs text-zinc-400 mt-2">Share your workout logs, view gym leaderboards, and celebrate Personal Records with fellow athletes.</p>
          </div>

          <button
            onClick={() => setCurrentView('community')}
            className="mt-6 py-3 px-6 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-between border border-white/10 transition-all"
          >
            <span>VIEW COMMUNITY FEED</span>
            <ArrowRight className="w-4 h-4 text-[#C7FF00]" />
          </button>
        </div>

        <div className="bg-zinc-900/80 border border-white/10 p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <span className="text-[#C7FF00] font-mono-custom text-xs font-bold uppercase tracking-widest block mb-1">
              BOOKING PASSPORT
            </span>
            <h3 className="text-2xl font-black text-white uppercase font-display">RESERVE MASTER TRAINER</h3>
            <p className="text-xs text-zinc-400 mt-2">Book Olympic Lifting, Hypertrophy Metcon, and Cryotherapy recovery suites.</p>
          </div>

          <button
            onClick={() => setCurrentView('schedule')}
            className="mt-6 py-3 px-6 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-between border border-white/10 transition-all"
          >
            <span>VIEW SCHEDULE</span>
            <ArrowRight className="w-4 h-4 text-[#C7FF00]" />
          </button>
        </div>
      </div>

    </div>
  );
};

