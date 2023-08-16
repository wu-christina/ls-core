// Question 1

function printFlintstoneLine() {
  let space = " ";
  let line = "The Flintstones Rock!";
  let newLine = "";
  
  for (let i = 0; i < 10; i += 1) {
    if (i === 0) {
      newLine += line;
      console.log(newLine);
    } else {
      newLine = space.repeat(i) + line;
      console.log(newLine);
    }
  }
}

printFlintstoneLine();


// Question 2

let munstersDescription = "The Munsters are creepy and spooky.";

console.log(munstersDescription.slice(0,1).toLowerCase() + munstersDescription.slice(1).toUpperCase());


// Question 3

function factors(number) {
  let divisor = number;
  let factors = [];
  
  while (divisor > 0) {
    if (number % divisor === 0) {
      factors.push(number / divisor);
    }
    divisor -= 1;
  }
  return factors;
}

console.log(factors(20)) // [ 1, 2, 4, 5, 10, 20 ]


// Question 4

/**
 * The push method will mutate the buffer array but the concat
 * will not change the existing buffer array.
 * Instead, it will return a new array.
 */


// Question 5

console.log(0.3 + 0.6);         // 0.89999
console.log(0.3 + 0.6 === 0.9); // false


// Question 6

let nanArray = [NaN];

console.log(nanArray[0] === NaN); // false
/**
 * It will return false because NaN does not equal to any
 * other value, including itself. We can use Number.isNaN to check if
 * a value is NaN.
 */
 
 
 // Question 7
 
 let answer = 42;

function messWithIt(someNumber) {
  return (someNumber += 8);
}

let newAnswer = messWithIt(answer);

console.log(answer - 8); // 34


// Question 8

let munsters = {
  Herman: { age: 32, gender: "male" },
  Lily: { age: 30, gender: "female" },
  Grandpa: { age: 402, gender: "male" },
  Eddie: { age: 10, gender: "male" },
  Marilyn: { age: 23, gender: "female" }
};

function messWithDemographics(demoObject) {
  Object.values(demoObject).forEach(familyMember => {
    familyMember["age"] += 42;
    familyMember["gender"] = "other";
  });
}

/**
 * The function will mutate each of the object's property values in the munsters object.
 * This is because when the function is invoked, the demoObject is pointing to
 * the munsters object and since demoObject is used as is, this mutates the munesters object
 * when the forEach method iterates through the object's property values array.
 */
 
 
// Question 9
 
function rps(fist1, fist2) {
  if (fist1 === "rock") {
    return fist2 === "paper" ? "paper" : "rock";
  } else if (fist1 === "paper") {
    return fist2 === "scissors" ? "scissors" : "paper";
  } else {
    return fist2 === "rock" ? "rock" : "scissors";
  }
}

console.log(rps(rps(rps("rock", "paper"), rps("rock", "scissors")), "rock")); // "paper"


// Question 10

function foo(param = "no") {
  return "yes";
}

// foo() always returns "yes"

function bar(param = "no") {
  return param === "no" ? "yes" : "no";
}

console.log(bar(foo())); // "no"