export interface CharacterState {
  steps: number;
  altitude: number;
  strengthPoints: number;
  stamina: number;
  level: number;
  credibility: number;
  muscleMass: number;
  equipped: string[];
}

export type ClassId = 'vollstrecker' | 'pascal' | 'druide' | 'adler' | 'mechaniker' | 'tanja';

export interface CharacterClass {
  id: ClassId;
  name: string;
  description: string;
  archetype: string;
  weapon: string;
  primaryStat: string;
}

export const CHARACTER_CLASSES: CharacterClass[] = [
  {
    id: 'vollstrecker',
    name: 'Vokuhila-Vergeltungs-Vollstrecker',
    description: 'Kämpft mit Stoppschildern, tankt Schaden durch Dosenbier-Konsum.',
    archetype: 'Tank',
    weapon: 'Stoppschild',
    primaryStat: 'Resistenz'
  },
  {
    id: 'pascal',
    name: 'Pyro-Pascal von der Tanke',
    description: 'Nutzt illegale Böller und Raketen für Flächenschaden.',
    archetype: 'Range DPS',
    weapon: 'Polen-Böller',
    primaryStat: 'Explosivität'
  },
  {
    id: 'druide',
    name: 'Dosenbier-Druide',
    description: 'Heilt die Gang mit lauwarmem Dosenbier, verursacht aber den „Pegel-Debuff“.',
    archetype: 'Support',
    weapon: 'Sixpack (Export)',
    primaryStat: 'Heilung'
  },
  {
    id: 'adler',
    name: 'Adiletten-Adler',
    description: 'Extrem schnell, nutzt Hinterhalt-Schellen.',
    archetype: 'Assassin',
    weapon: 'Fliegende Adilette',
    primaryStat: 'Tempo'
  },
  {
    id: 'mechaniker',
    name: 'Manta-Mechaniker',
    description: 'Baut Geschütztürme aus alten Auspuffrohren und verteilt Spoiler-Buffs.',
    archetype: 'Engineer',
    weapon: 'Schraubenschlüssel',
    primaryStat: 'Konstruktion'
  },
  {
    id: 'tanja',
    name: 'Tuning-Tanja',
    description: 'Nutzt Laser-Pointer und Subwoofer für massiven Bass-Schaden.',
    archetype: 'Techno-Mage',
    weapon: 'Ghettoblaster',
    primaryStat: 'Bass'
  }
];

export interface Adventure {
  id: string;
  title: string;
  description: string;
  requirement: string;
  rewardType: 'stamina' | 'strength' | 'hp' | 'damage';
  icon: string;
}

export interface Gang {
  name: string;
  motto: string;
  members: number;
  credibility: number;
}

export const DAILY_ADVENTURES: Adventure[] = [
  {
    id: 'pfand',
    title: 'Der Marsch zum Pfandautomaten',
    description: 'Gehe 2km zu Fuß, um die Dosen wegzubringen.',
    requirement: '2km Laufen',
    rewardType: 'stamina',
    icon: 'Footprints'
  },
  {
    id: 'wurst',
    title: 'Die Currywurst-Validierung',
    description: 'Iss was Gesundes und nenn es Fitness-Wurst.',
    requirement: 'Foto von gesundem Essen',
    rewardType: 'hp',
    icon: 'Utensils'
  },
  {
    id: 'terror',
    title: 'Treppenhaus-Terror',
    description: 'Erklimme 50 Höhenmeter im Block.',
    requirement: '50m Aufstieg',
    rewardType: 'damage',
    icon: 'TrendingUp'
  },
  {
    id: 'flex',
    title: 'Bizeps-Flex vor der Schranke',
    description: 'Mache 20 Liegestütze (oder so).',
    requirement: 'Krafttraining Session',
    rewardType: 'strength',
    icon: 'Dumbbell'
  },
  {
    id: 'patrouille',
    title: 'Die Siedlungs-Patrouille',
    description: 'Checke an 3 Orten in der Siedlung ein.',
    requirement: 'GPS Check-In an 3 POIs',
    rewardType: 'stamina',
    icon: 'MapPin'
  }
];
