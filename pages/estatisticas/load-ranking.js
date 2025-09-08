import { rankingCardComponent } from "./ranking-card.js";

const players = [
  {
    username: "teste",
    avatarUrl: "../../assets/avatar.png",
    points: 5000
  },
  {
    username: "teste",
    avatarUrl: "../../assets/avatar.png",
    points: 3000
  },
  {
    username: "teste",
    avatarUrl: "../../assets/avatar.png",
    points: 9000
  },
]; // substituir pela requisição para o backend

const sorted = players.sort((a, b) => b.points - a.points);

sorted.forEach((player, index) => {
    rankingCardComponent({
        position: index + 1,
      ...player,
    })
});
