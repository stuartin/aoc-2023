import run from "aocrunner";

type Pipe = {
  label: PipeLabel;
  point: Point;
  direction: Direction[];
};
type PipeLabel = "|" | "-" | "L" | "J" | "7" | "F" | "." | "S";
type Point = number[]; // [y,x]
type Direction = "N" | "E" | "S" | "W";
const DirectionMap: Record<PipeLabel, Direction[]> = {
  "|": ["N", "S"],
  "-": ["E", "W"],
  L: ["N", "E"],
  J: ["N", "W"],
  "7": ["S", "W"],
  F: ["S", "E"],
  ".": [],
  S: [],
};

const parseInput = (rawInput: string) => {
  // rawInput = `.....
  // .S-7.
  // .|.|.
  // .L-J.
  // .....`;
  // rawInput = `..F7.
  // .FJ|.
  // SJ.L7
  // |F--J
  // LJ...`;
  // rawInput = `7-F7-
  // .FJ|7
  // SJLL7
  // |F--J
  // LJ.LJ`;

  const allPipes = rawInput.split("\n").map((line, y) => {
    const pipes = line.trim().split("") as PipeLabel[];
    return pipes.map((label, x) => ({
      label,
      direction: DirectionMap[label],
      point: [y, x] as Point,
    }));
  });
  return allPipes as Pipe[][];
};

function _getStart(pipes: Pipe[][]) {
  let x: number | undefined;
  let y: number | undefined;
  while (!x && !y) {
    pipes.forEach((_y, yIdx) => {
      _y.forEach((_x, xIdx) => {
        if (_x.label === "S") {
          y = yIdx;
          x = xIdx;
        }
      });
    });
  }

  return pipes[y][x];
}

function _getSurrounding(pipe: Pipe, pipes: Pipe[][]) {
  const [y, x] = pipe.point;
  const pointPipe = pipes[y][x];
  console.log("check:", pointPipe.label, [y, x]);

  let nw: Pipe;
  let w: Pipe;
  let sw: Pipe;
  let n: Pipe;
  let s: Pipe;
  let ne: Pipe;
  let e: Pipe;
  let se: Pipe;

  const north = pipes[y - 1];
  if (north) {
    nw = pipes[y - 1][x - 1];
    n = pipes[y - 1][x];
    ne = pipes[y - 1][x + 1];
  }

  e = pipes[y][x + 1];
  w = pipes[y][x - 1];

  const south = pipes[y + 1];
  if (south) {
    sw = pipes[y + 1][x - 1];
    s = pipes[y + 1][x];
    se = pipes[y + 1][x + 1];
  }

  console.log(nw?.label, n?.label, ne?.label);
  console.log(w?.label, pointPipe?.label, e?.label);
  console.log(sw?.label, s?.label, se?.label);
  // return [nw, n, ne, e, se, s, sw, w];
  return [n, e, s, w].filter((pipe) => pipe?.direction.length > 0);
}

function _getNextDirection(pipe: Pipe, pipes: Pipe[][]) {
  const [y, x] = pipe.point;
  const pointPipe = pipes[y][x];
  console.log("check:", pointPipe.label, [y, x]);

  const pointMap = {
    N: [y - 1, x],
    E: [y, x + 1],
    S: [y + 1, x],
    W: [y, x - 1],
  };

  return pipe.direction.map((dir) => {
    const dirPoint = pointMap[dir];
    return pipes[dirPoint[0]][dirPoint[1]];
  });
}

const part1 = (rawInput: string) => {
  const pipes = parseInput(rawInput);
  const start = _getStart(pipes);
  const possiblePipes = _getSurrounding(start, pipes);
  console.log({ start, possiblePipes });

  if (!start && !possiblePipes.length) return;

  console.log("\n\nStart");
  let prevPipe = start;
  let currPipe = possiblePipes[0];
  let stepCount = 1;
  while (currPipe.label !== "S") {
    const nextPipes = _getNextDirection(currPipe, pipes);
    // console.log(nextPipes);
    // console.log("previous", prevLeft.label);
    // console.log("\n\n");

    const nextPipe = nextPipes.find((pipe) => pipe.point !== prevPipe.point)!;
    if (!nextPipe) break;

    prevPipe = currPipe;
    stepCount += 1;
    currPipe = nextPipe;

    // if (leftStepCount === 20) break;
  }

  const minSteps = Math.floor((stepCount + 1) / 2);
  return minSteps;
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
