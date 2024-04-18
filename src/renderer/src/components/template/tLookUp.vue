<script setup lang="ts" scoped>
import { useLayoutStore } from '@/store/loading'
import { useSceneStore } from '@/store/scene'
import dbManager from '@/util/dbManager'
import { filter, map } from 'lodash-es'
import { onMounted, reactive } from 'vue'

const state = reactive({
  idx: '#NONE',
  data: {
    sceneIdx: '#NONE',
    place: '',
    img: '',
    contents: []
  },
  characterList: {}
})
const color = ['bg-red-100', 'bg-sky-100', 'bg-orange-100', 'bg-lime-100', 'bg-purple-100']

onMounted(async () => {
  await updateSelectBox()
})

const setSceneIdx = async (e) => {
  state.idx = e.target.value
  if (state.idx == 'NONE') {
    state.data = { sceneIdx: 'NONE', place: '', img: '', contents: [] }
    state.characterList = {}
  } else {
    await updateSelectBox()
  }
}

const updateSelectBox = async () => {
  if (state.idx == 'NONE') {
    state.data = { sceneIdx: 'NONE', place: '', img: '', contents: [] }
    state.characterList = {}
    return
  }
  const { ok, data } = await dbManager.searchData({ sceneIdx: state.idx })
  if (ok) {
    useLayoutStore.isLoading = true
    const findData: any = { ...data }
    findData.contents = JSON.parse(data.contents)
    state.data = findData
    const textarea = document.getElementsByTagName('textarea')
    for (let i = 0; i < textarea.length; i++) {
      const target = textarea[i]
      target.style.height = 'auto'
      target.style.height = `${target.scrollHeight}px`
    }
    useLayoutStore.isLoading = false
  }
  const hasNameContents = filter(state.data.contents, (e) => !!e.name)
  map(hasNameContents, (content, i: number) => {
    state.characterList[content.name] = `${color[i % color.length]} text-gray-600`
  })
}
</script>

<template>
  <div
    class="relative flex flex-col gap-[10px] w-full h-full bg-gray-600 text-gray-100 overflow-y-auto bg-"
  >
    <div class="flex gap-2 border-2 border-gray-600">
      <p>{{ state.idx }}</p>
      <select class="text-black" @change="setSceneIdx">
        <option value="NONE" selected>NONE</option>
        <option
          v-for="(v, i) in useSceneStore.scene"
          :key="i"
          :value="v.sceneIdx"
          class="max-w-screen"
        >
          {{ v.sceneIdx }}
        </option>
      </select>
    </div>

    <div class="flex gap-2 border-2 border-gray-400">
      <p>장소:</p>
      <p class="text-black bg-white">{{ state.data.place }}</p>
    </div>
    <div class="flex gap-2 border-2 border-gray-400">
      <p>img:</p>
      <p class="text-black bg-white">{{ state.data.img }}</p>
    </div>

    <div class="flex flex-col gap-2 border-2 border-gray-400">
      <div class="flex items-center gap-4">
        <p>컨텐츠:</p>
      </div>

      <div
        v-for="(v, i) in state.data.contents"
        :key="i"
        class="flex flex-col w-full bg-gray-400 border border-black"
      >
        <div class="flex flex-col gap-1">
          <p :class="state.characterList[v.name] ?? ''">
            {{ v.role == 'name' ? v.name : '내래이션' }}
          </p>
          <p class="text-black bg-white">
            {{ v.content }}
          </p>
        </div>

        <div v-if="v.event" class="flex flex-col gap-2 border-2 border-gray-400">
          <p>이벤트:</p>
          <p>{{ v.event.label }}</p>
          <ul class="flex flex-col w-full">
            <li>1. {{ v.event.ary[0] }}</li>
            <li>2. {{ v.event.ary[1] }}</li>
          </ul>
        </div>

        <div v-if="v.img" class="flex flex-col gap-2 border-2 border-gray-400">
          <img :src="v.img" :alt="v.img" class="h-[720px] w-auto" />
        </div>
      </div>
    </div>
  </div>
</template>
