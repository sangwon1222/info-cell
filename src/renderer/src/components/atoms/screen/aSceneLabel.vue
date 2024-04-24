<script setup lang="ts" scoped>
import { useSceneStore } from '@/store/scene'

const props = withDefaults(defineProps<{ place: string }>(), { place: '' })
</script>

<!-- 부모 컴포넌트 => components/template/tGameScreen.vue -->
<template>
  <p class="absolute top-0 left-0 z-10 flex items-center gap-2 p-2 text-white bg-black">
    <span v-if="useSceneStore.editMode" class="flex items-center gap-2">
      <label for="scene-name">씬 이름: </label>
      <input id="scene-name" type="text" :value="useSceneStore.sceneName" />
      <label for="place-name">장소: </label>
      <input id="scene-name" type="text" :value="props.place" />
    </span>

    <span v-if="useSceneStore.editMode">
      <span> 장소: </span>
      <span v-if="props.place"> {{ props.place }} </span>
    </span>
  </p>
</template>
