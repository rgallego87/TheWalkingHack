function Player(position) {
  this.currentRow   = position.currentRow;
  this.currentCol   = position.currentCol;
  this.direction    = 'up';  
}

Player.prototype.goUp = function() {  
    // this.direction = 'up';
    this._updatePosition();  
}

Player.prototype.goDown = function() {  
    // this.direction = 'down';
    this._updatePosition();  
};

Player.prototype.goLeft = function() {
    // this.direction = 'left';
    this._updatePosition();  
};

Player.prototype.goRight = function() {  
    // this.direction = 'right';
    this._updatePosition();  
};

Player.prototype._updatePosition = function () {
  
  switch (this.direction) {
    case 'up':
      this.currentCol--;
      break;
    case 'down':
      this.currentCol++;
      break;
    case 'left':
      this.currentRow--;
      break;
    case 'right':
      this.currentRow++;
      break;
      };      
}
  
