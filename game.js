function Game(options) {
  this.ctx          = options.ctx;
  this.rows         = options.rows;
  this.cols         = options.cols;
  this.wallChar     = options.wallChar;     // Control character for walls
  this.floorChar    = options.floorChar;    // Control character for floor
  this.playerChar   = options.playerChar;   // Control character for player
  this.map          = options.map;
  this.player       = new Player({
    currentRow: 14, // InitialPlayerPos
    currentCol: 14, // InitialPlayerPos   
  });
    
}

// Drawing on canvas the map
Game.prototype._drawMap = function () {
  for (var colIndex = 0; colIndex < this.cols; colIndex++) {
    for (var rowIndex = 0; rowIndex < this.rows; rowIndex++) {
      
      if (this.map[colIndex][rowIndex] === this.wallChar){
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(rowIndex * 50, colIndex * 50, 48, 48); // Remove 2px margin when using sprites
      }
      else if (this.map[colIndex][rowIndex] === this.floorChar) {
        this.ctx.fillStyle = 'blue';
        this.ctx.fillRect(rowIndex * 50, colIndex * 50, 48, 48); // Remove 2px margin when using sprites
      }
    }
  }
}

// Drawing player on map
Game.prototype._drawPlayer = function() {
  console.log(this.player);
  this.ctx.fillStyle = 'green';
  this.ctx.fillRect(this.player.currentRow * 50, this.player.currentCol * 50, 48, 48); // Remove 2px margin when using sprites
}

Game.prototype._update = function() {
  this._drawMap();
  this._drawPlayer();  
  // window.requestAnimationFrame(this._update.bind(this));
}

Game.prototype._defineControlKeys = function () {
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
    this._update();
    
  }.bind(this);
}