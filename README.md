# The Walking Hack 

## About 

Después de recibir la explicación sobre los Callbacks en Ironhack caes en coma y te despiertas al tiempo de nuevo en Ironhack en un mundo postapocalíptico. Todo está lleno de Profes, TAs y staff zombie. La única manera de sobrevivir es volver a la salida a tiempo antes de que el setInterval te pille, pero cuidado no será fácil.

## Tech

- Canvas

## States

- Main Menu
- Gameplay
  - Win
  - Lose

### States possible improvement

- Menú principal
  - Start
  - Instructions
- Intro
- Gameplay
  - Win
  - Lose

## Data structures

### MVP

- main.js
  - startGame();

- game.js
  - class RenderMap
  - class Game
    - splashScreen();
    - winScreen();
    - deadScreen();
    - updateState();
    - checkCollisions();
    - timer();
    - isEnd();
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

- Pantalla de menú inicial con botón start e instrucciones justo debajo.
- Mapa con punto de inicio y punto de salida del mapa/laberinto.
- Control de colisiones con el mapa.
- Un tiempo para completar el mapa y si no game over.
- Si llegas a la salida en el tiempo pantalla de win y si no pantalla de game over con botón de restart.
- Mapa definido de tiles de 16x16.

### Backlogs 

#### Iteración 1: Keys

- Definir objetos llaves.
- Puertas que se abren con las llaves.

#### Iteración 2: Enemys 

- Definir enemigos.
- Comportamientos deterministas que se mueven en una dirección.
- Cambian cuando colisionan con paredes o te matan.

#### Iteración 3: Sprites 

- Seleccionar sprites.
- Cargar la sprite-sheet completa en png.
- Recortar la parte necesaria del png para cada objeto.

#### Iteración 4: Bullets

- Disparos con balas para matar enemigos.

#### Iteración 5: Sounds

- Músicas:
  - Menú principal.
  - Juego.
  - Pantalla win.
  - Pantalla muerte.
- Efectos de sonido:
  - Coger llaves.
  - Disparar.
  - Llegar a la salida.
  - Muerte del personaje.
  - Muerte del enemigo.

#### Iteración 6: New Phases

- Pantalla 2. 
- Pantalla 3.

### Misc

- definir objetos de control como:
  - paredes 
  - items 
  - puertas 
  - entrada 
  - salida 
  - enemigos 
  - balas
  
### Trello

[The Walking Hack tasks kanban board](https://trello.com/b/sIacF3LK/the-walking-hack)

### Github

[Repo](https://github.com/rgallego87/TheWalkingHack)
