<script setup lang="ts" scoped>
import { useSceneStore } from '@/store/scene'
import { onMounted } from 'vue'

defineEmits(['next'])
const props = withDefaults(defineProps<{ actor: string; chat: string }>(), {
  actor: '',
  chat: ''
})

onMounted(() => {
  // console.log(props.chat)
})

const changeActor = (e) => {
  const target = e.currentTarget as HTMLInputElement
  useSceneStore.event.actor = target.value
}
</script>

<!-- 부모 컴포넌트 => components/template/tGameScreen.vue -->
<template>
  <div v-if="props.chat.length" class="absolute bottom-0 w-full h-[200px] text-white text-xl">
    <div v-if="!useSceneStore.editMode" class="flex flex-col">
      <p class="z-10 h-10 w-fit">
        {{ props.actor ? `${props.actor}:` : '' }}
      </p>
      <p class="z-10 flex-1 mx-4 overflow-hidden bg-transparent whitespace-nowrap animate-typing">
        {{ props.chat }}
        <span class="ml-2 animate-pulse">_</span>
      </p>
    </div>

    <div v-if="useSceneStore.editMode" class="relative flex flex-col flex-wrap">
      <input
        class="z-10 h-10 text-white bg-transparent border border-white w-fit"
        type="text"
        :value="props.actor"
        @input="changeActor"
      />
      <textarea
        class="z-10 h-[120px] mx-4 bg-transparent border-white border typing text-white"
        type="text"
        :value="props.chat"
      >
      </textarea>
      <button
        class="absolute bottom-0 right-0 z-20 p-2 mx-4 rounded bg-sky-600"
        @click="$emit('next')"
      >
        다음
      </button>
    </div>

    <div class="absolute top-0 left-0 w-full h-full bg-black opacity-60" />
  </div>
</template>
