function Game(options, buildGameOver, buildGameWin) {
  this.countdownId    = 0;    
  this.cbGameOver     = buildGameOver;
  this.cbGameWin      = buildGameWin;  
  this.ctx            = options.ctx;
  this.rows           = options.rows;
  this.cols           = options.cols;
  this.wallChar       = options.wallChar;     // Control character for walls
  this.floorChar      = options.floorChar;    // Control character for floor
  this.playerChar     = options.playerChar;   // Control character for player
  this.goalChar       = options.goalChar;     // Control character for goal
  this.enemyChar      = options.enemyChar;    // Control character for enemies
  this.map            = options.map;  
  this.isEnd          = options.isEnd;
  this.isWin          = options.isWin;
  this.player         = new Player({
    currentRow: 14,   // InitialPlayerPos
    currentCol: 14,   // InitialPlayerPos   
  });  
  this.numOfEnemies   = 10;  
  this.enemies        = [];
  this.intervalGenerateEnemies = undefined;     
  this.frameCounter   = 0;
  this.clock          = 11;    
}

Game.prototype.generateEnemies = function() {
  
  this.intervalGenerateEnemies = setInterval(function() {
    this.enemies.push(new Enemy({
      currentCol: 8,    // InitialEnemyPos
      currentRow: 2,    // InitialEnemyPos
      direction: null
    }));
    if (this.enemies.length === this.numOfEnemies) {
      clearInterval(this.intervalGenerateEnemies);    
    }
  }.bind(this), 2000);  
  
}

// Temporal reseting to initial pos at start (Phase1) x,y and timer
Game.prototype._resetStatus = function() {  
  clearInterval(this.countdownId);  
  clearInterval(this.intervalGenerateEnemies);
  this.clock = 11;
  this.isWin                = false;
  this.isEnd                = false;
  this.player.currentCol    = 14;  
  this.player.currentRow    = 14;
  this.enemies              = [];
  this.map = [
    ["W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W"],
    ["W","F","F","W","F","F","F","W","F","W","W","F","W","F","F","W"],
    ["W","W","F","W","F","W","W","W","W","F","F","W","W","F","W","W"],
    ["W","F","F","F","F","F","F","F","F","F","F","F","F","F","F","W"],
    ["W","F","F","F","W","F","W","F","F","W","W","F","F","F","F","W"],
    ["W","F","F","F","W","F","W","F","F","F","F","F","W","W","W","W"],
    ["W","W","W","W","W","F","W","W","W","W","W","W","W","F","G","W"],
    ["W","F","F","F","F","F","F","F","F","F","F","F","F","F","F","W"],
    ["W","F","F","F","F","F","F","F","F","F","F","F","F","W","W","W"],
    ["W","F","F","F","F","F","F","F","W","W","W","F","F","W","W","W"],
    ["W","F","W","F","W","W","F","F","F","F","F","F","F","W","W","W"],
    ["W","F","W","F","W","W","F","F","F","F","F","F","F","F","F","W"],
    ["W","F","W","F","F","W","F","F","F","F","F","F","F","F","F","W"],
    ["W","W","W","F","F","W","W","W","W","W","W","W","W","W","W","W"],
    ["W","F","F","F","F","F","F","F","F","F","F","F","F","F","F","W"],
    ["W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W"],
  ];
  
  for (var i = 0; i < this.enemies.length; i++) {
    this.enemies[i].currentCol     = 8;
    this.enemies[i].currentRow     = 2;
  }
}

// Drawing on canvas the map
Game.prototype._drawMap = function () {
  for (var colIndex = 0; colIndex < this.cols; colIndex++) {
    for (var rowIndex = 0; rowIndex < this.rows; rowIndex++) {
      
      if (this.map[colIndex][rowIndex] === this.wallChar) {
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(rowIndex * 50, colIndex * 50, 50, 50); // Remove 2px margin when using sprites
      }
      else if (this.map[colIndex][rowIndex] === this.floorChar) {
        this.ctx.fillStyle = 'blue';
        this.ctx.fillRect(rowIndex * 50, colIndex * 50, 50, 50); // Remove 2px margin when using sprites
      }
      else if (this.map[colIndex][rowIndex] === this.goalChar) {
        this.ctx.fillStyle = 'yellow';
        this.ctx.fillRect(rowIndex * 50, colIndex * 50, 50, 50); // Remove 2px margin when using sprites  
      }
    }
  }
}

// Drawing player on map
Game.prototype._drawPlayer = function() {  
  this.ctx.fillStyle = 'green';
  this.ctx.fillRect(this.player.currentRow * 50, this.player.currentCol * 50, 50, 50); // Remove 2px margin when using sprites  
}

// Drawing enemies on map
Game.prototype._drawEnemy = function(enemy) {    
  this.ctx.fillStyle = '#000000';
  this.ctx.fillRect(enemy.currentRow * 50, enemy.currentCol * 50, 50, 50); // Remove 2px margin when using sprites  
}

Game.prototype._checkCollisions = function() {

  var player = this.player;
  var x = player.currentCol;
  var y = player.currentRow;

  // Update x,y depending on the direction
  switch (player.direction) {
    case 'up':
    x--;
    break;
    case 'down':
    x++;
    break;
    case 'left':
    y--;
    break;
    case 'right':
    y++;
    break;
  };

  if (this.map[x][y] === this.enemyChar) {
    this.isEnd = true;
    player._updatePosition();    
  } else if (this.map[x][y] === this.goalChar) {
    this.isWin = true;
    player._updatePosition();
  }  
  else if (this.map[x][y] !== this.wallChar) {
    this.map[x][y]  = this.playerChar;
    this.map[player.currentCol][player.currentRow]  = this.floorChar;
    player._updatePosition();    
  } 

}

Game.prototype._checkEnemyCollisions = function(enemy) {

  var x = enemy.currentCol;
  var y = enemy.currentRow;

  // Update x,y depending on the direction
  switch (enemy.direction) {
    case 'up':
    x--;
    break;
    case 'down':
    x++;
    break;
    case 'left':
    y--;
    break;
    case 'right':
    y++;
    break;
  };

  if (this.map[x][y] === this.playerChar) {
    this.isEnd = true;
    enemy.move();
  }
  else if (this.map[x][y] !== this.wallChar && this.map[x][y] !== this.goalChar) {
    this.map[x][y]  = this.enemyChar;
    this.map[enemy.currentCol][enemy.currentRow]  = this.floorChar;
    enemy.move();
  }
  enemy.randomDirection();  
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

  }.bind(this);
}

Game.prototype.countdownControl = function() {

  // Start countdownTimer  
  this.countdownId = setInterval(function() {
    if (this.clock > 0) {
      this.clock--;
      document.getElementById('timer').innerText = 'Time: ' + this.clock;
    }    
  }.bind(this), 1000);    
}

Game.prototype._update = function() {
  if (this.isEnd === false && this.isWin === false) {
    this.frameCounter++;    
    this._drawMap();
    this._drawPlayer();
    var i = 0;
    while(i < this.enemies.length) {
      this._drawEnemy(this.enemies[i]);            
      if (this.frameCounter % 20 === 0) {  
        this._checkEnemyCollisions(this.enemies[i]);                        
      }
      i++
    }        
        
    window.requestAnimationFrame(this._update.bind(this));
  }
  else if (this.isWin === true) {
    clearInterval(this.countdownId);
    console.log('YOU WIN!');            
    this.cbGameWin();    
  }  
  else if (this.isEnd === true && this.isWin === false) {
    clearInterval(this.countdownId);      
    console.log('GAME OVER!');        
    this.cbGameOver();    
  }
  else if (this.clock <= 0) {
    // Stop countdownTimer
    console.log('TIME OUT!!');      
    this.isEnd = true;                          
  }
}

Game.prototype.start = function() {
  this._resetStatus();
  this.generateEnemies();
  this.countdownControl();   
  this._defineControlKeys();
  this._update();    
}