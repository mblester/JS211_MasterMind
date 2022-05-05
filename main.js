'use strict';


const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const printBoard = () => {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

const generateSolution = () => {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

const generateHint = (guess) => {
  let solutionArray = solution.split("")
  let guessArray = guess.split("")
  let hint1 = 0
  let hint2 = 0

  solutionArray.forEach((solutionLetter, i) => {
    if (solutionLetter === guessArray[i]) {
      hint1++ 
      solutionArray[i] = 0
      guessArray[i] = 1
    }
  })

  guessArray.forEach((guessLetter, guessIndex) => {
    solutionArray.forEach((solutionLetter, solutionIndex) => {
      if(guessLetter == solutionLetter){
        hint2++
        guessArray[guessIndex] = 0
        solutionArray[solutionIndex] = 1
      }
    })
  })

  console.log(hint1 + "-" + hint2)
  return hint1 + "-" + hint2
}
const mastermind = (guess) => {
  // solution = 'abcd'; // Comment this out to generate a random solution
  // your code here
  if (guess === solution) {
    return 'You guessed it!';
  } else {
    board.push(guess)
    generateHint(guess)
  }
}


const getPrompt = () => {
  console.log(solution)
  rl.question('guess: ', (guess) => {
    mastermind(guess);
    printBoard();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}