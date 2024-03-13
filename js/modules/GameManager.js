import { GameBoard } from "./GameBoard.js";

export class GameManager {
  constructor(gameBoardElement, triesLeftElement, messageElement) {
    this.gameBoardElement = gameBoardElement;
    this.triesLeftElement = triesLeftElement;
    this.messageElement = messageElement;
    this.gameBoard = new GameBoard(gameBoardElement, this);
    this.triesLeft = 20;
    this.updateGameState(false);
  }

  updateGameState(tileInWinningLine) {
    this.triesLeftElement.textContent = `Tries Left: ${this.triesLeft}`;
    if (tileInWinningLine && this.gameBoard.checkForWin()) {
      this.handleWin();
    } else if (this.triesLeft <= 0) {
      this.handleLose();
    }
  }

  handleTileClick(tile) {
    if (!tile.classList.contains("revealed") && this.triesLeft > 0) {
      this.gameBoard.revealTile(tile);
      if (!this.gameBoard.isTileInWinningLine(parseInt(tile.dataset.index))) {
        this.triesLeft--;
      }
      this.updateGameState(
        this.gameBoard.isTileInWinningLine(parseInt(tile.dataset.index))
      );
    }
  }

  handleWin() {
    this.messageElement.textContent = "Congratulations, you've won the jackpot ! Restart to play again";
    this.messageElement.classList.remove("hidden");
    this.messageElement.classList.add("win-message");
  }

  handleLose() {
    this.messageElement.textContent =
      "Better luck next time. Please restart the game.";
    this.messageElement.classList.remove("hidden");
    this.messageElement.classList.add("lose-message");
  }

  resetGame() {
    this.gameBoard.initializeBoard();
    this.triesLeft = 20;
    this.updateGameState(false);
    this.messageElement.textContent = ""; // clears message
    this.messageElement.classList.add("hidden"); // message is hidden
  }
}
