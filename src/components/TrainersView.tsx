import React, { useState } from 'react';
import { Star, Award, Calendar, CheckCircle, ChevronRight, Zap, Shield, Sparkles } from 'lucide-react';

interface Coach {
  id: string;
  name: string;
  tag: string;
  bio: string;
  experience: string;
  rating: number;
  image: string;
  specialties: string[];
}

const COACHES: Coach[] = [
  {
    id: 'c1',
    name: 'MARCUS VANCE',
    tag: 'STRENGTH & POWER',
    bio: 'Former IFBB Pro and Strength Conditioning Coach for Elite Athletes. 12+ years optimizing human biomechanics and mechanical tension.',
    experience: '12 YRS EXP',
    rating: 4.99,
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=1000',
    specialties: ['Hypertrophy', 'Powerlifting', 'Biomechanics']
  },
  {
    id: 'c2',
    name: 'ELENA ROSTOVA',
    tag: 'HIIT & METCON',
    bio: 'Ex-Olympic track sprinter with deep expertise in VO2 max expansion, neuromuscular speed, and injury-proofing high-output lifters.',
    experience: '9 YRS EXP',
    rating: 4.98,
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=1000',
    specialties: ['Sprint Mechanics', 'Metabolic Conditioning', 'VO2 Max']
  },
  {
    id: 'c3',
    name: 'DARIUS THORNE',
    tag: 'MOBILITY & STRENGTH',
    bio: 'Master of movement, fascia release, and joint longevity. Helps heavy strength lifters restore full range of motion without strength loss.',
    experience: '11 YRS EXP',
    rating: 4.97,
    image: 'https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?auto=format&fit=crop&q=80&w=1000',
    specialties: ['Fascial Release', 'Joint Mobility', 'Core Stability']
  },
  {
    id: 'c4',
    name: 'JAXSON HAYES',
    tag: 'HYPERTROPHY SPEC',
    bio: 'Data-driven muscle building specialist. Utilizes EMG tension measurement and automated bio-feedback recovery loops.',
    experience: '8 YRS EXP',
    rating: 4.96,
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=1000',
    specialties: ['Volume Periodization', 'RPE Auto-regulation', 'Nutrition']
  },
  {
    id: 'c5',
    name: 'SERAPHINA VANCE',
    tag: 'RECOVERY SPECIALIST',
    bio: 'Specializing in cryogenic therapy, hyperbaric oxygen protocols, and sports massage therapy for rapid systemic CNS recovery.',
    experience: '10 YRS EXP',
    rating: 4.99,
    image: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&q=80&w=1000',
    specialties: ['Cryo Protocol', 'CNS Recovery', 'Myofascial Release']
  },
  {
    id: 'c6',
    name: 'KAI RODRIGUEZ',
    tag: 'OLYMPIC LIFTING',
    bio: 'National Olympic weightlifting coach focused on explosive snatch and clean-and-jerk trajectory optimization.',
    experience: '14 YRS EXP',
    rating: 4.98,
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=1000',
    specialties: ['Barbell Velocity', 'Explosive Power', 'Triple Extension']
  }
];

export const TrainersView: React.FC = () => {
  const [bookedCoachId, setBookedCoachId] = useState<string | null>(null);

  const handleBookSession = (coach: Coach) => {
    setBookedCoachId(coach.id);
    alert(`1-on-1 VIP Session with ${coach.name} reserved! Check your dashboard for scheduling details.`);
  };

  return (
    <div className="min-h-screen bg-[#090909] text-white py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* HEADER SECTION MATCHING THE MOCKUP */}
      <div className="text-center max-w-4xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C7FF00]/10 border border-[#C7FF00]/30 text-[#C7FF00] text-xs font-mono-custom font-black uppercase mb-4 tracking-widest">
          <Award className="w-4 h-4 text-[#C7FF00]" />
          <span>ELITE INSTRUCTORS</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tighter font-display leading-[0.9]">
          MEET YOUR COACHES - <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-[#C7FF00]">
            THE BEST IN THE BUSINESS
          </span>
        </h1>

        <p className="mt-6 text-sm sm:text-base text-zinc-400 font-medium leading-relaxed max-w-2xl mx-auto">
          Built on discipline, forged in iron. Our trainers aren't just instructors — they are athletes, mentors, and the driving force behind your next personal record.
        </p>
      </div>

      {/* COACHES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {COACHES.map((coach) => {
          const isBooked = bookedCoachId === coach.id;

          return (
            <div
              key={coach.id}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden hover:border-[#C7FF00]/50 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* PHOTO CONTAINER */}
                <div className="relative h-72 overflow-hidden bg-zinc-950">
                  <img
                    src={coach.image}
                    alt={coach.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent opacity-60" />

                  {/* SPECIALTY TAG BADGE */}
                  <span className="absolute top-4 left-4 bg-black/80 backdrop-blur-md text-[#C7FF00] border border-[#C7FF00]/40 font-mono-custom font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">
                    {coach.tag}
                  </span>

                  {/* RATING BADGE */}
                  <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md text-white font-mono-custom text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 border border-white/10">
                    <Star className="w-3.5 h-3.5 fill-[#C7FF00] text-[#C7FF00]" />
                    <span>{coach.rating}</span>
                  </div>
                </div>

                {/* INFO CONTENT */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-black uppercase tracking-tight font-display text-white group-hover:text-[#C7FF00] transition-colors">
                      {coach.name}
                    </h3>
                    <span className="text-[10px] font-mono-custom text-zinc-400 font-bold bg-white/5 px-2 py-1 rounded border border-white/10">
                      {coach.experience}
                    </span>
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed mb-4 min-h-[50px]">
                    {coach.bio}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {coach.specialties.map((spec, i) => (
                      <span key={i} className="text-[10px] font-mono-custom text-zinc-300 bg-black/50 px-2.5 py-1 rounded-full border border-white/10">
                        • {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* ACTION BUTTON */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => handleBookSession(coach)}
                  disabled={isBooked}
                  className={`w-full py-3.5 rounded-full font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                    isBooked
                      ? 'bg-zinc-800 text-[#C7FF00] border border-[#C7FF00]/40'
                      : 'bg-[#C7FF00] hover:bg-[#b0e600] text-black shadow-[0_0_20px_rgba(199,255,0,0.3)]'
                  }`}
                >
                  {isBooked ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-[#C7FF00]" />
                      <span>SESSION RESERVED</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 fill-black" />
                      <span>BOOK SESSION</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* GIANT NEON LIME BANNER MATCHING THE MOCKUP */}
      <div className="bg-[#C7FF00] rounded-3xl p-8 sm:p-12 text-black text-center relative overflow-hidden shadow-[0_0_50px_rgba(199,255,0,0.25)]">
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tighter font-display leading-none mb-4">
            DON'T SETTLE FOR AVERAGE.
          </h2>
          <p className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-black/80 mb-8 max-w-xl mx-auto">
            CONNECT WITH A MASTER TRAINER TODAY AND ACCELERATE YOUR HYPERTROPHY AND PERFORMANCE GOALS.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => alert('Searching for your personal coach match based on your goals...')}
              className="px-8 py-4 bg-black text-[#C7FF00] font-black text-xs uppercase tracking-wider rounded-full hover:bg-zinc-900 transition-all shadow-lg flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#C7FF00]" />
              <span>FIND YOUR MATCH</span>
            </button>

            <button
              onClick={() => alert('Opening Virtual Consultation Booking Calendar...')}
              className="px-8 py-4 bg-transparent border-2 border-black text-black font-black text-xs uppercase tracking-wider rounded-full hover:bg-black hover:text-[#C7FF00] transition-all"
            >
              <span>VIRTUAL CONSULT</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
