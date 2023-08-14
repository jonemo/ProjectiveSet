export type CardType = number;
export type DifficultyType = number;

export class SetOfCards {
  cards: CardType[];

  constructor(cards: CardType[]) {
    this.cards = cards;
  }

  isValidSet() {
    if (this.cards.length === 0) return false;
    let xor = 0;
    for (let i = 0; i < this.cards.length; i++) {
      xor ^= this.cards[i];
    }
    return (xor === 0);
  }
}

const fisherYates = function (myArray: any[]) {
  let i = myArray.length, j, temp;
  if (i === 0) return myArray;
  while (--i) {
    j = Math.floor(Math.random() * (i + 1));
    temp = myArray[i];
    myArray[i] = myArray[j];
    myArray[j] = temp;
  }
}

export class DeckOfCards {
  deck: CardType[];

  constructor(noOfDots: number) {
    this.deck = [];
    // fill 64..1 into the cards array
    let i = Math.pow(2, noOfDots);
    while (--i) this.deck.push(i);
    // shuffle
    fisherYates(this.deck);
  }

  drawCards(count: number): CardType[] {
    if (count > this.deck.length) count = this.deck.length;
    return this.deck.splice(0, count);
  }

  size(): number {
    return this.deck.length;
  }
}

export interface GameRoundInfo {
  noOfDots: DifficultyType;
  timeNeeded: number;
  correctSets: CardType[][];
}
