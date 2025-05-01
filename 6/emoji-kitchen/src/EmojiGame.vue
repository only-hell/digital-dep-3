<template>
    <div class="game">
        <!-- Тут первый лист -->
        <EmojiList :emojis="emojis" @selectEmoji="handleSelectEmoji(0)" />
        <!-- Тут второй лист -->
        <EmojiList :emojis="emojis" @selectEmoji="handleSelectEmoji(1)" />
        <!-- Смиксованный эмодзи -->
        <EmojiMixed :firstEmoji="selectedEmojis[0]" :secondEmoji="selectedEmojis[1]" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import EmojiList from './EmojiList.vue'
import EmojiMixed from './EmojiMixed.vue'

const emojis = ref([]);
const selectedEmojis = ref([null, null]);

onMounted(() => {
    loadEmojis();
})

function handleSelectEmoji(index, emoji) {
    selectedEmojis.value[index] = emoji;
}

async function loadEmojis() {
    const response = await fetch(`https://emojihub.yurace.pro/api/all`);
    const data = await response.json();
    emojis.value = data;
}
</script>

<style scoped>
.game {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
}
</style>
