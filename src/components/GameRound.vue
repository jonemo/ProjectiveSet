<script setup lang="ts">
import { ref, type Ref } from 'vue';
import PlayingCard from './PlayingCard.vue';
import { type CardType, type DifficultyType, DeckOfCards, SetOfCards } from '../types';


const props = defineProps<{
  noOfDots: DifficultyType
}>()

const emit = defineEmits<{
  completed: [
    noOfDots: DifficultyType,
    timeNeeded: number,
    correctSets: CardType[][],
  ]
}>()

let deck: Ref<DeckOfCards> = ref(new DeckOfCards(props.noOfDots));
let visibleCards: Ref<CardType[]> = ref(deck.value.drawCards(props.noOfDots + 1));
let selectedCards: Ref<CardType[]> = ref([]);
let correctSets: Ref<CardType[][]> = ref([]);

const startingTime = Date.now();

const correctSetSelected = function () {
  correctSets.value.reverse();
  correctSets.value.push(selectedCards.value); // could be chained - if pushed weren't returning the length of the new array instead - doh
  correctSets.value.reverse();

  // remove selected cards from table
  selectedCards.value.forEach((selCard) => {
    const visIdx = visibleCards.value.findIndex((visCard) => visCard === selCard);
    if (visIdx !== -1) {
      visibleCards.value.splice(visIdx, 1);
    }
  });

  // draw cards from deck to replace selected ones
  const drawnCards = deck.value.drawCards(selectedCards.value.length);
  visibleCards.value.push(...drawnCards);
  selectedCards.value = [];

  // the game is over if drawing cards emptied the deck
  if (deck.value.size() === 0) {
    roundComplete();
  }
}

const roundComplete = function () {
  var timeNeeded = ((Date.now() - startingTime) / 1000);
  emit("completed", props.noOfDots, timeNeeded, correctSets.value);
}

const toggleCard = function (c: CardType) {
  const curIdx = selectedCards.value.findIndex((selCar) => selCar === c);
  if (curIdx !== -1) selectedCards.value.splice(curIdx, 1);
  else selectedCards.value.push(c);
  // check if the current selection makes a valid set
  const selectedSet = new SetOfCards(selectedCards.value);
  if (selectedSet.isValidSet()) {
    correctSetSelected();
  }
};

</script>

<template>
  <div>{{ deck.size() }} cards left in deck</div>
  <hr>
  <div>
    <PlayingCard v-for="visibleCard in visibleCards" :key="visibleCard" :card-number="visibleCard"
      :selected="selectedCards.includes(visibleCard)" @click="toggleCard(visibleCard)">
    </PlayingCard>
  </div>
</template>
