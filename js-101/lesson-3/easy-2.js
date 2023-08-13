// Question 1
let advice = "Few things in life are as important as house training your pet dinosaur.";
console.log(advice.replace("important", "urgent"));
// => Few things in life are as urgent as house training your pet dinosaur.


// Question 2
let numbers = [1, 2, 3, 4, 5];
console.log(numbers.slice().reverse()); // Solution 1
console.log([...numbers].sort((num1, num2) => num2 - num1));


// Question 3
let numbersSet = [1, 2, 3, 4, 5, 15, 16, 17, 95, 96, 99];

let number1 = 8;
let number2 = 95;

console.log(numbersSet.includes(number1)); // false
console.log(numbersSet.includes(number2)); // true


// Question 4
let famousWords = "seven years ago...";
let beginningOfFamousWords = "Four score and ";

console.log(beginningOfFamousWords.concat(famousWords));
console.log(beginningOfFamousWords + famousWords);


// Question 5
let numArray = [1, 2, 3, 4, 5];
numArray.splice(2, 1)  // 3
console.log(numArray); // [1, 2, 4, 5]


// Questiion 6
let flintstones = ["Fred", "Wilma"];
flintstones.push(["Barney", "Betty"]);
flintstones.push(["Bambam", "Pebbles"]);

console.log(flintstones.flat());         // Solution 1
console.log([].concat(...flintstones));  // Solution 2


// Question 7
let flintstonesArray = { Fred: 0, Wilma: 1, Barney: 2, Betty: 3, Bambam: 4, Pebbles: 5 };
console.log(Object.entries(flintstonesArray).filter(pair => pair[0] === 'Barney').flat());
// [ 'Barney', 2 ]


// Question 8
let numbersArr = [1, 2, 3, 4];
let table = { field1: 1, field2: 2, field3: 3, field4: 4 };

console.log(Array.isArray(numbersArr));  // true
console.log(Array.isArray(table));       // false


// Question 9
let title = "Flintstone Family Members";
let lengthOfTitle = title.length;
let padding = Math.floor((40 - lengthOfTitle) / 2);
console.log(title.padStart(padding + lengthOfTitle," "));


// Question 10
let statement1 = "The Flintstones Rock!";
let statement2 = "Easy come, easy go.";

console.log(statement1.split('').filter(letter => letter === 't').length); // 2
console.log(statement2.split('').filter(letter => letter === 't').length); // 0