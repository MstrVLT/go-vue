<script setup>
import { ref } from 'vue'
import { useWorker } from "@/composables/worker";

const { call, onResult }  = useWorker()
onResult(e => console.log('foo', e))

</script>

<template>
  <h1>test2</h1>
  <button @click="call('add', 1, 3)">test2</button>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
