const readline = require('readline-sync');
const MESSAGES = require('./calculator_messages.json');

function prompt(message) {
  console.log(`=> ${message}`);
}

function invalidNumber(number) {
  return number.trimStart() === '' || Number.isNaN(Number(number));
}

function invalidAnswer(answer) {
  return (answer !== 'y') && (answer !== 'n');
}

prompt(MESSAGES.welcome);

while (true) {

  prompt(MESSAGES.firstNumber);
  let number1 = readline.question();

  while (invalidNumber(number1)) {
    prompt(MESSAGES.validNumber);
    number1 = readline.question();
  }

  prompt(MESSAGES.secondNumber);
  let number2 = readline.question();

  while (invalidNumber(number2)) {
    prompt(MESSAGES.validNumber);
    number2 = readline.question();
  }

  prompt(MESSAGES.operations);
  let operation = readline.question();

  while (!['1', '2', '3', '4'].includes(operation)) {
    prompt(MESSAGES.validOperation);
    operation = readline.question();
  }

  let output;
  switch (operation) {
    case '1':
      output = Number(number1) + Number(number2);
      break;
    case '2':
      output = Number(number1) - Number(number2);
      break;
    case '3':
      output = Number(number1) * Number(number2);
      break;
    case '4':
      output = Number(number1) / Number(number2);
      break;
  }

  prompt(MESSAGES.result.concat(output));

  prompt(MESSAGES.restart);
  let restartAnswer = readline.question();

  while (invalidAnswer(restartAnswer)) {
    prompt(MESSAGES.validAnswer);
    restartAnswer = readline.question();
  }

  if (restartAnswer === 'n') break;

}