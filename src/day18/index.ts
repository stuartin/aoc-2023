import run from "aocrunner";

type Direction = "U" | "R" | "D" | "L";
type Step = {
  dir: Direction;
  m: number;
  color: string;
};

const parseInput = (rawInput: string) => {
  rawInput = `R 6 (#70c710)
  D 5 (#0dc571)
  L 2 (#5713f0)
  D 2 (#d2c081)
  R 2 (#59c680)
  D 2 (#411b91)
  L 5 (#8ceee2)
  U 2 (#caa173)
  L 1 (#1b58a2)
  U 2 (#caa171)
  R 2 (#7807d2)
  U 3 (#a77fa3)
  L 2 (#015232)
  U 2 (#7a21e3)`;

  return rawInput.split("\n").map((instruction) => {
    const [dir, m, color] = instruction.trim().split(" ");

    return {
      dir,
      m: parseInt(m),
      color,
    } as Step;
  });
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);
  console.log(input);

  let position = [0, 0];
  const holes: number[][] = [[0, 0]];

  input.forEach((move) => {
    console.log("move", move.dir, "for", move.m);
    switch (move.dir) {
      case "U":
        Array.from({ length: move.m }).map((_, i) => {
          holes.push([position[0], position[1] - (i + 1)]);
        });
        position = [position[0], position[1] - move.m];
        break;
      case "R":
        Array.from({ length: move.m }).map((_, i) => {
          holes.push([position[0] + (i + 1), position[1]]);
        });
        position = [position[0] + move.m, position[1]];
        break;
      case "D":
        Array.from({ length: move.m }).map((_, i) => {
          holes.push([position[0], position[1] + (i + 1)]);
        });
        position = [position[0], position[1] + move.m];
        break;
      case "L":
        Array.from({ length: move.m }).map((_, i) => {
          holes.push([position[0] - (i + 1), position[1]]);
        });
        position = [position[0] - move.m, position[1]];
        break;

      default:
        break;
    }
  });

  if (
    holes[0][0] === holes[holes.length - 1][0] &&
    holes[0][1] === holes[holes.length - 1][1]
  ) {
    // Assumes we start/end at the same coord
    holes.pop();
  }

  const minX = Math.min(...holes.map((coord) => coord[0]));
  const maxX = Math.max(...holes.map((coord) => coord[0]));
  const minY = Math.min(...holes.map((coord) => coord[1]));
  const maxY = Math.max(...holes.map((coord) => coord[1]));
  console.log({ minX, maxX, minY, maxY });

  const rows = Array.from({ length: maxY - minY + 1 });
  const cols = Array.from({ length: maxX - minX });
  console.log(rows.length);

  const total = rows.reduce((total: number, _, rowIdx) => {
    const y = minY + rowIdx;
    const rowPoints = holes.filter((holePoint) => holePoint[1] === y);
    console.log({ rowPoints });
    const startPointInRow = Math.min(...rowPoints.map((coord) => coord[0]));
    const endPointInRow = Math.max(...rowPoints.map((coord) => coord[0]));
    console.log({ startPointInRow, endPointInRow });

    total += endPointInRow - startPointInRow + 1;
    console.log({ total });
    return total;
  }, 0);

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
