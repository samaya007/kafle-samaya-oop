import { GameBoard } from "./GameBoard.js";

export class GameManager {
  constructor(gameBoardElement, triesLeftElement, messageElement) {
    this.gameBoardElement = gameBoardElement;
    this.triesLeftElement = triesLeftElement;
    this.messageElement = messageElement;
    this.gameBoard = new GameBoard(gameBoardElement, this);
    this.triesLeft = 20;
    this.updateGameState(false); //initial value false meaning no tile in winning row/coloumn
  }
//handles win and loss 
  updateGameState(tileInWinningLine) {
    this.triesLeftElement.textContent = `Tries Left: ${this.triesLeft}`;
    if (tileInWinningLine && this.gameBoard.checkForWin()) {
      this.handleWin();
    } else if (this.triesLeft <= 0) {
      this.handleLose();
    }
  }

  handleTileClick(tile) {
    //DO  NOT TOUCH took a while to fix simple typo error:
    //this checks if the clicked dtile has not been revealed and if at the same time if ther are remainig tries
    //and reveals the cliked tile on board
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
//winners message
  handleWin() {
    this.messageElement.textContent = "Congratulations, you've won the jackpot ! Restart to play again";
    this.messageElement.classList.remove("hidden");
    this.messageElement.classList.add("win-message");
  }
//,oosing message
  handleLose() {
    this.messageElement.textContent =
      "Better luck next time. Please restart the game.";
    this.messageElement.classList.remove("hidden");
    this.messageElement.classList.add("lose-message");
  }
// to reset the game
  resetGame() {
    this.gameBoard.initializeBoard();
    //reset tge number of tris 
    this.triesLeft = 20;
    this.updateGameState(false);
    this.messageElement.textContent = ""; // clears message
    this.messageElement.classList.add("hidden"); // message is hidden
  }
}
