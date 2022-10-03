

// music

const gameMusic = document.querySelector('#gameMusic');
const audioState = document.querySelector('#audio-state');
soundButton.addEventListener('click', manageMusic);

function manageMusic() {
    if (!gameMusic.paused) {
        gameMusic.pause();
        audioState.innerHTML = "🔈";
    } else {
        gameMusic.play();
        audioState.innerHTML = "🔊";
    }
  }