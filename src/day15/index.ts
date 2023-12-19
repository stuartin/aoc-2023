import run from "aocrunner";

const parseInput = (rawInput: string) => {
  rawInput = `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`;

  return rawInput.split(",");
};

function getHashValue(chars: string) {
  let hashValue = 0;
  chars.split("").forEach((char) => {
    const asciiCode = char.charCodeAt(0);
    hashValue += asciiCode;
    hashValue *= 17;
    hashValue %= 256;
  });

  return hashValue;
}

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const total = input.reduce((total, step) => {
    total += getHashValue(step);
    // console.log({ stepTotal, total });
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
