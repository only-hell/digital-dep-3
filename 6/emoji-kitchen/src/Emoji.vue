<template>
    <div class="emoji" @click="emitClick">
        <span v-html="emoji.htmlCode[0]"></span>
    </div>
</template>

<script setup>
const props = defineProps({
    emoji: Object
});

const emit = defineEmits(['click']);

function emitClick() {
    emit('click', props.emoji);
}
</script>

<style scoped>
.emoji {
    cursor: pointer;
    font-size: 2rem;
    text-align: center;
}
</style>
