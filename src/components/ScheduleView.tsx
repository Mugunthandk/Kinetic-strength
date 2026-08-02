import React, { useState } from 'react';
import { SCHEDULED_CLASSES } from '../data/mockData';
import { ClassSession } from '../types';
import { Calendar, Clock, MapPin, Users, Flame, Check, Sparkles, Filter } from 'lucide-react';

export const ScheduleView: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<string>('DAY 1 - MON');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [selectedLevel, setSelectedLevel] = useState<string>('ALL');
  const [bookedClassIds, setBookedClassIds] = useState<string[]>([]);

  const days = [
    { label: 'DAY 1', day: 'MON' },
    { label: 'DAY 2', day: 'TUE' },
    { label: 'DAY 3', day: 'WED' },
    { label: 'DAY 4', day: 'THU' },
    { label: 'DAY 5', day: 'FRI' },
    { label: 'DAY 6', day: 'SAT' },
    { label: 'DAY 7', day: 'SUN' },
  ];

  const categories = ['ALL', 'HYPERTROPHY', 'HIIT & METCON', 'OLYMPIC LIFTING', 'CRYO & RECOVERY'];
  const levels = ['ALL', 'BEGINNER', 'ALL LEVELS', 'ADVANCED'];

  const filteredClasses = SCHEDULED_CLASSES.filter(c => {
    const matchCat = selectedCategory === 'ALL' || c.category === selectedCategory;
    return matchCat;
  });

  const handleBook = (id: string) => {
    if (!bookedClassIds.includes(id)) {
      setBookedClassIds([...bookedClassIds, id]);
    }
  };

  return (
    <div className="min-h-screen bg-[#090909] text-white py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* HERO HERO BANNER WITH ATHLETE BACKGROUND */}
      <div className="relative rounded-3xl overflow-hidden mb-12 border border-white/10 bg-zinc-950 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=1600"
            alt="Workout background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#090909] via-[#090909]/90 to-transparent" />
        </div>

        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C7FF00]/10 border border-[#C7FF00]/30 text-[#C7FF00] text-xs font-mono-custom font-bold uppercase mb-4">
            <Calendar className="w-3.5 h-3.5" />
            <span>EXECUTIVE CLASS RESERVATIONS</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter font-display leading-tight">
            WEEKLY <span className="text-[#C7FF00]">SCHEDULE</span>
          </h1>

          <p className="mt-4 text-sm sm:text-base text-zinc-300 leading-relaxed font-medium">
            Engineered for maximum adaptation. Reserve your position in small-group high-yield training blocks led by Olympic and IFBB Master Trainers.
          </p>
        </div>

        <div className="relative z-10 hidden lg:block">
          <div className="bg-black/80 backdrop-blur-xl border border-white/15 p-6 rounded-2xl w-72 text-center">
            <div className="text-[10px] font-mono-custom font-bold text-[#C7FF00] tracking-widest uppercase mb-1">LIVE CLUB CAPACITY</div>
            <div className="text-3xl font-black font-display text-white">42% FULL</div>
            <p className="text-[11px] text-zinc-400 mt-2">SoHo NYC Flagship • Peak Lifting Hours 17:00-19:00</p>
          </div>
        </div>
      </div>

      {/* DAY SELECTOR TABS BAR */}
      <div className="mb-8">
        <div className="text-xs font-mono-custom font-bold text-zinc-400 uppercase tracking-widest mb-3 flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#C7FF00]" />
          <span>SELECT TRAINING DAY</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {days.map((item) => {
            const keyName = `${item.label} - ${item.day}`;
            const isActive = selectedDay === keyName;

            return (
              <button
                key={item.day}
                onClick={() => setSelectedDay(keyName)}
                className={`py-3 px-3 rounded-2xl text-center border transition-all ${
                  isActive
                    ? 'bg-[#C7FF00] text-black border-[#C7FF00] font-black shadow-[0_0_20px_rgba(199,255,0,0.3)]'
                    : 'bg-white/5 text-zinc-400 hover:text-white border-white/10 hover:border-white/20 font-bold'
                }`}
              >
                <div className="text-[10px] font-mono-custom uppercase opacity-70">{item.label}</div>
                <div className="text-base font-display font-black">{item.day}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* FILTERS BAR */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/10 mb-8">
        <div className="flex items-center gap-2 text-xs font-mono-custom font-bold uppercase text-zinc-300">
          <Filter className="w-4 h-4 text-[#C7FF00]" />
          <span>FILTER SESSIONS:</span>
        </div>

        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold uppercase transition-all ${
                selectedCategory === cat
                  ? 'bg-[#C7FF00] text-black font-black'
                  : 'bg-black/50 text-zinc-400 hover:text-white border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* CLASSES LIST */}
      <div className="space-y-4">
        {filteredClasses.map((session) => {
          const isBooked = bookedClassIds.includes(session.id);

          return (
            <div
              key={session.id}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[#C7FF00]/50 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <img
                  src={session.trainerAvatar}
                  alt={session.trainerName}
                  className="w-14 h-14 rounded-2xl object-cover border border-[#C7FF00]/40 shrink-0"
                />

                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-mono-custom font-extrabold text-[#C7FF00] bg-[#C7FF00]/10 px-2.5 py-0.5 rounded-full border border-[#C7FF00]/30 uppercase">
                      {session.category}
                    </span>
                    <span className="text-xs font-bold text-zinc-400 flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-orange-400" />
                      {session.intensity} Intensity
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-white uppercase font-display group-hover:text-[#C7FF00] transition-colors">
                    {session.title}
                  </h3>

                  <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-zinc-400 font-mono-custom">
                    <span className="text-white font-bold">Coach: {session.trainerName}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#C7FF00]" />
                      {session.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#C7FF00]" />
                      {session.locationName}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-6 pt-4 md:pt-0 border-t md:border-t-0 border-white/10">
                <div className="text-right">
                  <span className="text-xs font-mono-custom font-bold text-zinc-300 block">
                    <Users className="w-3.5 h-3.5 inline mr-1 text-[#C7FF00]" />
                    {session.spotsLeft} SPOTS LEFT
                  </span>
                  <span className="text-[10px] text-zinc-500 uppercase">Cap: {session.maxCapacity} Athletes</span>
                </div>

                <button
                  onClick={() => handleBook(session.id)}
                  disabled={isBooked}
                  className={`px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-wider flex items-center gap-2 transition-all ${
                    isBooked
                      ? 'bg-zinc-800 text-[#C7FF00] border border-[#C7FF00]/40 cursor-default'
                      : 'bg-[#C7FF00] hover:bg-[#b0e600] text-black shadow-[0_0_20px_rgba(199,255,0,0.3)] hover:scale-105'
                  }`}
                >
                  {isBooked ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>SPOT RESERVED</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 fill-black" />
                      <span>BOOK NOW</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};

