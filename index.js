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
  console.log("Let's play a game where you (human) make up a number and I (computer) try to guess it.")

  let secretNumber = await ask("What is your secret number?\nI won't peek, I promise...\n");

  console.log('You entered: ' + secretNumber);

  let randomNumber = Math.floor(Math.random() * 101);

  let guess = await ask(`Is your number ${randomNumber}? \nYes or No y/n \n`);
  
      if (guess.trim().toLowerCase() === "n") {
        gameOn = true;
      } else {
        gameOn = false;
      }

      let min = 0;
      let max = 100;

  while (gameOn) {
  
    let newNum = (min, max) => {
      randomNumber = Math.floor(Math.random() * (max - min) + min);
      
    };
    
    console.log(randomNumber)

    let response = await ask("Is your number higher or lower h/l? \n");
    
    if (response.trim().toLowerCase() === "h") {
      min = randomNumber + 1 ;
      console.log(min, max);
      newNum(min, max);
      // guess = await ask(`Is your number ${randomNumber}? \nYes or No y/n \n`);      
          
    } else if (response.trim().toLowerCase() === "l") {
      max = randomNumber - 1;
      console.log(min, max);
      newNum(min, max)
      // guess = await ask(`Is your number ${randomNumber}? \nYes or No y/n \n`);
    }
  
  guess = await ask(`Is your number ${randomNumber}? \nYes or No y/n \n`);
  
}
console.log("I guessed your number!");
    process.exit();
}
