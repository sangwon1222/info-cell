<script setup lang="ts" scoped>
import tGameScreen from '@/components/template/tGameScreen.vue'
import tEditTool from '@/components/template/tool/tEditTool.vue'
import { useSceneStore } from '@/store/scene'
import { next, save } from '@/util/common'
import { onMounted } from 'vue'
onMounted(() => (useSceneStore.editMode = true))
</script>

<template>
  <div class="relative flex flex-col flex-wrap w-full h-full">
    <t-game-screen />
    <t-edit-tool />
    <button
      class="absolute top-0 right-0 z-40 w-20 h-10 border rounded bg-sky-400 hover:bg-sky-600"
      @click="save"
    >
      저장
    </button>
    <button
      class="absolute top-0 z-40 w-20 h-10 border rounded right-24 bg-sky-400 hover:bg-sky-600"
      @click="next"
    >
      다음
    </button>
  </div>
</template>
