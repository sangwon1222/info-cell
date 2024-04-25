<script setup lang="ts" scoped>
import tGameScreen from '@/components/template/tGameScreen.vue'
import tEditTool from '@/components/template/tool/tEditTool.vue'
import { useDataStore } from '@/store/data'
import { useSceneStore } from '@/store/scene'
import { getRscData } from '@/util/common'
import { onMounted, reactive } from 'vue'
interface TypeSceneData {
  eventList: TypeInterActiveEvents | TypeChatEvents[]
  sceneName: string
}
const state: TypeStepRsc = reactive({
  place: { name: '', src: '' },
  actor: '',
  chat: ''
})

onMounted(() => (useSceneStore.editMode = true))

const uploadBg = (src: string) => {
  console.log(src)
  // state.place.src = src
}
const uploadActor = ({ src, name }: { src: string; name: string }) => {
  useDataStore.cacheRsc[name] = src
  // state.rscList.push({ name, src, x: 0, y: 0 })
}

const selectScene = async ({ eventList, sceneName }: TypeSceneData) => {
  state.chat = ''
  state.actor = ''
  useSceneStore.eventList = eventList
  useSceneStore.sceneName = sceneName
  useSceneStore.currentSceneIndex = 0

  const data = eventList[useSceneStore.currentSceneIndex]
  if (data) {
    await getNextData()
  } else {
    useSceneStore.event = { type: '', actor: '', chat: [], placeId: -1, img: [] }
    state.place = { name: '', src: '' }
    useSceneStore.placeName = ''
    state.chat = ''
  }

  if (useSceneStore.event.type) goEvent()
}

const goEvent = () => {
  console.log(useSceneStore.event)
}

const next = async () => {
  const index = useSceneStore.currentSceneIndex + 1
  if (useSceneStore.eventList[index]) {
    useSceneStore.currentSceneIndex += 1
    await getNextData()
  }
}

const getNextData = async () => {
  const index = useSceneStore.currentSceneIndex
  useSceneStore.event = useSceneStore.eventList[index]
  const data = useSceneStore.event
  console.log(data)
  state.chat = data.chat
  state.actor = data.actor
  state.rscList = data.img

  const { src, name } = await getRscData([data.placeId])
  useSceneStore.place = { src, name }
  // state.place = { name, src }

  // const test = await getRscData(filter)
  // console.log(test)
}

const save = () => {
  console.log({ eventList: useSceneStore.eventList })
  console.log({ saveData: useSceneStore.saveData })
  console.log({ event: useSceneStore.event })
}
</script>

<template>
  <div class="relative flex flex-col flex-wrap w-full h-full">
    <div
      class="relative overflow-hidden flex flex-col justify-end !w-[1280px] !h-[720px] border-2 bg-black"
    >
      <t-game-screen
        :place-data="state.place"
        :actor="state.actor"
        :chat="state.chat"
        @next="next"
      />
      <button
        class="absolute top-0 right-0 w-20 h-10 border rounded bg-sky-400 hover:bg-sky-600"
        @click="save"
      >
        저장
      </button>
    </div>

    <t-edit-tool @upload-bg="uploadBg" @upload-actor="uploadActor" @select-scene="selectScene" />
  </div>
</template>
