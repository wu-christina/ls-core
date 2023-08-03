const readline = require('readline-sync');
const NUM_MONTHS_IN_A_YEAR = 12;
const MESSAGES = require('./mortgage-calculator-messages.json');

function prompt(message) {
  console.log(`=> ${message}`);
}

function invalidLoanAmount(amount) {
  return amount.trimStart() === '' || Number.isNaN(Number(amount)) || Number(amount) <= 0;
}

function invalidAPRChoice(format) {
  return !['1', '2'].includes(format);
}

function invalidAPR(APR) {
  return APR.trimStart() === '' || Number.isNaN(Number(APR)) || Number(APR) < 0;
}

function invalidLoanDuration(time) {
  return time.trimStart() === '' || Number.isNaN(Number(time)) || Number(time) < 0;
}

function askLoanAmount() {
  prompt('What is the loan amount?');
  let amount = readline.question();

  while (invalidLoanAmount(amount)) {
    prompt('Enter a number greater than 0.');
    amount = readline.question();
  }
  return Number(amount);
}

function askAPRFormat() {
  prompt('How do you want to represent the rate?\n1) Percent (Ex. 10 for 10%)\n2) Decimal (Ex. 0.1 for 10%)');
  let choice = readline.question();

  while (invalidAPRChoice(choice)) {
    prompt('Invalid choice. Please select 1 (Percent) or 2 (Decimal).');
    choice = readline.question();
  }
  return choice;
}

function askAPR() {
  prompt("What is the Annual Percentage Rate (APR)?");
  let rate = readline.question();

  while (invalidAPR(rate)) {
    prompt('Please enter a number greater or equal to 0.');
    rate = readline.question();
  }
  return Number(rate);
}

function calculateMonthlyRate(format, APR) {
  let monthlyInterestRate;

  if (format === '1') {
    monthlyInterestRate = (APR / 100) / NUM_MONTHS_IN_A_YEAR;
  } else if (format === '2') {
    monthlyInterestRate = APR / NUM_MONTHS_IN_A_YEAR;
  }
  return Number(monthlyInterestRate);
}

function askLoanDuration() {
  prompt("What is the loan duration in months?");
  let duration = readline.question();

  while (invalidLoanDuration(duration)) {
    prompt('Choose a loan duration greater than or equal to 0 month.');
    duration = readline.question();
  }
  return Number(duration);
}

function calculateMonthlyPayment(monthlyInterestRate, loan, duration) {
  let result;

  if (duration === 0) {
    result = loan;
  } else if (monthlyInterestRate === 0) {
    result = loan / duration;
  } else {
    result = loan * (monthlyInterestRate /
    (1 - Math.pow((1 + monthlyInterestRate), (-duration))));
  }
  return result.toFixed(2);
}

function paymentMessage(rateFormat, payment, loan, time, APR) {
  if (rateFormat === '1') {
    prompt(`For a $${loan} loan with a duration of ${time} months and a APR of ${APR}%, the monthly payment is $${payment}.`);
  } else if (rateFormat === '2') {
    prompt(`For a $${loan} loan with a duration of ${time} months and a APR of ${APR * 100}%, the monthly payment is $${payment}.`);
  }
}

function askNewCalculation() {
  prompt('Would you like to perform a new calculation?');
  let answer = readline.question();

  while (!['y','n','yes', 'no'].includes(answer.toLowerCase())) {
    prompt('Invalid input. Choose: Y, Yes, N, or No.');
    answer = readline.question();
  }
  return answer;
}

// program begins

prompt('Welcome to the Mortgage Calculator!');

while (true) {

  let loan = askLoanAmount();
  let APRFormat = askAPRFormat();
  let APR = askAPR(APRFormat);
  let loanDuration = askLoanDuration();
  let monthlyRate = calculateMonthlyRate(APRFormat, APR);
  let monthlyPayment = calculateMonthlyPayment(monthlyRate, loan, loanDuration);

  paymentMessage(APRFormat, monthlyPayment, loan, loanDuration, APR);

  let restartAnswer = askNewCalculation();

  if (['n', 'no'].includes(restartAnswer)) {
    prompt('Goodbye!');
    break;
  } else if (['y', 'yes'].includes(restartAnswer)) {
    console.clear();
  }
}

console.clear();