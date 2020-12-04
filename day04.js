const fs = require("fs");
const os = require("os");

main();

function main() {
  let input = getInput("day04_input.txt");
  console.log("part1", part1(input));
  console.log("part2", part2(input));
}

function part1(input) {
  const reqFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
  let passports = parseInput(input);
  return passports.filter(hasRequiredFields(reqFields)).length;
}

function hasRequiredFields(fields, passport) {
  return (passport) => {
    return fields.every((field) => Object.keys(passport).includes(field));
  };
}

function part2(input) {
  const reqFields = {
    byr: validateByr,
    iyr: validateIyr,
    eyr: validateEyr,
    hgt: validateHgt,
    hcl: validateHcl,
    ecl: validateEcl,
    pid: validatePid,
  };
  let passports = parseInput(input);
  return passports.filter(hasValidFields(reqFields)).length;
}

function hasValidFields(fields, passport) {
  return (passport) => {
    return Object.entries(fields).every(
      ([key, validateFn]) =>
        Object.keys(passport).includes(key) && validateFn(passport[key])
    );
  };
}

// byr (Birth Year) - four digits; at least 1920 and at most 2002.
function validateByr(val) {
  let n = parseInt(val);
  return n >= 1920 && n <= 2002;
}

// iyr (Issue Year) - four digits; at least 2010 and at most 2020.
function validateIyr(val) {
  let n = parseInt(val);
  return n >= 2010 && n <= 2020;
}

// eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
function validateEyr(val) {
  let n = parseInt(val);
  return n >= 2020 && n <= 2030;
}

// hgt (Height) - a number followed by either cm or in:
// If cm, the number must be at least 150 and at most 193.
// If in, the number must be at least 59 and at most 76.
function validateHgt(val) {
  if (val.includes("cm")) {
    let n = parseInt(val.replace("cm", ""));
    return n >= 150 && n <= 193;
  } else if (val.includes("in")) {
    let n = parseInt(val.replace("in", ""));
    return n >= 59 && n <= 76;
  } else {
    return false;
  }
}

// hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
function validateHcl(val) {
  let regex = new RegExp(/^#(\d|\w){6,6}$/);
  return regex.test(val);
}

// ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
function validateEcl(val) {
  return ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(val);
}

// pid (Passport ID) - a nine-digit number, including leading zeroes.
function validatePid(val) {
  let regex = new RegExp(/^(\d){9,9}$/);
  return regex.test(val);
}

function parseInput(input) {
  let passports = input
    .split(os.EOL + os.EOL)
    .map((passport) => passport.replace(/(?:\\[rn]|[\r\n]+)+/g, " "))
    .map((passport) => passport.split(" "))
    .map((passport) => {
      return passport.reduce((acc, prop) => {
        let [key, value] = prop.split(":");
        acc[key] = value;
        return acc;
      }, {});
    });
  return passports;
}

function getInput(file) {
  return fs.readFileSync(file, "utf8");
}
