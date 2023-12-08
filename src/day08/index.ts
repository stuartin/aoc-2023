import run from "aocrunner";

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
