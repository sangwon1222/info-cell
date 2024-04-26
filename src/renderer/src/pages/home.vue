<script setup lang="ts" scoped>
import tGameScreen from '@/components/template/tGameScreen.vue'
import { useSceneStore } from '@/store/scene'
import { onMounted } from 'vue'
onMounted(() => (useSceneStore.editMode = false))
</script>

<template>
  <div class="relative flex flex-col flex-wrap w-full h-full">
    <t-game-screen />
  </div>
</template>
