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

  if((maxStart <= 1) || isNaN(maxStart)){
    console.log("You must enter a positive interger great than 1");
    maxStart = await ask("What is the top of the range you want me to guess between?\n"
    );
  }
  
  let secretNumber = await ask(
    "What is your secret number?\nI won't peek, I promise...\n"
  );

  console.log("You entered: " + secretNumber);

  let randomNumber = Math.floor(Math.random() * (maxStart) + 1);

  let guess = await ask(`Is your number ${randomNumber}? \nYes or No y/n \n`);
  let gameOn = true;

  if (guess.trim().toLowerCase() === "n") {
    gameOn = true;
  } else if (guess === "y") {
    console.log(`I guessed your number in ${numberOfGuesses} attempt!`);
    process.exit();
  }

  let minNum = 1;
  let maxNum = maxStart;
  let numberOfGuesses = 1;

  
  //*************GAME LOOP**************** */
  
  while (gameOn) {
    
    console.log(`The randomNumber on the new iteration of the while loop is ${randomNumber}`)


    console.log(`This is ${numberOfGuesses} minNum = ${minNum} and maxNum = ${maxNum}`)

    let response = await ask("Is your number higher or lower h/l? \n");

    if (response.trim().toLowerCase() === "h") {
      minNum = randomNumber + 1;
      console.log(`In the if statement, randomNumber = ${randomNumber}`)
    } else if (response.trim().toLowerCase() === "l") {
      maxNum = randomNumber - 1;
      console.log(`In the else if statement, randomNumber = ${randomNumber}`);
    }

    console.log(`This console is after if/esle statement randomNumber = ${randomNumber} minNum = ${minNum}, maxNum = ${maxNum}`)
        
    let newNum = () => {
      console.log(`In the newNum function min = ${minNum} and max = ${maxNum}`);
      return Math.floor((minNum + maxNum) / 2);
      };

    console.log(randomNumber = newNum(minNum, maxNum));

    guess = await ask(`Is your number ${randomNumber}? \nYes or No y/n \n`);

    numberOfGuesses++;

    if (guess === "y") {
      console.log(`I guessed your number in ${numberOfGuesses} attempts!`);
      process.exit();
    }
  }}


