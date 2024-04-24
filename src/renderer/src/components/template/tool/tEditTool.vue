<script setup lang="ts" scoped>
import aSelectScene from '@/components/atoms/tool/aSelectScene.vue'
import aSetActor from '@/components/atoms/tool/aSetActor.vue'
import aSetBg from '@/components/atoms/tool/aSetBg.vue'
import { useSceneStore } from '@/store/scene'

const emit = defineEmits(['upload-bg', 'upload-actor'])
const getSceneData = (events: TypeEvents[], sceneName: string) => {
  useSceneStore.events = events
  useSceneStore.sceneName = sceneName
  console.log(useSceneStore.events)
}
</script>

<!-- 부모 컴포넌트 => page/admin.vue -->
<template>
  <div class="relative flex flex-col w-full">
    <!-- 편집 툴 -->
    <div class="flex gap-2">
      <a-set-bg @upload-bg="$emit('upload-bg', $event)" />
      <a-set-actor @upload-actor="$emit('upload-actor', $event)" />
    </div>
    <a-select-scene @get-scene-data="getSceneData" />
  </div>
</template>
