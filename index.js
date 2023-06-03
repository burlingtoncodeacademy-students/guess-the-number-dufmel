const { truncate } = require('fs');
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

start();

async function start() {
  console.log(
    "Let's play a game where you (human) make up a number and I (computer) try to guess it."
  );

  let maxStart = await ask("What is the top of the range you want me to guess between?\n"
  );
  
  let secretNumber = await ask(
    "What is your secret number?\nI won't peek, I promise...\n"
  );

  console.log("You entered: " + secretNumber);

  let randomNumber = Math.floor(Math.random() * (maxStart) + 1);

  let guess = await ask(`Is your number ${randomNumber}? \nYes or No y/n \n`);

  let gameOn = true;

  let min = 0;
  let max = maxStart;
  // let allowedGuesses = Math.floor(Math.log2(max) + 1);
  let numberOfGuesses = 1;

  if (guess.trim().toLowerCase() === "n") {
    gameOn = true;
  } else if (guess === "y"){
      console.log(`I guessed your number in ${numberOfGuesses} attempts!`)
      process.exit();}

  while (gameOn) {

    let newNum = (min, max) => {
      randomNumber = Math.floor((max + min) / 2);
    };

    let response = await ask("Is your number higher or lower h/l? \n");
    

    if (response.trim().toLowerCase() === "h") {
      min = randomNumber + 1;
      newNum(min, max);
    } else if (response.trim().toLowerCase() === "l") {
      max = randomNumber - 1;
      newNum(min, max);
    }

    guess = await ask(`Is your number ${randomNumber}? \nYes or No y/n \n`);
    numberOfGuesses++;
    if (guess === "y"){
      console.log(`I guessed your number in ${numberOfGuesses} attempts!`)
      process.exit();
  }
}}


