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

  // Building reStart button
  var restartButton = document.createElement('button');
  restartButton.setAttribute('id', 'restartButton');
  restartButton.setAttribute('class', 'btn');
  restartButton.innerText = 'RESTART';
  restartButton.addEventListener('click', destroyGameOver);

  // Timer
  var intervalID;

  // Constructing the game  
  var ctx = canvas.getContext('2d');

  var game = new Game({
    rows:       canvas.width / 50,
    cols:       canvas.height / 50,    
    ctx:        ctx,
    wallChar:   'W',
    floorChar:  'F',
    playerChar: 'P',
    map: [
      ["W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W"],
      ["W","F","F","W","F","F","F","W","F","W","W","F","W","F","F","W"],
      ["W","W","F","W","F","W","W","W","W","F","F","W","W","F","W","W"],
      ["W","F","F","F","F","F","F","F","F","F","F","F","F","F","F","W"],
      ["W","F","F","F","W","F","W","F","F","W","W","F","F","F","F","W"],
      ["W","F","F","F","W","F","W","F","F","F","F","F","W","W","W","W"],
      ["W","W","W","W","W","F","W","W","W","W","W","W","W","F","F","W"],
      ["W","F","F","F","F","F","F","F","F","F","F","F","F","F","F","W"],
      ["W","F","F","F","F","F","F","F","F","F","F","F","F","W","W","W"],
      ["W","F","F","F","F","F","F","F","F","F","F","F","F","W","W","W"],
      ["W","F","W","F","W","W","F","F","F","F","F","F","F","W","W","W"],
      ["W","F","W","F","W","W","F","F","F","F","F","F","F","F","F","W"],
      ["W","F","W","F","F","W","F","F","F","F","F","F","F","F","F","W"],
      ["W","W","W","F","F","W","W","W","W","W","W","W","W","W","W","W"],
      ["W","F","F","F","F","F","F","F","F","F","F","F","F","F","F","W"],
      ["W","W","W","W","W","W","W","W","W","W","W","W","W","W","W","W"],
    ],    
  });
  
  function buildSplash() {    
    document.body.appendChild(mainMenu);
    mainMenu.appendChild(startButton);
  }

  function destroySplash() {        
     mainMenu.remove();
     startGame();
  }
  
  // DEV MODE: Key to game over
  function escapeDEV(e){
    var keyCode = e.keyCode;
    if(keyCode == 27){
      buildGameOver();
    }
  };
  
  function startGame() {
    document.body.appendChild(canvas);
    
    game._defineControlKeys();
    game._update();    

    // intervalID = window.setInterval(buildGameOver, 2000);
    window.addEventListener('keydown', escapeDEV);    // DEV MODE: Key to game over
    
  }

  function buildGameOver() {
    canvas.remove();    
    document.body.appendChild(gameOver);
    gameOver.appendChild(restartButton); 
  }

  function destroyGameOver() {
    gameOver.remove();
    // clearInterval(intervalID);
    window.removeEventListener('keydown', escapeDEV);  // DEV MODE: Key to game over
    buildSplash();
  }
  buildSplash();
}

window.addEventListener('load', main)