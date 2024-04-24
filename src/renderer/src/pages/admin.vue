<script setup lang="ts" scoped>
import tGameScreen from '@/components/template/tGameScreen.vue'
import tEditTool from '@/components/template/tool/tEditTool.vue'
import { useSceneStore } from '@/store/scene'
import { onMounted, reactive } from 'vue'

const state: TypeStepRsc = reactive({
  rscList: [],
  place: { name: '', src: '', x: 0, y: 0 },
  actor: '',
  chat: ''
})

onMounted(() => (useSceneStore.editMode = true))

const uploadBg = (src: string) => {
  state.place.src = src
}
const uploadActor = ({ src, name }: { src: string; name: string }) => {
  state.rscList.push({ name, src, x: 0, y: 0 })
}

const save = () => {
  console.log(useSceneStore.saveData)
}
</script>

<template>
  <div class="relative flex flex-col flex-wrap w-full h-full">
    <div
      class="relative overflow-hidden flex flex-col justify-end !w-[1280px] !h-[720px] border-2 bg-black"
    >
      <t-game-screen
        :place-data="state.place"
        :rsc-list="state.rscList"
        :actor="state.actor"
        :chat="state.chat"
      />
      <button
        class="absolute top-0 right-0 w-20 h-10 border rounded bg-sky-400 hover:bg-sky-600"
        @click="save"
      >
        저장
      </button>
    </div>

    <t-edit-tool @upload-bg="uploadBg" @upload-actor="uploadActor" />
  </div>
</template>
