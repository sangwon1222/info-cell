<script setup lang="ts" scoped>
import { useSceneStore } from '@/store/scene'

defineEmits(['next'])

const changeActor = (e) => {
  const target = e.currentTarget as HTMLInputElement
  useSceneStore.data.actor = target.value
}
</script>

<!-- 부모 컴포넌트 => components/template/tGameScreen.vue -->
<template>
  <div class="absolute bottom-0 w-full h-[200px] text-white text-xl">
    <div
      v-if="!useSceneStore.editMode && useSceneStore.data?.chat.length > 0"
      class="flex flex-col"
    >
      <p class="z-10 h-10 w-fit">
        {{ useSceneStore.data?.actor }}
      </p>
      <p class="z-10 flex-1 mx-4 overflow-hidden bg-transparent whitespace-nowrap animate-typing">
        {{ useSceneStore.data?.chat }}
        <span class="ml-2 animate-pulse">_</span>
      </p>
    </div>

    <div v-if="useSceneStore.editMode" class="relative flex flex-col flex-wrap">
      <input
        class="z-10 h-10 text-white bg-transparent border border-white w-fit"
        type="text"
        :value="useSceneStore.data?.actor"
        @input="changeActor"
      />
      <textarea
        class="z-10 h-[120px] mx-4 bg-transparent border-white border typing text-white"
        type="text"
        :value="useSceneStore.data?.chat"
      >
      </textarea>
    </div>

    <div class="absolute top-0 left-0 w-full h-full bg-black opacity-60" />
  </div>
</template>
