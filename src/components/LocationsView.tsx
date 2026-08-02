import React, { useState } from 'react';
import { GYM_LOCATIONS } from '../data/mockData';
import { GymLocation } from '../types';
import { MapPin, Clock, Phone, Star, Activity, CheckCircle2, Navigation, Eye, X } from 'lucide-react';

export const LocationsView: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [tourLocation, setTourLocation] = useState<GymLocation | null>(null);

  const cities = ['All', 'New York City', 'London', 'Tokyo', 'Dubai'];

  const filteredLocations = selectedCity === 'All'
    ? GYM_LOCATIONS
    : GYM_LOCATIONS.filter(loc => loc.city === selectedCity);

  return (
    <div className="min-h-screen bg-[#090909] py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C7FF00]/10 border border-[#C7FF00]/30 text-[#C7FF00] text-xs font-mono-custom font-bold uppercase mb-3">
            <MapPin className="w-3.5 h-3.5" />
            <span>GLOBAL FLAGSHIP PASSPORT</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white uppercase font-display tracking-tight">
            FLAGSHIP <span className="text-[#C7FF00]">CLUBS</span>
          </h1>
          <p className="text-sm text-zinc-400 mt-2 max-w-2xl">
            Architecturally designed high-yield training environments in Soho NYC, Mayfair London, Shibuya Tokyo, and Downtown Dubai.
          </p>
        </div>

        {/* CITY FILTERS */}
        <div className="flex flex-wrap gap-2">
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => setSelectedCity(city)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all ${
                selectedCity === city
                  ? 'bg-[#C7FF00] text-black shadow-md'
                  : 'bg-zinc-900 text-zinc-300 hover:text-white border border-white/10'
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      {/* CLUBS CARDS */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredLocations.map((club) => (
          <div
            key={club.id}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden hover:border-[#C7FF00]/50 transition-all duration-300 group flex flex-col justify-between"
          >
            <div>
              {/* IMAGE HEADER */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={club.image}
                  alt={club.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />

                {/* CAPACITY BADGE */}
                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-full flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${
                    club.liveCapacityPercent < 50 ? 'bg-[#C7FF00] animate-ping' : 'bg-amber-400'
                  }`} />
                  <span className="text-[11px] font-mono-custom font-bold text-white uppercase">
                    {club.liveCapacityPercent}% CAPACITY (LIVE)
                  </span>
                </div>

                <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-[#C7FF00] flex items-center gap-1 border border-[#C7FF00]/30">
                  <Star className="w-3.5 h-3.5 fill-[#C7FF00]" />
                  <span>{club.rating}</span>
                </div>
              </div>

              {/* DETAILS */}
              <div className="p-8">
                <h3 className="text-xl font-black text-white uppercase font-display group-hover:text-[#C7FF00] transition-colors">
                  {club.name}
                </h3>
                <p className="text-xs text-zinc-400 mt-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C7FF00]" />
                  <span>{club.address}</span>
                </p>

                <div className="mt-4 flex items-center gap-4 text-xs text-zinc-300 font-mono-custom border-y border-white/10 py-3">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#C7FF00]" />
                    {club.hours}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-[#C7FF00]" />
                    {club.phone}
                  </span>
                </div>

                {/* AMENITIES */}
                <div className="mt-4">
                  <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider block mb-2">
                    FLAGSHIP AMENITIES & RIGS
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {club.amenities.map((amenity, idx) => (
                      <span
                        key={idx}
                        className="bg-black/60 text-zinc-300 text-[11px] px-3 py-1 rounded-full border border-white/5 flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3 h-3 text-[#C7FF00]" />
                        <span>{amenity}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="p-8 pt-0 flex gap-3">
              <button
                onClick={() => setTourLocation(club)}
                className="flex-1 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-white/10 transition-all"
              >
                <Eye className="w-4 h-4 text-[#C7FF00]" />
                <span>3D Virtual Tour</span>
              </button>

              <button
                onClick={() => alert(`Directions to ${club.name} loaded on your mobile map!`)}
                className="px-6 py-3.5 rounded-full bg-[#C7FF00] hover:bg-[#b0e600] text-black font-black text-xs uppercase flex items-center justify-center gap-1.5 transition-all shadow-[0_0_15px_rgba(199,255,0,0.2)]"
              >
                <Navigation className="w-4 h-4" />
                <span>Directions</span>
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* VIRTUAL TOUR MODAL */}
      {tourLocation && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-[#C7FF00]/40 rounded-2xl max-w-2xl w-full p-6 relative">
            <button
              onClick={() => setTourLocation(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] font-mono-custom font-bold text-[#C7FF00] uppercase tracking-widest block mb-1">
              3D VIRTUAL IMMERSIVE TOUR
            </span>
            <h2 className="text-2xl font-black text-white uppercase font-display">{tourLocation.name}</h2>
            <p className="text-xs text-zinc-400 mt-1">{tourLocation.address}</p>

            <div className="mt-4 relative rounded-2xl overflow-hidden h-72 border border-white/15">
              <img src={tourLocation.image} alt={tourLocation.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <span className="bg-black/80 backdrop-blur-md text-[#C7FF00] border border-[#C7FF00] px-4 py-2 rounded-xl text-xs font-bold uppercase font-mono-custom">
                  360° Interactive View Mode Active
                </span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
              <div className="bg-black/60 p-3 rounded-xl border border-white/10">
                <span className="text-zinc-400 font-bold block text-[10px] uppercase">Lifting Rigs</span>
                <span className="text-white font-bold">12 Eleiko Power Platforms</span>
              </div>
              <div className="bg-black/60 p-3 rounded-xl border border-white/10">
                <span className="text-zinc-400 font-bold block text-[10px] uppercase">Recovery Suites</span>
                <span className="text-white font-bold">Dual Cryo & Infrared Saunas</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
