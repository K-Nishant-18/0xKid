export interface GameObject {
  id: string;
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  emoji: string;
  behavior: string;
  message?: string;
  value?: string;
  problem?: string;
  answer?: number;
  condition?: string;
  number?: number;
  flower?: number;
  profile?: { name: string; age: number };
  ability?: string;
  gift?: number;
  echo?: number;
  step?: number;
}

export interface GameTemplate {
  id: string;
  name: string;
  description: string;
  difficulty: string;
  objects: Partial<GameObject>[];
  onCollect?: (
    obj: GameObject,
    setScore: React.Dispatch<React.SetStateAction<number>>,
    setMessages: React.Dispatch<React.SetStateAction<string[]>>,
    player?: GameObject
  ) => void;
}