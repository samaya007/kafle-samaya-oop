export class GameBoard {
    constructor(boardElement, gameManager) {
      this.boardElement = boardElement;
      this.gameManager = gameManager;
      this.icons = ["icon1", "icon2", "icon3", "icon4", "icon5"]; // game icons
      this.initializeBoard();
    }
  
    initializeBoard() {
      this.boardElement.innerHTML = "";
      this.tiles = [];
      this.createTiles();
      this.assignWinningLine();
    }
  
    createTiles() {
      for (let i = 0; i < 25; i++) {
        const tile = document.createElement("div");
        tile.className = "tile";
        tile.dataset.index = i; 
        this.boardElement.appendChild(tile);
        this.tiles.push(tile);
      }
    }
  
    assignWinningLine() {
      const winningLineIndex = Math.floor(Math.random() * 5);
      const isRow = Math.random() < 0.5;
      const winningIcon =
        this.icons[Math.floor(Math.random() * this.icons.length)];
      this.winningLine = { isRow, index: winningLineIndex, icon: winningIcon };
  
      this.tiles.forEach(
        (tile) =>
          (tile.dataset.icon =
            this.icons[Math.floor(Math.random() * this.icons.length)])
      );
      for (let i = 0; i < 5; i++) {
        const index = isRow ? winningLineIndex * 5 + i : i * 5 + winningLineIndex;
        this.tiles[index].dataset.icon = winningIcon;
      }
    }
  
    revealTile(tile) {
      tile.classList.add("revealed");
      tile.style.backgroundImage = `url('img/${tile.dataset.icon}.svg')`; // for images
      const tileIndex = parseInt(tile.dataset.index);
      this.gameManager.updateGameState(this.isTileInWinningLine(tileIndex));
    }
  
    isTileInWinningLine(tileIndex) {
      const { isRow, index, icon } = this.winningLine;
      return (
        (isRow && Math.floor(tileIndex / 5) === index) ||
        (!isRow && tileIndex % 5 === index)
      );
    }
  
    checkForWin() {
      const { isRow, index, icon } = this.winningLine;
      for (let i = 0; i < 5; i++) {
        const tileIndex = isRow ? index * 5 + i : index + i * 5;
        if (
          !this.tiles[tileIndex].classList.contains("revealed") ||
          this.tiles[tileIndex].dataset.icon !== icon
        ) {
          return false;
        }
      }
      return true;
    }
  }
  