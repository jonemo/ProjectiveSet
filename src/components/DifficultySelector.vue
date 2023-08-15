<script setup lang="ts">
import { CButton, CCallout, CCol, CContainer, CRow } from '@coreui/vue';
import PlayingCard from './PlayingCard.vue';

defineProps<{
  difficulty?: number
}>()
const emitter = defineEmits(['update:difficulty'])

function selectDifficulty(difficulty: number) {
  emitter('update:difficulty', difficulty);
}

const DifficultyLevels = [
  {
    noOfDots: 3,
    name: "beginner",
    color: "info",
    duration: "a minute",
  },
  {
    noOfDots: 4,
    name: "easy",
    color: "success",
    duration: "a minute or two",
  },
  {
    noOfDots: 5,
    name: "intermediate",
    color: "warning",
    duration: "2-5 minutes",
  },
  {
    noOfDots: 6,
    name: "hard",
    color: "danger",
    duration: "10-30 minutes",
  },
];

</script>

<template>
  <div>
    <h3 class="text-center">Select Difficulty Level</h3>

    <CCallout v-for="level in DifficultyLevels" :key="level.noOfDots" :color="level.color"
      @click="selectDifficulty(level.noOfDots)">
      <CContainer>
        <CRow class="align-items-center">
          <CCol xs="2">
            <PlayingCard :card-number="(2 ** level.noOfDots) - 1" :monochrome="true" :small="true"></PlayingCard>
          </CCol>
          <CCol xs="6" class="text-left">
            {{ level.noOfDots }} dots/card<br>
            {{ 2 ** level.noOfDots }} cards/deck<br>
            {{ level.noOfDots + 1 }} cards on table<br>
            {{ level.duration }} per game
          </CCol>
          <CCol xs="4">
            <CButton :color="level.color" style="width: 8em">{{ level.name }}</CButton>
          </CCol>
        </CRow>
      </CContainer>
    </CCallout>

  </div>
</template>
