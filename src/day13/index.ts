import run from "aocrunner";

const parseInput = (rawInput: string) => {
  // rawInput = `#.##..##.
  // ..#.##.#.
  // ##......#
  // ##......#
  // ..#.##.#.
  // ..##..##.
  // #.#.##.#.

  // #...##..#
  // #....#..#
  // ..##..###
  // #####.##.
  // #####.##.
  // ..##..###
  // #....#..#`;

  console.log("start");

  let patterns: PatternItem[][][] = [];
  let rowIdx = -1;
  rawInput.split("\n").reduce((acc, row, i, arr) => {
    rowIdx += 1;
    const newRow = row
      .trim()
      .split("")
      .map((char, colIdx) => {
        return {
          char,
          point: [colIdx, rowIdx],
        };
      });

    if (newRow.length === 0 || i === arr.length - 1) {
      if (newRow.length !== 0) {
        acc.push(newRow);
      }
      patterns.push(acc);
      acc = [];
      rowIdx = -1;
      return acc;
    }

    acc.push(newRow);
    return acc;
  }, [] as PatternItem[][]);

  return patterns;
};

type PatternItem = {
  char: string;
  point: number[];
};

type SingleRow = {
  rowIdx: number;
  rowChars: string;
};

type SingleCol = {
  colIdx: number;
  colChars: string;
};

function getRowPairs(pattern: PatternItem[][]) {
  let rowPairs: SingleRow[][] = [];
  pattern.reduce((acc, row, rowIdx) => {
    const rowChars = row.map((r) => r.char).join("");

    const single = {
      rowIdx,
      rowChars,
    };

    const matchingPair = acc.find((s) => s.rowChars === rowChars);

    if (matchingPair) {
      const matchingPairIdx = acc.indexOf(matchingPair);

      rowPairs.push([single, matchingPair]);
      acc.splice(matchingPairIdx, 1);
      return acc;
    }

    acc.push(single);
    return acc;
  }, [] as SingleRow[]);

  // console.log(rowPairs);
  return rowPairs;
}

function getColPairs(pattern: PatternItem[][]) {
  let colPairs: SingleCol[][] = [];
  const cols = Array.from({ length: pattern[0].length }).reduce(
    (acc: SingleCol[], _, colIdx) => {
      const col = pattern.map((row, rowIdx) => {
        return row[colIdx];
      });

      const colChars = col.map((c) => c.char).join("");

      const single = {
        colIdx,
        colChars,
      };

      const matchingPair = acc.find((s) => s.colChars === colChars);

      if (matchingPair) {
        const matchingPairIdx = acc.indexOf(matchingPair);

        colPairs.push([single, matchingPair]);
        acc.splice(matchingPairIdx, 1);
        return acc;
      }

      acc.push(single);
      return acc;
    },
    [],
  );

  // console.log(colPairs);
  return colPairs;
}

const part1 = (rawInput: string) => {
  const patterns = parseInput(rawInput);

  let totalColsToLeft = 0;
  let totalRowsAbove = 0;
  patterns.forEach((pattern, i) => {
    console.log("pattern", i);
    const rowPairs = getRowPairs(pattern);
    const colPairs = getColPairs(pattern);

    const validRowPairs = (pattern.length - 1) / 2;
    const validColPairs = (pattern[0].length - 1) / 2;
    console.log({ validRowPairs, validColPairs });

    if (rowPairs.length === validRowPairs) {
      // must be a matching row
      const rowPairIdxs = rowPairs.flat().map((rp) => rp.rowIdx);
      const rowsAbove = Math.max(...rowPairIdxs) / 2 + 1;
      console.log("rowsAbove", rowsAbove);
      totalRowsAbove += rowsAbove * 100;
    }

    if (colPairs.length === validColPairs) {
      /// must be a matching col
      const colPairIdxs = colPairs.flat().map((cp) => cp.colIdx);
      const colsToLeft = Math.max(...colPairIdxs) / 2 + 1;
      console.log("colsToLeft", colsToLeft);
      totalColsToLeft += colsToLeft;
    }

    // console.log(JSON.stringify({ rowPairs, colPairs }));
  });

  console.log({ totalColsToLeft, totalRowsAbove });

  return totalColsToLeft + totalRowsAbove;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

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
