// https://www.codechef.com/problems/ISONUM

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function getIsonum(n) {
  n = String(n).split('');

  // Number between 1 and 9
  if (n.length === 1) {
    // For every number isomorphic number is 1
    return 1;
  }

  // Number between 10 and 99
  if (n.length == 2) {
    if (n[0] === n[1]) {
      return 11;
    }

    return 10;
  }

  const numberMap = {}; // Map normal number to its minimal isomorphic number
  const result = [];
  let isomorphNum = 1; // First minimal isomrphic number
  let hasSkippedTwo = false;

  n.forEach(number => {
    // If there is no such isomorph number yet
    if (numberMap[number] === undefined) {
      // Need this extra check, because 0 can't be a leading number, but should go right after 1 (1, 0 2)
      // That's why first time we put 0, after that we can put 2, 3, etc.
      // Once we have put that number, we add it to the cache (numberMap)
      if (isomorphNum === 2 && !hasSkippedTwo) {
        numberMap[number] = 0;
        result.push([number, 0]);
        hasSkippedTwo = true;
      } else {
        numberMap[number] = isomorphNum;
        result.push([number, isomorphNum]);
        isomorphNum++;
      }
    } else {
      // If this number has been there already, we simply put if from the cache.
      result.push([number, numberMap[number]]);
    }
  });

  // Convert raw result to number
  return Number(result.map(item => item[1]).join(''));
}

function calculateResult(n, m) {
  // Iterate over array of length n and calculate sum for it according to the task
  return Array.from({ length: n }, (v, k) => ++k).reduce((a, i) => (a += getIsonum(i) % m), 0);
}

let attemptsNumber = 0;
let inputDatasets = [];
rl.question('', answer => (attemptsNumber = Number(answer)));

rl.on('line', params => {
  inputDatasets.push(params);
  if (inputDatasets.length === attemptsNumber) {
    rl.close();
  }
});

rl.on('close', () => {
  if (attemptsNumber === inputDatasets.length) {
    inputDatasets.map(data => {
      const parameters = data.split(' ');
      console.log(calculateResult(parameters[0], parameters[1]));
    });
  }
  process.exit(0);
});
