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
  canvas.setAttribute('height', 600);

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

  function buildSplash() {    
    document.body.appendChild(mainMenu);
    mainMenu.appendChild(startButton);
  }

  function destroySplash() {        
     mainMenu.remove();
     startGame();
  }
  
  function startGame() {
    document.body.appendChild(canvas);
    
    intervalID = window.setInterval(buildGameOver, 2000);
  }

  function buildGameOver() {
    canvas.remove();    
    document.body.appendChild(gameOver);
    gameOver.appendChild(restartButton); 
  }

  function destroyGameOver() {
    gameOver.remove();
    clearInterval(intervalID);
    buildSplash();
  }
  buildSplash();
}

window.addEventListener('load', main)