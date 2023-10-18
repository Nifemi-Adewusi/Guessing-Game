'use strict';
const message = document.querySelector('.message');
const score = document.querySelector('.score');
const number = document.querySelector('.number');
const inputField = document.querySelector('.guess');
const inputValue = document.querySelector('.check');
const higscoreDisplay = document.querySelector('.highscore');
const again = document.querySelector('.again');
function randomNumberGenerator() {
  return Math.trunc(Math.random() * 20) + 1;
}

let highScore = 0;
function decreaseScore() {
  let userScore = score.innerHTML;
  let convertToInt = parseInt(userScore);
  convertToInt--;
  score.innerHTML = convertToInt;
  return convertToInt;
}

let randomNumber = randomNumberGenerator();

function makeComparisons(inputNumber) {
  if (inputNumber.value === '') {
    message.textContent = 'Please Enter A Valid Number';
    decreaseScore();
  } else if (inputNumber.value !== '') {
    let userInput = parseFloat(inputNumber.value);
    if (randomNumber > userInput) {
      message.textContent = 'Guess Higher';
      decreaseScore();
    } else if (randomNumber < userInput) {
      message.textContent = 'Guess Lower';
      decreaseScore();
    } else if (randomNumber === userInput) {
      const currentHighScore = `${decreaseScore() + 1}`;
      message.textContent = 'Correct ❤️';
      number.textContent = randomNumber;
      if (currentHighScore > highScore) {
        highScore = currentHighScore;
        higscoreDisplay.textContent = highScore;
      }
      setTimeout(generalReset, 10000);
    }
  }
}

inputValue.addEventListener('click', function () {
  makeComparisons(inputField);
});

function generalReset() {
  score.textContent = 20;
  message.innerHTML = 'Start Guessing...';
  inputField.value = '';
  number.textContent = '?';
  randomNumber = randomNumberGenerator();
}
again.addEventListener('click', generalReset);
document.addEventListener('keydown', function checkValueOnEnter(e) {
  if (e.key === 'Enter') {
    makeComparisons(inputField);
  }
});
