<script setup lang="ts">
import { CAccordion, CAccordionItem, CAccordionHeader, CAccordionBody, CBadge } from '@coreui/vue';
import PlayingCard from './PlayingCard.vue';
import { type GameRoundInfo } from '../types';

const props = defineProps<{
  rounds: GameRoundInfo[]
}>()

type DifficultyToInfoMap = { [key: number]: { name: string, color: string } };
const difficultyToInfo: DifficultyToInfoMap = {
  3: {
    name: "beginner",
    color: "info",
  },
  4: {
    name: "easy",
    color: "success",
  },
  5: {
    name: "intermediate",
    color: "warning",
  },
  6: {
    name: "hard",
    color: "danger",
  },
};
</script>

<template>
  <hr style="margin-top: 3em;">
  <h5 v-if="props.rounds.length > 0">Previous Rounds</h5>
  <CAccordion flush>
    <CAccordionItem v-for="(round, roundIndex) in props.rounds" :key="roundIndex" :game-round-info="round">
      <CAccordionHeader>
        <CBadge :color="difficultyToInfo[round.noOfDots].color" style="width: 8em; margin-right: 2em">{{
          difficultyToInfo[round.noOfDots].name }}</CBadge>
        Completed in {{ round.timeNeeded.toFixed(2) }} seconds
      </CAccordionHeader>
      <CAccordionBody>
        <div v-for="(cardSet, cardSetIndex) in round.correctSets" :key="cardSetIndex">
          <PlayingCard v-for="card in cardSet" :key="card" :card-number="card" :small="true"></PlayingCard>
        </div>
      </CAccordionBody>
    </CAccordionItem>
  </CAccordion>
</template>
