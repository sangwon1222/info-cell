<script setup lang="ts" scoped>
import { useLayoutStore } from '@/store/loading'
import { useSceneStore } from '@/store/scene'
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
  useLayoutStore.isLoading = true
  const target = e.currentTarget as HTMLLIElement
  const sceneName = target.id

  if (sceneName) {
    const { ok, data } = await jsonApi.getScene(sceneName)
    if (ok) emit('get-scene-data', { eventList: data.script, sceneName })
    else toast.error('데이터 조회 실패')
  } else {
    emit('get-scene-data', { eventList: [], sceneName })
  }
  useLayoutStore.isLoading = false
}

const moveEvent = (event) => {
  console.log('moveEvent', event)
}
</script>

<!-- 부모 컴포넌트 => components/template/tool/tEditTool.vue -->
<template>
  <div class="flex flex-col">
    <ul class="w-full h-[40px] overflow-x-auto flex">
      <li
        v-for="(v, i) in useSceneStore.eventList"
        :key="`${useSceneStore.sceneName}-event-${i}`"
        class="px-2 bg-gray-100 border cursor-pointer hover:bg-red-100"
        @click="moveEvent(v)"
      >
        {{ (v as TypeInterActiveEvents | TypeChatEvents).type }}-{{ i }}
      </li>
    </ul>

    <div class="flex flex-wrap gap-1">
      <input type="text" @keydown.enter="searchScene" />
      <ul class="w-full h-[40px] overflow-x-auto flex text-black">
        <li class="px-2 bg-gray-100 border cursor-pointer hover:bg-red-100" @click="selectScene">
          +
        </li>
        <li
          v-for="(v, i) in state.list"
          :id="v"
          :key="`scene-name-[${v}]-${i}`"
          class="px-2 bg-gray-100 border cursor-pointer hover:bg-red-100"
          @click="selectScene"
        >
          {{ v }}
        </li>
      </ul>
    </div>
  </div>
</template>
