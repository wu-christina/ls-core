const readline = require('readline-sync');
const NUM_MONTHS_IN_A_YEAR = 12;
const MESSAGES = require('./mortgage-calculator-messages.json');

function prompt(message) {
  console.log(`=> ${message}`);
}

function printWelcome() {
  prompt(MESSAGES.welcome);
}

function invalidLoanAmount(amount) {
  return amount.trimStart() === '' || !Number.isFinite(Number(amount)) || Number(amount) <= 0;
}

function invalidAPRChoice(format) {
  return !['1', '2'].includes(format);
}

function invalidAPR(APR) {
  return APR.trimStart() === '' || !Number.isFinite(Number(APR)) || Number(APR) < 0;
}

function invalidLoanDuration(time) {
  return time.trimStart() === '' || !Number.isFinite(Number(time)) || Number(time) < 0;
}

function askLoanAmount() {
  prompt(MESSAGES.askLoan);
  let amount = readline.question();

  while (invalidLoanAmount(amount)) {
    prompt(MESSAGES.invalidLoanAmount);
    amount = readline.question();
  }
  return Number(amount);
}

function askAnnualInterestRateFormat() {
  prompt(MESSAGES.askAPRFormat);
  let choice = readline.question();

  while (invalidAPRChoice(choice)) {
    prompt(MESSAGES.invalidAPRChoice);
    choice = readline.question();
  }
  return choice;
}

function askAnnualInterestRate() {
  prompt(MESSAGES.askAPR);
  let rate = readline.question();

  while (invalidAPR(rate)) {
    prompt(MESSAGES.invalidAPR);
    rate = readline.question();
  }
  return Number(rate);
}

function calculateMonthlyRate(format, annualRate) {
  let monthlyInterestRate;

  if (format === '1') {
    monthlyInterestRate = (annualRate / 100) / NUM_MONTHS_IN_A_YEAR;
  } else if (format === '2') {
    monthlyInterestRate = annualRate / NUM_MONTHS_IN_A_YEAR;
  }
  return Number(monthlyInterestRate);
}

function askLoanDuration() {
  prompt(MESSAGES.askLoanDuration);
  let duration = readline.question();

  while (invalidLoanDuration(duration)) {
    prompt(MESSAGES.invalidLoanDuration);
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
    prompt(`For a $${loan} loan with a duration of ${time} months and a ${APR}% APR, the monthly payment is $${payment}.`);
  } else if (rateFormat === '2') {
    prompt(`For a $${loan} loan with a duration of ${time} months and a ${APR * 100}% APR, the monthly payment is $${payment}.`);
  }
}

function askNewCalculation() {
  prompt(MESSAGES.askNewCalculation);
  let answer = readline.question();

  while (!['y','n','yes', 'no'].includes(answer.toLowerCase())) {
    prompt(MESSAGES.invalidNewCalculationAnswer);
    answer = readline.question();
  }
  return answer.toLowerCase();
}


// program begins

console.clear();
printWelcome();

while (true) {

  let loan = askLoanAmount();
  let annualRateFormat = askAnnualInterestRateFormat();
  let annualRate = askAnnualInterestRate(annualRateFormat);
  let loanDuration = askLoanDuration();
  let monthlyRate = calculateMonthlyRate(annualRateFormat, annualRate);
  let monthlyPayment = calculateMonthlyPayment(monthlyRate, loan, loanDuration);

  paymentMessage(annualRateFormat, monthlyPayment, loan, loanDuration, annualRate);

  let restartAnswer = askNewCalculation();

  if (['n', 'no'].includes(restartAnswer)) {
    break;
  } else if (['y', 'yes'].includes(restartAnswer)) {
    console.clear();
  }
}

console.clear();