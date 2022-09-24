const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

window.addEventListener('load', setcanvasSize);
window.addEventListener('resize', setcanvasSize);

// variables globales
let elementSize;
let canvasSize;


function startGame() {
  console.log({ elementSize, canvasSize });

  game.font = (elementSize - 18) + 'px Verdana';
  game.textAlign = 'end';

  const map = maps[2];
  const mapRows = map.trim().split('\n');
  const mapRowCols = mapRows.map(row => row.trim().split(''));
  console.log(map, mapRows, mapRowCols)


  for (let row = 1; row <= 10; row++) {
    for (let col = 1; col <= 10; col++) {
      game.fillText(emojis[mapRowCols[row - 1][col - 1]], elementSize * col, elementSize * row);

    }

  }
}

// function para tamano ideal
function setcanvasSize() {
  let canvasSize;
  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.8;
  } else {
    canvasSize = window.innerHeight * 0.9;
  }

  canvas.setAttribute('width', canvasSize);
  canvas.setAttribute('height', canvasSize);

  elementSize = (canvasSize / 10) - 1;
  startGame()
}