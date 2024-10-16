export interface User {
    username: string;
    id: string;
  }
  
  export interface GameData {
    id: string;
    title: string;
    system: 'GB' | 'GBC';
    romUrl: string;
    coverImage: string;
    lastPlayed?: Date;
    saveState?: string;
  }