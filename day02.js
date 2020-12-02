const fs = require("fs");
const os = require("os");

main();

function main() {
  let input = getInput("day02_input.txt");
  console.log("part1", part1(input));
  console.log("part2", part2(input));
}

function part1(input) {
  return cleanInput(input).filter((entry) => validatePassword(entry)).length;
}

function validatePassword({ password, letter, min, max }) {
  let occ = countOccurrences(password, letter);
  return occ >= min && occ <= max;
}

function validatePasswordNew({ password, letter, min: one, max: two }) {
  return (
    (password[one - 1] === letter || password[two - 1] === letter) &&
    password[one - 1] !== password[two - 1]
  );
}

function countOccurrences(word, char) {
  return word.split(char).length - 1;
}

function part2(input) {
  return cleanInput(input).filter((entry) => validatePasswordNew(entry)).length;
}

function cleanInput(input) {
  return input.map((line) => {
    let parts = line.split(" ");
    let range = parts[0].split("-");
    return {
      min: parseInt(range[0]),
      max: parseInt(range[1]),
      letter: parts[1].replace(":", ""),
      password: parts[2],
    };
  });
}

function getInput(file) {
  return fs.readFileSync(file, "utf8").split(os.EOL);
}
