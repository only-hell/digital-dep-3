<template>
    <div class="mixer-container">
        <template v-if="props.firstEmoji">
            <Emoji :emoji="props.firstEmoji" />
        </template>
        <span>➕</span>
        <template v-if="props.secondEmoji">
            <Emoji :emoji="props.secondEmoji" />
        </template>
        <span>⬇️</span>
        <div class="img-container">
            <img v-if="kitchenEmoji" :src="kitchenEmoji" alt="mixed emoji" />
        </div>
    </div>
</template>

<script setup>
import { computed, defineProps } from 'vue'
import Emoji from './Emoji.vue'

const props = defineProps({
    firstEmoji: Object,
    secondEmoji: Object
});

const kitchenEmoji = computed(() => {
    if (props.firstEmoji && props.secondEmoji) {
        const unicodeFirst = props.firstEmoji.unicode[0].replace('U+', '').toLowerCase();
        const unicodeSecond = props.secondEmoji.unicode[0].replace('U+', '').toLowerCase();
        return `https://emk.vercel.app/s/${unicodeFirst}_${unicodeSecond}?size=96`;
    }
    return '';
});
</script>

<style scoped>
.mixer-container {
    display: grid;
    grid-template-rows: repeat(5, fit-content(100px));
    align-items: start;
    font-size: 96px;
    justify-content: center;
    position: sticky;
    top: 0;
    height: fit-content;
}

.img-container {
    display: flex;
    flex-direction: column;
}

img {
    object-fit: cover;
}
</style>
