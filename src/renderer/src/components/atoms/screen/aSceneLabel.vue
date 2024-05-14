<script setup lang="ts" scoped>
import { useSceneStore } from '@/store/scene'
</script>

<!-- 부모 컴포넌트 => components/template/tGameScreen.vue -->
<template>
  <p class="absolute top-0 left-0 z-[2] flex items-center gap-2 p-2 text-white bg-black">
    <span v-if="useSceneStore.editMode" class="flex items-center gap-2">
      <label for="place-name">장소: </label>
      <input id="place-name" type="text" :value="useSceneStore.data.place.name" />
    </span>
  </p>
</template>
