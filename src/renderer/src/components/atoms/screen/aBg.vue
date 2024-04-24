<script setup lang="ts" scoped>
import aSceneLabel from '@/components/atoms/screen/aSceneLabel.vue'
const props = withDefaults(
  defineProps<{
    bgData: any
  }>(),
  {
    bgData: { name: '', src: '', x: 0, y: 0 }
  }
)
</script>

<!-- 부모 컴포넌트 => components/template/tGameScreen.vue -->
<template>
  <a-scene-label :place="props.bgData.name" />
  <img
    :id="`place-${props.bgData.name}`"
    :src="props.bgData.src"
    :alt="props.bgData.src"
    class="absolute top-0 left-0 h-[720px] w-[1280px]"
  />
</template>
