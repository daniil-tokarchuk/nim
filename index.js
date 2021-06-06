const totalOutput = document.querySelector('.total');
const playerScoreOutput = document.querySelector('.player-score');
const computerScoreOutput = document.querySelector('.computer-score');
const firstButton = document.querySelector('.first-button');
const secondButton = document.querySelector('.second-button');
const thirdButton = document.querySelector('.third-button');
const resetButton = document.querySelector('.reset-button');
const logOutput = document.querySelector('.log');
const winner = document.querySelector('.winner');
const standard = document.querySelector('.standard');
const computer = document.querySelector('.computer');

let total = 25;
let playerScore = 0;
let computerScore = 0;
let buttonState = true;

function take(number) {
  total -= number;
  totalOutput.innerText = `${total}`;

  if (total == 0) {
    if (playerScore % 2 == 0) {
      log('<strong>You won!</strong>')
      winner.innerText = 'You won!'
    } else {
      log('<strong>Computer won!</strong>');
      winner.innerText = 'Computer won!';
    }

    allButtonsDisabler(buttonState);
    resetButton.classList.add('active');
  }
}

function playerTakes(number) {
  playerScore += number;
  playerScoreOutput.innerText = `${playerScore}`;

  log('Player takes ' + number);
  take(number);
  illegalButtonsDisabler();

  if (total !== 0) {
    log('Computer is thinking...');
    allButtonsDisabler(buttonState);
    setTimeout(computerTakes, 1000);
  }
}

function computerTakes() {
  if (computer.checked) {
    if (total == 4 || total == 3 && computerScore % 2 == 1) {
      number = 3;
    } else if (total == 3 || total == 2 && computerScore % 2 == 0) {
      number = 2;
    } else if (total == 2 && computerScore % 2 == 1) {
      number = 1;
    } else if (total == 1) {
      number = 1;
    } else if (total % 4 == 1) {
      number = 1 + Math.floor(Math.random() * 3);
    } else {
      number = (total - 1) % 4;
    }
  } else {
    if (total % 4 == 3) {
      number = 3;
    } else if (total % 4 == 1) {
      number = 1;
    } else if (total % 4 == 0) {
      number = 3;
    } else {
      number = 1;
    }
  }

  computerScore += number;
  computerScoreOutput.innerText = `${computerScore}`;

  log('Computer takes ' + number);
  take(number);
  allButtonsDisabler(buttonState);
  illegalButtonsDisabler();
}

function log(message) {
  logOutput.classList.add('active');
  logOutput.innerHTML += '<li>' + message + '</li>';
}

function illegalButtonsDisabler() {
  if (total == 2) {
    thirdButton.disabled = true;
  } else if (total == 1) {
    thirdButton.disabled = true;
    secondButton.disabled = true;
  }
}

function allButtonsDisabler(state) {
  thirdButton.disabled = buttonState;
  secondButton.disabled = buttonState;
  firstButton.disabled = buttonState;

  buttonState = !buttonState;
}

function reset() {
  total = 25;
  playerScore = 0;
  computerScore = 0;
  totalOutput.innerText = `${total}`;
  playerScoreOutput.innerText = `${playerScore}`;
  computerScoreOutput.innerText = `${computerScore}`;
  winner.innerText = '';
  logOutput.innerHTML = '';
  resetButton.classList.remove('active');

  if (!buttonState) {
    allButtonsDisabler(buttonState);
  }

  if (computer.checked) {
    log('Computer is thinking...');
    allButtonsDisabler(buttonState);
    setTimeout(computerTakes, 1000);
  }
}

firstButton.addEventListener('click', playerTakes.bind(null, 1));
secondButton.addEventListener('click', playerTakes.bind(null, 2));
thirdButton.addEventListener('click', playerTakes.bind(null, 3));
resetButton.addEventListener('click', reset);
standard.addEventListener('click', reset);
computer.addEventListener('click', reset);
