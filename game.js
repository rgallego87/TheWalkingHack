function Game(options) {
  this.ctx          = options.ctx;
  this.rows         = options.rows;
  this.cols         = options.cols;
  this.wallChar     = options.wallChar;   // Control character for walls
  this.floorChar    = options.floorChar;  // Control character for floor
  

  this.map          = [
  ["W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W"],
  ["W","F","F","F","F","F","F","F","F","F","F","F","F","F","F","W"],
  ["W","F","F","F","F","F","F","F","F","F","F","F","F","F","F","W"],
  ["W","F","F","F","F","F","F","F","F","F","F","F","F","F","F","W"],
  ["W","F","F","F","F","F","F","F","F","F","F","F","F","F","F","W"],
  ["W","F","F","F","F","F","F","F","F","F","F","F","F","F","F","W"],
  ["W","F","F","F","F","F","F","F","F","F","F","F","F","F","F","W"],
  ["W","F","F","F","F","F","F","F","F","F","F","F","F","F","F","W"],
  ["W","F","F","F","F","F","F","F","F","F","F","F","F","F","F","W"],
  ["W","F","F","F","F","F","F","F","F","F","F","F","F","F","F","W"],
  ["W","F","F","F","F","F","F","F","F","F","F","F","F","F","F","W"],
  ["W","F","F","F","F","F","F","F","F","F","F","F","F","F","F","W"],
  ["W","F","F","F","F","F","F","F","F","F","F","F","F","F","F","W"],
  ["W","F","F","F","F","F","F","F","F","F","F","F","F","F","F","W"],
  ["W","F","F","F","F","F","F","F","F","F","F","F","F","F","F","W"],
  ["W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W"],
];
    
}

// Drawing on canvas the map
Game.prototype._drawMap = function () {
  for (var colIndex = 0; colIndex < this.cols; colIndex++) {
    for (var rowIndex = 0; rowIndex < this.rows; rowIndex++) {
      
      if (this.map[colIndex][rowIndex] === this.wallChar){
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(colIndex * 50, rowIndex * 50, 48, 48);
      }
      else if (this.map[colIndex][rowIndex] === this.floorChar) {
        this.ctx.fillStyle = 'blue';
        this.ctx.fillRect(colIndex * 50, rowIndex * 50, 48, 48);
      } 
    }
  }
}

Game.prototype._defineKeys = function () {
  document.onkeydown = function (e) {
    switch (e.keyCode) {
      case 38: // UP
        console.log('UP');
        this.player.goUp();
        break;
      case 40: // DOWN
        console.log('DOWN');
        this.player.goDown();
        break;
      case 37: // LEFT
        console.log('LEFT');
        this.player.goLeft();
        break;
      case 39: // RIGHT
        console.log('RIGHT');
        this.player.goRight();
        break;       
    }
  }.bind(this);
}