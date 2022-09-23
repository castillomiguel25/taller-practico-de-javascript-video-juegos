const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

window.addEventListener('load', startGame );

function startGame () {

    let canvasSize;
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.8;
    }else {
        canvasSize = window.innerHeight * 0.8;
    }

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    const elementSise = canvasSize / 10;

    console.log({elementSise, canvasSize});
    game.font = elementSise + 'px Verdana';
    game.fillText(emojis['X'], 100, 100);

    // game.fillRect(0,50,100,100);
    
}