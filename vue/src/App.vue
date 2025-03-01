<script setup>
import { ref } from "vue"
import HelloWorld from "@/components/HelloWorld.vue"

const show1 = ref(false)
const show2 = ref(false)
</script>

<template>
    <div class="main">
        <h1>webassembly in webworker</h1>
        <div class="container">
            <button @click="show1 = !show1">test1</button>
            <button @click="show2 = !show2">test2</button>
            <HelloWorld v-if="show1"></HelloWorld>
            <HelloWorld v-if="show2"></HelloWorld>
        </div>
    </div>
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

.main {
    display: flex;
    gap: 20px;
    flex-direction: column;
    align-items: center;
}

.container {
    display: grid;
    grid-template-columns: 128px 128px;
    grid-template-rows: 1fr 1fr;
    gap: 10px 10px;
}
</style>
