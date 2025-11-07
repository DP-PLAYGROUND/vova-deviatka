export type GameObject = {
  id: number;
  lane: number;
  top: number;
  type: 'police' | 'cake';
};

export type GameStatus = 'start' | 'playing' | 'gameOver' | 'won';

export type CollectionAnimation = {
  id: number;
  lane: number;
  top: number;
};
