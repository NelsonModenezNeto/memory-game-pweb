import { Game } from "./game.js";

const playButton = document.querySelector("#playButton");

playButton.addEventListener('click', () => {
    const game = new Game({
        tableSize: 2
    });
    localStorage.setItem('game', JSON.stringify(game));
})