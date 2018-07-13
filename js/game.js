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
  this.clock          = options.clock;
  this.frameCounter   = 0;  
  this.player         = new Player({
    currentCol: 14,   // InitialPlayerPos   
    currentRow: 8,   // InitialPlayerPos
  });      
  this.enemies        = [];
  this.intervalGenerateEnemies = undefined;     
  this.deathSnd       = options.deathSnd;
  this.gameoverSnd    = options.gameoverSnd;
  this.weWonSnd       = options.weWonSnd;
}

Game.prototype.generateEnemies = function(x,y,delay,nEntities) {
  
  this.intervalGenerateEnemies = setInterval(function() {
    this.enemies.push(new Enemy({
      currentCol: x,    // InitialEnemyPos
      currentRow: y,    // InitialEnemyPos
      direction: null
    }));    
    if (this.enemies.length === nEntities) {
      clearInterval(this.intervalGenerateEnemies);    
    }
  }.bind(this), delay);  
  
}

// Temporal reseting to initial pos at start (Phase1) x,y and timer
Game.prototype._resetStatus = function() {  
  clearInterval(this.countdownId);  
  clearInterval(this.intervalGenerateEnemies);
  this.clock = 21;
  this.isWin                = false;
  this.isEnd                = false;
  this.player.currentCol    = 14;  
  this.player.currentRow    = 8;
  this.enemies              = []; 
  this.map = [
    ["W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W"],
    ["W","F","F","F","F","F","F","F","F","F","F","F","F","F","G","W"],
    ["W","F","F","F","F","W","F","W","W","W","W","W","W","W","F","W"],
    ["W","F","W","W","F","W","F","W","F","W","F","F","F","F","F","W"],
    ["W","F","W","F","F","W","F","W","F","W","F","F","F","F","F","W"],
    ["W","F","W","F","W","W","F","W","F","F","F","F","F","F","F","W"],
    ["W","F","W","F","F","F","F","F","F","W","F","F","W","W","W","W"],
    ["W","F","W","W","W","W","W","W","F","W","F","F","F","F","F","W"],
    ["W","F","F","F","F","F","F","F","F","W","W","W","W","W","F","W"],
    ["W","F","W","F","F","F","F","F","F","F","F","W","F","F","F","W"],
    ["W","F","W","F","W","W","W","W","W","W","F","W","F","W","F","W"],
    ["W","F","W","F","W","F","F","F","F","F","F","W","F","W","W","W"],
    ["W","F","W","F","W","F","W","W","W","W","F","W","F","F","F","W"],
    ["W","F","W","F","W","F","W","F","F","W","F","W","W","W","F","W"],
    ["W","F","F","F","F","F","F","F","F","F","F","F","F","F","F","W"],
    ["W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W"],
  ];
}

// Temporal defining sprites
// wallSprite.onload = _renderMap; 
var wallSprite = new Image(50, 50);   
wallSprite.src = 'img/wall1.png';

var floorSprite = new Image(50, 50);    
floorSprite.src = 'img/floor1.png';

var goalSprite = new Image(50, 50);   
goalSprite.src = 'img/door1.png';

var playerSprite_left = new Image(50, 50);   
playerSprite_left.src = 'img/survivor1_left.png';
var playerSprite_right = new Image(50, 50);   
playerSprite_right.src = 'img/survivor1_right.png';
var playerSprite_up = new Image(50, 50);   
playerSprite_up.src = 'img/survivor1_up.png';
var playerSprite_down = new Image(50, 50);   
playerSprite_down.src = 'img/survivor1_down.png';

var enemySprite_left = new Image(50, 50);   
enemySprite_left.src = 'img/zombi1_left.png';
var enemySprite_right = new Image(50, 50);   
enemySprite_right.src = 'img/zombi1_right.png';
var enemySprite_up = new Image(50, 50);   
enemySprite_up.src = 'img/zombi1_up.png';
var enemySprite_down = new Image(50, 50);   
enemySprite_down.src = 'img/zombi1_down.png';

// Render on canvas the map with Sprites
Game.prototype._renderMap = function () {
  for (var colIndex = 0; colIndex < this.cols; colIndex++) {
    for (var rowIndex = 0; rowIndex < this.rows; rowIndex++) {
      
      if (this.map[colIndex][rowIndex] === this.wallChar) {
        this.ctx.drawImage(wallSprite, rowIndex * 50, colIndex * 50, 50, 50);        
      }
      else if (this.map[colIndex][rowIndex] === this.floorChar) {
        this.ctx.drawImage(floorSprite, rowIndex * 50, colIndex * 50, 50, 50);        
      }
      else if (this.map[colIndex][rowIndex] === this.goalChar) {
        this.ctx.drawImage(goalSprite, rowIndex * 50, colIndex * 50, 50, 50);        
      }
    }
  }
}

// Drawing on canvas the map
Game.prototype._drawMap = function () {
  for (var colIndex = 0; colIndex < this.cols; colIndex++) {
    for (var rowIndex = 0; rowIndex < this.rows; rowIndex++) {
      
      if (this.map[colIndex][rowIndex] === this.wallChar) {
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(rowIndex * 50, colIndex * 50, 50, 50); 
      }
      else if (this.map[colIndex][rowIndex] === this.floorChar) {
        this.ctx.fillStyle = 'blue';
        this.ctx.fillRect(rowIndex * 50, colIndex * 50, 50, 50); 
      }
      else if (this.map[colIndex][rowIndex] === this.goalChar) {
        this.ctx.fillStyle = 'yellow';
        this.ctx.fillRect(rowIndex * 50, colIndex * 50, 50, 50);   
      }
    }
  }
}

// Render player on map
Game.prototype._renderPlayer = function() {  
  
  switch (this.player.direction) {
    case 'up':
    this.ctx.drawImage(playerSprite_up, this.player.currentRow * 50, this.player.currentCol * 50, 50, 50);    
    break;
    case 'down':
    this.ctx.drawImage(playerSprite_down, this.player.currentRow * 50, this.player.currentCol * 50, 50, 50);    
    break;
    case 'left':
    this.ctx.drawImage(playerSprite_left, this.player.currentRow * 50, this.player.currentCol * 50, 50, 50);    
    break;
    case 'right':
    this.ctx.drawImage(playerSprite_right, this.player.currentRow * 50, this.player.currentCol * 50, 50, 50);    
    break;
  };
}

// Drawing player on map
Game.prototype._drawPlayer = function() {  
  this.ctx.fillStyle = 'green';
  this.ctx.fillRect(this.player.currentRow * 50, this.player.currentCol * 50, 50, 50);   
}

// Render enemies on map
Game.prototype._renderEnemy = function(enemy) {    
    
  switch (enemy.direction) {
    case 'up':
    this.ctx.drawImage(enemySprite_up, enemy.currentRow * 50, enemy.currentCol * 50, 50, 50);    
    break;
    case 'down':
    this.ctx.drawImage(enemySprite_down, enemy.currentRow * 50, enemy.currentCol * 50, 50, 50);    
    break;
    case 'left':
    this.ctx.drawImage(enemySprite_left, enemy.currentRow * 50, enemy.currentCol * 50, 50, 50);    
    break;
    case 'right':
    this.ctx.drawImage(enemySprite_right, enemy.currentRow * 50, enemy.currentCol * 50, 50, 50);    
    break;
  };

}

// Drawing enemies on map
Game.prototype._drawEnemy = function(enemy) {    
  this.ctx.fillStyle = '#000000';
  this.ctx.fillRect(enemy.currentRow * 50, enemy.currentCol * 50, 50, 50);  
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
        this.player.direction = 'up';       
        this._checkCollisions();
        break;
      case 40: // DOWN        
        this.player.direction = 'down';     
        this._checkCollisions();
        break;
      case 37: // LEFT        
        this.player.direction = 'left';     
        this._checkCollisions();
        break;
      case 39: // RIGHT        
        this.player.direction = 'right';   
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
    this._renderMap();    
    this._renderPlayer();
    var i = 0;
    while(i < this.enemies.length) {
      
      this._renderEnemy(this.enemies[i]);            
      if (this.frameCounter % 40 === 0) {  
        this._checkEnemyCollisions(this.enemies[i]);                        
      }
      i++      
    }   
    window.requestAnimationFrame(this._update.bind(this));
  }
  // YOU WIN!
  if (this.isWin === true) {
    clearInterval(this.countdownId);
    clearInterval(this.intervalGenerateEnemies);    
    this.weWonSnd.play();            
    this.cbGameWin();    
    return    
  }  
  // GAME OVER!
  if (this.isEnd === true && this.isWin === false) {
    clearInterval(this.countdownId);
    clearInterval(this.intervalGenerateEnemies);      
    this.deathSnd.play();    
    this.cbGameOver();
    this.gameoverSnd.play();    
    return
  }
  // TIME OUT!!
  if (this.clock <= 0) {
    // Stop countdownTimer    
    this.isEnd = true;
    this.gameoverSnd.play();                          
  }
}

Game.prototype.start = function() {
  this._resetStatus();
  this.generateEnemies(1,1,2000,30);
  this.generateEnemies(3,10,4000,10);    
  this.countdownControl();   
  this._defineControlKeys();
  this._update();    
}