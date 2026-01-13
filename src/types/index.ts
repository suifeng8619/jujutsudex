export interface GameCode {
  id: string;
  code: string;
  reward: string;
  status: 'active' | 'expired';
  lastChecked: string; // ISO Date, e.g., "2026-01-12"
  isNew?: boolean;     // Highlights the code visually
}

export interface Clan {
  id: string;          // slug friendly, e.g., "ryomen-sukuna"
  name: string;
  rarity: number;      // e.g., 0.01 for 1%
  tier: 'S+' | 'S' | 'A' | 'B' | 'C' | 'D';
  image?: string;
  description: string;
  grade?: string;
  stats: {             // Key-value pairs for buffs
    [key: string]: string;
  };
  moves: string[];
}

export interface FightingStyle {
  id: string;
  name: string;
  tree: string; // Restored tree property
  rarity: string;
  tier: string;
  description: string;
  image?: string;
  stats: {
    [key: string]: string;
  };
  moves: string[];
  howToObtain?: string;
  tips?: string;
}

export interface Code {
  id: string;
  code: string;
  reward: string;
  status: string; // Changed from active: boolean
  lastChecked: string;
  isNew?: boolean;
}

export interface GearItem {
  id: string;
  name: string;
  type: 'Accessory' | 'Outfit';
  rarity: string;
  description: string;
  stats: {
    [key: string]: string;
  };
  image?: string;
  obtained_from?: string;
  howToObtain?: string;
}

export interface Awakening {
  id: string;
  name: string;
  rarity: string;
  chance: string;
  description: string;
  stats: {
    [key: string]: string;
  };
  image?: string;
  howToObtain?: string;
  tips?: string;
}

export interface Tool {
  id: string;
  name: string;
  grade: string;
  source: string;
  value: string;
  description: string;
  stats: {
    [key: string]: string;
  };
  moves: string[];
  image?: string;
  howToObtain?: string;
  tips?: string;
}

export interface Trait {
  id: string;
  name: string;
  rarity: string;
  chance: string;
  description: string;
  stats: {
    [key: string]: string;
  };
  image?: string;
  howToObtain?: string;
  tips?: string;
}
