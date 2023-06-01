const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

start();

async function start() {
  console.log("Let's play a game where you (human) make up a number and I (computer) try to guess it.")

  let secretNumber = await ask("What is your secret number?\nI won't peek, I promise...\n");

  console.log('You entered: ' + secretNumber);

  let randomNumber = Math.floor(Math.random() * 101)

  let guess = await ask(`Is your number ${randomNumber}? [y]es/[n]o`);

  let direction 
  
  if (guess.toLowerCase() == "y"){
    console.log('I guessed your answer')
  }else if (guess.toLowerCase() == "n"){
    direction = await ask("Is your number [h]igher or [l]ower?")
    }

  if (direction.toLowerCase() == "l"){
    guess = await ask(
    `Is your number ${Math.floor(Math.random() * randomNumber + 1)}?
    [y]es/[n]o`);
  } else if (direction.toLowerCase() == "h"){
    guess = await ask(
    `Is your number ${Math.floor(Math.random() * (101 - randomNumber) + randomNumber)}?
    [y]es/[n]o`
    );
  }

direction = await ask("Is your number [h]igher or [l]ower?")

  // Now try and complete the program.
  process.exit();
}

