import { Ball } from "./Game";

export type AckEvent = {
  code: number; //200 success //400 error
  description: string;
  payload?: any;
};
export type StatusEvent = {
  status: GameStatus;
};
export type GameStatus = {
  minBet: number;
  started: boolean;
  balls: Ball[];
  first: number;
  second: number;
  third: number;
};
