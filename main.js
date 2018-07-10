function main() {
  
  // Building start button
  var startButton = document.createElement('button');
  startButton.setAttribute('id', 'startButton');
  startButton.setAttribute('class', 'btn');
  startButton.innerText = 'START';
  startButton.addEventListener('click', destroySplash);

  // Building main menu
  var mainMenu = document.createElement('div');
  mainMenu.setAttribute('id', 'main-menu');

  // Building canvas
  var canvas = document.createElement('canvas');
  canvas.setAttribute('id', 'main');
  canvas.setAttribute('width', 800);
  canvas.setAttribute('height', 800);

  // Building Game Over
  var gameOver = document.createElement('div');
  gameOver.setAttribute('id', 'game-over');

  // Building Game Win
  var gameWin = document.createElement('div');
  gameWin.setAttribute('id', 'game-win');

  // Building reStart button
  var restartButton = document.createElement('button');
  restartButton.setAttribute('id', 'restartButton');
  restartButton.setAttribute('class', 'btn');
  restartButton.innerText = 'RESTART';
  restartButton.addEventListener('click', destroyGameOver);
  restartButton.addEventListener('click', destroyGameWin);

  // Timer 
  var countdownTimer = document.createElement('div');
  countdownTimer.setAttribute('id', 'timer');
  countdownTimer.setAttribute('class', 'btn');    

  // Constructing the game  
  var ctx = canvas.getContext('2d');

  var game = new Game({
    rows:       canvas.width / 50,
    cols:       canvas.height / 50,    
    ctx:        ctx,
    wallChar:   'W',
    floorChar:  'F',
    playerChar: 'P',
    goalChar:   'G',       
    isEnd:      false,
    isWin:      false,
    map: [
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
    ],    
  },buildGameOver, buildGameWin, countdownTimer);
  
  
  // Main menu screen functions
  function buildSplash() {    
    document.body.appendChild(mainMenu);
    mainMenu.appendChild(startButton);
  }

  function destroySplash() {        
     mainMenu.remove();
     buildGame();
  }
  
  // DEV MODE: Key to game over
  function escapeDEV(e){
    var keyCode = e.keyCode;
    if(keyCode == 27){            
      buildGameOver();
    }
  };

  // Game loop
  function buildGame() {
    document.body.appendChild(canvas);
    game.start();

    // DEV MODE: Key to game over
    window.addEventListener('keydown', escapeDEV);        
  }

  // Game over screen functions
  function buildGameOver() {
    canvas.remove();        
    document.body.appendChild(gameOver);
    gameOver.appendChild(restartButton); 
  }

  function destroyGameOver() {
    gameOver.remove();

    // DEV MODE: Key to game over   
    window.removeEventListener('keydown', escapeDEV);
      
    buildSplash();
  }

  // Game Win screen 
  function buildGameWin() {
    canvas.remove();        
    document.body.appendChild(gameWin);
    gameWin.appendChild(restartButton); 
  }

  function destroyGameWin() {
    gameWin.remove();

    // DEV MODE: Key to game over   
    window.removeEventListener('keydown', escapeDEV);  
    buildSplash();
  }

  buildSplash();
}

window.addEventListener('load', main)