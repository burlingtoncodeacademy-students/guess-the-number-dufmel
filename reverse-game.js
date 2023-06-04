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
      gameOn = false;
    }

    guess = await ask(`What is your guess? \n`);
    numberOfGuesses++;
  }

  let gameOver = await ask("Do you want to play again? y/n\n");

  if (gameOver == "y") {
    startGame();
  } else {
    process.exit();
  }
}