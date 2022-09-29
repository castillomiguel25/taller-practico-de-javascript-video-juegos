const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

const btnUp = document.querySelector('#Up');
const btnLeft = document.querySelector('#Left');
const btnRight = document.querySelector('#Right');
const btnDown = document.querySelector('#Down');

window.addEventListener('load', setcanvasSize);
window.addEventListener('resize', setcanvasSize);

// variables globales
let elementSize;
let canvasSize;

const playerPosition = {
  x: undefined,
  y: undefined,
}


function startGame() {
  console.log({ elementSize, canvasSize });

  game.font = (elementSize - 18) + 'px Verdana';
  game.textAlign = 'end';

  const map = maps[0];
  const mapRows = map.trim().split('\n');
  const mapRowCols = mapRows.map(row => row.trim().split(''));
  console.log(map, mapRows, mapRowCols)

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
      }

      game.fillText(emoji, posX, posY);
    });
  });

  movePlayer();
}

// movimiento jugador function
function movePlayer() {
  game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y)
}

// function para tamano ideal
function setcanvasSize() {

  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.7;
  } else {
    canvasSize = window.innerHeight * 0.7;
  }

  canvas.setAttribute('width', canvasSize);
  canvas.setAttribute('height', canvasSize);

  elementSize = (canvasSize / 10) - 1;
  startGame()
}

// logica de movimiento
window.addEventListener('keydown', movebyKeys);
btnUp.addEventListener('click', moveUp)
btnLeft.addEventListener('click', moveLeft)
btnRight.addEventListener('click', moveRight)
btnDown.addEventListener('click', moveDown)

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


