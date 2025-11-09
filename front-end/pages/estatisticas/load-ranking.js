import { rankingCardComponent } from "./ranking-card.js";

const players = [
  {
    username: "teste",
    avatarUrl: "https://images.vexels.com/media/users/3/299732/isolated/preview/5dac6b08d491d0d1116f0ba1fe27fa54-trofeu-de-ouro-numero-1.png",
    points: 5000
  },
  {
    username: "teste",
    avatarUrl: "https://images.vexels.com/media/users/3/299732/isolated/preview/5dac6b08d491d0d1116f0ba1fe27fa54-trofeu-de-ouro-numero-1.png",
    points: 3000
  },
  {
    username: "teste",
    avatarUrl: "https://images.vexels.com/media/users/3/299732/isolated/preview/5dac6b08d491d0d1116f0ba1fe27fa54-trofeu-de-ouro-numero-1.png",
    points: 9000
  },
  {
    username: "teste",
    avatarUrl: "https://images.vexels.com/media/users/3/299732/isolated/preview/5dac6b08d491d0d1116f0ba1fe27fa54-trofeu-de-ouro-numero-1.png",
    points: 5000
  },
  {
    username: "teste",
    avatarUrl: "https://images.vexels.com/media/users/3/299732/isolated/preview/5dac6b08d491d0d1116f0ba1fe27fa54-trofeu-de-ouro-numero-1.png",
    points: 3000
  },
  {
    username: "teste",
    avatarUrl: "https://images.vexels.com/media/users/3/299732/isolated/preview/5dac6b08d491d0d1116f0ba1fe27fa54-trofeu-de-ouro-numero-1.png",
    points: 9000
  },
  {
    username: "teste",
    avatarUrl: "https://images.vexels.com/media/users/3/299732/isolated/preview/5dac6b08d491d0d1116f0ba1fe27fa54-trofeu-de-ouro-numero-1.png",
    points: 5000
  },
  {
    username: "teste",
    avatarUrl: "https://images.vexels.com/media/users/3/299732/isolated/preview/5dac6b08d491d0d1116f0ba1fe27fa54-trofeu-de-ouro-numero-1.png",
    points: 3000
  },
  {
    username: "teste",
    avatarUrl: "https://images.vexels.com/media/users/3/299732/isolated/preview/5dac6b08d491d0d1116f0ba1fe27fa54-trofeu-de-ouro-numero-1.png",
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

