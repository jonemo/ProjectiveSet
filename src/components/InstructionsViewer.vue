<script setup lang="ts">
import { ref, computed, type Ref } from 'vue';
import { CButton } from '@coreui/vue';

const props = defineProps<{
  showInstructions: boolean,
  showToggle: boolean
}>()

let showInstructionsClicked: Ref<boolean> = ref(false);
const actuallyShowInstructions = computed(() => props.showInstructions || showInstructionsClicked.value)
</script>

<template>
  <div class="text-center">
    <CButton v-if="showToggle" color="secondary" size="sm" variant="ghost"
      @click="showInstructionsClicked = !showInstructionsClicked">
      {{ showInstructionsClicked ? 'hide' : 'show' }} instructions
    </CButton>

    <div v-if="actuallyShowInstructions">
      <p>
        This is a single-player version of the Projective Set game. See
        <a href="https://en.wikipedia.org/wiki/Projective_Set_(game)">Wikipedia</a> for more about the game and
        <a href="https://jonasneubert.com/projects/projectiveset/">my website</a> for details about this site.
      </p>
      <p>
        Your goal is to find a subset of the visible cards where each color of dot appears an even number of times. Once
        you have selected such a set by clicking on the cards, they are removed and replaced with new cards from the
        deck. This repeats until the deck is empty. The time needed to work through the deck is your score.
      </p>
    </div>
  </div>
</template>
