const { truncate } = require('fs');
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

start();

async function start(){
  let gameChoice = await ask("Let's play Guess the Number. Should you (human) or I (computer) guess the number?\nEnter human or computer \n")

  if (gameChoice.trim().toLowerCase() == "human"){
    startReverseGame()
  }else if (gameChoice.trim().toLowerCase() == "computer"){
     startGame()
  }
}



async function startGame() {
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

  let minNum = Number(1);
  let maxNum = Number(maxStart);
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
      let temporaryNumber = minNum + maxNum
      console.log(temporaryNumber)
      let firstAnswer = Math.floor((temporaryNumber) / 2);
      console.log(firstAnswer)
      return firstAnswer
      };

    console.log(randomNumber = newNum(minNum, maxNum));

    guess = await ask(`Is your number ${randomNumber}? \nYes or No y/n \n`);

    numberOfGuesses++;

    if (guess === "y") {
      console.log(`I guessed your number in ${numberOfGuesses} attempts!`);
      process.exit();
    }
  }}


async function startReverseGame() {
  console.log(
    "Let's play a game where I (computer) make up a number and you (human) try to guess it."
  );

  let maxStart = await ask(
    "I will choose between 1 and whatever you select as the top of the range. What is the top of the range you would like?\n"
  );

  if (maxStart <= 1 || isNaN(maxStart)) {
    console.log("You must enter a positive interger great than 1");
    maxStart = await ask("What is the top of the range you would like?\n");
  }

  let randomNumber = Math.floor(Math.random() * maxStart + 1);
  //console.log(randomNumber) //just for building, remove before actually playing

  let guess = await ask(`What is your guess? \n`);
  let gameOn = true;
  let numberOfGuesses = 1;

  if (guess == randomNumber) {
    console.log(`You guessed my number in ${numberOfGuesses} try!`);
    process.exit();
  } else {
    gameOn = true;
  }

  //*************GAME LOOP**************** */

  while (gameOn) {
    if (guess > randomNumber) {
      console.log("That's too high. Pick a lower number.");
    } else if (guess < randomNumber) {
      console.log("That's too low. Pick a higher number. ");
    } else {
      console.log(`You guessed my number in ${numberOfGuesses} tries!`);
      process.exit();
    }

    guess = await ask(`What is your guess? \n`);
    numberOfGuesses++;
  }
}
