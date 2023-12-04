import run from "aocrunner";

const parseInput = (rawInput: string) => {
  const lines = rawInput.split("\n");

  const symbols = lines.reduce((arr, line, lineIdx) => {
    const symbolsOnLine = line.split("").reduce((acc, char, charIdx) => {
      if (char.match(SYMBOL_REGEX)) {
        acc.push({
          id: `${lineIdx}-${charIdx}`,
          lineIdx,
          char,
          charIdx,
          validIdx: [charIdx - 1, charIdx, charIdx + 1],
        });
      }
      return acc;
    }, [] as Symbol[]);

    return [...arr, ...symbolsOnLine];
  }, [] as Symbol[]);

  const symbolsWithGrid = symbols.map(
    ({ id, lineIdx, char, charIdx, validIdx }) => {
      const prevLineIdx = lineIdx - 1;
      const nextLineIdx = lineIdx + 1;

      const topRow = lines[prevLineIdx].slice(charIdx - 3, charIdx + 4);
      const midRow = lines[lineIdx].slice(charIdx - 3, charIdx + 4);
      const bottomRow = lines[nextLineIdx]?.slice(charIdx - 3, charIdx + 4);

      const grid = [topRow, midRow, bottomRow];
      const gridDebug = `
    ${prevLineIdx}: ${topRow}
    ${lineIdx}: ${midRow}
    ${nextLineIdx}: ${bottomRow}
    `;

      // console.log("\n\n", symbol);
      // console.log(gridDebug);

      return {
        id,
        lineIdx,
        char,
        charIdx,
        validIdx,
        grid,
      };
    },
  );
  return symbolsWithGrid;
};

/** index based off biggerbox layout **/
function isHitIdx(i: number) {
  return i === 2 || i === 3 || i === 4;
}

type Symbol = {
  id: string; // {lineIdx}-{symbolIdx}
  lineIdx: number;
  char: string;
  charIdx: number;
  validIdx: [number, number, number];
  grid?: [number, number, number];
};

type SurroundingNumber = {
  chars: string;
  idxs: number[];
};

const SYMBOL_REGEX = /[!@#$%^&*/+=(),-]/g;

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let validChars: SurroundingNumber[] = [];

  input.forEach(({ grid }, i) => {
    // console.log("\n\ncheck grid:");
    // console.log(grid.join("\n"));

    grid.forEach((row) => {
      row.split("").reduce(
        (acc, char, i) => {
          if (char.match(/\d/g)) {
            acc.chars += char;
            acc.idxs.push(i);
            if (i === 6) {
              // last digit in grid
              validChars.push(acc);
            }
            return acc;
          }

          if (acc.chars !== "") {
            validChars.push(acc);
          }
          return { chars: "", idxs: [] };
        },
        { chars: "", idxs: [] } as SurroundingNumber,
      );
    });
  });

  const total = validChars.reduce((total, number) => {
    if (number.idxs.some((idx) => isHitIdx(idx))) {
      total += parseInt(number.chars);
    }
    return total;
  }, 0);

  // console.log("validChars", validChars);

  return total;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  input
    .filter(({ char }) => char === "*")
    .map((symbol) => {
      console.log(symbol);
    });

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
