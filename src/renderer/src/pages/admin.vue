<script setup lang="ts" scoped>
import App from '@/app'
import tGameScreen from '@/components/template/tGameScreen.vue'
import tEditTool from '@/components/template/tool/tEditTool.vue'
import { useSceneStore } from '@/store/scene'
import { downloadRsc, next, prev, save } from '@/util'
import { onMounted, reactive } from 'vue'
import { useToast } from 'vue-toastification'

const toast = useToast()
const state: {
  showActorList: boolean
  actorList: { src: string; data: string }[]
} = reactive({
  showActorList: false,
  actorList: []
})

onMounted(async () => {
  useSceneStore.editMode = true
  const { ok, data } = await downloadRsc()
  if (ok) {
    state.actorList = data
  } else {
    toast.error('리소스 다운로드 실패..')
  }
})
const showActor = () => {
  state.showActorList = !state.showActorList
}

const addActor = (src: string) => {
  state.showActorList = false
  console.log(src)
  App.getHandle.getScene.addActor(src)
}
</script>

<template>
  <div class="relative flex flex-col flex-wrap w-full h-full">
    <div v-if="useSceneStore.data.type" class="absolute top-0 z-10 flex gap-2">
      <button class="rounded p-2 bg-sky-400 hover:bg-sky-600">BG추가</button>
      <button
        class="overflow-visible relative rounded p-2 bg-sky-400 hover:bg-sky-600"
        @click="showActor"
      >
        캐릭터 추가
        <ul
          class="absolute top-[44px] left-0 bg-white text-left w-fit"
          :class="state.showActorList ? 'overflow-y-auto h-80 py-2' : 'overflow-hidden h-0'"
        >
          <li
            v-for="(v, i) in state.actorList"
            :key="i"
            class="whitespace-pre border-2 px-2 hover:bg-red-600 hover:text-white"
            @click="addActor(v.src)"
          >
            {{ v.src }}
          </li>
        </ul>
      </button>
    </div>
    <t-game-screen />
    <t-edit-tool />

    <div class="absolute top-0 right-0 z-10 flex gap-2">
      <button class="rounded p-2 bg-sky-400 hover:bg-sky-600" @click="prev">이전</button>
      <button class="rounded p-2 bg-sky-400 hover:bg-sky-600" @click="next">다음</button>
      <button class="rounded p-2 bg-sky-400 hover:bg-sky-600" @click="save">저장</button>
    </div>
  </div>
</template>
