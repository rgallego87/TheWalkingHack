function Game(options, buildGameOver, buildGameWin, countdownTimer) {
  this.countdownTimer = countdownTimer;
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
  this.enemy          = new Enemy({
    currentCol: 8,    // InitialEnemyPos
    currentRow: 2,    // InitialEnemyPos
    direction: null,
  });
  // this.enemies          = []; 
  // this._generateEnemies();
  this.enemy.randomDirection(); 
  this.frameCounter   = 0;    
}

Game.prototype._generateEnemies = function() {
  var numOfEnemies = 10;

  for (var i = 0; i < numOfEnemies; i++) {
    this.enemies[i] = new Enemy({
      currentCol: 8,    // InitialEnemyPos
      currentRow: 2,    // InitialEnemyPos
      direction: null,
    });
    this.enemies[i].randomDirection();
  }

}

// Temporal reseting to initial pos at start (Phase1) x,y and timer
var clock       = 11;
Game.prototype._resetStatus = function() {  
  clearInterval(this.countdownId);  
  clock = 11;
  this.isWin                = false;
  this.isEnd                = false;
  this.player.currentCol    = 14;  
  this.player.currentRow    = 14;
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
  this.enemy.currentCol     = 8;
  this.enemy.currentRow     = 2;
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
Game.prototype._drawEnemy = function() {  
  this.ctx.fillStyle = '#000000';
  this.ctx.fillRect(this.enemy.currentRow * 50, this.enemy.currentCol * 50, 50, 50); // Remove 2px margin when using sprites
}

Game.prototype._checkCollisions = function() {

    // Checking collisions with control characters and if not update to new player pos
    switch (this.player.direction) {
      case 'up': // UP
        if (this.map[this.player.currentCol - 1][this.player.currentRow] !== this.wallChar) {
          // Updating control player chars on main map matrix
          if (this.map[this.player.currentCol - 1][this.player.currentRow] !== this.goalChar) {
            this.map[this.player.currentCol - 1][this.player.currentRow]  = this.playerChar;
            this.map[this.player.currentCol][this.player.currentRow]      = this.floorChar;
          }  
          // then moves
          this.player.goUp();
        }  
      break;
      case 'down': // DOWN
        if (this.map[this.player.currentCol + 1][this.player.currentRow] !== this.wallChar) {
          // Updating control player chars on main map matrix
          if (this.map[this.player.currentCol + 1][this.player.currentRow] !== this.goalChar) {
            this.map[this.player.currentCol + 1][this.player.currentRow] = this.playerChar;
            this.map[this.player.currentCol][this.player.currentRow]     = this.floorChar;
          }  
          // then moves
          this.player.goDown();
        }  
      break;
      case 'left': // LEFT
        if (this.map[this.player.currentCol][this.player.currentRow - 1] !== this.wallChar) {
          // Updating control player chars on main map matrix
          if (this.map[this.player.currentCol][this.player.currentRow - 1] !== this.goalChar) {
            this.map[this.player.currentCol][this.player.currentRow - 1]  = this.playerChar;
            this.map[this.player.currentCol][this.player.currentRow]      = this.floorChar;
          }  
          // then moves
          this.player.goLeft();
        }  
      break;
      case 'right': // RIGHT
        if (this.map[this.player.currentCol][this.player.currentRow + 1] !== this.wallChar) {
          // Updating control player chars on main map matrix
          if (this.map[this.player.currentCol][this.player.currentRow + 1] !== this.goalChar) {
            this.map[this.player.currentCol][this.player.currentRow + 1] = this.playerChar;
            this.map[this.player.currentCol][this.player.currentRow]     = this.floorChar;
          }  
          // then moves
          this.player.goRight();    
        }  
      break;
    }
}

Game.prototype._checkEnemyCollisions = function() {

  // Checking collisions with control characters and if not update to new enemy pos
  switch (this.enemy.direction) {
    case 'up': // UP
    if (this.map[this.enemy.currentCol - 1][this.enemy.currentRow] !== this.wallChar) {
      // Updating control player chars on main map matrix
      if (this.map[this.enemy.currentCol - 1][this.enemy.currentRow] !== this.goalChar) {
        if (this.map[this.enemy.currentCol - 1][this.enemy.currentRow] !== this.playerChar) {
          this.map[this.enemy.currentCol - 1][this.enemy.currentRow]  = this.enemyChar;
          this.map[this.enemy.currentCol][this.enemy.currentRow]      = this.floorChar;
        } else this.isEnd = true;
      }
      // then moves
      this.enemy.move();
    } 
      break;
    case 'down': // DOWN
    if (this.map[this.enemy.currentCol + 1][this.enemy.currentRow] !== this.wallChar) {
      // Updating control player chars on main map matrix
      if (this.map[this.enemy.currentCol + 1][this.enemy.currentRow] !== this.goalChar) {
        if (this.map[this.enemy.currentCol + 1][this.enemy.currentRow] !== this.playerChar) {
          this.map[this.enemy.currentCol + 1][this.enemy.currentRow]  = this.enemyChar;
          this.map[this.enemy.currentCol][this.enemy.currentRow]      = this.floorChar;
        } else this.isEnd = true;
      }
      // then moves
      this.enemy.move();
    }  
      break;
    case 'left': // LEFT
    if (this.map[this.enemy.currentCol][this.enemy.currentRow - 1] !== this.wallChar) {
      // Updating control player chars on main map matrix
      if (this.map[this.enemy.currentCol][this.enemy.currentRow - 1] !== this.goalChar) {
        if (this.map[this.enemy.currentCol][this.enemy.currentRow - 1] !== this.playerChar) {
          this.map[this.enemy.currentCol][this.enemy.currentRow - 1]  = this.enemyChar;
          this.map[this.enemy.currentCol][this.enemy.currentRow]      = this.floorChar;
        } else this.isEnd = true;
      }
      // then moves
      this.enemy.move();
    }  
      break;
    case 'right': // RIGHT
    if (this.map[this.enemy.currentCol][this.enemy.currentRow + 1] !== this.wallChar) {
      // Updating control player chars on main map matrix
      if (this.map[this.enemy.currentCol][this.enemy.currentRow + 1] !== this.goalChar) {
        if (this.map[this.enemy.currentCol][this.enemy.currentRow + 1] !== this.playerChar) {
          this.map[this.enemy.currentCol][this.enemy.currentRow + 1]  = this.enemyChar;
          this.map[this.enemy.currentCol][this.enemy.currentRow]      = this.floorChar;
        } else this.isEnd = true;
      }
      // then moves
      this.enemy.move();
    }  
      break;
  }
  this.enemy.randomDirection();  
}

Game.prototype._checkGoal = function() {
  if (this.map[this.player.currentCol][this.player.currentRow] === this.goalChar) {
    console.log('GOAL!!');
    this.isWin = true;
  }
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

Game.prototype.countdownControl = function(countdownTimer) {

  document.body.appendChild(countdownTimer);
  
  // Start countdownTimer  
  this.countdownId = setInterval(function() {
    if (clock > 0 && this.isEnd === false && this.isWin === false) {
      clock = clock - 1;
      document.getElementById('timer').innerText = 'Time: ' + clock;
    }
    else {
      // Stop countdownTimer
      clearInterval(this.countdownId);      
      console.log('TIME OUT!!');      
      this.isEnd = true;                
    }
    
  }.bind(this), 1000);    
}

Game.prototype._update = function() {
  if (this.isEnd === false && this.isWin === false) {
    this.frameCounter++;
    this._drawMap();
    this._drawPlayer();
    this._drawEnemy();    
    if (this.frameCounter % 10 === 0) {
      this._checkEnemyCollisions();      
    }    
    this._checkGoal();
    if (this.isWin === true) {
      clearInterval(this.countdownId);
      console.log('YOU WIN!');      
      this.countdownTimer.remove();
      this.cbGameWin();
    }        
    window.requestAnimationFrame(this._update.bind(this));
  }  
  if (this.isEnd === true && this.isWin === false) {
    clearInterval(this.countdownId);      
    console.log('GAME OVER!');    
    this.countdownTimer.remove();
    this.cbGameOver();    
  }
}

Game.prototype.start = function() {
  this._resetStatus();
  this._defineControlKeys();
  this.countdownControl(this.countdownTimer);   
  this._update();    
}