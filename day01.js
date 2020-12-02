const fs = require("fs");
const os = require("os");

main();

function main() {
  let input = getInput("day01_input.txt");
  console.log("part1", part1(input));
  console.log("part2", part2(input));
}

function part1(input) {
  return input.reduce((acc, n) => {
    if (acc > 0) return acc;
    input = input.slice(1);
    let result = input.find((n2) => n + n2 === 2020);
    if (result) return result * n;
    else return 0;
  }, []);
}

function part2(input) {
  return input.reduce((acc, n1) => {
    if (acc > 0) return acc;
    input = input.slice(1);
    let result2;
    let result3 = input.find((n2) => {
      result2 = input.find((n3) => n1 + n2 + n3 === 2020);
      if (result2) return true;
    });
    if (result3) return result3 * result2 * n1;
    else return 0;
  }, []);
}

function getInput(file) {
  return fs.readFileSync(file, "utf8").split(os.EOL).map(parseFloat);
}
