function Game(options) {
  this.ctx = options.ctx;
}

Game.prototype._drawBoard = function () {
  for (var columnIndex = 0; columnIndex < this.columns; columnIndex++) {
    for (var rowIndex = 0; rowIndex < this.rows; rowIndex++) {
      this.ctx.fillStyle = '#E3D4AB';
      this.ctx.fillRect(columnIndex * 10, rowIndex * 10, 10, 10);
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