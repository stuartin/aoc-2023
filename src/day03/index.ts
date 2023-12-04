import run from "aocrunner";

/** index based off biggerbox layout **/
function isHitIdx(i: number) {
  return i === 2 || i === 3 || i === 4;
}

type Symbol = {
  lineIdx: number;
  char: string;
  charIdx: number;
  grid: string[];
  gridNumbers: GridNumber[];
};

type GridNumber = {
  char: string;
  idxs: number[];
};

const SYMBOL_REGEX = /[!@#$%^&*/+=(),-]/g;

const parseInput = (rawInput: string) => {
  const lines = rawInput.split("\n");

  const symbols = lines.reduce((arr, line, lineIdx) => {
    const symbolsOnLine = line.split("").reduce((acc, char, charIdx) => {
      if (char.match(SYMBOL_REGEX)) {
        acc.push({
          lineIdx,
          char,
          charIdx,
          gridNumbers: [],
          grid: [],
        });
      }
      return acc;
    }, [] as Symbol[]);

    return [...arr, ...symbolsOnLine];
  }, [] as Symbol[]);

  const symbolsWithGrid = symbols.map(({ lineIdx, char, charIdx }) => {
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
      lineIdx,
      char,
      charIdx,
      grid,
      gridNumbers: [],
    } as Symbol;
  });

  symbolsWithGrid.forEach(({ grid }, i) => {
    let gridNumbers: GridNumber[] = [];
    // console.log("\n\ncheck grid:");
    // console.log(grid.join("\n"));

    grid.forEach((row) => {
      row.split("").reduce(
        (acc, char, i) => {
          if (char.match(/\d/g)) {
            acc.char += char;
            acc.idxs.push(i);
            if (i === 6) {
              // last digit in grid
              gridNumbers.push(acc);
            }
            return acc;
          }

          if (acc.char !== "") {
            gridNumbers.push(acc);
          }
          return { char: "", idxs: [] };
        },
        { char: "", idxs: [] } as GridNumber,
      );
    });

    symbolsWithGrid[i].gridNumbers = gridNumbers;
  });
  return symbolsWithGrid;
};

const part1 = (rawInput: string) => {
  const symbols = parseInput(rawInput);

  const total = symbols
    .map((symbol) => symbol.gridNumbers)
    .flat()
    .reduce((total, number) => {
      if (number.idxs.some((idx) => isHitIdx(idx))) {
        total += parseInt(number.char);
      }
      return total;
    }, 0);

  // console.log("validChars", validChars);

  return total;
};

const part2 = (rawInput: string) => {
  const symbols = parseInput(rawInput);

  const total = symbols
    .filter(({ char }) => char === "*")
    .map((symbol) => {
      console.log("\n\ncheck grid:");
      console.log(symbol.grid.join("\n"));
      const validNumbers = symbol.gridNumbers.filter((numberInGrid) =>
        numberInGrid.idxs.some((idx) => isHitIdx(idx)),
      );

      let symbolTotal = 0;
      if (validNumbers.length === 2) {
        console.log(validNumbers);

        symbolTotal =
          parseInt(validNumbers[0].char) * parseInt(validNumbers[1].char);
        console.log(symbolTotal);
      }
      return symbolTotal;
    })
    .reduce((total, curr) => (total += curr));

  console.log(total);

  return total;
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
});
