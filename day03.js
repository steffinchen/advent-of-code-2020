const fs = require("fs");
const os = require("os");

main();

function main() {
  let input = getInput("day03_input.txt");
  console.log("part1", part1(input));
  console.log("part2", part2(input));
}

function part1(input) {
  let xyOffset = { xOffset: 1, yOffset: 3 };
  return count(input, xyOffset);
}

function count(input, xyOffset) {
  let grid = parseInput(input);
  let position = { x: 0, y: 0 };
  let width = grid[0].length;
  let treeCount = 0;
  position = doStep(position, width, xyOffset);
  while (position.x < grid.length) {
    if (!grid[position.x]) return;
    if (grid[position.x][position.y] == "#") treeCount++;
    position = doStep(position, width, xyOffset);
  }
  return treeCount;
}

function doStep({ x, y }, width, { xOffset, yOffset }) {
  return { x: x + xOffset, y: (y + yOffset) % width };
}

function part2(input) {
  let offsets = [
    { xOffset: 1, yOffset: 1 },
    { xOffset: 1, yOffset: 3 },
    { xOffset: 1, yOffset: 5 },
    { xOffset: 1, yOffset: 7 },
    { xOffset: 2, yOffset: 1 },
  ];
  return offsets
    .map((offset) => count(input, offset))
    .reduce((acc, trees) => acc * trees, 1);
}

function parseInput(input) {
  let grid = [];
  input.forEach((line) => {
    grid.push(line.split(""));
  });
  return grid;
}

function getInput(file) {
  return fs.readFileSync(file, "utf8").split(os.EOL);
}
