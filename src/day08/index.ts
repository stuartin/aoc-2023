import run from "aocrunner";
import lcm from "compute-lcm";

type Step = "L" | "R";

const parseInput = (rawInput: string) => {
  // rawInput = `RL

  // AAA = (BBB, CCC)
  // BBB = (DDD, EEE)
  // CCC = (ZZZ, GGG)
  // DDD = (DDD, DDD)
  // EEE = (EEE, EEE)
  // GGG = (GGG, GGG)
  // ZZZ = (ZZZ, ZZZ)`;
  // rawInput = `LLR

  // AAA = (BBB, BBB)
  // BBB = (AAA, ZZZ)
  // ZZZ = (ZZZ, ZZZ)`;
  // rawInput = `LR

  // 11A = (11B, XXX)
  // 11B = (XXX, 11Z)
  // 11Z = (11B, XXX)
  // 22A = (22B, XXX)
  // 22B = (22C, 22C)
  // 22C = (22Z, 22Z)
  // 22Z = (22B, 22B)
  // XXX = (XXX, XXX)`;

  let steps: Step[] = [];
  let destinations: Record<string, [string, string]> = {};

  rawInput.split("\n").forEach((line, i) => {
    if (!line) return;
    // console.log(line);

    if (i === 0) {
      steps = line.trim().split("") as Step[];
      return;
    }

    const [_dst, _options] = line.split(" = ");
    const [_L, _R] = _options.split(", ");

    destinations[_dst.trim()] = [
      _L.replace(/[()]/g, ""),
      _R.replace(/[()]/g, ""),
    ];
  });

  return {
    steps,
    destinations,
  };
};

const part1 = (rawInput: string) => {
  return;
  const { steps, destinations } = parseInput(rawInput);

  let stepCount = 0;
  let currStep = "AAA";

  // console.log({ steps, destinations });
  while (currStep !== "ZZZ") {
    stepCount += 1;
    if (steps[0] === "L") {
      currStep = destinations[currStep][0];
    } else {
      currStep = destinations[currStep][1];
    }

    // console.log({ stepCount, currStep });
    steps.push(steps.splice(0, 1)[0]);
  }

  return stepCount;
};

const part2 = (rawInput: string) => {
  const { steps, destinations } = parseInput(rawInput);

  const startPositions = Object.keys(destinations).filter((key) =>
    key.endsWith("A"),
  );
  console.log({ startPositions });

  const stepCounts: number[] = [];

  startPositions.forEach((currPosition) => {
    let currSteps = steps;
    let currStepCount = 0;

    while (!currPosition.endsWith("Z")) {
      // console.log({ currPosition });
      // console.log(currSteps[0]);
      currStepCount += 1;
      if (currSteps[0] === "L") {
        currPosition = destinations[currPosition][0];
      } else {
        currPosition = destinations[currPosition][1];
      }
      currSteps.push(currSteps.splice(0, 1)[0]);
    }

    stepCounts.push(currStepCount);
  });

  // console.log(stepCounts);
  const lowestCommonDenominator = lcm(stepCounts);
  // console.log(lowestCommonDenominator);
  return lowestCommonDenominator;
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
