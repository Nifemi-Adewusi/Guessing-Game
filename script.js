'use strict';
const again = document.querySelector('.again');
const number = document.querySelector('.number');
const inputField = document.querySelector('.guess');
const inputValue = document.querySelector('.check');
const message = document.querySelector('.message');
const score = document.querySelector('.score');
const displayHighScore = document.querySelector('.highscore');
// Checks If There's an Highscore already, if there isn't it'll be set to 0 by default.
let highScore = parseInt(localStorage.getItem('highScore')) || 0;
const body = document.querySelector('body');

function generateRandomNumber() {
  return Math.trunc(Math.random() * 20) + 1;
}

function playAudio(audioFile) {
  new Audio(audioFile).play();
}

let randomNumber = generateRandomNumber();

function decreaseScore() {
  const getScore = score.textContent;
  let convertInt = parseFloat(getScore);
  convertInt--;
  score.textContent = convertInt;
  return convertInt;
}

function generalReset() {
  number.textContent = '?';
  inputField.value = '';
  score.textContent = 20;
  message.textContent = 'Start guessing';
  body.style.backgroundColor = '#222';
}

function saveHighScore() {
  localStorage.setItem('highScore', highScore);
}

function checkLeastScore(score) {
  if (score <= 0) {
    message.textContent = `You Lost The Game`;
    playAudio('Audio/fail.mp3');
    body.style.backgroundColor = 'orange';
    setTimeout(generalReset, 5000);
  }
}

function makeComparisons(inputNumber) {
  if (inputNumber.value === '') {
    message.textContent = 'Please Enter A Valid Number';
    const updatedScore = decreaseScore();
    checkLeastScore(updatedScore);
  } else if (inputNumber.value !== '') {
    let userInput = parseInt(inputNumber.value);

    if (randomNumber > userInput) {
      message.textContent = 'Guess Higher';
    } else if (randomNumber < userInput) {
      message.textContent = 'Guess Lower';
    } else if (userInput === randomNumber) {
      let currentHighScore = `${decreaseScore()}`;
      message.textContent = 'Correct ❤️';
      number.textContent = randomNumber;
      playAudio('Audio/success.mp3');

      if (currentHighScore > highScore) {
        highScore = currentHighScore;
        displayHighScore.textContent = highScore;
        body.style.backgroundColor = 'lightgreen';
        saveHighScore();
      }
      setTimeout(generalReset, 10000);
    }
    checkLeastScore(decreaseScore());
  }
}
// Set initial high score display
displayHighScore.textContent = highScore;

// Make sure to save high score on initial page load
saveHighScore();

inputValue.addEventListener('click', function () {
  makeComparisons(inputField);
});
again.addEventListener('click', generalReset);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    makeComparisons(inputField);
  }
});
