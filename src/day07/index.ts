import run from "aocrunner";
const CardRankOne = {
  A: 13,
  K: 12,
  Q: 11,
  J: 10,
  T: 9,
  "9": 8,
  "8": 7,
  "7": 6,
  "6": 5,
  "5": 4,
  "4": 3,
  "3": 2,
  "2": 1,
};

const CardRankTwo = {
  A: 13,
  K: 12,
  Q: 11,
  T: 10,
  "9": 9,
  "8": 8,
  "7": 7,
  "6": 6,
  "5": 5,
  "4": 4,
  "3": 3,
  "2": 2,
  J: 1,
};

type Card =
  | "A"
  | "K"
  | "Q"
  | "J"
  | "T"
  | "9"
  | "8"
  | "7"
  | "6"
  | "5"
  | "4"
  | "3"
  | "2";

type Hand = [Card, Card, Card, Card, Card];

type HandWithWin = {
  hand: Hand;
  bid: number;
  win: ReturnType<typeof getWinType>;
};

function _getSortedCountOfCards(hand: Hand) {
  let counts: Partial<Record<Card, number>> = {};
  for (let i = 0; i < hand.length; i++) {
    const card = hand[i];

    // @ts-expect-error let me use js
    counts[card] = counts[card] ? counts[card] + 1 : 1;
  }

  const sorted = Object.entries(counts).sort((a, b) => {
    return a[1] - b[1];
  });
  return sorted;
}

function getWinType(hand: Hand, includeJ: boolean = true) {
  const sorted = _getSortedCountOfCards(hand).filter(([card, _]) => {
    if (includeJ) return true;

    return card !== "J";
  });

  let triple: boolean = false;
  let firstPair: boolean = false;
  let secondPair: boolean = false;

  for (let i = 0; i < sorted.length; i++) {
    const [card, count] = sorted[i];

    if (count === 5) {
      return 6;
    }
    if (count === 4) {
      return 5;
    }

    if (count === 3) {
      triple = true;
    }

    if (count === 2) {
      if (!secondPair && firstPair) {
        secondPair = true;
        return 2;
      }

      if (!firstPair) {
        firstPair = true;
      }
    }

    if (triple && firstPair) {
      return 4;
    }

    if (triple) {
      return 3;
    }

    if (i === sorted.length - 1) {
      if (firstPair) {
        return 1;
      }
    }
  }

  if (firstPair && !secondPair) {
    return 1;
  }

  if (sorted.every(([_, count]) => count === 1)) {
    return 0;
  }
  return -1;
}

function getJokerWinType(hand: Hand, winType: number) {
  if (!hand.includes("J")) return winType;

  const sorted = _getSortedCountOfCards(hand);
  const [_, jokers] = sorted.find((card) => card[0] === "J")!;

  // four of a kind goes to 5
  if (winType === 5) {
    return winType + 1;
  }

  // full house can go to 4/5 of a kind
  if (winType === 4) {
    if (jokers === 2) {
      return winType + 2;
    }
    if (jokers === 1) {
      return winType + 1;
    }
  }

  // three of a kind goes to 4/5 of a kind
  if (winType === 3) {
    if (jokers === 2) {
      return winType + 3;
    }
    if (jokers === 1) {
      return winType + 2;
    }
  }

  // two pair goes to fullhouse
  if (winType === 2) {
    if (jokers === 1) {
      return winType + 2;
    }
  }

  // one pair goes to 3/4/5 of a kind
  if (winType === 1) {
    if (jokers === 3) {
      return winType + 5;
    }
    if (jokers === 2) {
      return winType + 4;
    }
    if (jokers === 1) {
      return winType + 2;
    }
  }

  if (winType === 0) {
    // always makes 5 of a kind
    if (jokers === 5 || jokers === 4) {
      return 6;
    }

    // 3 makes 4 of a kind
    if (jokers === 3) {
      return 5;
    }

    // 2 makes 3 of a kind
    if (jokers === 2) {
      return 3;
    }

    // 1 makes 2 of a kind
    if (jokers === 1) {
      return 1;
    }
  }

  return winType;
}

function getFinalRank(
  pOne: HandWithWin,
  pTwo: HandWithWin,
  cardRank: typeof CardRankOne,
) {
  const handOne = pOne.hand;
  const handTwo = pTwo.hand;

  if (pOne.win !== pTwo.win) {
    return pOne.win - pTwo.win;
  }

  for (let i = 0; i < handOne.length; i++) {
    if (handOne[i] !== handTwo[i]) {
      const rankOne = cardRank[handOne[i]];
      const rankTwo = cardRank[handTwo[i]];

      const result = rankOne - rankTwo;
      if (result === 0) continue;
      return result;
    }

    continue;
  }
  return 0;
}

const parseInput = (rawInput: string) => {
  const hands = rawInput.split("\n").map((line) => {
    const [_hand, _bid] = line.trim().split(" ");
    const bid = parseInt(_bid);
    const hand = _hand.split("") as Hand;

    return { hand, bid };
  });

  return hands;
};

const part1 = (rawInput: string) => {
  const hands = parseInput(rawInput);

  const wins = hands
    .map(({ hand, bid }) => {
      return {
        win: getWinType(hand),
        bid,
        hand,
      } as HandWithWin;
    })
    .sort((a, b) => getFinalRank(a, b, CardRankOne));

  const totals = wins.reduce((total, curr, i) => {
    return total + curr.bid * (i + 1);
  }, 0);

  return totals;
};

const part2 = (rawInput: string) => {
  const hands = parseInput(rawInput);

  const wins = hands
    .map(({ hand, bid }) => {
      const initialWinType = getWinType(hand, false);
      const win = getJokerWinType(hand, initialWinType);
      return {
        win,
        bid,
        hand,
      } as HandWithWin;
    })
    .sort((a, b) => getFinalRank(a, b, CardRankTwo));

  const totals = wins.reduce((total, curr, i) => {
    return total + curr.bid * (i + 1);
  }, 0);

  return totals;
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
