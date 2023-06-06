//Sets up access to Readline

const { truncate } = require('fs');
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

//Prompts user input for game choice

start();

async function start(){
  let gameChoice = await ask("Let's play Guess the Number. Should you (human) or I (computer) guess the number?\nEnter human or computer \n")

  if (gameChoice.trim().toLowerCase() == "human"){
    startReverseGame()
  }else if (gameChoice.trim().toLowerCase() == "computer"){
    startGame()
  } else {
    console.log("That is not a valid option.");
    start()
  }
}

//if user selects computer guessing, run this function

async function startGame() {
  console.log(
    "Let's play a game where you (human) make up a number and I (computer) try to guess it."
  );

  let maxStart = await ask("What is the top of the range you want me to guess between?\n"
  );

  while((maxStart <= 1) || isNaN(maxStart)){
    console.log("You must enter a positive interger great than 1");
    maxStart = await ask("What is the top of the range you want me to guess between?\n"
    );
  }
  
  let secretNumber = await ask(
    "What is your secret number?\nI won't peek, I promise...\n"
  );

  while (isNaN(secretNumber)){
    console.log("That is not a valid input")
    secretNumber = await ask(
      "What is your secret number?\nI won't peek, I promise...\n"
    );
  }

  console.log("You entered: " + secretNumber);

  let minNum = Number(1);
  let maxNum = Number(maxStart);

  let smartGuess = () => {
  return Math.floor((minNum + maxNum) / 2);
  };

  let randomNumber = smartGuess()

  let guess = await ask(`Is your number ${randomNumber}? \nYes or No y/n \n`);
  let gameOn = true;
  let numberOfGuesses = 1;

  if (guess.trim().toLowerCase() === "n") {
    gameOn = true;
  } else if (guess === "y") {
    console.log(`I guessed your number in ${numberOfGuesses} attempt!`);
    process.exit();
  } 
  
  //******GAME LOOP***** This loop runs while game is in session
  
  while (gameOn) {

    let response = await ask("Is your number higher or lower h/l? \n");

  // Changes range based on user input

    if (response.trim().toLowerCase() === "h") {
      minNum = randomNumber + 1;
      } else if (response.trim().toLowerCase() === "l") {
      maxNum = randomNumber - 1;
      
    }  
  
  // Cheat detector

    if (minNum > maxNum || maxNum < minNum) {
      console.log(`You're cheating! Game Over`);
      process.exit();
    }

    //Generates a new random number, asks again, increments guesses

    randomNumber = smartGuess(minNum, maxNum);

    guess = await ask(`Is your number ${randomNumber}? \nYes or No y/n \n`);

    numberOfGuesses++;

    //When computer guesses yes, exit while loop

    if (guess === "y") {
      console.log(`I guessed your number in ${numberOfGuesses} attempts!`);
      gameOn = false
    }
  }
  
  //User can select to start game over(start()) or exit game

  let gameOver = await ask("Do you want to play again? y/n\n")
  
  if (gameOver == "y"){
    start()
  } else{
  process.exit();}
}

//*******************REVERSE GAME************************** */

async function startReverseGame() {
  console.log(
    "Let's play a game where I (computer) make up a number and you (human) try to guess it."
  );

  let maxStart = await ask(
    "I will choose between 1 and whatever you select as the top of the range. What is the top of the range you would like?\n"
  );

  while (maxStart <= 1 || isNaN(maxStart)) {
    console.log("You must enter a positive interger great than 1");
    maxStart = await ask("What is the top of the range you would like?\n");
  }

  // Computer will select number, stored in randomNumber that can't been seen by user
  let randomNumber = Math.floor(Math.random() * maxStart + 1);
  
  let guess = await ask(`What is your guess? \n`);
  let gameOn = true;
  let numberOfGuesses = 1;

  //If user does not guess on first attempt, enter game loop

  if (guess == randomNumber) {
    console.log(`You guessed my number in ${numberOfGuesses} try!`);
    process.exit();
  } else if (isNaN(guess)){
    console.log("That is not a valid entry")
    guess = await ask(`What is your guess? \n`);
  } else {
    gameOn = true;
  }

  //*************GAME LOOP**************** */

  // Computer will continue to prompt guesses until user guesses correctly. When user guesses correctly, exit game loop
  while (gameOn) {
    if (guess > randomNumber) {
      console.log("That's too high. Pick a lower number.");
    } else if (guess < randomNumber) {
      console.log("That's too low. Pick a higher number. ");
    } else {
      console.log(`You guessed my number in ${numberOfGuesses} tries!`);
      gameOn = false
    }

    guess = await ask(`What is your guess? \n`);
    numberOfGuesses++;
  }

  //Prompts user to play again or exit
  
    let gameOver = await ask("Do you want to play again? y/n\n");

    if (gameOver == "y") {
      start();
    } else {
      process.exit();
    }
}
