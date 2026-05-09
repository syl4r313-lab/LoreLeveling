import { motion } from 'motion/react';

interface CharacterVisualProps {
  muscleMass: number; // 0 to 100
  equipped: string[];
}

export default function CharacterVisual({ muscleMass, equipped }: CharacterVisualProps) {
  // Scaling factors based on muscleMass
  const muscleScale = 1 + (muscleMass / 100);
  const tankScale = 1 + (muscleMass / 250); // Less aggressive scaling for the tank top
  const shoulderWidth = 70 + (muscleMass / 2);
  const headOriginX = 100;
  
  const hasTattoo = equipped.includes('tribal');
  const hasSpoiler = equipped.includes('spoiler');
  const hasTiger = equipped.includes('tiger');
  const hasVokuhila = equipped.includes('vokuhila');

  return (
    <div className="relative w-full h-full flex items-center justify-center p-4">
      <svg viewBox="0 0 200 300" className="w-full h-full drop-shadow-[0_0_15px_rgba(0,255,0,0.3)]">
        {/* Glow effect at high muscle mass */}
        {muscleMass > 80 && (
          <filter id="neon-glow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        )}

        {/* Shadow */}
        <ellipse cx="100" cy="280" rx="40" ry="10" fill="black" opacity="0.4" />

        {/* Legs / Adiletten */}
        <g id="legs" transform={muscleMass > 50 ? "scale(1.1 1)" : ""} style={{ originX: '100px' }}>
           {/* Left Leg */}
           <rect x="75" y="180" width="20" height="100" fill="#e5e7eb" />
           <rect x="70" y="270" width="30" height="10" fill={hasTiger ? "#fbbf24" : "#1f2937"} /> {/* Left Adilette */}
           {hasTiger && <path d="M70 275h30" stroke="#000" strokeWidth="1" strokeDasharray="2 1" />}

           {/* Right Leg */}
           <rect x="105" y="180" width="20" height="100" fill="#e5e7eb" />
           <rect x="100" y="270" width="30" height="10" fill={hasTiger ? "#fbbf24" : "#1f2937"} /> {/* Right Adilette */}
           {hasTiger && <path d="M100 275h30" stroke="#000" strokeWidth="1" strokeDasharray="2 1" />}
        </g>

        {/* Torso */}
        <motion.g 
          animate={{ scale: tankScale }}
          style={{ originX: '100px', originY: '150px' }}
        >
          {/* Main Body */}
          <rect x={100 - (shoulderWidth/2)} y="80" width={shoulderWidth} height="110" rx="10" fill="#f3f4f6" />
          
          {/* Tank Top (if no tiger print, just standard) */}
          <rect x={100 - (shoulderWidth/2) + 2} y="85" width={shoulderWidth - 4} height="100" rx="8" 
            fill={hasTiger ? "url(#tigerPattern)" : "#1f2937"} 
            opacity="0.9"
          />

          {hasTiger && (
            <defs>
              <pattern id="tigerPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect width="20" height="20" fill="#fbbf24" />
                <path d="M0 5 L20 15 M0 15 L20 5" stroke="black" strokeWidth="2" opacity="0.5" />
              </pattern>
            </defs>
          )}
          
          {/* Tribal Tattoo on Chest */}
          {hasTattoo && (
            <motion.g 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <path d="M85 100 Q100 90 115 100 M90 110 Q100 100 110 110" fill="none" stroke="#000" strokeWidth="3" strokeLinecap="round" />
              <path d="M75 120 L85 130 M125 120 L115 130" stroke="#000" strokeWidth="2" />
            </motion.g>
          )}

          {/* Muscle Definition (Abs & Chest) */}
          <g opacity={muscleMass / 100} stroke="#4b5563" strokeWidth="1" fill="none">
            {/* Chest */}
            <path d="M85 110 Q100 115 115 110" />
            {/* Abs */}
            <path d="M90 135 L110 135" />
            <path d="M90 150 L110 150" />
            <path d="M90 165 L110 165" />
            {/* Side definition */}
            <path d="M80 140 Q85 150 80 160" />
            <path d="M120 140 Q115 150 120 160" />
          </g>
          
          {/* Vascularity (Veins) - Only at high levels */}
          {muscleMass > 70 && (
            <g opacity={(muscleMass - 70) / 30} stroke="#93c5fd" strokeWidth="0.5" fill="none">
              <path d="M85 105 Q88 115 85 125" strokeDasharray="1 1" />
              <path d="M115 105 Q112 115 115 125" strokeDasharray="1 1" />
            </g>
          )}
        </motion.g>

        {/* Arms */}
        {/* Left Arm */}
        <motion.g animate={{ scale: muscleScale }} style={{ originX: `${100 - (shoulderWidth/2)}px`, originY: '110px' }}>
          <path d={`M${100 - (shoulderWidth/2)} 100 L${80 - (muscleMass/5)} 160`} 
            stroke="#f3f4f6" 
            strokeWidth={20 + (muscleMass / 5)} 
            strokeLinecap="round" 
          />
          {hasTattoo && (
             <path d={`M${95 - (shoulderWidth/2)} 120 Q${90 - (shoulderWidth/2)} 130 ${85 - (shoulderWidth/2)} 140`} stroke="#000" strokeWidth="2" opacity="0.7" />
          )}
        </motion.g>

        {/* Right Arm */}
        <motion.g animate={{ scale: muscleScale }} style={{ originX: `${100 + (shoulderWidth/2)}px`, originY: '110px' }}>
          <path d={`M${100 + (shoulderWidth/2)} 100 L${120 + (muscleMass/5)} 160`} 
            stroke="#f3f4f6" 
            strokeWidth={20 + (muscleMass / 5)} 
            strokeLinecap="round" 
          />
          {/* Spoiler Tuning on the arm */}
          {hasSpoiler && (
             <g transform={`translate(${125 + (muscleMass/5)}, 150) rotate(-20)`}>
               <rect x="0" y="0" width="25" height="4" fill="#ef4444" />
               <rect x="5" y="4" width="2" height="6" fill="#71717a" />
               <rect x="18" y="4" width="2" height="6" fill="#71717a" />
               <circle cx="12" cy="-2" r="2" fill="#fbbf24" className="animate-pulse" />
             </g>
          )}
        </motion.g>

        {/* Head */}
        <g id="head" transform={`translate(0, ${-muscleMass/10})`}>
          <circle cx="100" cy="50" r="30" fill="#f3f4f6" />
          
          {/* Beard / 3-Tage-Bart */}
          <ellipse cx="100" cy="65" rx="15" ry="10" fill="rgba(0,0,0,0.1)" />
          
          {/* Vokuhila Hair */}
          {hasVokuhila ? (
            <motion.path 
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              d="M70 40 Q65 80 75 110 M130 40 Q135 80 125 110 M80 30 L120 30" 
              fill="none" 
              stroke="#5a3d2b" 
              strokeWidth="15" 
              strokeLinecap="round" 
            />
          ) : (
            /* Standard hair lines */
            <path d="M80 30 Q100 20 120 30" stroke="#1f2937" strokeWidth="5" fill="none" />
          )}

          {/* Sunglasses */}
          <g>
            <rect x="75" y="42" width="20" height="12" rx="2" fill="#000" />
            <rect x="105" y="42" width="20" height="12" rx="2" fill="#000" />
            <path d="M95 48 L105 48" stroke="#000" strokeWidth="2" />
            {/* Reflection on glasses */}
            <rect x="78" y="44" width="5" height="2" fill="white" opacity="0.3" />
          </g>

          {/* Smug face */}
          <path d="M95 65 Q100 70 105 65" fill="none" stroke="#000" strokeWidth="1" />
        </g>
      </svg>
    </div>
  );
}
