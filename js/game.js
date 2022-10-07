// game init

const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

// variables para botones

const btnUp = document.querySelector('#Up');
const btnLeft = document.querySelector('#Left');
const btnRight = document.querySelector('#Right');
const btnDown = document.querySelector('#Down');
const spanLives = document.querySelector('#lives');
const spanTimes = document.querySelector('#time');
const spanRecord = document.querySelector('#Record');
const pResult = document.querySelector('#result');
// resize y load de la pagina
window.addEventListener('load', setcanvasSize);
window.addEventListener('resize', setcanvasSize);

// variables 
let elementSize;
let canvasSize;
let level = 0;
let lives = 3;

// time
let timeStart;
let timePlayer;
let timeInterval;

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

  // console.log({ elementSize, canvasSize });

  game.font = (elementSize - 8) + 'px Verdana';
  game.textAlign = 'end';

  // variables para los mapas del juego
  const map = maps[level];

  if (!map) {
    gameWin();
    return;
  }

  // condicionar para imprimir el tiempo
  if (!timeStart) {
    timeStart = Date.now();
    timeInterval = setInterval(showTime, 100);
    showRecord();
  }

  const mapRows = map.trim().split('\n');
  const mapRowCols = mapRows.map(row => row.trim().split(''));
  console.log(map, mapRows, mapRowCols)

  // span de vidas
  showLives()

  // posicion del enemigo
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

  // condicionar cuando llegamoms al regalo
  if (giftCollision) {
    levelWin()
  }


  const enemyCollisions = enemiesPositions.find(enemy => {
    const enemyCollisionsX = enemy.x == playerPosition.x;
    const enemyCollisionsY = enemy.y == playerPosition.y;
    return enemyCollisionsX && enemyCollisionsY;

  });
  if (enemyCollisions) {
    levelFail();
  }
  game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

// funcion para subir de nivel
function levelWin() {
  console.log('subiste de nivel')
  level++;
  startGame()
}

// funcion para restar vida 
function levelFail() {
  console.log('chocaste')
  lives--;



  if (lives <= 0) {
    level = 0;
    lives = 3;
    timeStart = undefined;
  }


  playerPosition.x = undefined;
  playerPosition.y = undefined;
  startGame();
}

function gameWin() {
  console.log('terminaste el juego');
  clearInterval(timeInterval);

  // local storage
  const recordTime = localStorage.getItem('record_time');
  const playerTime = Date.now() - timeStart;

  if (recordTime) {
    if (recordTime >= playerTime) {
      localStorage.setItem('record_time', playerTime);
      pResult.innerHTML = 'superaste el record'
    } else {
      pResult.innerHTML = 'lo siento no superaste el record';
    }
  } else {
    localStorage.setItem('record_time', playerTime)
  }

  console.log({ recordTime, playerTime });
}


// function de vida
function showLives() {

  const heartArray = Array(lives).fill(emojis['HEART']);
  console.log(heartArray)

  spanLives.innerHTML = heartArray;

}

// function para el tiempo
function showTime() {
  spanTimes.innerHTML = + ((Date.now() - timeStart) / 1000);
}

function showRecord() {
  spanRecord.innerHTML = (localStorage.getItem('record_time')/ 1000);
}

// function para tamano ideal



function setcanvasSize() {
  let wHeight = window.innerHeight;
  let wWidth = window.innerWidth;
  
  (wHeight < wWidth)
      ? canvasSize = wHeight * 0.8
      : canvasSize = wWidth * 0.8;

  canvas.setAttribute('width', canvasSize);
  canvas.setAttribute('height', canvasSize+10);

  elementSize = Math.floor(canvasSize/10);

  playerPosition.x = undefined;
  playerPosition.y = undefined;
  startGame();
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


