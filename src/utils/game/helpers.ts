import { Ball } from "../types/Game";

export const fillBalls = () => {
  const balls: Ball[] = [];
  for (let i = 1; i <= 30; i++) {
    balls.push({
      number: i,
      username: "",
    });
  }
  return balls;
};
