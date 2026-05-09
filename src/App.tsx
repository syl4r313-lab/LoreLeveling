/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Dumbbell, 
  MapPin, 
  Trash2, 
  Zap, 
  Flame, 
  User, 
  Camera, 
  TrendingUp,
  Footprints,
  Beer,
  Award
} from 'lucide-react';
import { CHARACTER_CLASSES, DAILY_ADVENTURES, ClassId, CharacterState } from './types';
import { useActivityStats } from './services/activityService';
import { validateHealthyFood } from './services/aiService';
import SchnickSchnackBattle from './components/SchnickSchnackBattle';
import CharacterVisual from './components/CharacterVisual';
import SettlementRadar from './components/SettlementRadar';

export default function App() {
  const [stats, setStats] = useState<CharacterState>({
    steps: 0,
    altitude: 0,
    strengthPoints: 0,
    stamina: 0,
    level: 1,
    credibility: 1000,
    muscleMass: 10,
    equipped: [],
  });

  const [isOnboarded, setIsOnboarded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<'quest' | 'stats' | 'tuning' | 'radar' | 'battle'>('quest');
  const [selectedClass, setSelectedClass] = useState<ClassId | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const handleClassSelect = (id: ClassId) => {
    setSelectedClass(id);
  };

  const handleQuestAction = () => {
    setIsCapturing(true);
    setTimeout(() => {
      setIsCapturing(false);
      setStats(prev => ({
        ...prev,
        credibility: prev.credibility + 150,
        strengthPoints: prev.strengthPoints + 1,
        muscleMass: Math.min(100, prev.muscleMass + 5)
      }));
    }, 2000);
  };

  const handleBuy = (id: string, cost: number) => {
    if (stats.credibility >= cost && !stats.equipped.includes(id)) {
      setStats(prev => ({
        ...prev,
        credibility: prev.credibility - cost,
        equipped: [...prev.equipped, id]
      }));
    }
  };

  const TUNING_ITEMS = [
    { id: 'tribal', title: 'Tribal-Tinte', cost: 500, effect: '+5 STR', icon: '💉' },
    { id: 'spoiler', title: 'Spoilersatz', cost: 1200, effect: '+10 SPEED', icon: '🏎️' },
    { id: 'tiger', title: 'Tiger-Print', cost: 2000, effect: '+20 CRED', icon: '🐯' },
    { id: 'vokuhila', title: 'Turbo-Vokuhila', cost: 1500, effect: '+15 CHARISMA', icon: '💇‍♂️' },
  ];

  const currentClass = CHARACTER_CLASSES.find(c => c.id === selectedClass);

  const toggleMusic = () => {
    const audio = document.getElementById('bg-music') as HTMLAudioElement;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(e => console.log("Audio play blocked", e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="h-screen bg-trash-black text-white font-display overflow-hidden">
      {/* Audio Element (Hidden) - MUST be at top level to be available during onboarding transition */}
      <audio id="bg-music" loop>
        <source src="https://cdn.pixabay.com/audio/2022/10/26/audio_f5511dc756.mp3" type="audio/mpeg" />
      </audio>

      {!isOnboarded ? (
        <div className="h-full flex flex-col items-center justify-center p-6 text-center">
          <motion.div 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            className="relative z-10"
          >
            <h1 className="text-8xl text-neon-green italic mb-4 animate-pulse">LORE LEVELING</h1>
            <div className="bento-card bento-card-pink mb-8 p-8 -skew-x-6">
              <h2 className="text-2xl text-white mb-4 uppercase font-black">--- WERBUNG / GELDREGEN ---</h2>
              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-zinc-800 p-4 border border-neon-yellow">
                    <p className="text-neon-yellow text-xs font-black">DOSENBIER-ABO</p>
                    <p className="text-[10px]">NUR 9,99€ / MONAT</p>
                 </div>
                 <div className="bg-zinc-800 p-4 border border-neon-pink">
                    <p className="text-neon-pink text-xs font-black">TURBO-WACHS</p>
                    <p className="text-[10px]">FÜR DEIN MANTA</p>
                 </div>
              </div>
            </div>
            
            <button 
              onClick={() => {
                 setIsOnboarded(true);
                 toggleMusic();
              }}
              className="px-12 py-6 bg-neon-green text-black font-black text-3xl italic -skew-x-12 hover:scale-110 transition-all shadow-[0_0_30px_#00ff00]"
            >
              STARTEN, JUNGE!
            </button>
            
            <p className="mt-8 text-zinc-600 font-mono text-[10px] uppercase">
              Mit dem Klick akzeptierst du, dass du kein Lappen mehr sein willst.
            </p>
          </motion.div>
          
          {/* Background Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
             <div className="grid grid-cols-12 gap-4 h-full">
                {Array.from({length: 48}).map((_, i) => (
                  <div key={i} className="border border-zinc-800 h-24" />
                ))}
             </div>
          </div>
        </div>
      ) : !selectedClass ? (
        <div className="min-h-screen p-6 flex flex-col items-center justify-center bg-[url('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          
          <motion.div 
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="relative z-10 text-center mb-8"
          >
            <h1 className="text-6xl md:text-8xl text-neon-green mb-2 drop-shadow-[0_5px_0_rgba(255,255,255,1)]">
              Lore Leveling
            </h1>
            <p className="text-2xl font-mono text-neon-yellow">Level deinen Proll, Junge!</p>
          </motion.div>

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
            {CHARACTER_CLASSES.map((cls) => (
              <motion.div
                key={cls.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleClassSelect(cls.id)}
                className="bento-card bento-card-orange cursor-pointer group hover:bg-black/40"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl text-neon-green italic leading-none">{cls.name}</h3>
                  <span className="text-[10px] bg-white text-black px-2 py-1 font-mono uppercase font-black">{cls.archetype}</span>
                </div>
                <p className="text-gray-400 text-xs mb-4 leading-relaxed font-mono">{cls.description}</p>
                <div className="flex items-center gap-2 text-proll-orange font-mono text-[10px] font-black uppercase">
                  <Zap size={14} /> Waffe: {cls.weapon}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ) : (
        <div className="h-full flex flex-col p-6">
          {/* Header Section */}
          <header className="flex justify-between items-end mb-6 border-b-4 border-neon-green pb-2 shrink-0">
            <div>
              <h1 className="text-4xl md:text-6xl text-neon-green italic leading-none">LORE LEVELING</h1>
              <p className="text-[10px] md:text-sm font-bold tracking-widest text-zinc-400 uppercase">DIE SIEDLUNG GEHÖRT DIR, JUNGE!</p>
            </div>
            <div className="flex items-center gap-6 text-right">
              <button 
                onClick={toggleMusic}
                className={`p-2 border-2 transition-all ${isPlaying ? 'border-neon-green text-neon-green shadow-[0_0_10px_#00ff00]' : 'border-zinc-700 text-zinc-700'}`}
              >
                {isPlaying ? <Zap size={20} className="animate-pulse" /> : <Zap size={20} />}
              </button>
              <div>
                <div className="text-[10px] md:text-xs font-mono text-neon-green uppercase">STRASSEN-CREDIBILITY</div>
                <div className="text-2xl md:text-4xl font-black">LEVEL {stats.level}</div>
              </div>
            </div>
          </header>

          {/* Main Bento Grid */}
          <div className="grid grid-cols-12 grid-rows-6 gap-4 flex-grow min-h-0">
            <AnimatePresence mode="wait">
              {activeTab === 'battle' ? (
                <motion.div 
                  key="battle"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.1, opacity: 0 }}
                  className="col-span-12 row-span-6 bento-card bento-card-green p-0 overflow-hidden"
                >
                  <SchnickSchnackBattle 
                    onWin={() => {
                      setStats(prev => ({ ...prev, credibility: prev.credibility + 500, level: prev.level + 1 }));
                      setActiveTab('quest');
                    }} 
                    onLose={() => {
                      setStats(prev => ({ ...prev, credibility: Math.max(0, prev.credibility - 200) }));
                      setActiveTab('quest');
                    }} 
                  />
                </motion.div>
              ) : (
                <>
                  {/* Character Profile Card */}
                  <div className="col-span-12 lg:col-span-4 row-span-2 lg:row-span-4 bento-card overflow-hidden">
                    <div className="absolute top-2 right-2 bg-neon-pink text-black text-[10px] font-black px-2 py-1 rotate-12 z-10">ACTIVE CLASS</div>
                    <h2 className="text-2xl text-neon-green italic mb-2">{currentClass?.name}</h2>
                    <div className="flex-grow bg-zinc-800 border-2 border-dashed border-zinc-700 my-2 min-h-[200px] overflow-hidden">
                       <CharacterVisual muscleMass={stats.muscleMass} equipped={stats.equipped} />
                    </div>
                    <div className="space-y-2 mt-2">
                      <div className="flex justify-between text-xs border-b border-zinc-800 pb-1">
                        <span className="opacity-60 uppercase">Waffe</span>
                        <span className="font-bold">{currentClass?.weapon}</span>
                      </div>
                      <div className="flex justify-between text-xs border-b border-zinc-800 pb-1">
                        <span className="opacity-60 uppercase">Primary Info</span>
                        <span className="font-bold text-neon-pink">{currentClass?.primaryStat}: +42</span>
                      </div>
                    </div>
                  </div>

                  {/* Stats Engine (The Schweiß-O-Meter) */}
                  <div className="col-span-12 lg:col-span-5 row-span-2 lg:row-span-3 bg-neon-green text-black p-4 flex flex-col min-h-[160px]">
                    <div className="flex justify-between items-start">
                      <h2 className="text-2xl md:text-3xl italic leading-none">SCHWEISS-O-METER</h2>
                      <span className="text-[10px] font-mono font-bold border-2 border-black px-1 shrink-0">REAL-TIME ENGINE</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4 flex-grow">
                      <div className="border-t-4 border-black pt-2">
                        <div className="text-[10px] font-black uppercase">Manta-Sprint-Meter</div>
                        <div className="text-xl md:text-2xl font-black">{(stats.steps * 0.7 / 1000).toFixed(3)} <span className="text-xs">KM</span></div>
                      </div>
                      <div className="border-t-4 border-black pt-2">
                        <div className="text-[10px] font-black uppercase">Bizeps-Turbo-Booster</div>
                        <div className="text-xl md:text-2xl font-black">{stats.strengthPoints * 5} <span className="text-xs">KG</span></div>
                      </div>
                      <div className="border-t-4 border-black pt-2">
                        <div className="text-[10px] font-black uppercase">Dosenbier-Stamina</div>
                        <div className="text-xl md:text-2xl font-black">{Math.floor(stats.stamina)} <span className="text-xs">%</span></div>
                      </div>
                      <div className="border-t-4 border-black pt-2">
                        <div className="text-[10px] font-black uppercase">Tuning-Punkte</div>
                        <div className="text-xl md:text-2xl font-black">{stats.credibility}</div>
                      </div>
                    </div>
                  </div>

                  {/* Daily Quests Card */}
                  <div className="col-span-12 lg:col-span-3 row-span-2 lg:row-span-6 bento-card bento-card-pink flex flex-col overflow-hidden shrink-0">
                    <h2 className="text-xl text-neon-pink italic mb-4">SIEDLUNGS-TASKS</h2>
                    <div className="space-y-3 flex-grow overflow-y-auto">
                      {DAILY_ADVENTURES.map((adv) => (
                        <motion.div 
                          key={adv.id} 
                          whileHover={{ scale: 1.02 }}
                          onClick={handleQuestAction}
                          className="p-2 bg-zinc-800 border-l-4 border-neon-green relative cursor-pointer group"
                        >
                          <p className="text-xs font-black group-hover:text-neon-green transition-colors">{adv.title}</p>
                          <p className="text-[10px] opacity-60 uppercase">{adv.requirement}</p>
                          <span className="absolute right-2 top-2 text-[10px] font-mono text-zinc-500">READY</span>
                        </motion.div>
                      ))}
                    </div>
                    <div className="mt-auto pt-4 space-y-2">
                      <button 
                        onClick={handleQuestAction}
                        disabled={isCapturing}
                        className="w-full py-3 bg-neon-pink text-black font-black uppercase text-sm -skew-x-12 hover:bg-white transition-colors"
                      >
                        {isCapturing ? 'LEVELING...' : 'MISSION STARTEN!'}
                      </button>
                      <button 
                        onClick={() => setActiveTab('battle')}
                        className="w-full py-3 bg-white text-black font-black uppercase text-sm -skew-x-12 hover:bg-neon-yellow transition-colors"
                      >
                        GOSSEN-DUELL (SCHNICK-SCHNACK)
                      </button>
                    </div>
                  </div>

                  {/* Upgrades or Radar */}
                  {activeTab === 'radar' ? (
                    <div className="col-span-12 lg:col-span-5 row-span-2 lg:row-span-3 bento-card border-neon-yellow">
                      <SettlementRadar onCheckIn={(loc) => {
                        setStats(prev => ({ ...prev, credibility: prev.credibility + 50 }));
                        alert(`Erfolgreich an der ${loc} eingecheckt! +50 Cred, Junge!`);
                      }} />
                    </div>
                  ) : (
                    <div className="col-span-12 lg:col-span-5 row-span-2 lg:row-span-3 bento-card border-white">
                      <h2 className="text-xl italic mb-2">TATTOO- & TUNING-STUDIO</h2>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 flex-grow overflow-y-auto">
                        {TUNING_ITEMS.map(item => (
                          <TuningCard 
                            key={item.id}
                            title={item.title}
                            cost={`${item.cost} Cred`}
                            effect={item.effect}
                            icon={item.icon}
                            onBuy={() => handleBuy(item.id, item.cost)}
                            owned={stats.equipped.includes(item.id)}
                            canAfford={stats.credibility >= item.cost}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Footer / Status Bar Overlay for Desktop */}
                  <div className="col-span-12 lg:col-span-9 row-span-1 border-t border-zinc-800 pt-2 flex justify-between items-center text-[10px] font-mono">
                      <div className="flex gap-4">
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> ANTI-CHEAT: GPS VALIDATED</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-neon-green"></span> WEARABLE CONNECTED</span>
                      </div>
                      <div className="uppercase font-black text-neon-green animate-bounce">HAU REIN, JUNGE!</div>
                  </div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation Rail */}
          <div className="mt-4 flex gap-4 shrink-0 overflow-x-auto pb-2">
            <NavTab active={activeTab === 'quest'} onClick={() => setActiveTab('quest')} label="Maloche" color="bg-neon-green" />
            <NavTab active={activeTab === 'radar'} onClick={() => setActiveTab('radar')} label="Radar" color="bg-neon-yellow" />
            <NavTab active={activeTab === 'tuning'} onClick={() => setActiveTab('tuning')} label="Tuning" color="bg-neon-pink" />
          </div>

          {/* Capture Simulation */}
          <AnimatePresence>
            {isCapturing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-6 text-center"
              >
                <div className="w-64 h-64 border-8 border-neon-green border-dashed animate-spin rounded-full flex items-center justify-center mb-8">
                  <Camera size={80} className="text-neon-green animate-pulse" />
                </div>
                <h2 className="text-5xl text-neon-green italic mb-4">VALIDIERUNG LÄUFT!</h2>
                <p className="text-xl text-white font-mono uppercase tracking-widest">Die KI checkt ob du wirklich geschwitzt hast...</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

function NavTab({ active, onClick, label, color }: { active: boolean, onClick: () => void, label: string, color: string }) {
  return (
    <button 
      onClick={onClick}
      className={`px-6 py-2 font-display uppercase italic transition-all ${
        active 
          ? `${color} text-black -skew-x-12 scale-105 shadow-[0_0_15px_rgba(0,0,0,0.5)]` 
          : 'bg-zinc-800 text-white hover:bg-zinc-700'
      }`}
    >
      {label}
    </button>
  );
}

interface TuningCardProps {
  key?: string | number;
  title: string;
  cost: string;
  effect: string;
  icon: string;
  onBuy: () => void;
  owned: boolean;
  canAfford: boolean;
}

function TuningCard({ title, cost, effect, icon, onBuy, owned, canAfford }: TuningCardProps) {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onBuy}
      className={`border-2 p-2 flex flex-col items-center justify-center cursor-pointer transition-all ${
        owned ? 'border-neon-green bg-neon-green/10 grayscale-0' : 
        canAfford ? 'border-zinc-700 hover:border-neon-pink grayscale hover:grayscale-0' : 
        'border-red-900 opacity-50 grayscale'
      }`}
    >
      <div className="text-2xl">{owned ? '✅' : icon}</div>
      <p className="text-[10px] font-black mt-1 uppercase text-center leading-tight">{title}</p>
      <p className="text-[8px] opacity-50 uppercase">{effect}</p>
      <p className={`text-[8px] mt-1 font-bold ${owned ? 'text-neon-green' : 'text-neon-yellow'}`}>
        {owned ? 'EQUIPPED' : cost}
      </p>
    </motion.div>
  );
}

function AdventureIcon({ name }: { name: string }) {
  switch (name) {
    case 'Footprints': return <Footprints />;
    case 'Utensils': return <Trash2 />;
    case 'TrendingUp': return <TrendingUp />;
    case 'Dumbbell': return <Dumbbell />;
    case 'MapPin': return <MapPin />;
    default: return <Zap />;
  }
}

