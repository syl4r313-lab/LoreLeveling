import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Scissors, Hand, Square } from 'lucide-react';

interface SchnickSchnackBattleProps {
  onWin: () => void;
  onLose: () => void;
}

type Choice = 'schere' | 'stein' | 'papier' | null;

export default function SchnickSchnackBattle({ onWin, onLose }: SchnickSchnackBattleProps) {
  const [playerChoice, setPlayerChoice] = useState<Choice>(null);
  const [enemyChoice, setEnemyChoice] = useState<Choice>(null);
  const [result, setResult] = useState<'win' | 'lose' | 'draw' | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const choices: { id: Choice; icon: React.ReactNode; label: string }[] = [
    { id: 'stein', icon: <Square size={48} />, label: 'STEIN' },
    { id: 'papier', icon: <Hand size={48} />, label: 'PAPIER' },
    { id: 'schere', icon: <Scissors size={48} />, label: 'SCHERE' },
  ];

  const play = (choice: Choice) => {
    setIsSpinning(true);
    setPlayerChoice(choice);
    setResult(null);
    setEnemyChoice(null);

    setTimeout(() => {
      const enemyMove = choices[Math.floor(Math.random() * choices.length)].id;
      setEnemyChoice(enemyMove);
      setIsSpinning(false);

      if (choice === enemyMove) {
        setResult('draw');
      } else if (
        (choice === 'stein' && enemyMove === 'schere') ||
        (choice === 'papier' && enemyMove === 'stein') ||
        (choice === 'schere' && enemyMove === 'papier')
      ) {
        setResult('win');
        setTimeout(onWin, 1500);
      } else {
        setResult('lose');
        setTimeout(onLose, 1500);
      }
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center bg-zinc-950 p-6 text-white font-display">
      <h2 className="text-4xl text-neon-yellow italic mb-8 uppercase">Schnick Schnack Schnuck!</h2>
      
      <div className="flex items-center justify-around w-full max-w-md mb-12">
        {/* Player Side */}
        <div className="flex flex-col items-center">
          <p className="text-xs font-mono mb-2 text-neon-green">DU (KING)</p>
          <div className="w-24 h-24 border-4 border-neon-green flex items-center justify-center bg-zinc-900 shadow-[0_0_15px_rgba(0,255,0,0.3)]">
            {isSpinning ? (
              <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.5 }}>
                 <Square className="text-neon-green" />
              </motion.div>
            ) : playerChoice ? (
              choices.find(c => c.id === playerChoice)?.icon
            ) : '?'}
          </div>
        </div>

        <div className="text-4xl italic text-proll-orange font-black uppercase">VS</div>

        {/* Enemy Side */}
        <div className="flex flex-col items-center">
          <p className="text-xs font-mono mb-2 text-red-500">OPFA (GEGNER)</p>
          <div className="w-24 h-24 border-4 border-red-500 flex items-center justify-center bg-zinc-900 shadow-[0_0_15px_rgba(255,0,0,0.3)]">
            {isSpinning ? (
              <motion.div animate={{ rotate: -360 }} transition={{ repeat: Infinity, duration: 0.5 }}>
                 <Square className="text-red-500" />
              </motion.div>
            ) : enemyChoice ? (
              choices.find(c => c.id === enemyChoice)?.icon
            ) : '?'}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {result && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`text-6xl mb-8 italic font-black uppercase ${
              result === 'win' ? 'text-neon-green' : result === 'lose' ? 'text-red-500' : 'text-neon-yellow'
            }`}
          >
            {result === 'win' ? 'SIEG!' : result === 'lose' ? 'LOOSER!' : 'UNENTSCHIEDEN!'}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-3 gap-4 w-full max-w-sm">
        {choices.map((c) => (
          <button
            key={c.id}
            disabled={isSpinning || result !== null}
            onClick={() => play(c.id)}
            className="bento-card hover:bg-zinc-800 transition-colors flex flex-col items-center justify-center py-4 disabled:opacity-50"
          >
            <div className="text-white mb-2">{c.icon}</div>
            <span className="text-[10px] font-black">{c.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-8 text-xs font-mono text-zinc-500 uppercase">
        Schnelles Battle um Cred zu klauen oder zu verlieren!
      </div>
    </div>
  );
}
