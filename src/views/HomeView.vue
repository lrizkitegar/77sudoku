<script setup>
import { onBeforeMount } from 'vue';
import { useSudokuStore } from '../stores/sudoku';

const sudokuStore = useSudokuStore()

onBeforeMount(() => {
  sudokuStore.generateSudokuBoard()
})
</script>

<template>
  <div>{{sudokuStore.playBoard}}</div>
  <div>{{sudokuStore.completeBoard}}</div>
  <div>{{sudokuStore.checkBoard}}</div>
</template>
