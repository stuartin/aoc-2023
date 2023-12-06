import run from "aocrunner";

const parseInput = (rawInput: string) => {
  // rawInput = `Time:      7  15   30
  // Distance:  9  40  200`;

  let times: number[] = [];
  let distances: number[] = [];
  rawInput.split("\n").forEach((line) => {
    const lineSplit = line.split(":");

    let lineNumbers = lineSplit[1]
      .split(" ")
      .filter((i) => i)
      .map((i) => parseInt(i));

    if (lineSplit[0].includes("Time")) {
      times = lineNumbers;
    }

    if (lineSplit[0].includes("Distance")) {
      distances = lineNumbers;
    }
  });

  return { times, distances };
};

function getTravelTime(totalTime: number): number[][] {
  const options = Array.from({ length: totalTime + 1 }).reduce(
    (output: number[][], _, time) => {
      if (time === 0 || time === totalTime) {
        output.push([time, 0]);
        return output;
      }

      const timeLeft = totalTime - time;

      output.push([time, timeLeft * time]);

      return output;
    },
    [],
  );

  return options;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  console.log(input);

  const multiplied = input.times.reduce((total, time, i) => {
    const travelTimes = getTravelTime(time);
    // console.log(travelTimes);

    const winners = travelTimes.filter(([time, distance]) => {
      // console.log({ time, distance, i });
      // console.log("target", input.distances[i]);
      return distance > input.distances[i];
    });
    console.log(winners.length);

    return total * winners.length;
  }, 1);

  return multiplied;
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
