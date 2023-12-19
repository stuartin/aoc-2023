import run from "aocrunner";

const parseInput = (rawInput: string) => {
  // rawInput = `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`;

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

  const boxes: string[][] = Array.from({ length: 256 });
  const lenses = new Map();

  input.forEach((step) => {
    if (step.includes("-")) {
      const label = step.split("-")[0];
      const hashValue = getHashValue(label);
      // console.log({ label, hashValue });
      // console.log(boxes[hashValue]);
      if (boxes[hashValue] && boxes[hashValue].includes(label)) {
        boxes[hashValue] = boxes[hashValue].filter(
          (boxLabel) => boxLabel !== label,
        );
      }
    } else if (step.includes("=")) {
      const label = step.split("=")[0];
      const focalLength = parseInt(step.split("=")[1]);
      const hashValue = getHashValue(label);
      // console.log({ label, focalLength });
      // console.log(boxes[hashValue]);

      if (!boxes[hashValue]) {
        // console.log("new lens");
        boxes[hashValue] = [label];
      }

      if (boxes[hashValue] && !boxes[hashValue].includes(label)) {
        // console.log("add lens");
        boxes[hashValue].push(label);
      }

      lenses.set(label, focalLength);
      // console.log(lenses);
    }
  });

  // console.log(boxes);
  // console.log(lenses);

  const total = boxes.reduce((total, box, boxIdx) => {
    if (box && box.length > 0) {
      const boxNumber = boxIdx + 1;

      box.forEach((label, slotIdx) => {
        const slotNumber = slotIdx + 1;
        const focalLength = lenses.get(label);
        // console.log({ slotNumber, focalLength });

        const power = boxNumber * slotNumber * focalLength;
        // console.log({ power });
        total += power;
      });
    }

    return total;
  }, 0);

  return total;
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
