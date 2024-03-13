import { GameManager } from "./modules/GameManager.js";
import { gsapanimation } from "./modules/gsapanimation.js";

gsapanimation();

  const gameBoardElement = document.querySelector("#game-board");
  const triesLeftElement = document.querySelector("#tries-left");
  const messageElement = document.querySelector("#message");
  const restartButton = document.querySelector("#restart-game");

  const gameManager = new GameManager(
    gameBoardElement,
    triesLeftElement,
    messageElement
  );

  gameBoardElement.addEventListener("click", (event) => {
    if (event.target.classList.contains("tile")) {
      gameManager.handleTileClick(event.target);
    }
  });

  restartButton.addEventListener("click", () => {
    gameManager.resetGame();
  });
