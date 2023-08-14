<script setup lang="ts">

const props = defineProps<{
    cardNumber: number;
    selected?: boolean;
    monochrome?: boolean;
    small?: boolean;
    showNumbers?: boolean;
}>()

const maybeShowNumber = function (number: number): string {
    return props.showNumbers ? number.toString() : "";
}

</script>

<template>
    <div class="playingcard" :class="{ selected: selected, small: small }">
        <div v-if="(cardNumber >> 5) % 2" :class="{ dot: true, dot32: !monochrome, monodot: monochrome }">
            {{ maybeShowNumber(32) }}
        </div>
        <div v-else class="dot nodot">{{ maybeShowNumber(32) }}</div>

        <div v-if="(cardNumber >> 4) % 2" :class="{ dot: true, dot16: !monochrome, monodot: monochrome }">
            {{ maybeShowNumber(16) }}
        </div>
        <div v-else class="dot nodot">{{ maybeShowNumber(16) }}</div>

        <div v-if="(cardNumber >> 3) % 2" :class="{ dot: true, dot8: !monochrome, monodot: monochrome }">
            {{ maybeShowNumber(8) }}
        </div>
        <div v-else class="dot nodot">{{ maybeShowNumber(8) }}</div>

        <div v-if="(cardNumber >> 2) % 2" :class="{ dot: true, dot4: !monochrome, monodot: monochrome }">
            {{ maybeShowNumber(4) }}
        </div>
        <div v-else class="dot nodot">{{ maybeShowNumber(4) }}</div>

        <div v-if="(cardNumber >> 1) % 2" :class="{ dot: true, dot2: !monochrome, monodot: monochrome }">
            {{ maybeShowNumber(2) }}
        </div>
        <div v-else class="dot nodot">{{ maybeShowNumber(2) }}</div>

        <div v-if="(cardNumber) % 2" :class="{ dot: true, dot1: !monochrome, monodot: monochrome }">
            {{ maybeShowNumber(1) }}
        </div>
        <div v-else class="dot nodot">{{ maybeShowNumber(1) }}</div>
    </div>
</template>