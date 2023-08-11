const readline = require('readline-sync');
const CHOICES = {
  rock: { abbreviated: 'r',
    win: ['lizard', 'scissors'],
    lose: ['paper', 'spock']
  },
  paper: { abbreviated: 'p',
    win: ['rock', 'spock'],
    lose: ['scissors', 'lizard']
  },
  scissors: { abbreviated: 's',
    win: ['paper', 'lizard'],
    lose: ['rock', 'spock']
  },
  lizard: { abbreviated: 'l',
    win: ['paper', 'spock'],
    lose: ['rock', 'scissors']
  },
  spock: { abbreviated: 'sp',
    win: ['scissors', 'rock'],
    lose: ['lizard', 'paper']
  }
};
const NONABBREVIATED_CHOICES = Object.keys(CHOICES);
const ABBREVIATED_CHOICES = ['r', 'p', 's', 'l', 'sp'];
const MAX_LENGTH_ABBREVIATED_CHOICE = 'sp'.length;
const MIN_NUM_OF_WINS = 3;

function prompt(message) {
  console.log(`=> ${message}`);
}

function displayWelcome() {
  let message = 'Welcome!\n' +
                'This is no ordinary Rock Paper Scissors game.\n' +
                'Instead of 3 choices, you will have 5: Rock, Paper, Scissors, Lizard, and Spock\n' +
                'These are the rules of the game:\n' +
                'Scissors cuts Paper coveres Rock crushes Lizard poisons Spock smashes\n' +
                'Scissors decapitates Lizard eats Paper disproves Spock vaporizes Rock crushes Scissors.';
  prompt(message);
}

function displayGoodbye() {
  prompt('Goodbye!');
}

function invalidYesOrNo(answer) {
  return !['y', 'yes', 'n', 'no'].includes(answer.toLowerCase());
}

function askAreYouReadyToPlay() {
  prompt('Begin a game of best of 5? (y/n)');
  let answer = readline.question();

  while (invalidYesOrNo(answer)) {
    prompt('Invalid answer! Please select the following: y for yes or n for no');
    answer = readline.question();
  }
  return answer[0].toLowerCase();
}

function invalidUserChoice(choice) {
  let lowerCaseChoice = choice.toLowerCase();

  return !NONABBREVIATED_CHOICES.includes(lowerCaseChoice) &&
  !ABBREVIATED_CHOICES.includes(lowerCaseChoice);
}

function askUserChoice() {
  prompt('Pick your weapon: Rock (r), Paper (p), Scissors (s), Lizard (l), or Spock (sp)?');
  let choice = readline.question();

  while (invalidUserChoice(choice)) {
    prompt('Invalid choice! Pick again: Rock (r), Paper (p), Scissors (s), Lizard (l), or Spock (sp)');
    choice = readline.question();
  }

  if (choice.length <= MAX_LENGTH_ABBREVIATED_CHOICE) {
    let keyMatch = Object.keys(CHOICES).find(function (key) {
      return CHOICES[key].abbreviated === choice.toLowerCase();
    });
    choice = keyMatch;
  }

  return choice.toLowerCase();
}

function generateComputerChoice() {
  let randomIndex = Math.floor(Math.random() * NONABBREVIATED_CHOICES.length);
  let computerChoice = NONABBREVIATED_CHOICES[randomIndex];
  return computerChoice;
}

function displayWinnerOfRound(choice, computerChoice) {
  prompt(`You chose ${choice} and the computer chose ${computerChoice}.`);

  if (CHOICES[choice]['win'].includes(computerChoice)) {
    prompt('You win! Computer loses!');
  } else if (CHOICES[choice]['lose'].includes(computerChoice)) {
    prompt('You lose! Computer wins!');
  } else {
    prompt("It's a tie!");
  }
}

function updateScore(choice, computerChoice, userScore, computerScore) {
  if (CHOICES[choice]['win'].includes(computerChoice)) {
    userScore += 1;
  } else if (CHOICES[choice]['lose'].includes(computerChoice)) {
    computerScore += 1;
  }
  return [userScore, computerScore];
}

function displayScore(userScore, computerScore) {
  prompt(`Your Score: ${userScore} Point | Computer Score: ${computerScore} Point`);
}

function displayOverallWinner(userScore, computerScore) {
  if (userScore > computerScore) {
    console.log('~ * ~ * ~ You won overall in a best of 5 game! ~ * ~ * ~');
  } else {
    console.log('~ * ~ * ~ Computer won overall in a best of 5 game! ~ * ~ * ~');
  }
}

function askToPlayAgain() {
  prompt('Play again? (y/n)');
  let answer = readline.question();

  while (invalidYesOrNo(answer)) {
    prompt('Invalid answer. Please select the following: y for yes or n for no');
    answer = readline.question();
  }
  return answer[0].toLowerCase();
}

// program begins

displayWelcome();

while (true) {

  let userScore, computerScore;
  [userScore, computerScore] = [0, 0];

  let startGameAnswer = askAreYouReadyToPlay();

  if (startGameAnswer === 'n') {
    displayGoodbye();
    break;
  }

  console.clear();

  while (true) {
    let choice = askUserChoice();
    let computerChoice = generateComputerChoice();

    [userScore, computerScore] =
    updateScore(choice, computerChoice, userScore, computerScore);

    console.clear();

    displayWinnerOfRound(choice, computerChoice);
    displayScore(userScore, computerScore);
    if (userScore === MIN_NUM_OF_WINS ||
    computerScore === MIN_NUM_OF_WINS) break;
  }

  displayOverallWinner(userScore, computerScore);

  let replayAnswer = askToPlayAgain();
  if (replayAnswer === 'n') {
    displayGoodbye();
    break;
  }
}