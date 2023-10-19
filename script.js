
'use strict';
const again = document.querySelector('.again');
const number = document.querySelector('.number');
const inputField = document.querySelector('.guess');
const inputValue = document.querySelector('.check');
const message = document.querySelector('.message');
const score = document.querySelector('.score');
const displayHighScore = document.querySelector('.highscore');
let highScore = parseInt(localStorage.getItem('highScore')) || 0;
const body = document.querySelector('body');

function generateRandomNumber() {
  return Math.trunc(Math.random() * 20) + 1;
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

function makeComparisons(inputNumber) {
  if (inputNumber.value === '') {
    message.textContent = 'Please Enter A Valid Number';
    decreaseScore();
  } else if (inputNumber.value !== '') {
    let userInput = parseInt(inputNumber.value);
    if (randomNumber > userInput) {
      message.textContent = 'Guess Higher';
      decreaseScore();
    } else if (randomNumber < userInput) {
      message.textContent = 'Guess Lower';
      decreaseScore();
    } else if (userInput === randomNumber) {
      let currentHighScore = `${decreaseScore()}`;
      message.textContent = 'Correct ❤️';
      number.textContent = randomNumber;
      if (currentHighScore > highScore) {
        highScore = currentHighScore;
        displayHighScore.textContent = highScore;
        body.style.backgroundColor = 'lightgreen';
        saveHighScore();
      }
      setTimeout(generalReset, 10000);
    }
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
