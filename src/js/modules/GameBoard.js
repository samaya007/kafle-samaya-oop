export class GameBoard {
    constructor(boardElement, gameManager) {
      this.boardElement = boardElement;
      this.gameManager = gameManager;
      this.icons = ["icon1", "icon2", "icon3", "icon4", "icon5"]; 
      this.initializeBoard(); //name of the images on game board array
    }
    initializeBoard() {
      this.boardElement.innerHTML = "";
      this.tiles = [];
      this.createTiles();
      this.assignWinningLine();
    }
  
    createTiles() {
      for (let i = 0; i < 25; i++) { //loops 25 times to create tiles
        const tile = document.createElement("div");
        tile.className = "tile";
        tile.dataset.index = i; 
        this.boardElement.appendChild(tile);
        this.tiles.push(tile);
      }
    }
  //for assigning a winning line
  //if the gambox grid is chnaged from 5by5 to any other number make sure to update here as well
    assignWinningLine() {
      const winningLineIndex = Math.floor(Math.random() * 5);
      const isRow = Math.random() < 0.5;
      const winningIcon =
        this.icons[Math.floor(Math.random() * this.icons.length)];
      this.winningLine = { isRow, index: winningLineIndex, icon: winningIcon };
  //this sets random icons for all tiles
      this.tiles.forEach(
        (tile) =>
          (tile.dataset.icon =
            this.icons[Math.floor(Math.random() * this.icons.length)])
      ); //and this sets the wining icon for all the tiles in a same row or coloumn
      for (let i = 0; i < 5; i++) {
        const index = isRow ? winningLineIndex * 5 + i : i * 5 + winningLineIndex;
        this.tiles[index].dataset.icon = winningIcon;
      }
    }
  //this reveales the tile, where the backgroudn image if the tile is based on its icon
    revealTile(tile) {
      tile.classList.add("revealed");
      tile.style.backgroundImage = `url('img/${tile.dataset.icon}.svg')`; // for images with svg extension
     //for ease better use images with similar extension here
      const tileIndex = parseInt(tile.dataset.index);
      this.gameManager.updateGameState(this.isTileInWinningLine(tileIndex));
    }
  
    //took a while to fix: checks if the tile is in the wining line and if the tile index matches the wining line
    isTileInWinningLine(tileIndex) {
      const { isRow, index, icon } = this.winningLine;
    
      return (
        (isRow && Math.floor(tileIndex / 5) === index) ||
        (!isRow && tileIndex % 5 === index)
      );
    }
 

    checkForWin() {
      const { isRow, index, icon } = this.winningLine;
      //  const winningIndices = [];
      for (let i = 0; i < 5; i++) {
        const tileIndex = isRow ? index * 5 + i : index + i * 5;
     // Checks if the tile is revealed and has the winning icon i.e, similar across the row or coloumn
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
  