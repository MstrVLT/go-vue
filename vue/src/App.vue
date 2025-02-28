<script setup>
import { ref } from "vue"
import HelloWorld from "@/components/HelloWorld.vue"

const show = ref(false)
</script>

<template>
    <h1>test1</h1>
    <button @click="show = !show">test1</button>
    <HelloWorld v-if="show"></HelloWorld>
</template>

<style scoped>
.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
}

.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
