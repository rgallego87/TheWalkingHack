# The Walking Hack 

## Description 

After the explanation about the Callbacks on Ironhack you have fallen into a coma. Later, you have woken up again on Ironhack but in a post-apocalyptic world. Now, the teachers, TAs and staff of Ironhack are ZOMBIES. The only way to survive is return to the exit on time before the setInterval catches you, but beware it will not be easy.

## Tech

- Canvas

## States

- Main menu (gameStart)
- Gameplay (destroySplash)
  - Win (endPlay)
  - Lose (endPlay)
- Back (restart)

### States possible improvement

- Main menu
  - Start
  - Instructions
- Intro
- Gameplay
  - Win
  - Lose

## Data structures

### MVP

- main.js
  - buildSplash();
  - destroySplash();
  - startGame();  
  - destroyGame();
  - buildGameOver(isWin);
  - destroyGameOver();

- game.js
  - class RenderMap
  - class Game
  time
  isWin = false;
  isEnd = false;
    - update();
    - checkCollisions();        
    - defineKeys();

- player.js
  - class Player
    - movement();
    - moveUp();
    - moveRight();
    - moveDown();
    - moveLeft();

### Backlogs

enemy.js
- class Enemy

bullets.js
- class Bullets

## Tasks

### MVP 

- Initial menu screen with start button and instructions just below.
- Map with starting point and exit point of the labyrinth.
- Map collisions control.
- Countdown time to complete the map. 
- If you arrive at the exit on time you win, if not you die, all of two goes to the restart screen.
- Defined map 16x16 tiles.

### Backlogs 

#### Iteration 1: Keys

- Define keys objects.
- Doors that open with the keys.

#### Iteration 2: Enemies 

- Define enemies.
- Deterministic behaviors that move in one direction.
- They change when they collide with walls or they kill you.

#### Iteration 3: Sprites 

- Select sprites.
- Load the complete sprite-sheet in png.
- Cut the necessary part of the PNG for each object.

#### Iteration 4: Bullets

- Player shooting with bullets to kill enemies.

#### Iteration 5: Sounds

- Musics:
  - Main menu
  - Gameplay
  - Win screen
  - Dead screen
- Sound effects:
  - Take key
  - Shoot
  - Arrive goal
  - Player dead
  - Enemy dead

#### Iteration 6: New Phases

- Phase 2 
- Phase 3

### Misc

- define control objects such as:
  - walls
  - items
  - doors
  - entry
  - departure
  - enemies
  - bullets
  
### Trello

[The Walking Hack tasks kanban board](https://trello.com/b/sIacF3LK/the-walking-hack)

### Github

[Repo](https://github.com/rgallego87/TheWalkingHack)
