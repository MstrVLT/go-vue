<script setup>
import { ref } from 'vue'
import { useWorker } from "@/composables/worker";

const { ready, call, onResult } = useWorker()
onResult(e => console.log('foo', e))

</script>

<template>
    <div>
        <button :disabled="!ready" @click="call('add', 1, 3)">test add</button>
    </div>
</template>

<style scoped>
.read-the-docs {
    color: #888;
}
</style>
