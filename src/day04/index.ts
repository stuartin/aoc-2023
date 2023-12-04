import run from "aocrunner";

type Card = {
  idx: number;
  winningNumbers: number[];
  scratchedNumbers: number[];
  winningScratchedNumbers: number[];
  winningPoints: number;
};

function parseSide(side: string) {
  return (
    side
      .split(" ")
      .filter((c) => c.trim())
      .map((c) => parseInt(c)) || []
  );
}

function parsePoints(winningNumbers: number[]) {
  // console.log("\n\nchecking: ", winningNumbers);

  const totalWinners = winningNumbers.length;

  if (totalWinners === 0) return 0;
  if (totalWinners === 1) return 1;
  if (totalWinners === 2) return 2;

  const doubles = winningNumbers.reduce((total, number, i) => {
    if (i <= 1) return total;

    return total * 2;
  }, 2);

  return doubles;
}

const parseInput = (rawInput: string) => {
  // rawInput = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
  // Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
  // Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
  // Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
  // Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
  // Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;
  return (
    rawInput
      .split("\n")
      // .slice(0, 5)
      .map((line, i) => {
        let [card, cardResults] = line.split(": ");
        const sides = cardResults.split(" | ");
        const winningNumbers = parseSide(sides[0]);
        const scratchedNumbers = parseSide(sides[1]);

        const winningScratchedNumbers = scratchedNumbers.filter((n) =>
          winningNumbers.includes(n),
        );

        // console.log("winningNumbers:", winningNumbers);
        // console.log("scratched:", scratchedNumbers);
        // console.log("winningScratched:", winningScratchedNumbers);

        const winningPoints = parsePoints(winningScratchedNumbers);

        return {
          idx: i,
          winningNumbers,
          scratchedNumbers,
          winningScratchedNumbers,
          winningPoints,
        } as Card;
      })
  );
};

const part1 = (rawInput: string) => {
  const cards = parseInput(rawInput);

  const totals = cards.map(({ winningPoints }) => {
    return winningPoints;
  });

  console.log(totals);

  const total = totals.reduce((total, t) => (total += t));

  console.log(total);

  return total;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      // {
      //   input: `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
      //   Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
      //   Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
      //   Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
      //   Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
      //   Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`,
      //   expected: 13,
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
