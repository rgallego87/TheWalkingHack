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
      
      if (this.map[colIndex][rowIndex] === this.wallChar) {
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

Game.prototype._checkCollisions = function() {

    // Manual this binding with shadowing
    var row       = this.player.currentRow;
    var col       = this.player.currentCol;
    var map       = this.map;
    var wallChar  = this.wallChar;
    var direction = this.player.direction;    
  
    // Checking collisions with control characters and if not update to new player pos
    switch (direction) {
      case 'up': // UP
      if (map[col - 1][row] === wallChar) {
        console.log('WALL!');
      } else this.player.goUp();
        break;
      case 'down': // DOWN
      if (map[col + 1][row] === wallChar) {
        console.log('WALL!');
      } else this.player.goDown();
        break;
      case 'left': // LEFT
      if (map[col][row - 1] === wallChar) {
        console.log('WALL!');
      } else this.player.goLeft();
        break;
      case 'right': // RIGHT
      if (map[col][row + 1] === wallChar) {
        console.log('WALL!');
      } else this.player.goRight();    
        break;
    }
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
        this.player.direction = 'up';       // Updating direction before checkCollisions
        this._checkCollisions();
        break;
      case 40: // DOWN
        console.log('DOWN');
        this.player.direction = 'down';     // Updating direction before checkCollisions
        this._checkCollisions();
        break;
      case 37: // LEFT
        console.log('LEFT');
        this.player.direction = 'left';     // Updating direction before checkCollisions
        this._checkCollisions();
        break;
      case 39: // RIGHT
        console.log('RIGHT');
        this.player.direction = 'right';   // Updating direction before checkCollisions
        this._checkCollisions();
        break;       
    }
    this._update();

  }.bind(this);
}