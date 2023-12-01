import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const output = input.split("\n").reduce((acc, line) => {
    const nums = line
      .replace(/[^0-9,]/g, "")
      .split("")
      .map((s) => Number(s));

    const first = nums.length > 0 ? nums[0] : 0;
    const last =
      nums.length > 1 ? nums[nums.length - 1] : nums.length > 0 ? nums[0] : 0;

    // console.log(Number(`${first}${last}`), nums);
    return acc + Number(`${first}${last}`);
  }, 0);

  return output;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  function _parseStringNumbers(line: string) {
    const NUM_NAMES = {
      one: 1,
      two: 2,
      three: 3,
      four: 4,
      five: 5,
      six: 6,
      seven: 7,
      eight: 8,
      nine: 9,
    };

    line = line.split("").reduce((acc, char, arr) => {
      const key = Object.keys(NUM_NAMES).find((key) => acc.includes(key));

      if (key) {
        acc = acc.replace(
          key,
          NUM_NAMES[key as keyof typeof NUM_NAMES].toString(),
        );
      }
      acc += char;
      return acc;
    }, "");

    // Needs one last pass because im lazy...
    if (line) {
      Object.entries(NUM_NAMES).forEach(([key, val]) => {
        if (line.includes(key)) {
          line = line.replace(key, val.toString());
        }
      });
    }
    return line;
  }

  const output = input.split("\n").reduce((acc, line) => {
    const parsedLine = _parseStringNumbers(line);

    const nums = parsedLine
      .replace(/[^0-9,]/g, "")
      .split("")
      .map((s) => Number(s));

    const first = nums.length > 0 ? nums[0] : 0;
    const last =
      nums.length > 1 ? nums[nums.length - 1] : nums.length > 0 ? nums[0] : 0;

    // console.log(line, parsedLine);
    // console.log(Number(`${first}${last}`), nums);
    return acc + Number(`${first}${last}`);
  }, 0);

  return output;
};

run({
  part1: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
