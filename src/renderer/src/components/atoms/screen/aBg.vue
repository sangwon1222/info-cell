<script setup lang="ts" scoped>
import aSceneLabel from '@/components/atoms/screen/aSceneLabel.vue'
import { useSceneStore } from '@/store/scene'
</script>

<!-- 부모 컴포넌트 => components/template/tGameScreen.vue -->
<template>
  <a-scene-label />
  <img
    :src="useSceneStore.gameScreen.place.data"
    :alt="useSceneStore.gameScreen.place.name"
    class="absolute top-0 left-0 h-[720px] w-[1280px]"
  />
</template>
