<script setup lang="ts" scoped>
import { useLayoutStore } from '@/store/loading'
import { useSceneStore } from '@/store/scene'
import { setGameData, setSceneData } from '@/util'
import jsonApi from '@/util/jsonApi'
import { onMounted, reactive } from 'vue'
import { useToast } from 'vue-toastification'

const emit = defineEmits(['get-scene-data'])
const toast = useToast()
const state = reactive({ list: [] })
onMounted(async () => {
  const { ok, data } = await jsonApi.getSceneList()
  state.list = ok ? data : []
})

const searchScene = async (e) => {
  const target = e.currentTarget as HTMLInputElement
  const focusCell = document.getElementById(`scene-${target.value}`)
  if (focusCell) {
    focusCell.focus()
    focusCell.scrollIntoView({ behavior: 'smooth', block: 'center' })
  } else {
    toast.error('데이터가 없습니다.')
  }
}

const selectScene = async (e) => {
  const target = e.currentTarget as HTMLLIElement
  if (!target.id) {
    setSceneData({ eventList: [], sceneName: '' })
    return
  }

  useLayoutStore.isLoading = true
  const sceneName = target.id

  const { ok, data } = await jsonApi.getScene(sceneName)
  if (ok) {
    setSceneData({ eventList: data.script, sceneName })
  } else {
    setSceneData({ eventList: [], sceneName: '' })
  }

  useLayoutStore.isLoading = false
}

const moveEvent = async (i: number) => {
  useSceneStore.eventIndex = i
  await setGameData()
}

const addScene = () => {
  toast.info('준비중')
}
</script>

<!-- 부모 컴포넌트 => components/template/tool/tEditTool.vue -->
<template>
  <div class="flex flex-col">
    <ul class="w-full h-[40px] overflow-x-auto flex items-center">
      <li
        v-for="(v, i) in useSceneStore.list"
        :key="`${useSceneStore.sceneName}-event-${i}`"
        class="border cursor-pointer flex flex-col items-center"
        :class="
          i == useSceneStore.eventIndex
            ? 'bg-red-400 text-white'
            : `bg-gray-100 hover:bg-red-100 ${v.type == 'chat' ? 'text-black' : 'text-red-600'}`
        "
        @click="moveEvent(i)"
      >
        <span>[{{ v.type.slice(0, 4) }}]</span>
        <span>[{{ i }}]</span>
      </li>
    </ul>

    <div class="flex flex-wrap gap-1">
      <input type="text" @keydown.enter="searchScene" />
      <ul class="w-full h-[40px] overflow-x-auto flex items-center text-black">
        <li class="px-2 py-1 bg-gray-100 border cursor-pointer hover:bg-red-100" @click="addScene">
          +
        </li>
        <li
          v-for="(v, i) in state.list"
          :id="v"
          :key="`scene-name-[${v}]-${i}`"
          class="px-2 py-1 bg-gray-100 border cursor-pointer hover:bg-red-100"
          @click="selectScene"
        >
          {{ v }}
        </li>
      </ul>
    </div>
  </div>
</template>
