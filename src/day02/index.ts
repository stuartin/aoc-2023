import run from "aocrunner";

const parseInput = (rawInput: string) => {
  return rawInput.split("\n");
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const redMatcher = /(\d+)(?=\s*red)/g;
  const greenMatcher = /(\d+)(?=\s*green)/g;
  const blueMatcher = /(\d+)(?=\s*blue)/g;

  let sum = 0;
  input.forEach((line, i) => {
    const red = line.match(redMatcher)?.map((i) => parseInt(i));
    const green = line.match(greenMatcher)?.map((i) => parseInt(i));
    const blue = line.match(blueMatcher)?.map((i) => parseInt(i));

    const invalidRed = red?.some((stoneCount) => stoneCount > 12);
    const invalidGreen = green?.some((stoneCount) => stoneCount > 13);
    const invalidBlue = blue?.some((stoneCount) => stoneCount > 14);

    if (!invalidRed && !invalidGreen && !invalidBlue) {
      console.log({ red, green, blue });
      sum += i + 1;
    }
  });

  return sum;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const redMatcher = /(\d+)(?=\s*red)/g;
  const greenMatcher = /(\d+)(?=\s*green)/g;
  const blueMatcher = /(\d+)(?=\s*blue)/g;

  let sumOfPowers = 0;
  input.forEach((line, i) => {
    const red = line.match(redMatcher)?.map((i) => parseInt(i));
    const green = line.match(greenMatcher)?.map((i) => parseInt(i));
    const blue = line.match(blueMatcher)?.map((i) => parseInt(i));

    const maxRed = red ? Math.max(...red) : 0;
    const maxGreen = green ? Math.max(...green) : 0;
    const maxBlue = blue ? Math.max(...blue) : 0;

    const powerOfSet = maxRed * maxGreen * maxBlue;
    sumOfPowers += powerOfSet;
  });

  return sumOfPowers;
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
