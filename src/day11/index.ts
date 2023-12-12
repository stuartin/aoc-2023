import run from "aocrunner";

type GalaxyLocation = {
  id: number;
  point: number[];
};

const parseInput = (rawInput: string) => {
  rawInput = `...#......
  .......#..
  #.........
  ..........
  ......#...
  .#........
  .........#
  ..........
  .......#..
  #...#.....`;

  const rowsToExpand: number[] = [];
  let rawInputArr = rawInput.split("\n").map((row, rowIdx) => {
    const arr = row.trim().split("");
    if (arr.every((char) => char === ".")) {
      rowsToExpand.push(rowIdx);
    }
    return arr;
  });

  const colsToExpand = Array.from({ length: rawInputArr[0].length }).flatMap(
    (_, colIdx) => {
      const colRows = rawInputArr.map((row, i) => {
        if (row[colIdx] !== ".") {
          return false;
        } else {
          return true;
        }
      });

      if (colRows.every((val) => val)) {
        return colIdx;
      } else {
        return [];
      }
    },
  );

  const output = rawInputArr.reduce((output, row, rowIdx) => {
    const newRow = row.reduce((updatedRow, char, colIdx) => {
      if (colsToExpand.includes(colIdx)) {
        return [...updatedRow, char, char];
      } else {
        return [...updatedRow, char];
      }
    }, [] as string[]);

    if (rowsToExpand.includes(rowIdx)) {
      output = [...output, newRow, newRow];
    } else {
      output = [...output, newRow];
    }
    return output;
  }, [] as string[][]);

  // const possiblePairs = (galaxyCount * (galaxyCount - 1)) / 2;
  // console.log(possiblePairs);

  return output;
};

const parseInputTwo = (rawInput: string) => {
  // rawInput = `...#......
  // .......#..
  // #.........
  // ..........
  // ......#...
  // .#........
  // .........#
  // ..........
  // .......#..
  // #...#.....`;

  const rowsToExpand: number[] = [];
  const input = rawInput.split("\n").map((row, rowIdx) => {
    const arr = row.trim().split("");
    if (arr.every((char) => char === ".")) {
      rowsToExpand.push(rowIdx);
    }
    return arr;
  });

  const colsToExpand = Array.from({ length: input[0].length }).flatMap(
    (_, colIdx) => {
      const colRows = input.map((row, i) => {
        if (row[colIdx] !== ".") {
          return false;
        } else {
          return true;
        }
      });

      if (colRows.every((val) => val)) {
        return colIdx;
      } else {
        return [];
      }
    },
  );

  // const output = rawInputArr.reduce((output, row, rowIdx) => {
  //   const newRow = row.reduce((updatedRow, char, colIdx) => {
  //     if (colsToExpand.includes(colIdx)) {
  //       return [...updatedRow, char, char];
  //     } else {
  //       return [...updatedRow, char];
  //     }
  //   }, [] as string[]);

  //   if (rowsToExpand.includes(rowIdx)) {
  //     output = [...output, newRow, newRow];
  //   } else {
  //     output = [...output, newRow];
  //   }
  //   return output;
  // }, [] as string[][]);

  // const possiblePairs = (galaxyCount * (galaxyCount - 1)) / 2;
  // console.log(possiblePairs);

  return { input, rowsToExpand, colsToExpand };
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let currGal = 1;
  const galaxyLocations = input.reduce((acc, row, rowIdx) => {
    row.forEach((char, charIdx) => {
      if (char !== ".") {
        const galaxyLocation = { id: currGal, point: [charIdx, rowIdx] };
        acc.push(galaxyLocation);
        currGal += 1;
      }
    });
    return acc;
  }, [] as GalaxyLocation[]);

  const checkedPairs: number[][] = [];
  const totalSteps = galaxyLocations.reduce((total, location) => {
    galaxyLocations.forEach((pairLocation) => {
      if (
        pairLocation.id !== location.id &&
        !checkedPairs.some(
          (pair) => pair[0] === pairLocation.id && pair[1] === location.id,
        )
      ) {
        checkedPairs.push([location.id, pairLocation.id]);
        const xDiff = Math.abs(location.point[0] - pairLocation.point[0]);
        const yDiff = Math.abs(location.point[1] - pairLocation.point[1]);

        const steps = xDiff + yDiff;
        // console.log("checking", location, "against", pairLocation);
        // console.log({ xDiff, yDiff, steps });
        total += steps;
      }
    });
    return total;
  }, 0);

  // console.log(totalSteps);
  // console.log(checkedPairs);

  return totalSteps;
};

const part2 = (rawInput: string) => {
  const { input, rowsToExpand, colsToExpand } = parseInputTwo(rawInput);

  // console.log({ input, rowsToExpand, colsToExpand });

  let currGal = 1;
  const galaxyLocations = input.reduce((acc, row, rowIdx) => {
    row.forEach((char, charIdx) => {
      if (char !== ".") {
        const galaxyLocation = { id: currGal, point: [charIdx, rowIdx] };
        acc.push(galaxyLocation);
        currGal += 1;
      }
    });
    return acc;
  }, [] as GalaxyLocation[]);

  const multiplier = 1000000 - 1;
  const checkedPairs: number[][] = [];
  const totalSteps = galaxyLocations.reduce((total, location) => {
    galaxyLocations.forEach((pairLocation) => {
      if (
        pairLocation.id !== location.id &&
        !checkedPairs.some(
          (pair) => pair[0] === pairLocation.id && pair[1] === location.id,
        )
      ) {
        checkedPairs.push([location.id, pairLocation.id]);

        const sortedX = [location.point[0], pairLocation.point[0]].sort();
        const sortedY = [location.point[1], pairLocation.point[1]].sort();
        let expandedColsInPair = colsToExpand.filter((colToExpand) => {
          return sortedX[0] < colToExpand && colToExpand < sortedX[1];
        });
        let expandedRowsInPair = rowsToExpand.filter((rowToExpand) => {
          return sortedY[0] < rowToExpand && rowToExpand < sortedY[1];
        });

        const xMultiplier = expandedColsInPair.length * multiplier;
        const yMultiplier = expandedRowsInPair.length * multiplier;
        // console.log({ expandedColsInPair, expandedRowsInPair });
        // console.log({ xMultiplier, yMultiplier });

        const xDiff =
          Math.abs(location.point[0] - pairLocation.point[0]) + xMultiplier;
        const yDiff =
          Math.abs(location.point[1] - pairLocation.point[1]) + yMultiplier;
        const steps = xDiff + yDiff;
        // console.log("checking", location, "against", pairLocation);
        // console.log({ xDiff, yDiff, steps });

        total += steps;
      }
    });
    return total;
  }, 0);

  console.log(totalSteps);

  return totalSteps;
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
