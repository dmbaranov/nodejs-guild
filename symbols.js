// https://www.coderbyte.com/editor/guest:Simple%20Symbols:JavaScript

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function SimpleSymbol(str) {
  if (str.length < 3) return false;

  // is not letter or is letter and surrounded with + signs
  return str
    .toLowerCase()
    .split('')
    .every(
      (char, index) =>
        !Boolean(char.match(/[a-z]/)) ||
        (Boolean(char.match(/[a-z]/)) && str[index + 1] === '+' && str[index - 1] === '+')
    );
}

rl.question('', str => {
  console.log(SimpleSymbol(str));
  process.exit(0);
});
