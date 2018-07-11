function Enemy(position) {
  this.currentRow   = position.currentRow;
  this.currentCol   = position.currentCol;
  this.direction    = position.direction;
  this.randomDirection(); 
}

Enemy.prototype.move = function() {
  
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

Enemy.prototype.randomDirection = function() {
  
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  switch (getRandomInt(0,4)) {
    case 0:      
      this.direction = 'up';
      break;
    case 1:           
      this.direction = 'down';
      break;
    case 2:            
      this.direction = 'left';
      break;
    case 3:            
      this.direction = 'right';
      break;
      };

}
