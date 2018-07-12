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
  // Building canvas wrapper
  var wrapper = document.createElement('div');
  wrapper.setAttribute('id', 'canvas-wrapper');  

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

  // Building buttons wrapper
  var btnWrapper = document.createElement('div');
  btnWrapper.setAttribute('class', 'btn-wrapper');
  var btnWrapper2 = document.createElement('div');
  btnWrapper2.setAttribute('class', 'btn-wrapper');  

  // Timer 
  var countdownTimer = document.createElement('div');
  countdownTimer.setAttribute('id', 'timer');
  countdownTimer.setAttribute('class', 'timer-hud');    

  // Constructing the game  
  var ctx = canvas.getContext('2d');

  // Musics and sounds
  var generalSnd  = new Sound('');  
  var splashMusic = new Sound('snd/TWD_Theme.mp3');
  var inGameMusic = new Sound('snd/TheWay_InGame.mp3');  

  // Building mutePage button  
  var muteButton = document.createElement('button');  
  muteButton.setAttribute('id', 'stopMusic');
  muteButton.setAttribute('class', 'btn');
  muteButton.setAttribute('style', 'margin-left:20px;');
  var volumeIco = document.createElement('i');
  muteButton.appendChild(volumeIco);
  volumeIco.setAttribute('class','fas fa-volume-up');  
  volumeIco.addEventListener('click', function changeIco(){    
    if (volumeIco.className === 'fas fa-volume-up') {
      volumeIco.removeAttribute('class','fas fa-volume-up');  
      volumeIco.setAttribute('class','fas fa-volume-off'); 
      // volumeIco.removeEventListener(volumeIco); 
    } else volumeIco.setAttribute('class','fas fa-volume-up');      
  });
  muteButton.addEventListener('click', generalSnd.mutePage);

  var game = new Game({
    rows:       canvas.height / 50,
    cols:       canvas.width / 50,    
    ctx:        ctx,
    wallChar:   'W',
    floorChar:  'F',
    playerChar: 'P',
    goalChar:   'G',
    enemyChar:  'E',       
    isEnd:      false,
    isWin:      false,        
  },buildGameOver, buildGameWin);
  
  // Main menu screen functions
  function buildSplash() {        
    splashMusic.play();
    splashMusic.sound.loop = true;    
    document.body.appendChild(mainMenu);
    mainMenu.appendChild(btnWrapper)
    btnWrapper.appendChild(startButton);
    btnWrapper.appendChild(muteButton);
  }

  function destroySplash() {        
    splashMusic.stop(); 
    mainMenu.remove();    
         
    buildGame();
  }  
  
  // Game loop
  function buildGame() {    
    document.body.appendChild(wrapper);
    wrapper.appendChild(canvas);
    inGameMusic.play();
    inGameMusic.sound.loop = true;
    document.body.appendChild(countdownTimer);        

    game.start();    
  }

  // Game over screen functions
  function buildGameOver() {
    inGameMusic.stop();
    canvas.remove();
    countdownTimer.remove();        
    document.body.appendChild(gameOver);
    gameOver.appendChild(btnWrapper2); 
    btnWrapper2.appendChild(restartButton);
  }

  function destroyGameOver() {
    gameOver.remove();    
    buildSplash();
  }

  // Game Win screen 
  function buildGameWin() {
    inGameMusic.stop();
    canvas.remove();
    countdownTimer.remove();        
    document.body.appendChild(gameWin);
    gameWin.appendChild(btnWrapper2);
    btnWrapper2.appendChild(restartButton); 
  }

  function destroyGameWin() {
    gameWin.remove();       
    buildSplash();
  }

  buildSplash();
}

window.addEventListener('load', main)