import run from "aocrunner";

type Input = {
  seeds: number[];
  map: Map<string, SourceOrDestination[]>;
};

type InputTwo = {
  seeds: { start: number; end: number }[];
  map: Map<string, SourceOrDestination[]>;
};

type SourceOrDestination = {
  [K in SrcOrDstName]: {
    start: number;
    end: number;
  };
};

type SrcOrDstName = "src" | "dst";

const parseInput = (rawInput: string) => {
  rawInput = `seeds: 79 14 55 13

  seed-to-soil map:
  50 98 2
  52 50 48

  soil-to-fertilizer map:
  0 15 37
  37 52 2
  39 0 15

  fertilizer-to-water map:
  49 53 8
  0 11 42
  42 0 7
  57 7 4

  water-to-light map:
  88 18 7
  18 25 70

  light-to-temperature map:
  45 77 23
  81 45 19
  68 64 13

  temperature-to-humidity map:
  0 69 1
  1 0 69

  humidity-to-location map:
  60 56 37
  56 93 4`;

  let seeds: number[] = [];
  let map = new Map<string, SourceOrDestination[]>();

  // temp vars
  let _src = "";
  let _dst = "";
  let _maps: SourceOrDestination[] = [];

  rawInput
    .split("\n")
    // .slice(0, 5)
    .forEach((line) => {
      if (!line) return;

      if (line.includes("seeds:")) {
        seeds = line
          .split(":")[1]
          .trim()
          .split(" ")
          .map((char) => parseInt(char));
        return;
      }

      if (line.includes("map:")) {
        let [src, dst] = line.trim().split(" ")[0].split("-to-");

        _src = src;
        _dst = dst;
        _maps = [];
        map.set(`${_src}-${_dst}`, _maps);
        return;
      }

      const ranges = line
        .split(" ")
        .filter((char) => char.trim().match(/\d/g))
        .map((char) => parseInt(char));

      // console.log("ranges", ranges);
      if (ranges && ranges.length === 3) {
        const [dstRangeStart, srcRangeStart, length] = ranges;

        const src = {
          start: srcRangeStart,
          end: srcRangeStart + length - 1,
        };

        const dst = {
          start: dstRangeStart,
          end: dstRangeStart + length - 1,
        };
        _maps.push({ src, dst });
      }
    });

  return {
    seeds,
    map,
  } as Input;
};

const parseInputPartTwo = (rawInput: string) => {
  // rawInput = `seeds: 79 14 55 13

  // seed-to-soil map:
  // 50 98 2
  // 52 50 48

  // soil-to-fertilizer map:
  // 0 15 37
  // 37 52 2
  // 39 0 15

  // fertilizer-to-water map:
  // 49 53 8
  // 0 11 42
  // 42 0 7
  // 57 7 4

  // water-to-light map:
  // 88 18 7
  // 18 25 70

  // light-to-temperature map:
  // 45 77 23
  // 81 45 19
  // 68 64 13

  // temperature-to-humidity map:
  // 0 69 1
  // 1 0 69

  // humidity-to-location map:
  // 60 56 37
  // 56 93 4`;

  let seeds: {
    start: number;
    end: number;
  }[] = [];
  let map = new Map<string, SourceOrDestination[]>();

  // temp vars
  let _src = "";
  let _dst = "";
  let _maps: SourceOrDestination[] = [];

  rawInput
    .split("\n")
    // .slice(0, 5)
    .forEach((line) => {
      if (!line) return;

      if (line.includes("seeds:")) {
        const seedsArr = line
          .split(":")[1]
          .trim()
          .split(" ")
          .map((char) => parseInt(char));

        seeds = seedsArr.flatMap((seed, i) => {
          if ((i + 1) % 2 === 0) return [];
          return {
            start: seed,
            end: seed + seedsArr[i + 1] - 1,
          };
        });
        return;
      }

      if (line.includes("map:")) {
        let [src, dst] = line.trim().split(" ")[0].split("-to-");

        _src = src;
        _dst = dst;
        _maps = [];
        map.set(`${_src}-${_dst}`, _maps);
        return;
      }

      const ranges = line
        .split(" ")
        .filter((char) => char.trim().match(/\d/g))
        .map((char) => parseInt(char));

      // console.log("ranges", ranges);
      if (ranges && ranges.length === 3) {
        const [dstRangeStart, srcRangeStart, length] = ranges;

        const src = {
          start: srcRangeStart,
          end: srcRangeStart + length - 1,
        };

        const dst = {
          start: dstRangeStart,
          end: dstRangeStart + length - 1,
        };
        _maps.push({ src, dst });
      }
    });

  return {
    seeds,
    map,
  } as InputTwo;
};

function getFinalDestination(map: SourceOrDestination[], seed: number): number {
  // console.log("seed", seed);
  let finalSeedDestination = seed;

  const sources = map.map((t) => t.src);
  const destinations = map.map((t) => t.dst);

  // console.log({ sources, destinations });

  let srcIdxMap = sources.flatMap((source, srcLineIdx) => {
    // console.log({ source, srcLineIdx });
    if (seed >= source.start && seed <= source.end) {
      const startDelta = seed - source.start;
      // console.log("match", source);
      // console.log("startDelta", startDelta);
      return {
        srcLineIdx,
        startDelta,
      };
    }
    return [];
  })[0]; // This should always only find 1 or none

  if (srcIdxMap) {
    // console.log(srcIdxMap);
    const { srcLineIdx, startDelta } = srcIdxMap;
    finalSeedDestination = destinations[srcLineIdx].start + startDelta;
  }

  // console.log("startToFinal", seed, "-", finalSeedDestination);
  return finalSeedDestination;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  // console.log(input);

  let startingNumbers = input.seeds;

  const locations = startingNumbers.map((seed) => {
    // console.log("seed", seed);

    let currSeed: number = seed;
    input.map.forEach((map, key) => {
      // console.log("mapping", key);

      const newSeed = getFinalDestination(map, currSeed);
      currSeed = newSeed;
    });
    return currSeed;
  });

  // console.log(locations);
  const smallestLocation = Math.min(...locations);

  return smallestLocation;
};

const part2 = (rawInput: string) => {
  console.log("\n\n\n===== PART TWO =====\n");
  const input = parseInputPartTwo(rawInput);

  let seedRanges = input.seeds;
  // console.log(seedRanges);
  const locations = seedRanges.reduce((locations, seed) => {
    // console.log("seed", seed);

    const iterations = seed.end - seed.start;
    console.log({ iterations });

    const locationsForSeedRange = [];
    for (let i = 0; i < iterations; i++) {
      if (i % 10000000 === 0) {
        console.log("stillRunning", i);
      }

      let currSeed: number = seed.start + i;
      // console.log("currSeed", currSeed);

      input.map.forEach((map, key) => {
        const newSeed = getFinalDestination(map, currSeed);
        currSeed = newSeed;
      });
      locationsForSeedRange.push(currSeed);
    }
    const smallestLocation = Math.min(...locationsForSeedRange);

    locations.push(smallestLocation);
    return locations;
  }, [] as number[]);

  console.log(locations);
  const smallestLocation = Math.min(...locations);

  return smallestLocation;

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
