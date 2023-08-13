// Question 1
let numbers = [1, 2, 3];
numbers[6] = 5;
/**
 * Error will not be raised. It will assign the 7th index to
 * a value of 5. Indices 3 to 5 will be treated as empty slots.
 */
numbers[4];
/**
 * This will return undefined but the slot is empty.
 */
console.log(numbers);
 
 // Question 2
let str1 = "Come over here!";
let str2 = "What's up, Doc?";

console.log(str1.slice(-1) === '!'); // true
console.log(str2.slice(-1) === '!'); // false


// Question 3
let ages = { Herman: 32, Lily: 30, Grandpa: 402, Eddie: 10 };
console.log(Object.keys(ages).find(name => name === 'Spot') === 'Spot'); // Solution 1
console.log(ages.hasOwnProperty("Spot")); // Solution 2


// Question 4
let munstersDescription = "the Munsters are CREEPY and Spooky.";
let munstersDescriptionWordsArray = munstersDescription.split(" ");
let newMunstersDescription = [];

for (let i = 0; i < munstersDescriptionWordsArray.length; i += 1) {
  let word = munstersDescriptionWordsArray[i];
  if (i === 0) {
    newMunstersDescription.push(word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase());
  } else {
    newMunstersDescription.push(word.toLowerCase());
  }
}
console.log(newMunstersDescription.join(' ')); // => The munsters are creepy and spooky.


// Question 5
console.log(false == '0');  // true
console.log(false === '0'); // false


// Question 6
let agesQuestion6 = { Herman: 32, Lily: 30, Grandpa: 5843, Eddie: 10 };
let additionalAges = { Marilyn: 22, Spot: 237 };


Object.assign(agesQuestion6, additionalAges);
console.log(agesQuestion6);


// Question 7
let str3 = "Few things in life are as important as house training your pet dinosaur.";
let str4 = "Fred and Wilma have a pet dinosaur named Dino.";

console.log(str3.indexOf("Dino") > -1); // false
console.log(str4.indexOf("Dino") > -1); // true


// Question 8
let flintstones = ["Fred", "Barney", "Wilma", "Betty", "Bambam", "Pebbles"];
flintstones.push("Dino");
console.log(flintstones); // => [ 'Fred', 'Barney', 'Wilma', 'Betty', 'Bambam', 'Pebbles', 'Dino' ]

// Quesion 9
let flintstonesRevisited = ["Fred", "Barney", "Wilma", "Betty", "Bambam", "Pebbles"];
flintstonesRevisited.push("Dino", "Happy");
console.log(flintstonesRevisited); // => [ 'Fred', 'Barney', 'Wilma', 'Betty', 'Bambam', 'Pebbles', 'Dino', 'Hoppy' ]


// Question 10
let advice = "Few things in life are as important as house training your pet dinosaur.";
let houseIndex = advice.indexOf("house");
console.log(advice.slice(0, houseIndex)); // => 'Few things in life are as important as '