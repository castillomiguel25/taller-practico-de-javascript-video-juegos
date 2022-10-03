// game init

const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

// variables para botones

const btnUp = document.querySelector('#Up');
const btnLeft = document.querySelector('#Left');
const btnRight = document.querySelector('#Right');
const btnDown = document.querySelector('#Down');

// resize y load de la pagina
window.addEventListener('load', setcanvasSize);
window.addEventListener('resize', setcanvasSize);

// variables 
let elementSize;
let canvasSize;
let level = 0;

// posicion del jugador
const playerPosition = {
  x: undefined,
  y: undefined,
}

// posicion del regalo
const giftPosition = {
  x: undefined,
  y: undefined,
}

// colision ememiga
let enemiesPositions = [];


// funcionalidad del juego

function startGame() {
  console.log({ elementSize, canvasSize });

  game.font = (elementSize - 18) + 'px Verdana';
  game.textAlign = 'end';

  // const map de todos los papas del juego
  const map = maps[level];

  if (!map) {
    gameWin();
    return;
  }

  const mapRows = map.trim().split('\n');
  const mapRowCols = mapRows.map(row => row.trim().split(''));
  console.log(map, mapRows, mapRowCols)

  enemiesPositions = [];
  game.clearRect(0, 0, canvasSize, canvasSize);
  mapRowCols.forEach((row, rowI) => {
    row.forEach((col, colI) => {
      const emoji = emojis[col];
      const posX = elementSize * (colI + 1);
      const posY = elementSize * (rowI + 1);

      if (col == 'O') {
        if (!playerPosition.x && !playerPosition.y) {
          playerPosition.x = posX;
          playerPosition.y = posY;
          console.log({ playerPosition });
        }
      } else if (col == 'I') {
        giftPosition.x = posX;
        giftPosition.y = posY;
        console.log({ giftPosition });
      } else if (col == 'X') {
        enemiesPositions.push({
          x: posX,
          y: posY,
        })
      }

      game.fillText(emoji, posX, posY);
    });
  });

  movePlayer();
}

// movimiento jugador function
function movePlayer() {
  const giftCollisionX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);
  const giftCollisionY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);
  const giftCollision = giftCollisionX && giftCollisionY;

  if (giftCollision) {
    levelWin()
  }

  const enemyCollisions = enemiesPositions.find(enemy => {
    const enemyCollisionsX = enemy.x == playerPosition.x;
    const enemyCollisionsY = enemy.y == playerPosition.y;
    return enemyCollisionsX && enemyCollisionsY;

  });
  if (enemyCollisions) {
    console.log('chocaste contra un enemigo');
  }
  game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

function levelWin() {
  console.log('subiste de nivel')
  level++;
  startGame()
}

function gameWin() {
  console.log('terminaste el juego');
}

// function para tamano ideal
function setcanvasSize() {

  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.7;
  } else {
    canvasSize = window.innerHeight * 0.7;
  }

  canvasSize = Number(canvasSize.toFixed());

  canvas.setAttribute('width', canvasSize);
  canvas.setAttribute('height', canvasSize);

  elementSize = (canvasSize / 10) - 1;
  startGame()
}



// logica de movimiento
window.addEventListener('keydown', movebyKeys);
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

function movebyKeys(event) {
  if (event.key == 'ArrowUp') moveUp();
  else if (event.key == 'ArrowLeft')
    moveLeft();
  else if (event.key == 'ArrowRight')
    moveRight();
  else if (event.key == 'ArrowDown')
    moveDown();

}

function moveUp() {
  console.log('me quiero mover para arriba');

  if ((playerPosition.y - elementSize) < elementSize) {
    console.log("out")
  } else {
    playerPosition.y -= elementSize;
    startGame();
  }

}

function moveLeft() {
  console.log('me quiero mover para izquierda');

  if ((playerPosition.x - elementSize) < elementSize) {
    console.log("out")
  } else {
    playerPosition.x -= elementSize;
    startGame();
  }


}

function moveRight() {
  console.log('me quiero mover para derecha');
  if ((playerPosition.x + elementSize) > canvasSize) {
    console.log("out")
  } else {
    playerPosition.x += elementSize;
    startGame();
  }
}

function moveDown() {
  console.log('me quiero mover para abajo');
  if ((playerPosition.y + elementSize) > canvasSize) {
    console.log("out")
  } else {
    playerPosition.y += elementSize;
    startGame();
  }
}


