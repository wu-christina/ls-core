const readline = require('readline-sync');
const MESSAGES = require('./calculator-messages.json');

function prompt(message) {
  console.log(`=> ${message}`);
}

function invalidLanguage(language) {
  return language.toLowerCase() !== 'en' &&
  language.toLowerCase() !== 'fr' &&
  language.toLowerCase() !== 'es';
}

function invalidNumber(number) {
  return number.trimStart() === '' || Number.isNaN(Number(number));
}

function invalidAnswer(answer) {
  return (answer !== 'y') && (answer !== 'n') && (answer !== 'o') && (answer !== 's');
}

function invalidDivision(number, operation) {
  return number === '0' && operation === '4';
}

function askLanguage() {
  prompt(MESSAGES.languagePrompt);
  let language = readline.question();

  while (invalidLanguage(language)) {
    prompt(MESSAGES.validLanguage);
    language = readline.question();
  }
  return language.toLowerCase();
}

function askNumber(language, numberKey) {
  prompt(MESSAGES[language][numberKey]);
  let number = readline.question();

  while (invalidNumber(number)) {
    prompt(MESSAGES[language].validNumber);
    number = readline.question();
  }
  return number;
}

function askOperation(language) {
  prompt(MESSAGES[language].operations);
  let operation = readline.question();

  while (!['1', '2', '3', '4'].includes(operation)) {
    prompt(MESSAGES[language].validOperation);
    operation = readline.question();
  }
  return operation;
}

function checkDivisionByZero(language, number2, operation) {
  while (invalidDivision(number2, operation)) {
    prompt(MESSAGES[language].invalidDivision);
    number2 = readline.question();
  }

  while (invalidNumber(number2)) {
    prompt(MESSAGES[language].validNumber);
    number2 = readline.question();
  }
  return number2;
}

function calculatedValue(operation, number1, number2) {
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
  return output;
}

function askToRestart(language) {
  prompt(MESSAGES[language].restart);
  let restartAnswer = readline.question();

  while (invalidAnswer(restartAnswer)) {
    prompt(MESSAGES[language].validAnswer);
    restartAnswer = readline.question();
  }
  return restartAnswer;
}


// program begins

let chosenLanguage = askLanguage();
prompt(MESSAGES[chosenLanguage].welcome);

while (true) {
console.clear();
  let number1 = askNumber(chosenLanguage, "firstNumber");
  let number2 = askNumber(chosenLanguage, "secondNumber");
  let operation = askOperation(chosenLanguage);
  number2 = checkDivisionByZero(chosenLanguage, number2, operation);

  let finalValue = calculatedValue(operation, number1, number2);

  prompt(MESSAGES[chosenLanguage].result.concat(finalValue));

  let restartAnswer = askToRestart(chosenLanguage);

  if (restartAnswer === 'n') break;
  console.clear();
}

console.clear();