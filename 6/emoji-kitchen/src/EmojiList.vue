<template>
    <div class="container">
        <Emoji v-for="emoji of emojis" :key="emoji.htmlCode[0]" :emoji="emoji" @click="selectEmoji(emoji)" />
    </div>
</template>

<script setup>
import Emoji from './Emoji.vue'
const props = defineProps(['emojis'])

const emit = defineEmits(['selectEmoji']);

function selectEmoji(emoji) {
    emit('selectEmoji', emoji);
}
</script>

<style scoped>
.container {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    font-size: 3rem;
}
</style>
