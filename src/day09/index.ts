import run from "aocrunner";

const parseInput = (rawInput: string) => {
  // rawInput = `0 3 6 9 12 15
  //   1 3 6 10 15 21
  //   10 13 16 21 30 45`;

  const parsed = rawInput.split("\n").map((line) => {
    const numbers = line.trim().split(" ").map(Number);
    return numbers;
  });

  return parsed;
};

function _getNextLine(line: number[]): number[] {
  const nextLine = line.flatMap((number, i) => {
    if (i === 0) return [];

    return number - line[i - 1];
  });

  return nextLine;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  // console.log(input);

  // 0 = [[line0-0],[line0-1],[line-02]] etc.
  const lineOfLines = input.map((line) => {
    // console.log("line", line);
    let lineResults = [];
    lineResults.push(line);

    let nextLine: number[] = line;
    while (!nextLine.every((i) => i === 0)) {
      nextLine = _getNextLine(nextLine);
      // console.log("nextLine", nextLine);
      lineResults.push(nextLine);
    }

    // console.log("lineResults", lineResults);
    return lineResults;
  });

  // console.log(lineOfLines);

  const linesNextNumber = lineOfLines.map((subLines) => {
    let subLineNextNumber = 0;
    let lastSubLineIdx = subLines.length - 1;
    while (true) {
      // console.log({ subLines, lastSubLineIdx });
      const currLine = subLines[lastSubLineIdx - 1];
      const prevLine = subLines[lastSubLineIdx];
      if (!currLine) break;

      subLineNextNumber = currLine[currLine.length - 1] + subLineNextNumber;
      // console.log("nextNumber", subLineNextNumber);
      lastSubLineIdx -= 1;
    }

    console.log("lineNextNumber", subLineNextNumber);
    return subLineNextNumber;
  });

  // console.log({ linesNextNumber });
  const total = linesNextNumber.reduce((total, i) => (total += i));

  return total;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  console.log(input);

  // 0 = [[line0-0],[line0-1],[line-02]] etc.
  const lineOfLines = input.map((line) => {
    // console.log("line", line);
    let lineResults = [];
    lineResults.push(line);

    let nextLine: number[] = line;
    while (!nextLine.every((i) => i === 0)) {
      nextLine = _getNextLine(nextLine);
      // console.log("nextLine", nextLine);
      lineResults.push(nextLine);
    }

    // console.log("lineResults", lineResults);
    return lineResults;
  });

  // console.log(lineOfLines);

  const linesNextNumber = lineOfLines.map((subLines) => {
    let subLineNextNumber = 0;
    let lastSubLineIdx = subLines.length - 1;
    while (true) {
      // console.log({ subLines, lastSubLineIdx });
      const currLine = subLines[lastSubLineIdx - 1];
      const prevLine = subLines[lastSubLineIdx];
      if (!currLine) break;

      subLineNextNumber = currLine[0] - subLineNextNumber;
      // console.log("nextNumber", subLineNextNumber);
      lastSubLineIdx -= 1;
    }

    // console.log("lineNextNumber", subLineNextNumber);
    return subLineNextNumber;
  });

  // console.log({ linesNextNumber });
  const total = linesNextNumber.reduce((total, i) => (total += i));

  return total;
  return;
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
