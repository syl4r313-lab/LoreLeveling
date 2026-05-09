import { useState, useEffect } from 'react';

export interface CharacterState {
  steps: number;
  altitude: number;
  strengthPoints: number;
  stamina: number;
  level: number;
  credibility: number;
  muscleMass: number; // 0 to 100
  equipped: string[]; // IDs of tuning parts
}

export function useActivityStats() {
  const [stats, setStats] = useState<CharacterState>({
    steps: 0,
    altitude: 0,
    strengthPoints: 0,
    stamina: 0,
    level: 1,
    credibility: 1000, // Start with some pocket money
    muscleMass: 10,
    equipped: [],
  });

  // Mock activity simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        steps: prev.steps + Math.floor(Math.random() * 5),
        stamina: Math.min(100, prev.stamina + 0.1),
      }));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return { stats, setStats };
}
