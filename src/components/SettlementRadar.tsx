import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Info } from 'lucide-react';

interface SettlementRadarProps {
  onCheckIn: (loc: string) => void;
}

const LOCATIONS = [
  { id: 'tanke', name: 'Zentral-Tanke', dist: '0.4km', color: 'text-neon-yellow' },
  { id: 'penny', name: 'Penny-Markt am Block', dist: '1.2km', color: 'text-neon-green' },
  { id: 'spielplatz', name: 'Asozialer Bolzplatz', dist: '0.8km', color: 'text-neon-pink' },
  { id: 'imbiss', name: 'Currywurst-Oase', dist: '2.1km', color: 'text-proll-orange' },
];

export default function SettlementRadar({ onCheckIn }: SettlementRadarProps) {
  return (
    <div className="flex flex-col h-full font-mono">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-black text-neon-green italic">SIEDLUNGS-RADAR</h3>
        <MapPin size={16} className="text-neon-green animate-pulse" />
      </div>
      
      <div className="relative flex-grow bg-black/50 border-2 border-zinc-800 overflow-hidden flex items-center justify-center">
        {/* Radar Rings */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 border border-zinc-700 rounded-full animate-ping opacity-20" />
          <div className="w-32 h-32 border border-zinc-700 rounded-full opacity-10" />
          <div className="w-48 h-48 border border-zinc-700 rounded-full opacity-5" />
        </div>
        
        {/* Center Point */}
        <div className="w-2 h-2 bg-neon-green rounded-full z-10 shadow-[0_0_10px_#00ff00]" />
        
        {/* Mock POIs */}
        <div className="absolute top-10 left-10">
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="text-neon-yellow"><MapPin size={12} /></motion.div>
        </div>
        <div className="absolute bottom-20 right-10">
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2.5 }} className="text-neon-pink"><MapPin size={12} /></motion.div>
        </div>
      </div>

      <div className="mt-4 space-y-2 overflow-y-auto max-h-[150px]">
        {LOCATIONS.map(loc => (
          <div key={loc.id} className="flex items-center justify-between p-2 bg-zinc-800 border border-zinc-700 text-[10px]">
             <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${loc.color.replace('text-', 'bg-')}`} />
                <span className="font-bold">{loc.name}</span>
             </div>
             <div className="flex items-center gap-2">
                <span className="opacity-50">{loc.dist}</span>
                <button 
                  onClick={() => onCheckIn(loc.name)}
                  className="px-2 py-0.5 bg-neon-green text-black font-black hover:bg-white transition-all uppercase"
                >
                  Check!
                </button>
             </div>
          </div>
        ))}
      </div>
      
      <div className="mt-2 text-[8px] opacity-40 flex items-center gap-1">
        <Info size={8} /> Echtzeit-GPS Daten werden benötigt, Junge!
      </div>
    </div>
  );
}
