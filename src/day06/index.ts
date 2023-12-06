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

const parseInputTwo = (rawInput: string) => {
  // rawInput = `Time:      7  15   30
  // Distance:  9  40  200`;

  let time: number = 0;
  let distance: number = 0;
  rawInput.split("\n").forEach((line) => {
    const lineSplit = line.split(":");

    let number = lineSplit[1].replace(/[^\d]/g, "");

    if (lineSplit[0].includes("Time")) {
      time = parseInt(number);
    }

    if (lineSplit[0].includes("Distance")) {
      distance = parseInt(number);
    }
  });

  return { time, distance };
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

  const multiplied = input.times.reduce((total, time, i) => {
    const travelTimes = getTravelTime(time);

    const winners = travelTimes.filter(([time, distance]) => {
      return distance > input.distances[i];
    });

    return total * winners.length;
  }, 1);

  return multiplied;
};

const part2 = (rawInput: string) => {
  const { time, distance } = parseInputTwo(rawInput);

  const travelTimes = getTravelTime(time);

  const winners = travelTimes.filter(([t, d]) => {
    return d > distance;
  });

  return winners.length;
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
