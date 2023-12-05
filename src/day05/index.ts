import run from "aocrunner";

type Input = {
  seeds: number[];
  map: Map<string, SourceOrDestination[]>;
};

type SourceOrDestination = {
  [K in SrcOrDstName]: number[];
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
    .slice(0, 5)
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

        const srcRange = Array.from({ length: length }).map((_, i) => {
          return srcRangeStart + i;
        });

        const dstRange = Array.from({ length: length }).map((_, i) => {
          return dstRangeStart + i;
        });

        // console.log({ destinationRangeStart, sourceRangeStart, length });
        // console.log({ dstRange, srcRange });
        _maps.push({ src: srcRange, dst: dstRange });
      }
    });

  return {
    seeds,
    map,
  } as Input;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  // console.log(input);

  let startingNumbers = input.seeds;
  input.map.forEach((map, key) => {
    if (key !== "seed-soil") return;

    console.log(key);
    // if(i !== 0) return
    // console.log("\n\nmap", map);

    startingNumbers.forEach((seed) => {
      console.log("seed", seed);
      let finalSeedDestination = seed;

      const sources = map.map((t) => t.src);
      const destinations = map.map((t) => t.dst);

      console.log({ sources, destinations });

      let srcIdxMap = sources.flatMap((source, srcLineIdx) => {
        const srcIdx = source.indexOf(seed);
        if (srcIdx === -1) return [];

        return {
          srcLineIdx,
          srcIdx,
        };
      })[0]; // This should always only find 1 or none
      console.log(srcIdxMap);

      if (srcIdxMap) {
        const { srcLineIdx, srcIdx } = srcIdxMap;
        finalSeedDestination = destinations[srcLineIdx][srcIdx];
      }

      console.log("startToFinal", seed, "-", finalSeedDestination);
    });
  });

  return;
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