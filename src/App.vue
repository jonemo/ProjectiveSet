<script setup lang="ts">
import { ref, computed, type Ref } from 'vue';
import { CButton, CCard, CCardBody, CCardTitle, CCardSubtitle, CContainer, CRow } from '@coreui/vue';

import { type CardType, type DifficultyType, type GameRoundInfo } from './types';
import DifficultySelector from './components/DifficultySelector.vue';
import GameRound from './components/GameRound.vue';
import GameRoundResult from './components/GameRoundResult.vue';
import InstructionsViewer from './components/InstructionsViewer.vue';

// Core UI CSS definitions
import '@coreui/coreui/dist/css/coreui.min.css';

const defaultDifficulty = 6;
let roundInProgress: Ref<boolean> = ref(false);
let lastSelectedDifficulty: Ref<DifficultyType | undefined> = ref(undefined);
let previousRounds: Ref<GameRoundInfo[]> = ref([]);

function startRound() {
  roundInProgress.value = true;
  showDifficultiesClicked.value = false;
}

function roundCompleted(noOfDots: DifficultyType, timeNeeded: number, correctSets: CardType[][]) {
  console.log("round completed", noOfDots, timeNeeded, correctSets);
  previousRounds.value.push({ noOfDots, timeNeeded, correctSets });
  roundInProgress.value = false;
}

const beforeFirstRound = computed(() => !roundInProgress.value && previousRounds.value.length === 0)
// Showing the difficulties only makes sense when no round is in progress because the difficulty can't be changed during a round. 
let showDifficultiesClicked: Ref<boolean> = ref(false);
let showDifficulties = computed(() => beforeFirstRound.value || (!roundInProgress.value && showDifficultiesClicked.value))
</script>

<template>
  <CContainer>

    <CRow>
      <h2 class="text-center">Projective Set</h2>
    </CRow>

    <CRow>
      <InstructionsViewer :show-instructions="beforeFirstRound" :show-toggle="!beforeFirstRound"></InstructionsViewer>
      <DifficultySelector v-if="!roundInProgress && showDifficulties" v-model:difficulty="lastSelectedDifficulty"
        v-on:update:difficulty="startRound()">
      </DifficultySelector>
      <CCard v-if="!roundInProgress && !beforeFirstRound && !showDifficulties">
        <CCardBody>
          <CCardTitle>
            Round completed in {{ previousRounds[previousRounds.length - 1].timeNeeded }} seconds!
          </CCardTitle>
          <CCardSubtitle>
            The difficulty was {{ previousRounds[previousRounds.length - 1].timeNeeded }} and you found {{
              previousRounds[previousRounds.length - 1].correctSets.length }} sets.
          </CCardSubtitle>
          <CButton color="primary" size="sm" @click="startRound">
            play another round
          </CButton>&nbsp;
          <CButton color="secondary" size="sm" @click="showDifficultiesClicked = true">change difficulty</CButton>
        </CCardBody>
      </CCard>
    </CRow>

    <CRow>
      <GameRound v-if="roundInProgress" :no-of-dots="lastSelectedDifficulty || defaultDifficulty"
        @completed="roundCompleted" />
    </CRow>

    <CRow>
      <GameRoundResult :rounds="previousRounds" />
    </CRow>

  </CContainer>
</template>
